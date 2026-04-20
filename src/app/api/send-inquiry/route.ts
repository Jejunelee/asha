import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { randomUUID } from 'crypto';

// Initialize Resend with API key from environment variables
const resendApiKey = process.env.RESEND_API_KEY;
const yourEmail = process.env.YOUR_EMAIL;
const WEBHOOK_URL = 'https://cca-connect.techops.ph/web/hook/20b5dbfd-30fd-4dff-a0a7-8f899d41b4dd';

// Log environment check (only in development)
if (process.env.NODE_ENV === 'development') {
  console.log('✅ Resend API Key exists:', !!resendApiKey);
  console.log('✅ Your email exists:', !!yourEmail);
  console.log('✅ Webhook URL configured:', !!WEBHOOK_URL);
  
  if (!resendApiKey) console.error('❌ RESEND_API_KEY is missing from environment variables');
  if (!yourEmail) console.error('❌ YOUR_EMAIL is missing from environment variables');
}

// Initialize Resend only if API key exists
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: NextRequest) {
  try {
    // Parse the request body - Now using 'inquiry' instead of 'course'
    const body = await request.json();
    const { firstName, surname, email, phone, inquiry } = body;

    // Generate unique identifier for this submission
    const submissionId = randomUUID();
    const trackingId = `INQUIRY_${Date.now()}_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    // Log the received data (development only)
    if (process.env.NODE_ENV === 'development') {
      console.log('📝 Received Inquiry form data:', { 
        submissionId,
        trackingId,
        firstName, 
        surname, 
        email, 
        phone, 
        inquiry 
      });
    }

    // Basic validation - Updated for inquiry field
    if (!firstName?.trim() || !surname?.trim() || !email?.trim() || !phone?.trim() || !inquiry?.trim()) {
      return NextResponse.json(
        { error: 'All fields are required. Please fill out the complete form.' },
        { status: 400 }
      );
    }

    // Validate name lengths
    if (firstName.trim().length < 2 || surname.trim().length < 2) {
      return NextResponse.json(
        { error: 'First name and surname must be at least 2 characters each.' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Validate phone (basic validation)
    const phoneRegex = /^[\+\d\s\(\)-]{8,20}$/;
    if (!phoneRegex.test(phone.trim()) || phone.trim().length < 8) {
      return NextResponse.json(
        { error: 'Please provide a valid phone number (minimum 8 digits).' },
        { status: 400 }
      );
    }

    // Validate inquiry (minimum 10 characters)
    if (inquiry.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please provide more details in your inquiry (minimum 10 characters).' },
        { status: 400 }
      );
    }

    // Prepare payload for external webhook with unique identifiers
    const fullName = `${firstName} ${surname}`;
    const webhookPayload = {
      unique_id: submissionId,
      tracking_id: trackingId,
      timestamp: new Date().toISOString(),
      formType: 'General Inquiry',
      data: {
        firstName: firstName.trim(),
        surname: surname.trim(),
        fullName: fullName,
        email: email.trim(),
        phone: phone.trim(),
        inquiry: inquiry.trim(),
      },
      source: 'CCA Connect Website',
      metadata: {
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
        user_agent: request.headers.get('user-agent') || 'unknown',
        submitted_at: new Date().toISOString(),
      }
    };

    // Send to external webhook
    const webhookPromise = fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload),
    }).catch(error => {
      console.error('❌ Webhook error:', error);
      return null;
    });

    // Check if Resend is properly initialized
    if (!resend || !resendApiKey) {
      console.error('❌ Resend not configured properly');
      
      // In development, return success without sending email
      if (process.env.NODE_ENV === 'development') {
        console.log('⚠️ Development mode: Email not sent, but returning success');
        
        // Still execute webhook
        const webhookResult = await webhookPromise;
        if (webhookResult?.ok) {
          console.log('✅ Webhook sent successfully with ID:', submissionId);
        }
        
        return NextResponse.json(
          { 
            success: true, 
            message: 'Development mode: Form submitted successfully (email not sent)',
            data: { id: 'dev-mode' },
            submissionId: submissionId,
            trackingId: trackingId
          },
          { status: 200 }
        );
      }
      
      return NextResponse.json(
        { error: 'Email service is not configured properly. Please contact support.' },
        { status: 500 }
      );
    }

    // Send email using Resend with unique IDs in the email
    const emailPromise = resend.emails.send({
      from: 'Website Inquiry <admission@asha.edu.ph>',
      to: [yourEmail || 'admission@asha.edu.ph'],
      replyTo: email,
      subject: `[${trackingId}] 📬 New General Inquiry: ${fullName} has a question`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New General Inquiry</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #7b1e1e 0%, #641818 100%);
              color: white;
              padding: 30px;
              border-radius: 12px 12px 0 0;
              text-align: center;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 12px 12px;
              border: 1px solid #eee;
              border-top: none;
            }
            .tracking-info {
              background: #f0f0f0;
              padding: 10px;
              border-radius: 6px;
              margin-bottom: 20px;
              font-family: monospace;
              font-size: 12px;
            }
            .info-card {
              background: white;
              padding: 20px;
              border-radius: 8px;
              margin-bottom: 20px;
              border-left: 4px solid #7b1e1e;
              box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            }
            .inquiry-box {
              background: #fef3f3;
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
              border: 1px solid #fcc5c5;
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 8px;
              margin: 5px;
              font-weight: 500;
            }
            .button-email {
              background: #7b1e1e;
              color: white;
            }
            .button-phone {
              background: #4CAF50;
              color: white;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0; font-size: 24px;">📬 New Website Inquiry!</h1>
            <p style="margin: 10px 0 0; opacity: 0.9;">Someone has a question or request</p>
          </div>
          
          <div class="content">
            <div class="tracking-info">
              <strong>🔑 Tracking ID:</strong> ${trackingId}<br>
              <strong>🆔 Submission ID:</strong> ${submissionId}
            </div>
            
            <div class="info-card">
              <h2 style="margin-top: 0; color: #7b1e1e;">Contact Information</h2>
              
              <p><strong style="color: #333;">👤 Name:</strong> ${fullName}</p>
              <p><strong style="color: #333;">📧 Email:</strong> <a href="mailto:${email}" style="color: #7b1e1e;">${email}</a></p>
              <p><strong style="color: #333;">📱 Phone:</strong> <a href="tel:${phone}" style="color: #7b1e1e;">${phone}</a></p>
            </div>
            
            <div class="inquiry-box">
              <h3 style="margin-top: 0; color: #7b1e1e;">💬 Inquiry Details:</h3>
              <p style="white-space: pre-wrap; margin-bottom: 0;">${inquiry.replace(/\n/g, '<br>')}</p>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
              <a href="mailto:${email}" class="button button-email">✉️ Reply to Inquiry</a>
              <a href="tel:${phone}" class="button button-phone">📞 Call Now</a>
            </div>
          </div>
          
          <div class="footer">
            <p>This inquiry was submitted from your website's contact form.</p>
            <p>📅 Time received: ${new Date().toLocaleString()}</p>
            <p style="font-family: monospace; font-size: 10px; margin-top: 10px;">Reference: ${trackingId}</p>
          </div>
        </body>
        </html>
      `,
      text: `
NEW WEBSITE INQUIRY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tracking ID: ${trackingId}
Submission ID: ${submissionId}

Contact Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${fullName}
Email: ${email}
Phone: ${phone}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Inquiry Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${inquiry}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This inquiry was submitted at ${new Date().toLocaleString()}

Reply to inquirer: ${email}
Call inquirer: ${phone}
Reference: ${trackingId}
      `,
    });

    // Execute both promises simultaneously
    const [webhookResult, emailResult] = await Promise.allSettled([webhookPromise, emailPromise]);

    // Handle email errors
    let emailError = null;
    let emailData = null;
    
    if (emailResult.status === 'rejected') {
      emailError = emailResult.reason;
      console.error('❌ Resend error:', emailError);
      return NextResponse.json(
        { error: `Failed to send inquiry: ${emailError.message}. Please try again later.` },
        { status: 500 }
      );
    } else {
      emailData = emailResult.value;
      if (emailData.error) {
        console.error('❌ Resend error:', emailData.error);
        return NextResponse.json(
          { error: `Failed to send inquiry: ${emailData.error.message}. Please try again later.` },
          { status: 500 }
        );
      }
    }

    // Log webhook result (don't fail the request if webhook fails)
    if (webhookResult.status === 'fulfilled' && webhookResult.value) {
      const webhookResponse = await webhookResult.value;
      if (webhookResponse.ok) {
        console.log('✅ Webhook sent successfully with ID:', submissionId);
      } else {
        console.error('❌ Webhook failed with status:', webhookResponse.status);
      }
    } else if (webhookResult.status === 'rejected') {
      console.error('❌ Webhook request failed:', webhookResult.reason);
    }

    // Optional: Send auto-reply to the user
    if (process.env.SEND_AUTO_REPLY === 'true') {
      try {
        await resend.emails.send({
          from: 'ASHA Foundation <onboarding@resend.dev>',
          to: [email],
          subject: `Thank you for your inquiry - Reference: ${trackingId}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #7b1e1e; color: white; padding: 20px; text-align: center; border-radius: 12px 12px 0 0; }
                .content { padding: 20px; background-color: #f9f9f9; border-radius: 0 0 12px 12px; }
                .tracking { background: #f0f0f0; padding: 10px; border-radius: 6px; font-family: monospace; font-size: 12px; margin-bottom: 15px; }
                .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>Thank You for Contacting Us!</h2>
                </div>
                <div class="content">
                  <div class="tracking">
                    <strong>🔑 Reference ID:</strong> ${trackingId}
                  </div>
                  <p>Dear ${firstName},</p>
                  <p>Thank you for reaching out to ASHA Foundation. We have received your inquiry and one of our team members will get back to you within 24-48 hours.</p>
                  <p><strong>Your inquiry:</strong></p>
                  <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 10px 0;">
                    ${inquiry.replace(/\n/g, '<br>')}
                  </div>
                  <p>Please keep your Reference ID (${trackingId}) for any future correspondence.</p>
                  <p>Best regards,<br />ASHA Foundation Team</p>
                </div>
                <div class="footer">
                  <p>© ${new Date().getFullYear()} ASHA Foundation. All rights reserved.</p>
                </div>
              </div>
            </body>
            </html>
          `,
          text: `
Thank You for Contacting Us!

Reference ID: ${trackingId}

Dear ${firstName},

Thank you for reaching out to ASHA Foundation. We have received your inquiry and one of our team members will get back to you within 24-48 hours.

Your inquiry:
${inquiry}

Please keep your Reference ID (${trackingId}) for any future correspondence.

Best regards,
ASHA Foundation Team
          `,
        });
        console.log('✅ Auto-reply sent to user with tracking ID:', trackingId);
      } catch (autoReplyError) {
        console.error('⚠️ Failed to send auto-reply:', autoReplyError);
        // Don't fail the main request if auto-reply fails
      }
    }

    // Success response with unique identifiers
    console.log('✅ Inquiry email sent successfully:', emailData.data);
    return NextResponse.json(
      { 
        success: true,
        message: '✨ Thank you! Your inquiry has been sent. Our team will contact you shortly.',
        data: emailData.data,
        submissionId: submissionId,
        trackingId: trackingId
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('❌ Server error:', error);
    
    // Return a proper JSON response even for unexpected errors
    return NextResponse.json(
      { 
        error: 'Unable to process your request. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// Add OPTIONS method for CORS if needed
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}