'use client';

import UiTooltip from '@/shared/ui/UiTooltip';
import UiButton from '@/shared/ui/UiButton';
import { useTranslations } from 'next-intl';

export default function UiTooltipPreview() {
    const t = useTranslations('previews.tooltip');

    return (
        <div className="space-y-8">
            {/* Positions */}
            <section>
                <h3 className="text-lg font-semibold mb-4">
                    {t('positions')}
                </h3>
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
            </section>

            {/* Size variants */}
            <section>
                <h3 className="text-lg font-semibold mb-4">
                    {t('size_variants')}
                </h3>
                <div className="flex flex-wrap gap-3 items-center">
                    <UiTooltip content={t('small_hint')} size="sm">
                        <UiButton size="sm">{t('button_small')}</UiButton>
                    </UiTooltip>

                    <UiTooltip content={t('medium_hint')} size="md">
                        <UiButton size="md">{t('button_medium')}</UiButton>
                    </UiTooltip>

                    <UiTooltip content={t('large_hint')} size="lg">
                        <UiButton size="lg">{t('button_large')}</UiButton>
                    </UiTooltip>
                </div>
            </section>

            {/* Visual variants */}
            <section>
                <h3 className="text-lg font-semibold mb-4">
                    {t('visual_variants')}
                </h3>
                <div className="flex flex-wrap gap-3">
                    <UiTooltip content={t('dark_tooltip')} variant="dark">
                        <UiButton size="sm">{t('button_dark')}</UiButton>
                    </UiTooltip>

                    <UiTooltip content={t('light_tooltip')} variant="light">
                        <UiButton size="sm">{t('button_light')}</UiButton>
                    </UiTooltip>

                    <UiTooltip content={t('neutral_tooltip')} variant="neutral">
                        <UiButton size="sm">{t('button_neutral')}</UiButton>
                    </UiTooltip>
                </div>
            </section>

            {/* Alignment */}
            <section>
                <h3 className="text-lg font-semibold mb-4">
                    {t('alignment')}
                </h3>
                <div className="flex flex-wrap gap-3">
                    <UiTooltip content={t('align_start')} side="bottom" align="start">
                        <UiButton size="sm">{t('button_start')}</UiButton>
                    </UiTooltip>

                    <UiTooltip content={t('align_center')} side="bottom" align="center">
                        <UiButton size="sm">{t('button_center')}</UiButton>
                    </UiTooltip>

                    <UiTooltip content={t('align_end')} side="bottom" align="end">
                        <UiButton size="sm">{t('button_end')}</UiButton>
                    </UiTooltip>
                </div>
            </section>

            {/* Without arrow */}
            <section>
                <h3 className="text-lg font-semibold mb-4">
                    {t('without_arrow')}
                </h3>
                <div className="flex flex-wrap gap-3">
                    <UiTooltip content={t('no_arrow_hint')} showArrow={false}>
                        <UiButton size="sm">{t('button_no_arrow')}</UiButton>
                    </UiTooltip>
                </div>
            </section>

            {/* Long content */}
            <section>
                <h3 className="text-lg font-semibold mb-4">
                    {t('long_content')}
                </h3>
                <div className="flex flex-wrap gap-3">
                    <UiTooltip content={t('long_text')} maxWidth={250}>
                        <UiButton size="sm">{t('button_long')}</UiButton>
                    </UiTooltip>

                    <UiTooltip content={t('very_long_text')} maxWidth={400}>
                        <UiButton size="sm">{t('button_very_long')}</UiButton>
                    </UiTooltip>
                </div>
            </section>

            {/* Disabled state */}
            <section>
                <h3 className="text-lg font-semibold mb-4">
                    {t('disabled_state')}
                </h3>
                <div className="flex flex-wrap gap-3">
                    <UiTooltip content={t('wont_show')} disabled>
                        <UiButton size="sm">{t('button_disabled')}</UiButton>
                    </UiTooltip>
                </div>
            </section>
        </div>
    );
}
