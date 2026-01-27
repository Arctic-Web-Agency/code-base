import { InputHTMLAttributes } from 'react';

export type UiCheckboxSize = 'sm' | 'md' | 'lg';

/**
 * Base props for UiCheckbox component
 */
export interface UiCheckboxProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
    size?: UiCheckboxSize;
    error?: boolean;
    success?: boolean;
    label?: string;
    helperText?: string;
    errorText?: string;
    successText?: string;
    indeterminate?: boolean;
}
