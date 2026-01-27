'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAppDispatch } from '@/stores/hooks';
import { setAuthFromCallback, fetchCurrentUserThunk } from '@/stores/auth';

export default function GoogleCallbackPage() {
    const t = useTranslations('auth.google');
    const tErrors = useTranslations('auth.errors');
    const searchParams = useSearchParams();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const accessToken = searchParams.get('accessToken');
    const error = searchParams.get('error');

    useEffect(() => {
        if (accessToken) {
            dispatch(setAuthFromCallback({ accessToken }));
            dispatch(fetchCurrentUserThunk()).then(() => {
                router.replace('/');
            });
        } else if (error) {
            // Stay on page to show error
        } else {
            router.replace('/auth/login');
        }
    }, [accessToken, error, dispatch, router]);

    if (error) {
        return (
            <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                    <svg
                        className="h-8 w-8 text-red-600 dark:text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </div>
                <h1 className="mb-2 text-xl font-semibold text-neutral-900 dark:text-white">
                    {t('error')}
                </h1>
                <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
                    {error === 'google_auth_failed'
                        ? tErrors('serverError')
                        : error}
                </p>
                <button
                    onClick={() => router.push('/auth/login')}
                    className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                    {t('backToLogin')}
                </button>
            </div>
        );
    }

    return (
        <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            <p className="text-neutral-600 dark:text-neutral-400">
                {t('processing')}
            </p>
        </div>
    );
}
