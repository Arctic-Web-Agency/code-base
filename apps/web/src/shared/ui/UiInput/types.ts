import { InputHTMLAttributes, ReactNode } from 'react';

export type UiInputVariant = 'filled' | 'outlined';
export type UiInputSize = 'sm' | 'md' | 'lg';

/**
 * Base props for UiInput component
 */
export interface UiInputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    variant?: UiInputVariant;
    size?: UiInputSize;
    error?: boolean;
    label?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}
