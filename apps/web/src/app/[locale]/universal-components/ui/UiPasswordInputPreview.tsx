'use client';

import { useState } from 'react';
import UiPasswordInput from '@/shared/ui/UiPasswordInput/UiPasswordInput';

export default function UiPasswordInputPreview() {
    const [password, setPassword] = useState('');

    return (
        <UiPasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password..."
            variant="filled"
            size="md"
        />
    );
}
