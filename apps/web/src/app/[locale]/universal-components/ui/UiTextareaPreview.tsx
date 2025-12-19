'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import UiTextarea from '@/shared/ui/UiTextarea/UiTextarea';

export default function UiTextareaPreview() {
    const [value, setValue] = useState('');
    const t = useTranslations('previews.textarea');

    return (
        <UiTextarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={t('placeholder')}
            variant="filled"
            size="md"
            rows={4}
        />
    );
}
