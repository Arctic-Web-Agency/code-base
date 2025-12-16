'use client';

import { useState } from 'react';
import UiInput from '@/shared/ui/UiInput/UiInput';

export default function UiInputPreview() {
    const [value, setValue] = useState('');

    return (
        <UiInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter text..."
            variant="filled"
            size="md"
        />
    );
}
