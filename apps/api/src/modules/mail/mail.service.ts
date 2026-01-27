import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';
import { ENV } from '../../config/env';

@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name);
    private resend: Resend | null = null;

    constructor() {
        if (ENV.RESEND_API_KEY) {
            this.resend = new Resend(ENV.RESEND_API_KEY);
        } else {
            this.logger.warn(
                'RESEND_API_KEY not configured. Emails will be logged to console.',
            );
        }
    }

    private async sendEmail(
        to: string,
        subject: string,
        html: string,
    ): Promise<void> {
        if (!this.resend) {
            this.logger.log(`[DEV EMAIL] To: ${to}\nSubject: ${subject}\n${html}`);
            return;
        }

        try {
            await this.resend.emails.send({
                from: ENV.RESEND_FROM_EMAIL,
                to,
                subject,
                html,
            });
            this.logger.log(`Email sent to ${to}: ${subject}`);
        } catch (error) {
            this.logger.error(`Failed to send email to ${to}`, error);
            throw error;
        }
    }

    async sendVerificationEmail(email: string, token: string): Promise<void> {
        const verifyUrl = `${ENV.FRONTEND_URL}/auth/verify-email?token=${token}`;

        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>Verify your email</title>
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #1a1a1a; margin-bottom: 24px;">Verify your email address</h1>
                <p>Thank you for registering! Please verify your email address by clicking the button below:</p>
                <a href="${verifyUrl}" style="display: inline-block; background-color: #0070f3; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; margin: 24px 0;">
                    Verify Email
                </a>
                <p style="color: #666; font-size: 14px;">Or copy and paste this link into your browser:</p>
                <p style="color: #0070f3; word-break: break-all; font-size: 14px;">${verifyUrl}</p>
                <p style="color: #666; font-size: 14px; margin-top: 32px;">This link will expire in 24 hours.</p>
                <p style="color: #666; font-size: 14px;">If you did not create an account, you can safely ignore this email.</p>
            </body>
            </html>
        `;

        await this.sendEmail(email, 'Verify your email address', html);
    }

    async sendMagicLinkEmail(email: string, token: string): Promise<void> {
        const magicLinkUrl = `${ENV.FRONTEND_URL}/auth/magic-link/verify?token=${token}`;

        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>Sign in to your account</title>
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #1a1a1a; margin-bottom: 24px;">Sign in to your account</h1>
                <p>Click the button below to sign in to your account:</p>
                <a href="${magicLinkUrl}" style="display: inline-block; background-color: #0070f3; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; margin: 24px 0;">
                    Sign In
                </a>
                <p style="color: #666; font-size: 14px;">Or copy and paste this link into your browser:</p>
                <p style="color: #0070f3; word-break: break-all; font-size: 14px;">${magicLinkUrl}</p>
                <p style="color: #666; font-size: 14px; margin-top: 32px;">This link will expire in 15 minutes.</p>
                <p style="color: #666; font-size: 14px;">If you did not request this email, you can safely ignore it.</p>
            </body>
            </html>
        `;

        await this.sendEmail(email, 'Sign in to your account', html);
    }

    async sendWelcomeEmail(email: string, name?: string): Promise<void> {
        const displayName = name || 'there';

        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>Welcome!</title>
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #1a1a1a; margin-bottom: 24px;">Welcome, ${displayName}!</h1>
                <p>Your email has been verified successfully. You can now access all features of your account.</p>
                <a href="${ENV.FRONTEND_URL}" style="display: inline-block; background-color: #0070f3; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; margin: 24px 0;">
                    Go to Dashboard
                </a>
                <p style="color: #666; font-size: 14px; margin-top: 32px;">If you have any questions, feel free to reach out to our support team.</p>
            </body>
            </html>
        `;

        await this.sendEmail(email, 'Welcome!', html);
    }
}
