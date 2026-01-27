'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function VerifyMagicLinkPage() {
    const t = useTranslations('auth.magicLink');
    const tErrors = useTranslations('auth.errors');
    const searchParams = useSearchParams();
    const router = useRouter();

    const error = searchParams.get('error');
    const accessToken = searchParams.get('accessToken');

    useEffect(() => {
        if (accessToken) {
            // Token is handled by AuthProvider via URL params
            router.replace('/');
        }
    }, [accessToken, router]);

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
                    {tErrors('invalidToken')}
                </h1>
                <button
                    onClick={() => router.push('/auth/magic-link')}
                    className="mt-4 text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                    {t('tryAgain')}
                </button>
            </div>
        );
    }

    return (
        <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            <p className="text-neutral-600 dark:text-neutral-400">
                {t('verifying')}
            </p>
        </div>
    );
}
