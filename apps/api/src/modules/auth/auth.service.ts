import {
    BadRequestException,
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ENV } from '../../config/env';
import { UsersService } from '../users/users.service';
import { TokenService } from '../token/token.service';
import { MailService } from '../mail/mail.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { GoogleUser } from './strategies/google.strategy';
import { UserDocument } from '../users/user.schema';

export interface AuthTokens {
    accessToken: string;
    expiresIn: number;
}

export interface AuthUser {
    id: string;
    email: string;
    name?: string;
    avatar?: string;
    emailVerified: boolean;
    provider: string;
}

export interface AuthResponse {
    user: AuthUser;
    tokens: AuthTokens;
}

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private tokenService: TokenService,
        private mailService: MailService,
        private jwtService: JwtService,
    ) {}

    // Register with email/password
    async register(dto: RegisterDto): Promise<{ message: string }> {
        const existingUser = await this.usersService.findByEmail(dto.email);

        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 12);

        const user = await this.usersService.create({
            email: dto.email,
            password: hashedPassword,
            name: dto.name,
            provider: 'credentials',
            emailVerified: false,
        });

        // Create verification token (24 hours)
        const token = await this.tokenService.create(
            user._id.toString(),
            'email-verification',
            24 * 60 * 60 * 1000,
        );

        // Send verification email
        await this.mailService.sendVerificationEmail(dto.email, token);

        return {
            message:
                'Registration successful. Please check your email to verify your account.',
        };
    }

    // Login with email/password
    async login(dto: LoginDto): Promise<AuthResponse> {
        const user = await this.usersService.findByEmailWithPassword(dto.email);

        if (!user || !user.password) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(dto.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        if (!user.emailVerified) {
            throw new UnauthorizedException(
                'Please verify your email before logging in',
            );
        }

        const tokens = await this.generateTokens(user);
        await this.usersService.updateRefreshToken(
            user._id.toString(),
            tokens.refreshToken,
        );

        return {
            user: this.formatUser(user),
            tokens: {
                accessToken: tokens.accessToken,
                expiresIn: tokens.expiresIn,
            },
        };
    }

    // Logout
    async logout(userId: string): Promise<void> {
        await this.usersService.updateRefreshToken(userId, null);
    }

    // Refresh tokens
    async refreshTokens(
        userId: string,
        refreshToken: string,
        refreshTokenHash: string | undefined,
    ): Promise<AuthTokens> {
        if (!refreshTokenHash) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        const isValid = await bcrypt.compare(refreshToken, refreshTokenHash);

        if (!isValid) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        const user = await this.usersService.findById(userId);

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const tokens = await this.generateTokens(user);
        await this.usersService.updateRefreshToken(
            userId,
            tokens.refreshToken,
        );

        return {
            accessToken: tokens.accessToken,
            expiresIn: tokens.expiresIn,
        };
    }

    // Get current user
    async getCurrentUser(userId: string): Promise<AuthUser> {
        const user = await this.usersService.findById(userId);

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        return this.formatUser(user);
    }

    // Verify email
    async verifyEmail(token: string): Promise<AuthResponse> {
        const result = await this.tokenService.verify(
            token,
            'email-verification',
        );

        if (!result) {
            throw new BadRequestException('Invalid or expired verification token');
        }

        const user = await this.usersService.verifyEmail(result.userId);

        if (!user) {
            throw new BadRequestException('User not found');
        }

        // Delete the used token
        await this.tokenService.delete(token);

        // Send welcome email
        await this.mailService.sendWelcomeEmail(user.email, user.name);

        // Generate tokens and log user in
        const tokens = await this.generateTokens(user);
        await this.usersService.updateRefreshToken(
            user._id.toString(),
            tokens.refreshToken,
        );

        return {
            user: this.formatUser(user),
            tokens: {
                accessToken: tokens.accessToken,
                expiresIn: tokens.expiresIn,
            },
        };
    }

    // Resend verification email
    async resendVerification(email: string): Promise<{ message: string }> {
        const user = await this.usersService.findByEmail(email);

        if (!user) {
            // Don't reveal if user exists
            return {
                message: 'If an account with this email exists, a verification email has been sent.',
            };
        }

        if (user.emailVerified) {
            throw new BadRequestException('Email is already verified');
        }

        const token = await this.tokenService.create(
            user._id.toString(),
            'email-verification',
            24 * 60 * 60 * 1000,
        );

        await this.mailService.sendVerificationEmail(email, token);

        return {
            message: 'If an account with this email exists, a verification email has been sent.',
        };
    }

    // Request magic link
    async requestMagicLink(email: string): Promise<{ message: string }> {
        let user = await this.usersService.findByEmail(email);

        // Create user if doesn't exist (magic link auto-registers)
        if (!user) {
            user = await this.usersService.create({
                email,
                provider: 'magic-link',
                emailVerified: true, // Magic link verifies email implicitly
            });
        }

        // Create magic link token (15 minutes)
        const token = await this.tokenService.create(
            user._id.toString(),
            'magic-link',
            15 * 60 * 1000,
        );

        await this.mailService.sendMagicLinkEmail(email, token);

        return {
            message: 'Magic link sent to your email',
        };
    }

    // Verify magic link
    async verifyMagicLink(token: string): Promise<AuthResponse> {
        const result = await this.tokenService.verify(token, 'magic-link');

        if (!result) {
            throw new BadRequestException('Invalid or expired magic link');
        }

        const user = await this.usersService.findById(result.userId);

        if (!user) {
            throw new BadRequestException('User not found');
        }

        // Delete the used token
        await this.tokenService.delete(token);

        // Mark email as verified if not already
        if (!user.emailVerified) {
            await this.usersService.verifyEmail(user._id.toString());
        }

        // Generate tokens
        const tokens = await this.generateTokens(user);
        await this.usersService.updateRefreshToken(
            user._id.toString(),
            tokens.refreshToken,
        );

        return {
            user: this.formatUser(user),
            tokens: {
                accessToken: tokens.accessToken,
                expiresIn: tokens.expiresIn,
            },
        };
    }

    // Google OAuth login
    async googleLogin(googleUser: GoogleUser): Promise<AuthResponse> {
        let user = await this.usersService.findByGoogleId(googleUser.googleId);

        if (!user) {
            // Check if user exists with this email but different provider
            const existingUser = await this.usersService.findByEmail(
                googleUser.email,
            );

            if (existingUser) {
                // Link Google account to existing user
                // In production, you might want to handle this differently
                throw new ConflictException(
                    'An account with this email already exists. Please sign in with your password.',
                );
            }

            // Create new user
            user = await this.usersService.create({
                email: googleUser.email,
                name: googleUser.name,
                avatar: googleUser.avatar,
                googleId: googleUser.googleId,
                provider: 'google',
                emailVerified: true, // Google already verified the email
            });
        }

        const tokens = await this.generateTokens(user);
        await this.usersService.updateRefreshToken(
            user._id.toString(),
            tokens.refreshToken,
        );

        return {
            user: this.formatUser(user),
            tokens: {
                accessToken: tokens.accessToken,
                expiresIn: tokens.expiresIn,
            },
        };
    }

    // Helper: Generate access and refresh tokens
    private async generateTokens(user: UserDocument): Promise<{
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    }> {
        const payload = {
            sub: user._id.toString(),
            email: user.email,
        };

        const accessExpiresInSeconds = this.parseExpiresIn(ENV.JWT_ACCESS_EXPIRES_IN);
        const refreshExpiresInSeconds = this.parseExpiresIn(ENV.JWT_REFRESH_EXPIRES_IN);

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: ENV.JWT_ACCESS_SECRET,
                expiresIn: accessExpiresInSeconds,
            }),
            this.jwtService.signAsync(payload, {
                secret: ENV.JWT_REFRESH_SECRET,
                expiresIn: refreshExpiresInSeconds,
            }),
        ]);

        return { accessToken, refreshToken, expiresIn: accessExpiresInSeconds };
    }

    // Helper: Parse expires in string to seconds
    private parseExpiresIn(expiresIn: string): number {
        const match = expiresIn.match(/^(\d+)([smhd])$/);
        if (!match) return 900; // Default 15 minutes

        const value = parseInt(match[1], 10);
        const unit = match[2];

        switch (unit) {
            case 's':
                return value;
            case 'm':
                return value * 60;
            case 'h':
                return value * 60 * 60;
            case 'd':
                return value * 24 * 60 * 60;
            default:
                return 900;
        }
    }

    // Helper: Format user for response
    private formatUser(user: UserDocument): AuthUser {
        return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            emailVerified: user.emailVerified,
            provider: user.provider,
        };
    }
}
