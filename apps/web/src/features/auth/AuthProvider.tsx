'use client';

import { FC, PropsWithChildren, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import {
    refreshTokenThunk,
    fetchCurrentUserThunk,
    setInitialized,
    selectIsInitialized,
    selectAccessToken,
    setAuthFromCallback,
} from '@/stores/auth';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const dispatch = useAppDispatch();
    const isInitialized = useAppSelector(selectIsInitialized);
    const accessToken = useAppSelector(selectAccessToken);

    useEffect(() => {
        const initAuth = async () => {
            // Check for token from OAuth callback in URL
            const params = new URLSearchParams(window.location.search);
            const callbackToken = params.get('accessToken');

            if (callbackToken) {
                dispatch(setAuthFromCallback({ accessToken: callbackToken }));
                // Clean up URL
                window.history.replaceState({}, '', window.location.pathname);
                // Fetch user data
                await dispatch(fetchCurrentUserThunk());
                dispatch(setInitialized());
                return;
            }

            // Try to restore session from refresh token
            try {
                const refreshResult = await dispatch(refreshTokenThunk());

                if (refreshTokenThunk.fulfilled.match(refreshResult)) {
                    await dispatch(fetchCurrentUserThunk());
                }
            } catch {
                // Session restoration failed, user needs to login
            }

            dispatch(setInitialized());
        };

        if (!isInitialized) {
            initAuth();
        }
    }, [dispatch, isInitialized]);

    // Set up token refresh interval
    useEffect(() => {
        if (!accessToken) {
            return;
        }

        // Refresh token 1 minute before expiry (assuming 15 min expiry)
        const refreshInterval = setInterval(
            async () => {
                try {
                    await dispatch(refreshTokenThunk());
                } catch {
                    // Token refresh failed, will be handled on next API call
                }
            },
            14 * 60 * 1000, // 14 minutes
        );

        return () => clearInterval(refreshInterval);
    }, [accessToken, dispatch]);

    return <>{children}</>;
};
