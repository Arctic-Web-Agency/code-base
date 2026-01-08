'use client';

import { UiTooltip } from '@/shared/ui/UiTooltip';
import UiButton from '@/shared/ui/UiButton/UiButton';
import { InfoCircleIcon } from '@/shared/icons';
import { useTranslations } from 'next-intl';

export default function UiTooltipPreview() {
    const t = useTranslations('previews.tooltip');

    return (
        <div className="space-y-8">
            {/* Position Examples */}
            <div>
                <h3 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
                    {t('section_positions')}
                </h3>
                <div className="flex flex-wrap gap-3">
                    <UiTooltip content={t('position_top')} position="top">
                        <UiButton size="sm">
                            {t('button_top')}
                        </UiButton>
                    </UiTooltip>

                    <UiTooltip content={t('position_bottom')} position="bottom">
                        <UiButton size="sm">
                            {t('button_bottom')}
                        </UiButton>
                    </UiTooltip>

                    <UiTooltip content={t('position_left')} position="left">
                        <UiButton size="sm">
                            {t('button_left')}
                        </UiButton>
                    </UiTooltip>

                    <UiTooltip content={t('position_right')} position="right">
                        <UiButton size="sm">
                            {t('button_right')}
                        </UiButton>
                    </UiTooltip>
                </div>
            </div>

            {/* Trigger Examples */}
            <div>
                <h3 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
                    {t('section_triggers')}
                </h3>
                <div className="flex flex-wrap gap-3">
                    <UiTooltip content={t('trigger_hover')} trigger="hover">
                        <UiButton size="sm">
                            {t('button_hover')}
                        </UiButton>
                    </UiTooltip>

                    <UiTooltip content={t('trigger_focus')} trigger="focus">
                        <UiButton size="sm">
                            {t('button_focus')}
                        </UiButton>
                    </UiTooltip>

                    <UiTooltip content={t('trigger_click')} trigger="click">
                        <UiButton size="sm">
                            {t('button_click')}
                        </UiButton>
                    </UiTooltip>

                    <UiTooltip
                        content={t('trigger_multiple')}
                        trigger={['hover', 'focus']}
                    >
                        <UiButton size="sm">
                            {t('button_multiple')}
                        </UiButton>
                    </UiTooltip>
                </div>
            </div>

            {/* Delay Examples */}
            <div>
                <h3 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
                    {t('section_delays')}
                </h3>
                <div className="flex flex-wrap gap-3">
                    <UiTooltip
                        content={t('delay_instant')}
                        showDelay={0}
                    >
                        <UiButton size="sm">
                            {t('button_instant')}
                        </UiButton>
                    </UiTooltip>

                    <UiTooltip
                        content={t('delay_default')}
                        showDelay={200}
                    >
                        <UiButton size="sm">
                            {t('button_default')}
                        </UiButton>
                    </UiTooltip>

                    <UiTooltip
                        content={t('delay_slow')}
                        showDelay={1000}
                    >
                        <UiButton size="sm">
                            {t('button_slow')}
                        </UiButton>
                    </UiTooltip>
                </div>
            </div>

            {/* Arrow Examples */}
            <div>
                <h3 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
                    {t('section_arrow')}
                </h3>
                <div className="flex flex-wrap gap-3">
                    <UiTooltip content={t('arrow_with')} showArrow={true}>
                        <UiButton size="sm">
                            {t('button_with_arrow')}
                        </UiButton>
                    </UiTooltip>

                    <UiTooltip content={t('arrow_without')} showArrow={false}>
                        <UiButton size="sm">
                            {t('button_without_arrow')}
                        </UiButton>
                    </UiTooltip>
                </div>
            </div>

            {/* Rich Content */}
            <div>
                <h3 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
                    {t('section_rich_content')}
                </h3>
                <div className="flex flex-wrap gap-3">
                    <UiTooltip
                        content={
                            <div>
                                <strong>{t('rich_title')}</strong>
                                <p className="text-xs mt-1">
                                    {t('rich_description')}
                                </p>
                            </div>
                        }
                        maxWidth={250}
                    >
                        <UiButton size="sm">
                            {t('button_rich')}
                        </UiButton>
                    </UiTooltip>

                    <UiTooltip
                        content={t('icon_help')}
                        position="right"
                        trigger={['hover', 'focus']}
                    >
                        <InfoCircleIcon
                            className="w-6 h-6 text-neutral-500 cursor-help"
                            tabIndex={0}
                        />
                    </UiTooltip>
                </div>
            </div>

            {/* Custom Styling */}
            <div>
                <h3 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
                    {t('section_custom')}
                </h3>
                <div className="flex flex-wrap gap-3">
                    <UiTooltip
                        content={t('custom_blue')}
                        className="bg-blue-600 text-white font-semibold"
                    >
                        <UiButton size="sm">
                            {t('button_blue')}
                        </UiButton>
                    </UiTooltip>

                    <UiTooltip
                        content={t('custom_green')}
                        className="bg-green-600 text-white"
                        maxWidth={300}
                    >
                        <UiButton size="sm">
                            {t('button_green')}
                        </UiButton>
                    </UiTooltip>
                </div>
            </div>
        </div>
    );
}
