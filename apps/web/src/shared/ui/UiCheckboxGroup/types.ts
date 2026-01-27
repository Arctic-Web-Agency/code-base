import type { UiCheckboxSize } from '../UiCheckbox/types';

export type UiCheckboxGroupOrientation = 'vertical' | 'horizontal';

export interface UiCheckboxOption {
    value: string;
    label: string;
    id?: string;
    disabled?: boolean;
    helperText?: string;
    errorText?: string;
    successText?: string;
    className?: string;
    indeterminate?: boolean;
}

/**
 * Base props for UiCheckboxGroup component
 */
export interface UiCheckboxGroupProps {
    options: UiCheckboxOption[];
    value: string[];
    onChange: (value: string[]) => void;
    size?: UiCheckboxSize;
    orientation?: UiCheckboxGroupOrientation;
    error?: boolean;
    success?: boolean;
    label?: string;
    helperText?: string;
    errorText?: string;
    successText?: string;
    required?: boolean;
    disabled?: boolean;
    name?: string;
}
