import { TextareaHTMLAttributes } from 'react';

export type UiTextareaVariant = 'filled' | 'outlined';
export type UiTextareaSize = 'sm' | 'md' | 'lg';
export type UiTextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

/**
 * Base props for UiTextarea component
 */
export interface UiTextareaProps
    extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
    variant?: UiTextareaVariant;
    size?: UiTextareaSize;
    resize?: UiTextareaResize;
    error?: boolean;
    success?: boolean;
    label?: string;
    helperText?: string;
    errorText?: string;
    successText?: string;
    showCharCount?: boolean;
}
