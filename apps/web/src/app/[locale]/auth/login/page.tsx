'use client';

import { useTranslations } from 'next-intl';
import { LoginForm, GoogleButton, AuthDivider } from '@/features/auth';

export default function LoginPage() {
    const t = useTranslations('auth.login');

    return (
        <>
            <h1 className="mb-8 text-center text-2xl font-bold text-neutral-900 dark:text-white">
                {t('title')}
            </h1>

            <GoogleButton className="mb-6" />

            <AuthDivider className="mb-6" />

            <LoginForm />
        </>
    );
}
