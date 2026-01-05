'use client';

import { useState } from 'react';
import UiBadge from '@/shared/ui/UiBadge';
import { useTranslations } from 'next-intl';

export default function UiBadgePreview() {
    const t = useTranslations('previews.badge');
    const [dismissibleStates, setDismissibleStates] = useState({
        success: true,
        error: true,
        warning: true,
    });

    const handleDismiss = (status: 'success' | 'error' | 'warning') => {
        setDismissibleStates((prev) => ({ ...prev, [status]: false }));
    };

    const resetDismissible = () => {
        setDismissibleStates({
            success: true,
            error: true,
            warning: true,
        });
    };

    return (
        <div className="space-y-8">
            {/* Status variants */}
            <section>
                <h3 className="text-lg font-semibold mb-4">
                    {t('status_variants')}
                </h3>
                <div className="flex flex-wrap gap-3">
                    <UiBadge status="success">Success</UiBadge>
                    <UiBadge status="error">Error</UiBadge>
                    <UiBadge status="warning">Warning</UiBadge>
                </div>
            </section>

            {/* Visual variants */}
            <section>
                <h3 className="text-lg font-semibold mb-4">
                    {t('visual_variants')}
                </h3>
                <div className="space-y-3">
                    <div className="flex flex-wrap gap-3 items-center">
                        <span className="w-20 text-sm">Outline:</span>
                        <UiBadge status="success" variant="outline">
                            Success
                        </UiBadge>
                        <UiBadge status="error" variant="outline">
                            Error
                        </UiBadge>
                        <UiBadge status="warning" variant="outline">
                            Warning
                        </UiBadge>
                    </div>
                    <div className="flex flex-wrap gap-3 items-center">
                        <span className="w-20 text-sm">Subtle:</span>
                        <UiBadge status="success" variant="subtle">
                            Success
                        </UiBadge>
                        <UiBadge status="error" variant="subtle">
                            Error
                        </UiBadge>
                        <UiBadge status="warning" variant="subtle">
                            Warning
                        </UiBadge>
                    </div>
                </div>
            </section>

            {/* Size variants */}
            <section>
                <h3 className="text-lg font-semibold mb-4">
                    {t('size_variants')}
                </h3>
                <div className="flex flex-wrap gap-3 items-center">
                    <UiBadge status="success" size="sm">
                        Small
                    </UiBadge>
                    <UiBadge status="success" size="md">
                        Medium
                    </UiBadge>
                    <UiBadge status="success" size="lg">
                        Large
                    </UiBadge>
                </div>
            </section>

            {/* With dot indicator */}
            <section>
                <h3 className="text-lg font-semibold mb-4">
                    {t('with_dot')}
                </h3>
                <div className="flex flex-wrap gap-3">
                    <UiBadge status="success" dot>
                        Active
                    </UiBadge>
                    <UiBadge status="error" dot>
                        Failed
                    </UiBadge>
                    <UiBadge status="warning" dot>
                        Pending
                    </UiBadge>
                </div>
            </section>

            {/* With icon */}
            <section>
                <h3 className="text-lg font-semibold mb-4">
                    {t('with_icon')}
                </h3>
                <div className="flex flex-wrap gap-3">
                    <UiBadge
                        status="success"
                        icon={
                            <svg
                                className="w-3 h-3"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        }
                    >
                        Completed
                    </UiBadge>
                    <UiBadge
                        status="error"
                        icon={
                            <svg
                                className="w-3 h-3"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        }
                    >
                        Failed
                    </UiBadge>
                    <UiBadge
                        status="warning"
                        icon={
                            <svg
                                className="w-3 h-3"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        }
                    >
                        Alert
                    </UiBadge>
                </div>
            </section>

            {/* Dismissible */}
            <section>
                <h3 className="text-lg font-semibold mb-4">
                    {t('dismissible')}
                </h3>
                <div className="flex flex-wrap gap-3 items-center">
                    {dismissibleStates.success && (
                        <UiBadge
                            status="success"
                            dismissible
                            onDismiss={() => handleDismiss('success')}
                        >
                            Dismissible Success
                        </UiBadge>
                    )}
                    {dismissibleStates.error && (
                        <UiBadge
                            status="error"
                            dismissible
                            onDismiss={() => handleDismiss('error')}
                        >
                            Dismissible Error
                        </UiBadge>
                    )}
                    {dismissibleStates.warning && (
                        <UiBadge
                            status="warning"
                            dismissible
                            onDismiss={() => handleDismiss('warning')}
                        >
                            Dismissible Warning
                        </UiBadge>
                    )}
                    {(!dismissibleStates.success ||
                        !dismissibleStates.error ||
                        !dismissibleStates.warning) && (
                        <button
                            onClick={resetDismissible}
                            className="text-sm text-blue-600 dark:text-blue-400 underline"
                        >
                            {t('reset')}
                        </button>
                    )}
                </div>
            </section>
        </div>
    );
}
