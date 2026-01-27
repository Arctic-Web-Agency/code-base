import { InputHTMLAttributes, ReactNode } from 'react';

export type UiInputVariant = 'filled' | 'outlined';
export type UiInputSize = 'sm' | 'md' | 'lg';

/**
 * Base props for UiInput component
 */
export interface UiInputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
    variant?: UiInputVariant;
    size?: UiInputSize;
    error?: boolean;
    success?: boolean;
    label?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    helperText?: string;
    errorText?: string;
    successText?: string;
    showCharCount?: boolean;
    clearable?: boolean;
    onClear?: () => void;
    prefix?: string;
    suffix?: string;
}
