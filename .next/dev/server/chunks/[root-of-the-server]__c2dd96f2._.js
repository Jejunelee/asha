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
"[project]/src/app/api/send-inquiry/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
const yourEmail = process.env.YOUR_EMAIL;
// Log environment check (only in development)
if ("TURBOPACK compile-time truthy", 1) {
    console.log('✅ Resend API Key exists:', !!resendApiKey);
    console.log('✅ Your email exists:', !!yourEmail);
    if (!resendApiKey) console.error('❌ RESEND_API_KEY is missing from environment variables');
    if (!yourEmail) console.error('❌ YOUR_EMAIL is missing from environment variables');
}
// Initialize Resend only if API key exists
const resend = resendApiKey ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Resend"](resendApiKey) : null;
async function POST(request) {
    try {
        // Parse the request body - Now using 'inquiry' instead of 'course'
        const body = await request.json();
        const { firstName, surname, email, phone, inquiry } = body;
        // Log the received data (development only)
        if ("TURBOPACK compile-time truthy", 1) {
            console.log('📝 Received Inquiry form data:', {
                firstName,
                surname,
                email,
                phone,
                inquiry
            });
        }
        // Basic validation - Updated for inquiry field
        if (!firstName?.trim() || !surname?.trim() || !email?.trim() || !phone?.trim() || !inquiry?.trim()) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'All fields are required. Please fill out the complete form.'
            }, {
                status: 400
            });
        }
        // Validate name lengths
        if (firstName.trim().length < 2 || surname.trim().length < 2) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'First name and surname must be at least 2 characters each.'
            }, {
                status: 400
            });
        }
        // Validate email format
        const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Please provide a valid email address.'
            }, {
                status: 400
            });
        }
        // Validate phone (basic validation)
        const phoneRegex = /^[\+\d\s\(\)-]{8,20}$/;
        if (!phoneRegex.test(phone.trim()) || phone.trim().length < 8) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Please provide a valid phone number (minimum 8 digits).'
            }, {
                status: 400
            });
        }
        // Validate inquiry (minimum 10 characters)
        if (inquiry.trim().length < 10) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Please provide more details in your inquiry (minimum 10 characters).'
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
                    message: 'Development mode: Form submitted successfully (email not sent)',
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
        const fullName = `${firstName} ${surname}`;
        const { data, error } = await resend.emails.send({
            from: 'Website Inquiry <admission@asha.edu.ph>',
            to: [
                yourEmail || 'admission@asha.edu.ph'
            ],
            replyTo: email,
            subject: `📬 New General Inquiry: ${fullName} has a question`,
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
            <div class="info-card">
              <h2 style="margin-top: 0; color: #7b1e1e;">Contact Information</h2>
              
              <p><strong style="color: #333;">👤 Name:</strong> ${fullName}</p>
              <p><strong style="color: #333;">📧 Email:</strong> <a href="mailto:${email}" style="color: #7b1e1e;">${email}</a></p>
              <p><strong style="color: #333;">📱 Phone:</strong> <a href="tel:${phone}" style="color: #7b1e1e;">${phone}</a></p>
            </div>
            
            <div class="inquiry-box">
              <h3 style="margin-top: 0; color: #7b1e1e;">💬 Inquiry Details:</h3>
              <p style="white-space: pre-wrap; margin-bottom: 0;">${inquiry}</p>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
              <a href="mailto:${email}" class="button button-email">✉️ Reply to Inquiry</a>
              <a href="tel:${phone}" class="button button-phone">📞 Call Now</a>
            </div>
          </div>
          
          <div class="footer">
            <p>This inquiry was submitted from your website's contact form.</p>
            <p>📅 Time received: ${new Date().toLocaleString()}</p>
          </div>
        </body>
        </html>
      `,
            text: `
NEW WEBSITE INQUIRY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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
      `
        });
        // Handle Resend errors
        if (error) {
            console.error('❌ Resend error:', error);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `Failed to send inquiry: ${error.message}. Please try again later.`
            }, {
                status: 500
            });
        }
        // Optional: Send auto-reply to the user
        if (process.env.SEND_AUTO_REPLY === 'true') {
            try {
                await resend.emails.send({
                    from: 'ASHA Foundation <onboarding@resend.dev>',
                    to: [
                        email
                    ],
                    subject: 'Thank you for your inquiry - ASHA Foundation',
                    html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #7b1e1e; color: white; padding: 20px; text-align: center; border-radius: 12px 12px 0 0; }
                .content { padding: 20px; background-color: #f9f9f9; border-radius: 0 0 12px 12px; }
                .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>Thank You for Contacting Us!</h2>
                </div>
                <div class="content">
                  <p>Dear ${firstName},</p>
                  <p>Thank you for reaching out to ASHA Foundation. We have received your inquiry and one of our team members will get back to you within 24-48 hours.</p>
                  <p><strong>Your inquiry:</strong></p>
                  <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 10px 0;">
                    ${inquiry}
                  </div>
                  <p>In the meantime, feel free to explore our website for more information about our programs and initiatives.</p>
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

Dear ${firstName},

Thank you for reaching out to ASHA Foundation. We have received your inquiry and one of our team members will get back to you within 24-48 hours.

Your inquiry:
${inquiry}

Best regards,
ASHA Foundation Team
          `
                });
                console.log('✅ Auto-reply sent to user');
            } catch (autoReplyError) {
                console.error('⚠️ Failed to send auto-reply:', autoReplyError);
            // Don't fail the main request if auto-reply fails
            }
        }
        // Success response
        console.log('✅ Inquiry email sent successfully:', data);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: '✨ Thank you! Your inquiry has been sent. Our team will contact you shortly.',
            data: data
        }, {
            status: 200
        });
    } catch (error) {
        console.error('❌ Server error:', error);
        // Return a proper JSON response even for unexpected errors
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Unable to process your request. Please try again later.',
            details: ("TURBOPACK compile-time truthy", 1) ? error.message : "TURBOPACK unreachable"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c2dd96f2._.js.map