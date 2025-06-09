import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';
import { testPostgresConnection } from 'lib/dbCheck';

const prisma = new PrismaClient();

testPostgresConnection();

type EmailOptions = {
  email: string;
  emailType: 'VERIFY' | 'RESET';
  userId: string;
};

export const sendEmail = async ({ email, emailType, userId }: EmailOptions) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    if (emailType === 'VERIFY') {
      await prisma.user.update({
        where: { id: userId },
        data: {
          verifyToken: hashedToken,
          verifyTokenExpiry: expiry,
        },
      });
    } else if (emailType === 'RESET') {
      await prisma.user.update({
        where: { id: userId },
        data: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: expiry,
        },
      });
    }

    const transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'cef9c0b39f0e51',
        pass: 'e5d01ff80d4b3b',
      },
    });

    const actionUrl =
      emailType === 'VERIFY'
        ? `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`
        : `${process.env.DOMAIN}/resetpassword?token=${hashedToken}`;

    const info = {
      from: 'kohli@kohli.ui',
      to: email,
      subject:
        emailType === 'VERIFY'
          ? 'Verify Your Email'
          : 'Reset Your Password',
      html: `
        <div style="font-family: sans-serif; line-height: 1.4;">
          <h2>${emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password'}</h2>
          <p>Click the button below or copy and paste the URL to your browser:</p>
          <a href="${actionUrl}" style="display: inline-block; padding: 10px 20px; background-color: #0070f3; color: #fff; border-radius: 5px; text-decoration: none;">
            ${emailType === 'VERIFY' ? 'Verify Email' : 'Reset Password'}
          </a>
          <p style="margin-top: 10px;"><strong>Or use this link:</strong><br><a href="${actionUrl}">${actionUrl}</a></p>
          <p>This link will expire in 1 hour.</p>
        </div>
      `,
    };

    const mailResponse = await transport.sendMail(info);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to send email');
  }
};
