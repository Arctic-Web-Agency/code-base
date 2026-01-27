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
import { registerThunk, selectIsLoading, selectAuthError } from '@/stores/auth';

interface RegisterFormProps {
    className?: string;
    onSuccess?: () => void;
}

export const RegisterForm: FC<RegisterFormProps> = ({
    className = '',
    onSuccess,
}) => {
    const t = useTranslations('auth.register');
    const tErrors = useTranslations('auth.errors');
    const dispatch = useAppDispatch();
    const router = useRouter();
    const isLoading = useAppSelector(selectIsLoading);
    const authError = useAppSelector(selectAuthError);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);

    const validatePassword = () => {
        if (password !== confirmPassword) {
            setValidationError(t('passwordMismatch'));
            return false;
        }
        if (password.length < 8) {
            setValidationError(t('passwordTooShort'));
            return false;
        }
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            setValidationError(t('passwordRequirements'));
            return false;
        }
        setValidationError(null);
        return true;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validatePassword()) {
            return;
        }

        if (!termsAccepted) {
            setValidationError(t('termsRequired'));
            return;
        }

        const result = await dispatch(
            registerThunk({
                email,
                password,
                name: name || undefined,
            }),
        );

        if (registerThunk.fulfilled.match(result)) {
            if (onSuccess) {
                onSuccess();
            } else {
                router.push(`/auth/verify-email?email=${encodeURIComponent(email)}`);
            }
        }
    };

    const getErrorMessage = (error: string) => {
        if (error.includes('already exists')) {
            return tErrors('emailExists');
        }
        return tErrors('serverError');
    };

    const displayError = validationError || (authError ? getErrorMessage(authError) : null);

    return (
        <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
            {displayError && (
                <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                    {displayError}
                </div>
            )}

            <UiInput
                id="name"
                type="text"
                label={t('name')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                variant="outlined"
            />

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
                onChange={(e) => {
                    setPassword(e.target.value);
                    setValidationError(null);
                }}
                required
                disabled={isLoading}
                variant="outlined"
                helperText={t('passwordHint')}
            />

            <UiPasswordInput
                id="confirmPassword"
                label={t('confirmPassword')}
                value={confirmPassword}
                onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setValidationError(null);
                }}
                required
                disabled={isLoading}
                variant="outlined"
            />

            <UiCheckbox
                id="terms"
                label={t('terms')}
                checked={termsAccepted}
                onChange={(e) => {
                    setTermsAccepted(e.target.checked);
                    setValidationError(null);
                }}
                size="sm"
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
                {t('hasAccount')}{' '}
                <Link
                    href="/auth/login"
                    className="text-blue-600 hover:underline dark:text-blue-400"
                >
                    {t('login')}
                </Link>
            </p>
        </form>
    );
};
