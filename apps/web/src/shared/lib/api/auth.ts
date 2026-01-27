import type {
    AuthResponse,
    LoginDto,
    RegisterDto,
    MagicLinkDto,
    MessageResponse,
    User,
    AuthTokens,
} from '@acw/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

async function authFetch<T>(
    endpoint: string,
    options: RequestInit = {},
): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        credentials: 'include',
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Request failed');
    }

    const text = await response.text();
    if (!text) {
        return {} as T;
    }

    return JSON.parse(text);
}

export const authApi = {
    login: (dto: LoginDto): Promise<AuthResponse> =>
        authFetch<AuthResponse>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(dto),
        }),

    register: (dto: RegisterDto): Promise<MessageResponse> =>
        authFetch<MessageResponse>('/auth/register', {
            method: 'POST',
            body: JSON.stringify(dto),
        }),

    logout: (accessToken: string): Promise<void> =>
        authFetch<void>('/auth/logout', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }),

    refresh: (): Promise<{ tokens: AuthTokens }> =>
        authFetch<{ tokens: AuthTokens }>('/auth/refresh', {
            method: 'POST',
        }),

    me: (accessToken: string): Promise<User> =>
        authFetch<User>('/auth/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }),

    verifyEmail: (token: string): Promise<AuthResponse> =>
        authFetch<AuthResponse>('/auth/verify-email', {
            method: 'POST',
            body: JSON.stringify({ token }),
        }),

    resendVerification: (email: string): Promise<MessageResponse> =>
        authFetch<MessageResponse>('/auth/resend-verification', {
            method: 'POST',
            body: JSON.stringify({ email }),
        }),

    requestMagicLink: (dto: MagicLinkDto): Promise<MessageResponse> =>
        authFetch<MessageResponse>('/auth/magic-link/request', {
            method: 'POST',
            body: JSON.stringify(dto),
        }),

    getGoogleAuthUrl: (): string => `${API_URL}/auth/google`,
};
