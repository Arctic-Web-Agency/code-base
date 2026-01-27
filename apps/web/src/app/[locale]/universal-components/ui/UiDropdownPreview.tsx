'use client';

import { useTranslations } from 'next-intl';
import UiDropdown from '@/shared/ui/UiDropdown';
import UiButton from '@/shared/ui/UiButton';
import { CheckCircleIcon, InfoCircleIcon, AlertCircleIcon, XCircleIcon } from '@/shared/icons';

export default function UiDropdownPreview() {
    const t = useTranslations('previews.dropdown');

    const iconClasses = 'h-4 w-4';

    const basicItems = [
        { key: 'view', label: t('items.view'), icon: <InfoCircleIcon className={iconClasses} /> },
        { key: 'approve', label: t('items.approve'), icon: <CheckCircleIcon className={iconClasses} /> },
        { key: 'warn', label: t('items.warn'), icon: <AlertCircleIcon className={iconClasses} />, divider: true },
        { key: 'delete', label: t('items.delete'), icon: <XCircleIcon className={iconClasses} />, danger: true },
    ];

    return (
        <div className="space-y-8">
            {/* Basic dropdown */}
            <section>
                <h3 className="text-lg font-semibold mb-4">
                    {t('basic')}
                </h3>
                <UiDropdown
                    trigger={<UiButton size="sm">{t('trigger')}</UiButton>}
                    items={basicItems}
                />
            </section>

            {/* Placements */}
            <section>
                <h3 className="text-lg font-semibold mb-4">
                    {t('placements')}
                </h3>
                <div className="flex flex-wrap gap-3">
                    <UiDropdown
                        trigger={<UiButton size="sm">{t('bottom_start')}</UiButton>}
                        items={basicItems}
                        placement="bottom-start"
                    />
                    <UiDropdown
                        trigger={<UiButton size="sm">{t('bottom_end')}</UiButton>}
                        items={basicItems}
                        placement="bottom-end"
                    />
                </div>
            </section>

            {/* Sizes */}
            <section>
                <h3 className="text-lg font-semibold mb-4">
                    {t('sizes')}
                </h3>
                <div className="flex flex-wrap gap-3 items-center">
                    <UiDropdown
                        trigger={<UiButton size="sm">{t('small')}</UiButton>}
                        items={basicItems}
                        size="sm"
                    />
                    <UiDropdown
                        trigger={<UiButton size="md">{t('medium')}</UiButton>}
                        items={basicItems}
                        size="md"
                    />
                    <UiDropdown
                        trigger={<UiButton size="lg">{t('large')}</UiButton>}
                        items={basicItems}
                        size="lg"
                    />
                </div>
            </section>
        </div>
    );
}
