'use client';

import { useState } from 'react';
import UiRadioGroup from '@/shared/ui/UiRadioGroup';
import { useTranslations } from 'next-intl';

export default function UiRadioGroupPreview() {
    const t = useTranslations('previews.radio_group');
    const [selected, setSelected] = useState('option1');

    return (
        <UiRadioGroup
            label={t('label')}
            value={selected}
            onChange={setSelected}
            options={[
                { value: 'option1', label: t('options.option1') },
                { value: 'option2', label: t('options.option2') },
                { value: 'option3', label: t('options.option3') },
            ]}
            name="radio-group-preview"
            size="md"
        />
    );
}
