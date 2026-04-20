import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { randomUUID } from 'crypto';

// Initialize Resend with API key from environment variables
const resendApiKey = process.env.RESEND_API_KEY;
const admissionsEmail = process.env.ADMISSIONS_EMAIL || process.env.YOUR_EMAIL;
const WEBHOOK_URL = 'https://cca-connect.techops.ph/web/hook/20b5dbfd-30fd-4dff-a0a7-8f899d41b4dd';

// Log environment check (only in development)
if (process.env.NODE_ENV === 'development') {
  console.log('✅ Resend API Key exists:', !!resendApiKey);
  console.log('✅ Admissions email exists:', !!admissionsEmail);
  console.log('✅ Webhook URL configured:', !!WEBHOOK_URL);
  
  if (!resendApiKey) console.error('❌ RESEND_API_KEY is missing from environment variables');
  if (!admissionsEmail) console.error('❌ ADMISSIONS_EMAIL is missing from environment variables');
}

// Initialize Resend only if API key exists
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Define types for the form data
interface ApplicationFormData {
  lastName: string;
  firstName: string;
  email: string;
  phoneNumber: string;
  telephoneNumber?: string;
  gender: string;
  civilStatus: string;
  course: string;
  highestEducationalAttainment: string;
}

// Define lookup types
type GenderType = 'female' | 'male' | 'other' | 'prefer-not-to-say';
type CivilStatusType = 'single' | 'married' | 'divorced' | 'widowed';
type EducationType = 'elementary' | 'high-school' | 'senior-high' | 'associate' | 'bachelor' | 'master' | 'doctorate';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body with type assertion
    const body = await request.json() as ApplicationFormData;
    const { 
      lastName, 
      firstName, 
      email, 
      phoneNumber, 
      telephoneNumber,
      gender, 
      civilStatus, 
      course, 
      highestEducationalAttainment 
    } = body;

    // Generate unique identifier for this submission
    const submissionId = randomUUID();
    const trackingId = `APPLICATION_${Date.now()}_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    // Log the received data (development only)
    if (process.env.NODE_ENV === 'development') {
      console.log('📝 Received Application form data:', { 
        submissionId,
        trackingId,
        lastName, 
        firstName, 
        email, 
        phoneNumber, 
        telephoneNumber,
        gender, 
        civilStatus, 
        course, 
        highestEducationalAttainment 
      });
    }

    // Step 1 Validation: Personal Information
    if (!lastName?.trim()) {
      return NextResponse.json(
        { error: 'Last name is required' },
        { status: 400 }
      );
    }
    if (lastName.trim().length < 2) {
      return NextResponse.json(
        { error: 'Last name must be at least 2 characters' },
        { status: 400 }
      );
    }

    if (!firstName?.trim()) {
      return NextResponse.json(
        { error: 'First name is required' },
        { status: 400 }
      );
    }
    if (firstName.trim().length < 2) {
      return NextResponse.json(
        { error: 'First name must be at least 2 characters' },
        { status: 400 }
      );
    }

    if (!gender) {
      return NextResponse.json(
        { error: 'Please select your gender' },
        { status: 400 }
      );
    }

    if (!civilStatus) {
      return NextResponse.json(
        { error: 'Please select your civil status' },
        { status: 400 }
      );
    }

    // Step 2 Validation: Contact Information
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (!email?.trim()) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      );
    }
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const phoneRegex = /^[\+\d\s\(\)-]{8,20}$/;
    if (!phoneNumber?.trim()) {
      return NextResponse.json(
        { error: 'Mobile number is required' },
        { status: 400 }
      );
    }
    if (!phoneRegex.test(phoneNumber.trim()) || phoneNumber.trim().length < 8) {
      return NextResponse.json(
        { error: 'Please provide a valid mobile number (minimum 8 digits).' },
        { status: 400 }
      );
    }

    // Optional telephone number validation
    if (telephoneNumber?.trim() && (!phoneRegex.test(telephoneNumber.trim()) || telephoneNumber.trim().length < 8)) {
      return NextResponse.json(
        { error: 'Please provide a valid telephone number (minimum 8 digits).' },
        { status: 400 }
      );
    }

    // Step 3 Validation: Academic Information
    if (!course?.trim()) {
      return NextResponse.json(
        { error: 'Please specify the course you\'re applying for' },
        { status: 400 }
      );
    }
    if (course.trim().length < 3) {
      return NextResponse.json(
        { error: 'Course name must be more specific (minimum 3 characters).' },
        { status: 400 }
      );
    }

    if (!highestEducationalAttainment) {
      return NextResponse.json(
        { error: 'Please select your highest educational attainment' },
        { status: 400 }
      );
    }

    // FIXED: Type-safe display formatters with proper type checking
    const getGenderDisplay = (genderValue: string): string => {
      const genderMap: Record<GenderType, string> = {
        'female': 'Female',
        'male': 'Male',
        'other': 'Other',
        'prefer-not-to-say': 'Prefer not to say'
      };
      return genderMap[genderValue as GenderType] || genderValue;
    };

    const getCivilStatusDisplay = (statusValue: string): string => {
      const statusMap: Record<CivilStatusType, string> = {
        'single': 'Single',
        'married': 'Married',
        'divorced': 'Divorced',
        'widowed': 'Widowed'
      };
      return statusMap[statusValue as CivilStatusType] || statusValue;
    };

    const getEducationDisplay = (educationValue: string): string => {
      const educationMap: Record<EducationType, string> = {
        'elementary': 'Elementary Graduate',
        'high-school': 'High School Graduate',
        'senior-high': 'Senior High School Graduate',
        'associate': 'Associate Degree',
        'bachelor': 'Bachelor\'s Degree',
        'master': 'Master\'s Degree',
        'doctorate': 'Doctorate Degree'
      };
      return educationMap[educationValue as EducationType] || educationValue;
    };

    const genderDisplay = getGenderDisplay(gender);
    const civilStatusDisplay = getCivilStatusDisplay(civilStatus);
    const educationDisplay = getEducationDisplay(highestEducationalAttainment);

    // Prepare payload for external webhook with unique identifiers
    const fullName = `${firstName} ${lastName}`;
    const webhookPayload = {
      unique_id: submissionId,
      tracking_id: trackingId,
      timestamp: new Date().toISOString(),
      formType: 'Student Application',
      data: {
        lastName: lastName.trim(),
        firstName: firstName.trim(),
        fullName: fullName,
        email: email.trim(),
        phoneNumber: phoneNumber.trim(),
        telephoneNumber: telephoneNumber?.trim() || '',
        gender: gender,
        genderDisplay: genderDisplay,
        civilStatus: civilStatus,
        civilStatusDisplay: civilStatusDisplay,
        course: course.trim(),
        highestEducationalAttainment: highestEducationalAttainment,
        educationDisplay: educationDisplay,
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
            message: 'Development mode: Application submitted successfully (email not sent)',
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

    // Send email using Resend with unique IDs
    const emailPromise = resend.emails.send({
      from: 'Admission Application <admission@asha.edu.ph>',
      to: [admissionsEmail || 'admission@asha.edu.ph'],
      replyTo: email,
      subject: `[${trackingId}] 📝 New Student Application: ${fullName} - ${course}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Student Application</title>
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
            .header h1 {
              margin: 0;
              font-size: 28px;
            }
            .header p {
              margin: 10px 0 0;
              opacity: 0.9;
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
            .section {
              background: white;
              padding: 20px;
              border-radius: 8px;
              margin-bottom: 25px;
              border-left: 4px solid #7b1e1e;
              box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            }
            .section h2 {
              margin-top: 0;
              color: #7b1e1e;
              font-size: 18px;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .info-row {
              display: flex;
              padding: 8px 0;
              border-bottom: 1px solid #f0f0f0;
            }
            .info-label {
              font-weight: 600;
              width: 140px;
              color: #555;
            }
            .info-value {
              flex: 1;
              color: #333;
            }
            .badge {
              display: inline-block;
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 12px;
              font-weight: 500;
            }
            .badge-course {
              background: #7b1e1e10;
              color: #7b1e1e;
              border: 1px solid #7b1e1e20;
            }
            .button-group {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #eee;
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
            <h1>🎓 New Student Application</h1>
            <p>Full Admission Application Submitted</p>
          </div>
          
          <div class="content">
            <div class="tracking-info">
              <strong>🔑 Tracking ID:</strong> ${trackingId}<br>
              <strong>🆔 Submission ID:</strong> ${submissionId}
            </div>
            
            <div class="section">
              <h2>
                <span>📋</span> Personal Information
              </h2>
              <div class="info-row">
                <div class="info-label">Full Name:</div>
                <div class="info-value"><strong>${firstName} ${lastName}</strong></div>
              </div>
              <div class="info-row">
                <div class="info-label">Gender:</div>
                <div class="info-value">${genderDisplay}</div>
              </div>
              <div class="info-row">
                <div class="info-label">Civil Status:</div>
                <div class="info-value">${civilStatusDisplay}</div>
              </div>
            </div>
            
            <div class="section">
              <h2>
                <span>📞</span> Contact Information
              </h2>
              <div class="info-row">
                <div class="info-label">Email Address:</div>
                <div class="info-value"><a href="mailto:${email}" style="color: #7b1e1e;">${email}</a></div>
              </div>
              <div class="info-row">
                <div class="info-label">Mobile Number:</div>
                <div class="info-value"><a href="tel:${phoneNumber}" style="color: #7b1e1e;">${phoneNumber}</a></div>
              </div>
              ${telephoneNumber ? `
              <div class="info-row">
                <div class="info-label">Telephone Number:</div>
                <div class="info-value"><a href="tel:${telephoneNumber}" style="color: #7b1e1e;">${telephoneNumber}</a></div>
              </div>
              ` : ''}
            </div>
            
            <div class="section">
              <h2>
                <span>🎯</span> Academic Information
              </h2>
              <div class="info-row">
                <div class="info-label">Course Applying:</div>
                <div class="info-value"><span class="badge badge-course">${course}</span></div>
              </div>
              <div class="info-row">
                <div class="info-label">Education Level:</div>
                <div class="info-value">${educationDisplay}</div>
              </div>
            </div>
            
            <div class="button-group">
              <a href="mailto:${email}" class="button button-email">✉️ Reply to Applicant</a>
              <a href="tel:${phoneNumber}" class="button button-phone">📞 Call Applicant</a>
            </div>
          </div>
          
          <div class="footer">
            <p>This application was submitted from your website's admission form.</p>
            <p>📅 Submitted: ${new Date().toLocaleString()}</p>
            <p style="font-family: monospace; font-size: 10px;">Reference: ${trackingId}</p>
            <p style="font-size: 11px; color: #999;">Please review the application and contact the applicant within 2-3 business days.</p>
          </div>
        </body>
        </html>
      `,
      text: `
NEW STUDENT APPLICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tracking ID: ${trackingId}
Submission ID: ${submissionId}

PERSONAL INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${firstName} ${lastName}
Gender: ${genderDisplay}
Civil Status: ${civilStatusDisplay}

CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email: ${email}
Mobile: ${phoneNumber}
${telephoneNumber ? `Telephone: ${telephoneNumber}` : ''}

ACADEMIC INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Course Applying: ${course}
Highest Education: ${educationDisplay}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted: ${new Date().toLocaleString()}

Reply to applicant: ${email}
Call applicant: ${phoneNumber}
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
        { error: `Failed to submit application: ${emailError.message}. Please try again later.` },
        { status: 500 }
      );
    } else {
      emailData = emailResult.value;
      if (emailData.error) {
        console.error('❌ Resend error:', emailData.error);
        return NextResponse.json(
          { error: `Failed to submit application: ${emailData.error.message}. Please try again later.` },
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

    // Success response with unique identifiers
    console.log('✅ Application email sent successfully:', emailData.data);
    return NextResponse.json(
      { 
        success: true,
        message: '🎉 Application submitted successfully! Our admissions team will contact you within 24 hours.',
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
        error: 'Unable to process your application. Please try again later.',
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