'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import UiCheckbox from '@/shared/ui/UiCheckbox/UiCheckbox';

export default function UiCheckboxPreview() {
    const [checked, setChecked] = useState(false);
    const t = useTranslations('previews.checkbox');

    return (
        <UiCheckbox
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            label={t('label')}
            size="md"
            id="universal-checkbox"
        />
    );
}
