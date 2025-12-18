'use client';

import { useState } from 'react';
import UiTextarea from '@/shared/ui/UiTextarea/UiTextarea';

export default function UiTextareaPreview() {
    const [value, setValue] = useState('');

    return (
        <UiTextarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter your message..."
            variant="filled"
            size="md"
            rows={4}
        />
    );
}
