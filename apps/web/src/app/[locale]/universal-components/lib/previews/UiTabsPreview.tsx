'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SunIcon, MoonIcon } from '@/shared/icons';
import UiTabs from '@/shared/ui/UiTabs';

export default function UiTabsPreview() {
    const t = useTranslations('universal_components_page.tabs_preview');
    const [controlledTab, setControlledTab] = useState('account');

    const tabs = [
        {
            label: t('account_tab.label'),
            value: 'account',
            content: (
                <div className="p-4">
                    <h3 className="text-lg font-medium">{t('account_tab.heading')}</h3>
                    <p className="mt-2 text-neutral-500">
                        {t('account_tab.description')}
                    </p>
                </div>
            ),
        },
        {
            label: t('notifications_tab.label'),
            value: 'notifications',
            content: (
                <div className="p-4">
                    <h3 className="text-lg font-medium">{t('notifications_tab.heading')}</h3>
                    <p className="mt-2 text-neutral-500">
                        {t('notifications_tab.description')}
                    </p>
                </div>
            ),
        },
        {
            label: t('security_tab.label'),
            value: 'security',
            disabled: true,
            content: (
                <div className="p-4">
                    <h3 className="text-lg font-medium">{t('security_tab.heading')}</h3>
                    <p className="mt-2 text-neutral-500">
                        {t('security_tab.description')}
                    </p>
                </div>
            ),
        },
    ];

    const tabsWithIcons = [
        { ...tabs[0], icon: <SunIcon className="w-5 h-5" /> },
        { ...tabs[1], icon: <MoonIcon className="w-5 h-5" /> },
        { ...tabs[2], icon: <SunIcon className="w-5 h-5" /> },
    ];

    return (
        <div className="flex flex-col gap-12">
            <section className="flex flex-col gap-4">
                <h3 className="text-lg font-medium">{t('variants.heading')}</h3>
                <p className="text-sm text-neutral-500 -mt-2">
                    {t('variants.description')}
                </p>
                <UiTabs items={tabs} />
                <UiTabs items={tabs} variant="underline" />
            </section>

            <section className="flex flex-col gap-4">
                <h3 className="text-lg font-medium">{t('sizes.heading')}</h3>
                <div className="flex flex-col gap-6">
                    <UiTabs items={tabs} size="sm" />
                    <UiTabs items={tabs} size="md" />
                    <UiTabs items={tabs} size="lg" />
                </div>
            </section>

            <section className="flex flex-col gap-4">
                <h3 className="text-lg font-medium">{t('full_width.heading')}</h3>
                <UiTabs items={tabs} fullWidth />
            </section>

            <section className="flex flex-col gap-4">
                <h3 className="text-lg font-medium">{t('with_icons.heading')}</h3>
                <UiTabs items={tabsWithIcons} />
            </section>

            <section className="flex flex-col gap-4">
                <h3 className="text-lg font-medium">{t('vertical_orientation.heading')}</h3>
                <UiTabs items={tabs} orientation="vertical" />
                <UiTabs items={tabsWithIcons} orientation="vertical" variant="underline" />
            </section>

            <section className="flex flex-col gap-4">
                <h3 className="text-lg font-medium">{t('composition_api.heading')}</h3>
                <UiTabs defaultValue="notifications">
                    <UiTabs.List>
                        <UiTabs.Tab value="account" icon={<SunIcon />}>
                            {t('account_tab.label')}
                        </UiTabs.Tab>
                        <UiTabs.Tab value="notifications" icon={<MoonIcon />}>
                            {t('notifications_tab.label')}
                        </UiTabs.Tab>
                        <UiTabs.Tab value="security" disabled>
                            {t('security_tab.label')}
                        </UiTabs.Tab>
                    </UiTabs.List>
                    <UiTabs.Panels>
                        <UiTabs.Panel value="account">
                            <h3 className="text-lg font-medium">{t('account_tab.heading')}</h3>
                            <p className="mt-2 text-neutral-500">
                                {t('account_tab.composition_description')}
                            </p>
                        </UiTabs.Panel>
                        <UiTabs.Panel value="notifications">
                            <h3 className="text-lg font-medium">{t('notifications_tab.heading')}</h3>
                            <p className="mt-2 text-neutral-500">
                                {t('notifications_tab.composition_description')}
                            </p>
                        </UiTabs.Panel>
                        <UiTabs.Panel value="security">
                            <h3 className="text-lg font-medium">{t('security_tab.heading')}</h3>
                        </UiTabs.Panel>
                    </UiTabs.Panels>
                </UiTabs>
            </section>

            <section className="flex flex-col gap-4">
                <h3 className="text-lg font-medium">{t('controlled_component.heading')}</h3>
                <p className="text-sm text-neutral-500 -mt-2">
                    {t('controlled_component.description')}
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200">{controlledTab}</span>
                </p>
                <UiTabs value={controlledTab} onChange={setControlledTab} items={tabs} />
            </section>

            <section className="flex flex-col gap-4">
                <h3 className="text-lg font-medium">{t('custom_styles.heading')}</h3>
                <UiTabs
                    defaultValue="account"
                    variant="underline"
                    classNames={{
                        list: 'bg-blue-50 dark:bg-blue-900/20 rounded-t-lg',
                        tab: 'data-[selected]:text-blue-600 dark:data-[selected]:text-blue-400',
                        panel: 'border border-blue-200 dark:border-blue-800 rounded-b-lg -mt-px',
                    }}
                >
                    <UiTabs.List>
                        <UiTabs.Tab value="account">{t('account_tab.label')}</UiTabs.Tab>
                        <UiTabs.Tab value="notifications">{t('notifications_tab.label')}</UiTabs.Tab>
                    </UiTabs.List>
                    <UiTabs.Panels>
                        <UiTabs.Panel value="account">
                           <p className="p-4">{t('custom_styles.panel_content_1')}</p>
                        </UiTabs.Panel>
                        <UiTabs.Panel value="notifications">
                            <p className="p-4">{t('custom_styles.panel_content_2')}</p>
                        </UiTabs.Panel>
                    </UiTabs.Panels>
                </UiTabs>
            </section>
        </div>
    );
}
