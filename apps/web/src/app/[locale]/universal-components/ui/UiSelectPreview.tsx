'use client';

import { useState } from 'react';
import UiSelect from '@/shared/ui/UiSelect';
import type { UiSelectOption } from '@/shared/ui/UiSelect';

interface UiSelectPreviewProps {
    options: UiSelectOption[];
}

export default function UiSelectPreview({ options }: UiSelectPreviewProps) {
    const [value, setValue] = useState(options[0]?.value || '');

    return (
        <UiSelect
            options={options}
            value={value}
            onChange={setValue}
            variant="filled"
            size="md"
        />
    );
}
