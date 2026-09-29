let nodemailer = require('nodemailer');
let path = require('path');
let fs = require('fs');
let jwt = require('jsonwebtoken');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: process.env.SMTP_PORT,
    secure: false, 
    auth: {
        user: process.env.SMTP_LOGIN,
        pass: process.env.SMTP_PASSWORD
    }
});


async function Sendemailfnc(username, email) {
    console.log('running sendmail fnc!')
    try {
        let emailtoken = jwt.sign({ email: email }, process.env.JWT_KEY);

        const mailOptions = {
            from: `"DocuMind AI" <${process.env.ADMIN_EMAIL}>`, // Sender ka naam acha dikhega
            to: email,
            subject: 'Thanks for Signup! Verify your email',
            html: ` <div style="background-color:#F6F4EE; padding:40px 20px; font-family: Georgia, 'Times New Roman', serif;">
        <div style="max-width:480px; margin:0 auto; background:#ffffff; border-radius:16px; border:1px solid rgba(22,35,58,0.1); overflow:hidden;">
            <div style="padding:32px 32px 0 32px; text-align:center;">
                <span style="font-family: Georgia, serif; font-size:20px; color:#16233A; text-transform: capitalize;">documind-ai</span>
            </div>
            <div style="padding:24px 32px 32px 32px; text-align:center;">
                <h1 style="font-family: Georgia, serif; font-size:24px; color:#16233A; margin:0 0 8px 0;">Welcome, ${username}!</h1>
                <p style="font-family: Arial, sans-serif; font-size:14px; color:rgba(22,35,58,0.6); line-height:1.6; margin:0 0 28px 0;">
                    Thanks for signing up. Please verify your email to start chatting with your PDFs.
                </p>
                <a href="${process.env.SERVER_SIDE_URL}/api/verify?token=${emailtoken}"
                   style="display:inline-block; text-decoration:none; background-color:#16233A; color:#F6F4EE; font-family: Arial, sans-serif; font-size:14px; font-weight:bold; padding:12px 28px; border-radius:8px;">
                    Verify Email
                </a>
                <p style="font-family: Arial, sans-serif; font-size:12px; color:rgba(22,35,58,0.4); margin:24px 0 0 0;">
                    If you didn't create this account, you can safely ignore this email.
                </p>
            </div>
        </div>
    </div>`
        };

        await transporter.sendMail(mailOptions);
        console.log('mail send succesfully!')

    } catch (error) {
        console.log("Email Send Error: ", error)
    }
}

async function Googleemailfnc(username, email) {
    try {
        console.log('running google signup!')
        let emailtoken = jwt.sign({ email: email }, process.env.JWT_KEY);

        await transporter.sendMail({
            from: `"DocuMind AI" <${process.env.ADMIN_EMAIL}>`,
            to: email,
            subject: 'Welcome to DocuMind AI (Google Signup)',
            html: ` <div style="background-color:#F6F4EE; padding:40px 20px; font-family: Georgia, 'Times New Roman', serif;">
        <div style="max-width:480px; margin:0 auto; background:#ffffff; border-radius:16px; border:1px solid rgba(22,35,58,0.1); overflow:hidden;">
            <div style="padding:32px 32px 0 32px; text-align:center;">
                <span style="font-family: Georgia, serif; font-size:20px; color:#16233A; text-transform: capitalize;">documind-ai</span>
            </div>
            <div style="padding:24px 32px 32px 32px; text-align:center;">
                <h1 style="font-family: Georgia, serif; font-size:24px; color:#16233A; margin:0 0 8px 0;">Welcome, ${username}!</h1>
                <p style="font-family: Arial, sans-serif; font-size:14px; color:rgba(22,35,58,0.6); line-height:1.6; margin:0 0 28px 0;">
                    You signed up with Google. Just one more step — verify your email to continue.
                </p>
                <a href="${process.env.SERVER_SIDE_URL}/api/verify?token=${emailtoken}"
                   style="display:inline-block; text-decoration:none; background-color:#16233A; color:#F6F4EE; font-family: Arial, sans-serif; font-size:14px; font-weight:bold; padding:12px 28px; border-radius:8px;">
                    Verify Email
                </a>
                <p style="font-family: Arial, sans-serif; font-size:12px; color:rgba(22,35,58,0.4); margin:24px 0 0 0;">
                    If you didn't create this account, you can safely ignore this email.
                </p>
            </div>
        </div>
    </div>`
        });

        console.log('mail transported succesfully!')

    } catch (error) {
        console.log("Google Email Send Error: ", error)
    }
}

module.exports = {
    Sendemailfnc,
    Googleemailfnc
}