import type { UiRadioSize } from '../UiRadio/types';

export type UiRadioGroupOrientation = 'vertical' | 'horizontal';

export interface UiRadioOption {
    value: string;
    label: string;
    id?: string;
    disabled?: boolean;
    helperText?: string;
    errorText?: string;
    successText?: string;
    className?: string;
}

/**
 * Base props for UiRadioGroup component
 */
export interface UiRadioGroupProps {
    options: UiRadioOption[];
    value: string;
    onChange: (value: string) => void;
    size?: UiRadioSize;
    orientation?: UiRadioGroupOrientation;
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
