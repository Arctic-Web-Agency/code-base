'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import UiInput from '@/shared/ui/UiInput/UiInput';

export default function UiInputPreview() {
    const [value, setValue] = useState('');
    const t = useTranslations('previews.input');

    return (
        <UiInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={t('placeholder')}
            variant="filled"
            size="md"
        />
    );
}
