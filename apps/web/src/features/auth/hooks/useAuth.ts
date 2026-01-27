'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import {
    selectUser,
    selectAccessToken,
    selectIsAuthenticated,
    selectIsLoading,
    selectIsInitialized,
    selectAuthError,
    loginThunk,
    logoutThunk,
    registerThunk,
    clearAuth,
    setError,
} from '@/stores/auth';
import type { LoginDto, RegisterDto } from '@acw/types';

export function useAuth() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const user = useAppSelector(selectUser);
    const accessToken = useAppSelector(selectAccessToken);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const isLoading = useAppSelector(selectIsLoading);
    const isInitialized = useAppSelector(selectIsInitialized);
    const error = useAppSelector(selectAuthError);

    const login = useCallback(
        async (credentials: LoginDto) => {
            const result = await dispatch(loginThunk(credentials));
            return loginThunk.fulfilled.match(result);
        },
        [dispatch],
    );

    const register = useCallback(
        async (data: RegisterDto) => {
            const result = await dispatch(registerThunk(data));
            return registerThunk.fulfilled.match(result);
        },
        [dispatch],
    );

    const logout = useCallback(async () => {
        await dispatch(logoutThunk());
        router.push('/auth/login');
    }, [dispatch, router]);

    const clearError = useCallback(() => {
        dispatch(setError(null));
    }, [dispatch]);

    const reset = useCallback(() => {
        dispatch(clearAuth());
    }, [dispatch]);

    return {
        user,
        accessToken,
        isAuthenticated,
        isLoading,
        isInitialized,
        error,
        login,
        register,
        logout,
        clearError,
        reset,
    };
}
