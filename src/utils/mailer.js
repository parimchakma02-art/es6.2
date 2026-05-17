import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 2525),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendPasswordResetEmail = async (to, resetLink) => {
    await transport.sendMail({
        from: "no-reply@example.com",
        to,
        subject: "Password Reset Request",
        text: `You requested a password reset. Click the link to reset your password: ${resetLink}`,
    })
}