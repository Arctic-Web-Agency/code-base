'use client';

import { useState } from 'react';
import UiCheckboxGroup from '@/shared/ui/UiCheckboxGroup/UiCheckboxGroup';

export default function UiCheckboxGroupPreview() {
    const [selected, setSelected] = useState<string[]>([]);

    const options = [
        { value: 'tech', label: 'Technology', id: 'tech-checkbox' },
        { value: 'design', label: 'Design', id: 'design-checkbox' },
        { value: 'marketing', label: 'Marketing', id: 'marketing-checkbox' },
    ];

    return (
        <UiCheckboxGroup
            options={options}
            value={selected}
            onChange={setSelected}
            label="Select your interests"
            size="md"
        />
    );
}
