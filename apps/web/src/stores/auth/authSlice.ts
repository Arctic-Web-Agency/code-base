import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { User, AuthResponse, LoginDto, RegisterDto } from '@acw/types';
import { AuthState } from './types';

const initialState: AuthState = {
    user: null,
    accessToken: null,
    isLoading: false,
    isInitialized: false,
    error: null,
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// Helper to make authenticated requests
async function authFetch<T>(
    endpoint: string,
    options: RequestInit = {},
    accessToken?: string | null,
): Promise<T> {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (accessToken) {
        (headers as Record<string, string>)['Authorization'] =
            `Bearer ${accessToken}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
        credentials: 'include',
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Request failed');
    }

    return response.json();
}

// Async thunks
export const loginThunk = createAsyncThunk<
    AuthResponse,
    LoginDto,
    { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        return await authFetch<AuthResponse>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    } catch (error) {
        return rejectWithValue(
            error instanceof Error ? error.message : 'Login failed',
        );
    }
});

export const registerThunk = createAsyncThunk<
    { message: string },
    RegisterDto,
    { rejectValue: string }
>('auth/register', async (data, { rejectWithValue }) => {
    try {
        return await authFetch<{ message: string }>('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    } catch (error) {
        return rejectWithValue(
            error instanceof Error ? error.message : 'Registration failed',
        );
    }
});

export const logoutThunk = createAsyncThunk<
    void,
    void,
    { state: { auth: AuthState }; rejectValue: string }
>('auth/logout', async (_, { getState, rejectWithValue }) => {
    try {
        const { accessToken } = getState().auth;
        await authFetch('/auth/logout', { method: 'POST' }, accessToken);
    } catch (error) {
        return rejectWithValue(
            error instanceof Error ? error.message : 'Logout failed',
        );
    }
});

export const refreshTokenThunk = createAsyncThunk<
    { tokens: { accessToken: string; expiresIn: number } },
    void,
    { rejectValue: string }
>('auth/refresh', async (_, { rejectWithValue }) => {
    try {
        return await authFetch<{
            tokens: { accessToken: string; expiresIn: number };
        }>('/auth/refresh', {
            method: 'POST',
        });
    } catch (error) {
        return rejectWithValue(
            error instanceof Error ? error.message : 'Token refresh failed',
        );
    }
});

export const fetchCurrentUserThunk = createAsyncThunk<
    User,
    void,
    { state: { auth: AuthState }; rejectValue: string }
>('auth/fetchCurrentUser', async (_, { getState, rejectWithValue }) => {
    try {
        const { accessToken } = getState().auth;
        return await authFetch<User>('/auth/me', {}, accessToken);
    } catch (error) {
        return rejectWithValue(
            error instanceof Error ? error.message : 'Failed to fetch user',
        );
    }
});

export const verifyEmailThunk = createAsyncThunk<
    AuthResponse,
    string,
    { rejectValue: string }
>('auth/verifyEmail', async (token, { rejectWithValue }) => {
    try {
        return await authFetch<AuthResponse>('/auth/verify-email', {
            method: 'POST',
            body: JSON.stringify({ token }),
        });
    } catch (error) {
        return rejectWithValue(
            error instanceof Error ? error.message : 'Email verification failed',
        );
    }
});

export const requestMagicLinkThunk = createAsyncThunk<
    { message: string },
    string,
    { rejectValue: string }
>('auth/requestMagicLink', async (email, { rejectWithValue }) => {
    try {
        return await authFetch<{ message: string }>('/auth/magic-link/request', {
            method: 'POST',
            body: JSON.stringify({ email }),
        });
    } catch (error) {
        return rejectWithValue(
            error instanceof Error ? error.message : 'Failed to send magic link',
        );
    }
});

export const resendVerificationThunk = createAsyncThunk<
    { message: string },
    string,
    { rejectValue: string }
>('auth/resendVerification', async (email, { rejectWithValue }) => {
    try {
        return await authFetch<{ message: string }>('/auth/resend-verification', {
            method: 'POST',
            body: JSON.stringify({ email }),
        });
    } catch (error) {
        return rejectWithValue(
            error instanceof Error
                ? error.message
                : 'Failed to resend verification',
        );
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        },
        setAccessToken: (state, action: PayloadAction<string | null>) => {
            state.accessToken = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setInitialized: (state) => {
            state.isInitialized = true;
        },
        clearAuth: (state) => {
            state.user = null;
            state.accessToken = null;
            state.error = null;
        },
        // For OAuth callback handling
        setAuthFromCallback: (
            state,
            action: PayloadAction<{ accessToken: string }>,
        ) => {
            state.accessToken = action.payload.accessToken;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Login
        builder
            .addCase(loginThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.accessToken = action.payload.tokens.accessToken;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Login failed';
            });

        // Register
        builder
            .addCase(registerThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerThunk.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Registration failed';
            });

        // Logout
        builder
            .addCase(logoutThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logoutThunk.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.accessToken = null;
            })
            .addCase(logoutThunk.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.accessToken = null;
            });

        // Refresh token
        builder
            .addCase(refreshTokenThunk.fulfilled, (state, action) => {
                state.accessToken = action.payload.tokens.accessToken;
            })
            .addCase(refreshTokenThunk.rejected, (state) => {
                state.user = null;
                state.accessToken = null;
            });

        // Fetch current user
        builder
            .addCase(fetchCurrentUserThunk.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(fetchCurrentUserThunk.rejected, (state) => {
                state.user = null;
                state.accessToken = null;
            });

        // Verify email
        builder
            .addCase(verifyEmailThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(verifyEmailThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.accessToken = action.payload.tokens.accessToken;
            })
            .addCase(verifyEmailThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Verification failed';
            });

        // Request magic link
        builder
            .addCase(requestMagicLinkThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(requestMagicLinkThunk.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(requestMagicLinkThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to send magic link';
            });

        // Resend verification
        builder
            .addCase(resendVerificationThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resendVerificationThunk.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(resendVerificationThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to resend verification';
            });
    },
});

export const {
    setUser,
    setAccessToken,
    setLoading,
    setError,
    setInitialized,
    clearAuth,
    setAuthFromCallback,
} = authSlice.actions;

export default authSlice.reducer;
