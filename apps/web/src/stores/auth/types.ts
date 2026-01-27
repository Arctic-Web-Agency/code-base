import type { User } from '@acw/types';

export interface AuthState {
    user: User | null;
    accessToken: string | null;
    isLoading: boolean;
    isInitialized: boolean;
    error: string | null;
}
