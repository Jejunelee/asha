module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[project]/src/app/api/send-application/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/resend/dist/index.mjs [app-route] (ecmascript)");
;
;
// Initialize Resend with API key from environment variables
const resendApiKey = process.env.RESEND_API_KEY;
const admissionsEmail = process.env.ADMISSIONS_EMAIL || process.env.YOUR_EMAIL;
// Log environment check (only in development)
if ("TURBOPACK compile-time truthy", 1) {
    console.log('✅ Resend API Key exists:', !!resendApiKey);
    console.log('✅ Admissions email exists:', !!admissionsEmail);
    if (!resendApiKey) console.error('❌ RESEND_API_KEY is missing from environment variables');
    if (!admissionsEmail) console.error('❌ ADMISSIONS_EMAIL is missing from environment variables');
}
// Initialize Resend only if API key exists
const resend = resendApiKey ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Resend"](resendApiKey) : null;
async function POST(request) {
    try {
        // Parse the request body with type assertion
        const body = await request.json();
        const { lastName, firstName, email, phoneNumber, telephoneNumber, gender, civilStatus, course, highestEducationalAttainment } = body;
        // Log the received data (development only)
        if ("TURBOPACK compile-time truthy", 1) {
            console.log('📝 Received Application form data:', {
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
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Last name is required'
            }, {
                status: 400
            });
        }
        if (lastName.trim().length < 2) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Last name must be at least 2 characters'
            }, {
                status: 400
            });
        }
        if (!firstName?.trim()) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'First name is required'
            }, {
                status: 400
            });
        }
        if (firstName.trim().length < 2) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'First name must be at least 2 characters'
            }, {
                status: 400
            });
        }
        if (!gender) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Please select your gender'
            }, {
                status: 400
            });
        }
        if (!civilStatus) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Please select your civil status'
            }, {
                status: 400
            });
        }
        // Step 2 Validation: Contact Information
        const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
        if (!email?.trim()) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Email address is required'
            }, {
                status: 400
            });
        }
        if (!emailRegex.test(email.trim())) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Please provide a valid email address.'
            }, {
                status: 400
            });
        }
        const phoneRegex = /^[\+\d\s\(\)-]{8,20}$/;
        if (!phoneNumber?.trim()) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Mobile number is required'
            }, {
                status: 400
            });
        }
        if (!phoneRegex.test(phoneNumber.trim()) || phoneNumber.trim().length < 8) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Please provide a valid mobile number (minimum 8 digits).'
            }, {
                status: 400
            });
        }
        // Optional telephone number validation
        if (telephoneNumber?.trim() && (!phoneRegex.test(telephoneNumber.trim()) || telephoneNumber.trim().length < 8)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Please provide a valid telephone number (minimum 8 digits).'
            }, {
                status: 400
            });
        }
        // Step 3 Validation: Academic Information
        if (!course?.trim()) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Please specify the course you\'re applying for'
            }, {
                status: 400
            });
        }
        if (course.trim().length < 3) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Course name must be more specific (minimum 3 characters).'
            }, {
                status: 400
            });
        }
        if (!highestEducationalAttainment) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Please select your highest educational attainment'
            }, {
                status: 400
            });
        }
        // Check if Resend is properly initialized
        if (!resend || !resendApiKey) {
            console.error('❌ Resend not configured properly');
            // In development, return success without sending email
            if ("TURBOPACK compile-time truthy", 1) {
                console.log('⚠️ Development mode: Email not sent, but returning success');
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: true,
                    message: 'Development mode: Application submitted successfully (email not sent)',
                    data: {
                        id: 'dev-mode'
                    }
                }, {
                    status: 200
                });
            }
            //TURBOPACK unreachable
            ;
        }
        // Send email using Resend
        const fullName = `${firstName} ${lastName}`;
        // FIXED: Type-safe display formatters with proper type checking
        const getGenderDisplay = (genderValue)=>{
            const genderMap = {
                'female': 'Female',
                'male': 'Male',
                'other': 'Other',
                'prefer-not-to-say': 'Prefer not to say'
            };
            return genderMap[genderValue] || genderValue;
        };
        const getCivilStatusDisplay = (statusValue)=>{
            const statusMap = {
                'single': 'Single',
                'married': 'Married',
                'divorced': 'Divorced',
                'widowed': 'Widowed'
            };
            return statusMap[statusValue] || statusValue;
        };
        const getEducationDisplay = (educationValue)=>{
            const educationMap = {
                'elementary': 'Elementary Graduate',
                'high-school': 'High School Graduate',
                'senior-high': 'Senior High School Graduate',
                'associate': 'Associate Degree',
                'bachelor': 'Bachelor\'s Degree',
                'master': 'Master\'s Degree',
                'doctorate': 'Doctorate Degree'
            };
            return educationMap[educationValue] || educationValue;
        };
        const genderDisplay = getGenderDisplay(gender);
        const civilStatusDisplay = getCivilStatusDisplay(civilStatus);
        const educationDisplay = getEducationDisplay(highestEducationalAttainment);
        const { data, error } = await resend.emails.send({
            from: 'Admission Application <admission@asha.edu.ph>',
            to: [
                admissionsEmail || 'admission@asha.edu.ph'
            ],
            replyTo: email,
            subject: `📝 New Student Application: ${fullName} - ${course}`,
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
            <p style="font-size: 11px; color: #999;">Please review the application and contact the applicant within 2-3 business days.</p>
          </div>
        </body>
        </html>
      `,
            text: `
NEW STUDENT APPLICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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
      `
        });
        // Handle Resend errors
        if (error) {
            console.error('❌ Resend error:', error);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `Failed to submit application: ${error.message}. Please try again later.`
            }, {
                status: 500
            });
        }
        // Success response
        console.log('✅ Application email sent successfully:', data);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: '🎉 Application submitted successfully! Our admissions team will contact you within 24 hours.',
            data: data
        }, {
            status: 200
        });
    } catch (error) {
        console.error('❌ Server error:', error);
        // Return a proper JSON response even for unexpected errors
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Unable to process your application. Please try again later.',
            details: ("TURBOPACK compile-time truthy", 1) ? error.message : "TURBOPACK unreachable"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5cfb02c5._.js.map