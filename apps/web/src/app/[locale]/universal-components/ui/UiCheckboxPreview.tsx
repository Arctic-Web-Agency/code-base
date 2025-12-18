'use client';

import { useState } from 'react';
import UiCheckbox from '@/shared/ui/UiCheckbox/UiCheckbox';

export default function UiCheckboxPreview() {
    const [checked, setChecked] = useState(false);

    return (
        <UiCheckbox
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            label="Subscribe to newsletter"
            size="md"
        />
    );
}
