'use client';

import { useTranslations } from 'next-intl';
import { UserIcon, BellIcon, LockIcon } from '@/shared/icons';
import UiTabs from '@/shared/ui/UiTabs';

export default function UiTabsPreview() {
    const t = useTranslations('universal_components_page.tabs_preview');

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
        { ...tabs[0], icon: <UserIcon className="w-5 h-5" /> },
        { ...tabs[1], icon: <BellIcon className="w-5 h-5" /> },
        { ...tabs[2], icon: <LockIcon className="w-5 h-5" /> },
    ];

    const sizeTabs = {
        sm: [
            {
                label: t('size_tabs.first'),
                value: 'first',
                content: <p className="p-3 text-neutral-500">{t('size_tabs.sm_description')}</p>,
            },
            {
                label: t('size_tabs.second'),
                value: 'second',
                content: <p className="p-3 text-neutral-500">{t('size_tabs.content_placeholder')}</p>,
            },
        ],
        md: [
            {
                label: t('size_tabs.first'),
                value: 'first',
                content: <p className="p-4 text-neutral-500">{t('size_tabs.md_description')}</p>,
            },
            {
                label: t('size_tabs.second'),
                value: 'second',
                content: <p className="p-4 text-neutral-500">{t('size_tabs.content_placeholder')}</p>,
            },
        ],
        lg: [
            {
                label: t('size_tabs.first'),
                value: 'first',
                content: <p className="p-5 text-neutral-500">{t('size_tabs.lg_description')}</p>,
            },
            {
                label: t('size_tabs.second'),
                value: 'second',
                content: <p className="p-5 text-neutral-500">{t('size_tabs.content_placeholder')}</p>,
            },
        ],
        fullWidth: [
            {
                label: t('size_tabs.first'),
                value: 'first',
                content: <p className="p-4 text-neutral-500">{t('size_tabs.full_width_description')}</p>,
            },
            {
                label: t('size_tabs.second'),
                value: 'second',
                content: <p className="p-4 text-neutral-500">{t('size_tabs.content_placeholder')}</p>,
            },
        ],
    };

    return (
        <div className="flex flex-col gap-12">
            <section className="flex flex-col gap-4">
                <h3 className="text-lg font-medium">{t('variants.heading')}</h3>
                <p className="text-sm text-neutral-500 -mt-2">
                    {t('variants.description')}
                </p>
                <UiTabs items={tabsWithIcons} />
                <UiTabs items={tabsWithIcons} variant="underline" />
            </section>

            <section className="flex flex-col gap-4">
                <h3 className="text-lg font-medium">{t('sizes.heading')}</h3>
                <div className="flex flex-col gap-6">
                    <UiTabs items={sizeTabs.sm} size="sm" />
                    <UiTabs items={sizeTabs.md} size="md" />
                    <UiTabs items={sizeTabs.lg} size="lg" />
                    <UiTabs items={sizeTabs.fullWidth} fullWidth />
                </div>
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
                        <UiTabs.Tab value="account" icon={<UserIcon />}>
                            {t('account_tab.label')}
                        </UiTabs.Tab>
                        <UiTabs.Tab value="notifications" icon={<BellIcon />}>
                            {t('notifications_tab.label')}
                        </UiTabs.Tab>
                        <UiTabs.Tab value="security" icon={<LockIcon />} disabled>
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
