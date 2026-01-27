// Auth provider types
export type AuthProvider = 'credentials' | 'google' | 'magic-link';

// User entity
export interface User {
    id: string;
    email: string;
    name?: string;
    avatar?: string;
    emailVerified: boolean;
    provider: AuthProvider;
    createdAt: Date;
    updatedAt: Date;
}

// Auth tokens response
export interface AuthTokens {
    accessToken: string;
    expiresIn: number;
}

// Full auth response with user and tokens
export interface AuthResponse {
    user: User;
    tokens: AuthTokens;
}

// Message-only response
export interface MessageResponse {
    message: string;
}

// Login DTO
export interface LoginDto {
    email: string;
    password: string;
}

// Register DTO
export interface RegisterDto {
    email: string;
    password: string;
    name?: string;
}

// Magic link request DTO
export interface MagicLinkDto {
    email: string;
}

// Email verification DTO
export interface VerifyEmailDto {
    token: string;
}

// Token types for verification/magic-link
export type TokenType = 'email-verification' | 'magic-link' | 'password-reset';
