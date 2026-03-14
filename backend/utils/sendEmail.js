import dotenv from "dotenv"
import path from "path";
import Mailjet from "node-mailjet";
import { ApiError } from "./ApiError.js";


// Load env from project root .env, then fallback to backend/.env if keys not present
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
if (!process.env.MJ_APIKEY_PUBLIC || !process.env.MJ_APIKEY_PRIVATE) {
  const backendEnv = path.resolve(process.cwd(), 'backend', '.env');
  try {
    const r = dotenv.config({ path: backendEnv });
    if (r.parsed) console.info(`Loaded environment from ${backendEnv}`);
  } catch (e) {
    // ignore
  }
}

let mailjet = null;
if (process.env.MJ_APIKEY_PUBLIC && process.env.MJ_APIKEY_PRIVATE) {
  mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
  );
} else {
  console.warn("Mailjet API keys not set. Mail sending disabled (MJ_APIKEY_PUBLIC / MJ_APIKEY_PRIVATE). OTPs will be logged to console for development.");
}

const sendOtpEmail = async (to, otp) => {
  try {
    if (!mailjet) {
      // Development fallback: log OTP to console so OTP flow remains usable without Mailjet keys
      console.info(`Sending OTP to ${to}`);
      return;
    }

    const payload = {
      Messages: [
        {
          From: {
            Email: process.env.EMAIL_FROM,
            Name: process.env.MAIL_FROM_NAME || "GymOS",
          },
          To: [{ Email: to }],
          Subject: "Your OTP Code",
          TextPart: `Your OTP is ${otp}`,
          HTMLPart: `
          <div style="font-family:Arial">
              <h2>Security Verification Code</h2>
              <p>Hello,</p>
              <p>Your one-time verification code is:</p>
              <p style="font-size:22px;"><b>${otp}</b></p>
              <p>This code will expire in 5 minutes. For your security, please do not share it with anyone.</p>
              <p>If you did not request this verification, please ignore this message.</p>
              <p>Thank you.</p>
          </div>

          `,
        },
      ],
    };

    console.info("Mailjet payload:", payload);
    const res = await mailjet.post("send", { version: "v3.1" }).request(payload);
    // Mailjet responds with a body containing Messages array; log for diagnostics
    try {
      console.info("Mailjet response body:", JSON.stringify(res.body, null, 2));
    } catch (e) {
      console.info("Mailjet response:", res && res.body ? res.body : res);
    }
    // If Mailjet reports errors, attempt SMTP fallback below (caught by catch)
    return;
  } catch (error) {
    console.error("Mailjet Error:", error && error.response ? error.response : error);
    // No SMTP fallback configured — surface error to caller
    throw new ApiError(500, "Failed to send OTP email");
  }
};

const sendPasswordResetEmail = async (to, link) => {
  try {
    if (!mailjet) {
      console.info(`[RESET] Password reset link for ${to}: ${link}`);
      return;
    }

    const payload = {
      Messages: [
        {
          From: {
            Email: process.env.EMAIL_FROM,
            Name: process.env.MAIL_FROM_NAME || "GymOS",
          },
          To: [{ Email: to }],
          Subject: "Reset your GymOS password",
          TextPart: `Reset your password using this link: ${link}`,
          HTMLPart: `
            <div style="font-family:Arial;line-height:1.6;color:#111">
              <h2>Password reset request</h2>
              <p>Hello,</p>
              <p>We received a request to reset the password for your GymOS account. Click the button below to reset your password. The link will expire in 60 minutes.</p>
              <p style="text-align:center;margin:28px 0;"><a href="${link}" style="background:#111;color:#fff;padding:12px 20px;border-radius:6px;text-decoration:none;">Reset password</a></p>
              <p>If you did not request this, you can safely ignore this email.</p>
              <p>Thanks,<br/>GymOS Team</p>
            </div>
          `,
        },
      ],
    };

    console.info("Mailjet payload (reset):", payload);
    await mailjet.post("send", { version: "v3.1" }).request(payload);
    return;
  } catch (error) {
    console.error("Mailjet Error (reset):", error && error.response ? error.response : error);
    throw new ApiError(500, "Failed to send password reset email");
  }
};

// Send staff credentials email (used when admin creates a staff user)
// NOTE: we intentionally send only the recipient's email and temporary password —
// receptionist can sign in with email + password (loginId is optional for signin).
const sendStaffCredentialsEmail = async (to, name, loginId, password) => {
  try {
    if (!mailjet) {
      // Development fallback: log only email and password (do not expose loginId here per UX request)
      console.info(`[STAFF-CRED] Send credentials to ${to}: email=${to}, password=${password}`);
      return;
    }

    const payload = {
      Messages: [
        {
          From: {
            Email: process.env.EMAIL_FROM,
            Name: process.env.MAIL_FROM_NAME || "GymOS",
          },
          To: [{ Email: to }],
          Subject: "Your GymOS account credentials",
          TextPart: `Hello ${name}, your receptionist account has been created. Email: ${to} | Password: ${password}`,
          HTMLPart: `
            <div style="font-family:Arial;color:#111;line-height:1.6">
              <h2>Welcome to GymOS</h2>
              <p>Hello ${name},</p>
              <p>Your staff account (receptionist) has been created. You can sign in using the email and temporary password below:</p>
              <div style="background:#f3f4f6;padding:12px;border-radius:8px;margin:12px 0;font-family:monospace;">
                <div><strong>Email:</strong> ${to}</div>
                <div style="margin-top:6px"><strong>Password:</strong> ${password}</div>
              </div>
              <p>For security, please change your password after first sign in.</p>
              <p>Thanks,<br/>GymOS Team</p>
            </div>
          `,
        },
      ],
    };

    console.info("Mailjet payload (staff creds):", payload);
    await mailjet.post("send", { version: "v3.1" }).request(payload);
    return;
  } catch (error) {
    console.error("Mailjet Error (staff creds):", error && error.response ? error.response : error);
    throw new ApiError(500, "Failed to send staff credentials email");
  }
};

export { sendOtpEmail, sendPasswordResetEmail, sendStaffCredentialsEmail };
