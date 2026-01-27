'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import UiAccordion from '@/shared/ui/UiAccordion';

export default function UiAccordionPreview() {
    const t = useTranslations('universal_components_page.accordion_preview');

    const [controlledValue, setControlledValue] = useState<string>('item-1');
    const [multipleValues, setMultipleValues] = useState<string[]>([
        'item-1',
        'item-2',
    ]);

    const basicItems = [
        {
            value: 'item-1',
            trigger: t('items.item1.trigger'),
            content: t('items.item1.content'),
        },
        {
            value: 'item-2',
            trigger: t('items.item2.trigger'),
            content: t('items.item2.content'),
        },
        {
            value: 'item-3',
            trigger: t('items.item3.trigger'),
            content: t('items.item3.content'),
            disabled: true,
        },
    ];

    return (
        <div className="flex flex-col gap-12">
            <section className="flex flex-col gap-4">
                <h3 className="text-lg font-medium">{t('basic.heading')}</h3>
                <p className="text-sm text-neutral-500 -mt-2">
                    {t('basic.description')}
                </p>
                <UiAccordion items={basicItems} defaultValue="item-1" />
            </section>

            <section className="flex flex-col gap-4">
                <h3 className="text-lg font-medium">{t('multiple.heading')}</h3>
                <p className="text-sm text-neutral-500 -mt-2">
                    {t('multiple.description')}
                </p>
                <UiAccordion
                    items={basicItems}
                    multiple
                    value={multipleValues}
                    onChange={(value) => setMultipleValues(value as string[])}
                />
            </section>

            <section className="flex flex-col gap-4">
                <h3 className="text-lg font-medium">{t('sizes.heading')}</h3>
                <div className="flex flex-col gap-6">
                    <div>
                        <p className="text-sm text-neutral-500 mb-2">Small</p>
                        <UiAccordion
                            items={basicItems.slice(0, 2)}
                            size="sm"
                            defaultValue="item-1"
                        />
                    </div>
                    <div>
                        <p className="text-sm text-neutral-500 mb-2">Medium</p>
                        <UiAccordion
                            items={basicItems.slice(0, 2)}
                            size="md"
                            defaultValue="item-1"
                        />
                    </div>
                    <div>
                        <p className="text-sm text-neutral-500 mb-2">Large</p>
                        <UiAccordion
                            items={basicItems.slice(0, 2)}
                            size="lg"
                            defaultValue="item-1"
                        />
                    </div>
                </div>
            </section>

            <section className="flex flex-col gap-4">
                <h3 className="text-lg font-medium">
                    {t('non_collapsible.heading')}
                </h3>
                <p className="text-sm text-neutral-500 -mt-2">
                    {t('non_collapsible.description')}
                </p>
                <UiAccordion
                    items={basicItems.slice(0, 2)}
                    collapsible={false}
                    value={controlledValue}
                    onChange={(value) => setControlledValue(value as string)}
                />
            </section>

            <section className="flex flex-col gap-4">
                <h3 className="text-lg font-medium">
                    {t('custom_styles.heading')}
                </h3>
                <UiAccordion
                    items={basicItems.slice(0, 2)}
                    defaultValue="item-1"
                    classNames={{
                        item: 'border-blue-200 dark:border-blue-800',
                        trigger:
                            'bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30',
                        content: 'bg-blue-50/50 dark:bg-blue-900/10',
                        icon: 'text-blue-600 dark:text-blue-400',
                    }}
                    className="border-t-blue-200 dark:border-t-blue-800"
                />
            </section>
        </div>
    );
}
