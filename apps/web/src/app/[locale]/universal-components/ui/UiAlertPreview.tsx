'use client';

import { alert } from '@/shared/ui/UiAlert';
import UiButton from '@/shared/ui/UiButton';
import { useTranslations } from 'next-intl';

export default function UiAlertPreview() {
    const t = useTranslations('previews.alert');

    const handleSuccess = () => {
        alert.success(t('success_message'), {
            title: t('success_title'),
            position: 'top-right',
        });
    };

    const handleError = () => {
        alert.error(t('error_message'), {
            title: t('error_title'),
            position: 'top-right',
        });
    };

    const handleWarning = () => {
        alert.warning(t('warning_message'), {
            title: t('warning_title'),
            actions: [
                {
                    label: t('action_confirm'),
                    onClick: () => {
                        alert.success(t('action_confirmed'));
                    },
                    variant: 'filled',
                },
                {
                    label: t('action_cancel'),
                    onClick: () => {},
                    variant: 'text',
                },
            ],
        });
    };

    const handleInfo = () => {
        alert.info(t('info_message'), {
            title: t('info_title'),
            position: 'top-right',
        });
    };

    const handlePromise = () => {
        const mockPromise = new Promise((resolve) => {
            setTimeout(() => resolve({ success: true }), 2000);
        });

        alert.promise(mockPromise, {
            loading: t('promise_loading'),
            success: t('promise_success'),
            error: t('promise_error'),
        });
    };

    return (
        <div className="flex flex-wrap gap-3">
            <UiButton size="sm" onClick={handleSuccess}>
                {t('button_success')}
            </UiButton>
            <UiButton size="sm" onClick={handleError}>
                {t('button_error')}
            </UiButton>
            <UiButton size="sm" onClick={handleWarning}>
                {t('button_warning')}
            </UiButton>
            <UiButton size="sm" onClick={handleInfo}>
                {t('button_info')}
            </UiButton>
            <UiButton size="sm" onClick={handlePromise}>
                {t('button_promise')}
            </UiButton>
        </div>
    );
}
