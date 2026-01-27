'use client';

import { FC } from 'react';
import { useTranslations } from 'next-intl';

interface AuthDividerProps {
    className?: string;
}

export const AuthDivider: FC<AuthDividerProps> = ({ className = '' }) => {
    const t = useTranslations('auth.divider');

    return (
        <div className={`flex items-center gap-4 ${className}`}>
            <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700" />
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
                {t('or')}
            </span>
            <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700" />
        </div>
    );
};
