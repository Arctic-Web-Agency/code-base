'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppSelector } from '@/stores/hooks';
import { selectIsAuthenticated, selectIsInitialized } from '@/stores/auth';

interface UseAuthGuardOptions {
    redirectTo?: string;
    requireAuth?: boolean;
}

export function useAuthGuard(options: UseAuthGuardOptions = {}) {
    const { redirectTo = '/auth/login', requireAuth = true } = options;

    const router = useRouter();
    const pathname = usePathname();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const isInitialized = useAppSelector(selectIsInitialized);

    useEffect(() => {
        if (!isInitialized) {
            return;
        }

        if (requireAuth && !isAuthenticated) {
            // Store intended destination for redirect after login
            const returnUrl = encodeURIComponent(pathname);
            router.replace(`${redirectTo}?returnUrl=${returnUrl}`);
        }

        if (!requireAuth && isAuthenticated) {
            router.replace('/');
        }
    }, [isAuthenticated, isInitialized, requireAuth, redirectTo, router, pathname]);

    return {
        isAuthenticated,
        isInitialized,
        isLoading: !isInitialized,
    };
}
