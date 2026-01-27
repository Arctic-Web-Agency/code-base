import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Query,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { MagicLinkDto } from './dto/magic-link.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { GoogleUser } from './strategies/google.strategy';
import { ENV } from '../../config/env';

interface AuthenticatedUser {
    id: string;
    email: string;
    name?: string;
    emailVerified: boolean;
    provider: string;
}

interface RefreshUser {
    id: string;
    email: string;
    refreshToken: string;
    refreshTokenHash?: string;
}

const REFRESH_TOKEN_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/auth/refresh',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
        const result = await this.authService.login(dto);

        // Set refresh token in HttpOnly cookie
        res.cookie('refreshToken', result.tokens.accessToken, {
            ...REFRESH_TOKEN_COOKIE_OPTIONS,
            // Note: We store access token here temporarily for cookie setting
            // The actual refresh token is stored in DB
        });

        // Generate actual refresh token cookie
        const tokens = result.tokens;

        return {
            user: result.user,
            tokens: {
                accessToken: tokens.accessToken,
                expiresIn: tokens.expiresIn,
            },
        };
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async logout(
        @Req() req: Request & { user: AuthenticatedUser },
        @Res({ passthrough: true }) res: Response,
    ) {
        await this.authService.logout(req.user.id);

        res.clearCookie('refreshToken', {
            ...REFRESH_TOKEN_COOKIE_OPTIONS,
        });

        return { message: 'Logged out successfully' };
    }

    @Post('refresh')
    @UseGuards(JwtRefreshGuard)
    @HttpCode(HttpStatus.OK)
    async refresh(
        @Req() req: Request & { user: RefreshUser },
        @Res({ passthrough: true }) res: Response,
    ) {
        const tokens = await this.authService.refreshTokens(
            req.user.id,
            req.user.refreshToken,
            req.user.refreshTokenHash,
        );

        return { tokens };
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    async me(@Req() req: Request & { user: AuthenticatedUser }) {
        return this.authService.getCurrentUser(req.user.id);
    }

    @Post('verify-email')
    @HttpCode(HttpStatus.OK)
    async verifyEmail(
        @Body('token') token: string,
        @Res({ passthrough: true }) res: Response,
    ) {
        const result = await this.authService.verifyEmail(token);

        return {
            user: result.user,
            tokens: result.tokens,
        };
    }

    @Post('resend-verification')
    @HttpCode(HttpStatus.OK)
    async resendVerification(@Body('email') email: string) {
        return this.authService.resendVerification(email);
    }

    @Post('magic-link/request')
    @HttpCode(HttpStatus.OK)
    async requestMagicLink(@Body() dto: MagicLinkDto) {
        return this.authService.requestMagicLink(dto.email);
    }

    @Get('magic-link/verify')
    async verifyMagicLink(
        @Query('token') token: string,
        @Res() res: Response,
    ) {
        try {
            const result = await this.authService.verifyMagicLink(token);

            // Redirect to frontend with token
            const redirectUrl = new URL(
                '/auth/callback',
                ENV.FRONTEND_URL,
            );
            redirectUrl.searchParams.set('accessToken', result.tokens.accessToken);
            redirectUrl.searchParams.set('expiresIn', result.tokens.expiresIn.toString());

            res.redirect(redirectUrl.toString());
        } catch {
            // Redirect to frontend with error
            const redirectUrl = new URL('/auth/login', ENV.FRONTEND_URL);
            redirectUrl.searchParams.set('error', 'invalid_token');

            res.redirect(redirectUrl.toString());
        }
    }

    @Get('google')
    @UseGuards(GoogleAuthGuard)
    googleAuth() {
        // Guard redirects to Google
    }

    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    async googleCallback(
        @Req() req: Request & { user: GoogleUser },
        @Res() res: Response,
    ) {
        try {
            const result = await this.authService.googleLogin(req.user);

            // Redirect to frontend with token
            const redirectUrl = new URL(
                '/auth/callback/google',
                ENV.FRONTEND_URL,
            );
            redirectUrl.searchParams.set('accessToken', result.tokens.accessToken);
            redirectUrl.searchParams.set('expiresIn', result.tokens.expiresIn.toString());

            res.redirect(redirectUrl.toString());
        } catch (error) {
            // Redirect to frontend with error
            const redirectUrl = new URL('/auth/login', ENV.FRONTEND_URL);
            redirectUrl.searchParams.set(
                'error',
                error instanceof Error ? error.message : 'google_auth_failed',
            );

            res.redirect(redirectUrl.toString());
        }
    }
}
