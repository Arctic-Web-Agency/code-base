'use client';

import { FC, FormEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import UiInput from '@/shared/ui/UiInput';
import UiButton from '@/shared/ui/UiButton';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import {
    requestMagicLinkThunk,
    selectIsLoading,
    selectAuthError,
} from '@/stores/auth';

interface MagicLinkFormProps {
    className?: string;
}

export const MagicLinkForm: FC<MagicLinkFormProps> = ({ className = '' }) => {
    const t = useTranslations('auth.magicLink');
    const tErrors = useTranslations('auth.errors');
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(selectIsLoading);
    const authError = useAppSelector(selectAuthError);

    const [email, setEmail] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const result = await dispatch(requestMagicLinkThunk(email));

        if (requestMagicLinkThunk.fulfilled.match(result)) {
            setIsSuccess(true);
        }
    };

    if (isSuccess) {
        return (
            <div className={`text-center ${className}`}>
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
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                    </svg>
                </div>
                <h2 className="mb-2 text-xl font-semibold text-neutral-900 dark:text-white">
                    {t('checkEmail')}
                </h2>
                <p className="mb-6 text-neutral-600 dark:text-neutral-400">
                    {t('sent', { email })}
                </p>
                <Link
                    href="/auth/login"
                    className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                    {t('backToLogin')}
                </Link>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
            <p className="text-center text-neutral-600 dark:text-neutral-400">
                {t('description')}
            </p>

            {authError && (
                <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                    {tErrors('serverError')}
                </div>
            )}

            <UiInput
                id="email"
                type="email"
                label={t('email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                variant="outlined"
            />

            <UiButton
                type="submit"
                variant="filled"
                size="lg"
                className="w-full"
                disabled={isLoading}
            >
                {isLoading ? '...' : t('submit')}
            </UiButton>

            <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
                <Link
                    href="/auth/login"
                    className="text-blue-600 hover:underline dark:text-blue-400"
                >
                    {t('backToLogin')}
                </Link>
            </p>
        </form>
    );
};
