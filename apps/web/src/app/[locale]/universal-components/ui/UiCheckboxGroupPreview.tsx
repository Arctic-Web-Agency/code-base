'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import UiCheckboxGroup from '@/shared/ui/UiCheckboxGroup/UiCheckboxGroup';
import UiCheckbox from '@/shared/ui/UiCheckbox/UiCheckbox';

export default function UiCheckboxGroupPreview() {
    const [selected, setSelected] = useState<string[]>([]);
    const t = useTranslations('previews.checkbox_group');

    const options = [
        { value: 'tech', label: t('options.technology'), id: 'tech-checkbox' },
        { value: 'design', label: t('options.design'), id: 'design-checkbox' },
        { value: 'marketing', label: t('options.marketing'), id: 'marketing-checkbox' },
    ];

    const allValues = options.map((opt) => opt.value);
    const isAllSelected = selected.length === options.length;
    const isIndeterminate = selected.length > 0 && selected.length < options.length;

    const handleMasterToggle = () => {
        if (isAllSelected) {
            setSelected([]);
        } else {
            setSelected(allValues);
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <UiCheckbox
                label={t('master_label')}
                checked={isAllSelected}
                indeterminate={isIndeterminate}
                onChange={handleMasterToggle}
                size="md"
            />
            <div className="ml-6 border-l-2 border-neutral-200 dark:border-neutral-700 pl-4">
                <UiCheckboxGroup
                    options={options}
                    value={selected}
                    onChange={setSelected}
                    label={t('label')}
                    size="md"
                />
            </div>
        </div>
    );
}
