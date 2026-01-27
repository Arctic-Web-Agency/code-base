'use client';

import { useState } from 'react';
import UiSwitch from '@/shared/ui/UiSwitch/UiSwitch';

export default function UiSwitchPreview() {
    const [checked, setChecked] = useState(false);

    return (
        <UiSwitch
            checked={checked}
            onChange={setChecked}
            size="md"
        />
    );
}
