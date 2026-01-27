'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { VerifyEmailBanner } from '@/features/auth';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import {
    verifyEmailThunk,
    selectIsLoading,
    selectAuthError,
} from '@/stores/auth';

export default function VerifyEmailPage() {
    const t = useTranslations('auth.verifyEmail');
    const tErrors = useTranslations('auth.errors');
    const searchParams = useSearchParams();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(selectIsLoading);
    const authError = useAppSelector(selectAuthError);

    const token = searchParams.get('token');
    const email = searchParams.get('email');

    const [verificationAttempted, setVerificationAttempted] = useState(false);

    useEffect(() => {
        if (token && !verificationAttempted) {
            setVerificationAttempted(true);

            dispatch(verifyEmailThunk(token)).then((result) => {
                if (verifyEmailThunk.fulfilled.match(result)) {
                    router.replace('/');
                }
            });
        }
    }, [token, dispatch, router, verificationAttempted]);

    // If we have a token, show loading/verification state
    if (token) {
        if (isLoading) {
            return (
                <div className="text-center">
                    <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
                    <p className="text-neutral-600 dark:text-neutral-400">
                        {t('verifying')}
                    </p>
                </div>
            );
        }

        if (authError) {
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
                        {tErrors('invalidToken')}
                    </h1>
                    <button
                        onClick={() => router.push('/auth/login')}
                        className="mt-4 text-sm text-blue-600 hover:underline dark:text-blue-400"
                    >
                        {t('backToLogin')}
                    </button>
                </div>
            );
        }

        return (
            <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <svg
                        className="h-8 w-8 text-green-600 dark:text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
                <h1 className="mb-2 text-xl font-semibold text-neutral-900 dark:text-white">
                    {t('success')}
                </h1>
            </div>
        );
    }

    // If we have an email (from registration), show the banner
    if (email) {
        return <VerifyEmailBanner email={email} />;
    }

    // Default state - redirect to login
    router.replace('/auth/login');
    return null;
}
