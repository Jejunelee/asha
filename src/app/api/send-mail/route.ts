import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with API key from environment variables
const resendApiKey = process.env.RESEND_API_KEY;
const yourEmail = process.env.YOUR_EMAIL;

// Log environment check (only in development)
if (process.env.NODE_ENV === 'development') {
  console.log('✅ Resend API Key exists:', !!resendApiKey);
  console.log('✅ Your email exists:', !!yourEmail);
  
  if (!resendApiKey) console.error('❌ RESEND_API_KEY is missing from environment variables');
  if (!yourEmail) console.error('❌ YOUR_EMAIL is missing from environment variables');
}

// Initialize Resend only if API key exists
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: NextRequest) {
  try {
    // Parse the request body - MATCHING Lead.tsx form fields
    const body = await request.json();
    const { firstName, surname, email, phone, course } = body;

    // Log the received data (development only)
    if (process.env.NODE_ENV === 'development') {
      console.log('📝 Received Lead form data:', { 
        firstName, 
        surname, 
        email, 
        phone, 
        course 
      });
    }

    // Basic validation - MATCHING Lead.tsx validations
    if (!firstName?.trim() || !surname?.trim() || !email?.trim() || !phone?.trim() || !course?.trim()) {
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

    // Validate course
    if (course.trim().length < 3) {
      return NextResponse.json(
        { error: 'Please provide a more specific course inquiry (minimum 3 characters).' },
        { status: 400 }
      );
    }

    // Check if Resend is properly initialized
    if (!resend || !resendApiKey) {
      console.error('❌ Resend not configured properly');
      
      // In development, return success without sending email
      if (process.env.NODE_ENV === 'development') {
        console.log('⚠️ Development mode: Email not sent, but returning success');
        return NextResponse.json(
          { 
            success: true, 
            message: 'Development mode: Form submitted successfully (email not sent)',
            data: { id: 'dev-mode' }
          },
          { status: 200 }
        );
      }
      
      return NextResponse.json(
        { error: 'Email service is not configured properly. Please contact support.' },
        { status: 500 }
      );
    }

    // Send email using Resend
    const fullName = `${firstName} ${surname}`;
    
    const { data, error } = await resend.emails.send({
      from: 'Course Inquiry <onboarding@resend.dev>', // Use Resend's default domain for testing
      to: [yourEmail || 'admin@yourdomain.com'], // Your receiving email
      replyTo: email,
      subject: `🎓 New Course Inquiry: ${fullName} is interested in ${course}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Course Inquiry</title>
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
            .info-card {
              background: white;
              padding: 20px;
              border-radius: 8px;
              margin-bottom: 20px;
              border-left: 4px solid #7b1e1e;
              box-shadow: 0 2px 4px rgba(0,0,0,0.05);
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
            <h1 style="margin: 0; font-size: 24px;">📚 New Course Inquiry!</h1>
            <p style="margin: 10px 0 0; opacity: 0.9;">A potential student is interested in your courses</p>
          </div>
          
          <div class="content">
            <div class="info-card">
              <h2 style="margin-top: 0; color: #7b1e1e;">Student Information</h2>
              
              <p><strong style="color: #333;">👤 Full Name:</strong> ${fullName}</p>
              <p><strong style="color: #333;">📧 Email:</strong> <a href="mailto:${email}" style="color: #7b1e1e;">${email}</a></p>
              <p><strong style="color: #333;">📱 Phone:</strong> <a href="tel:${phone}" style="color: #7b1e1e;">${phone}</a></p>
              <p><strong style="color: #333;">🎯 Course Interest:</strong> <span style="background: #f0f0f0; padding: 4px 8px; border-radius: 4px;">${course}</span></p>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
              <a href="mailto:${email}" class="button button-email">✉️ Reply to Student</a>
              <a href="tel:${phone}" class="button button-phone">📞 Call Now</a>
            </div>
          </div>
          
          <div class="footer">
            <p>This inquiry was submitted from your website's course inquiry form.</p>
            <p>📅 Time received: ${new Date().toLocaleString()}</p>
          </div>
        </body>
        </html>
      `,
      text: `
NEW COURSE INQUIRY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Student Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${fullName}
Email: ${email}
Phone: ${phone}
Course Interest: ${course}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This inquiry was submitted at ${new Date().toLocaleString()}

Reply to student: ${email}
Call student: ${phone}
      `,
    });

    // Handle Resend errors
    if (error) {
      console.error('❌ Resend error:', error);
      return NextResponse.json(
        { error: `Failed to send inquiry: ${error.message}. Please try again later.` },
        { status: 500 }
      );
    }

    // Success response
    console.log('✅ Email sent successfully:', data);
    return NextResponse.json(
      { 
        success: true,
        message: '✨ Thank you! Your inquiry has been sent. Our team will contact you shortly.',
        data: data
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