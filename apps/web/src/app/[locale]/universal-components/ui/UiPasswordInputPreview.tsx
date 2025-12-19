'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import UiPasswordInput from '@/shared/ui/UiPasswordInput/UiPasswordInput';

export default function UiPasswordInputPreview() {
    const [password, setPassword] = useState('');
    const t = useTranslations('previews.password');

    return (
        <UiPasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('placeholder')}
            variant="filled"
            size="md"
        />
    );
}
