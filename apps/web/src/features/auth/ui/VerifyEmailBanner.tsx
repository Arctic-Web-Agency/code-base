'use client';

import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import UiButton from '@/shared/ui/UiButton';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { resendVerificationThunk, selectIsLoading } from '@/stores/auth';

interface VerifyEmailBannerProps {
    email: string;
    className?: string;
}

export const VerifyEmailBanner: FC<VerifyEmailBannerProps> = ({
    email,
    className = '',
}) => {
    const t = useTranslations('auth.verifyEmail');
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(selectIsLoading);
    const [resendSuccess, setResendSuccess] = useState(false);

    const handleResend = async () => {
        const result = await dispatch(resendVerificationThunk(email));
        if (resendVerificationThunk.fulfilled.match(result)) {
            setResendSuccess(true);
            setTimeout(() => setResendSuccess(false), 5000);
        }
    };

    return (
        <div
            className={`rounded-lg bg-blue-50 p-6 text-center dark:bg-blue-900/20 ${className}`}
        >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                <svg
                    className="h-8 w-8 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                </svg>
            </div>

            <h2 className="mb-2 text-xl font-semibold text-neutral-900 dark:text-white">
                {t('title')}
            </h2>

            <p className="mb-4 text-neutral-600 dark:text-neutral-400">
                {t('description', { email })}
            </p>

            {resendSuccess ? (
                <p className="text-sm text-green-600 dark:text-green-400">
                    {t('resent')}
                </p>
            ) : (
                <UiButton
                    variant="text"
                    size="sm"
                    onClick={handleResend}
                    disabled={isLoading}
                >
                    {isLoading ? '...' : t('resend')}
                </UiButton>
            )}
        </div>
    );
};
