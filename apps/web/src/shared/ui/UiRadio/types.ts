import { InputHTMLAttributes } from 'react';

export type UiRadioSize = 'sm' | 'md' | 'lg';

/**
 * Base props for UiRadio component
 */
export interface UiRadioProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
    size?: UiRadioSize;
    error?: boolean;
    success?: boolean;
    label?: string;
    helperText?: string;
    errorText?: string;
    successText?: string;
}
