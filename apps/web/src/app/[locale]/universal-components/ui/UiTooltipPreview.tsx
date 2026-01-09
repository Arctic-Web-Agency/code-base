'use client';

import UiTooltip from '@/shared/ui/UiTooltip';
import UiButton from '@/shared/ui/UiButton';
import { useTranslations } from 'next-intl';

export default function UiTooltipPreview() {
    const t = useTranslations('previews.tooltip');

    return (
        <div className="flex flex-wrap gap-3">
            <UiTooltip content={t('top')} side="top">
                <UiButton size="sm">{t('button_top')}</UiButton>
            </UiTooltip>

            <UiTooltip content={t('bottom')} side="bottom">
                <UiButton size="sm">{t('button_bottom')}</UiButton>
            </UiTooltip>

            <UiTooltip content={t('left')} side="left">
                <UiButton size="sm">{t('button_left')}</UiButton>
            </UiTooltip>

            <UiTooltip content={t('right')} side="right">
                <UiButton size="sm">{t('button_right')}</UiButton>
            </UiTooltip>
        </div>
    );
}
