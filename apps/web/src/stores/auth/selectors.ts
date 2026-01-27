import { RootState } from '@/stores/store';

export const selectUser = (state: RootState) => state.auth.user;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectIsAuthenticated = (state: RootState) =>
    !!state.auth.user && !!state.auth.accessToken;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectIsInitialized = (state: RootState) => state.auth.isInitialized;
export const selectAuthError = (state: RootState) => state.auth.error;
