'use client';

import { useTranslations } from 'next-intl';
import { MagicLinkForm } from '@/features/auth';

export default function MagicLinkPage() {
    const t = useTranslations('auth.magicLink');

    return (
        <>
            <h1 className="mb-8 text-center text-2xl font-bold text-neutral-900 dark:text-white">
                {t('title')}
            </h1>

            <MagicLinkForm />
        </>
    );
}
