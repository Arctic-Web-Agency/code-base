'use client';

import { FC, FormEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import UiInput from '@/shared/ui/UiInput';
import UiPasswordInput from '@/shared/ui/UiPasswordInput';
import UiButton from '@/shared/ui/UiButton';
import UiCheckbox from '@/shared/ui/UiCheckbox';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { loginThunk, selectIsLoading, selectAuthError } from '@/stores/auth';

interface LoginFormProps {
    className?: string;
    onSuccess?: () => void;
}

export const LoginForm: FC<LoginFormProps> = ({ className = '', onSuccess }) => {
    const t = useTranslations('auth.login');
    const tErrors = useTranslations('auth.errors');
    const dispatch = useAppDispatch();
    const router = useRouter();
    const isLoading = useAppSelector(selectIsLoading);
    const authError = useAppSelector(selectAuthError);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const result = await dispatch(loginThunk({ email, password }));

        if (loginThunk.fulfilled.match(result)) {
            if (onSuccess) {
                onSuccess();
            } else {
                router.push('/');
            }
        }
    };

    const getErrorMessage = (error: string) => {
        if (error.includes('Invalid credentials')) {
            return tErrors('invalidCredentials');
        }
        if (error.includes('verify your email')) {
            return tErrors('emailNotVerified');
        }
        return tErrors('serverError');
    };

    return (
        <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
            {authError && (
                <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                    {getErrorMessage(authError)}
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

            <UiPasswordInput
                id="password"
                label={t('password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                variant="outlined"
            />

            <div className="flex items-center justify-between">
                <UiCheckbox
                    id="remember"
                    label={t('rememberMe')}
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    size="sm"
                />
                <Link
                    href="/auth/magic-link"
                    className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                    {t('useMagicLink')}
                </Link>
            </div>

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
                {t('noAccount')}{' '}
                <Link
                    href="/auth/register"
                    className="text-blue-600 hover:underline dark:text-blue-400"
                >
                    {t('register')}
                </Link>
            </p>
        </form>
    );
};
