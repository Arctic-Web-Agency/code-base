import { useId } from 'react';
import { composeClasses } from '@/shared/lib';
import UiRadio from '../UiRadio/UiRadio';
import type {
    UiRadioGroupProps,
    UiRadioGroupOrientation,
} from './types';

/**
 * Orientation styles for radio group layout
 */
const orientationStyles: Record<UiRadioGroupOrientation, string> = {
    vertical: 'flex-col space-y-3',
    horizontal: 'flex-row flex-wrap gap-x-6 gap-y-3',
};

/**
 * Text size styles for group label and helper text
 */
const textSizeStyles = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
};

/**
 * Radio group component for managing multiple radio buttons
 */
const UiRadioGroup = (props: UiRadioGroupProps) => {
    const {
        options,
        value,
        onChange,
        size = 'md',
        orientation = 'vertical',
        error = false,
        success = false,
        label,
        helperText,
        errorText,
        successText,
        required = false,
        disabled = false,
        name,
    } = props;

    const helperId = `${useId()}-helper`;

    const handleChange = (optionValue: string) => {
        onChange(optionValue);
    };

    let displayText = helperText;
    if (success && successText) displayText = successText;
    if (error && errorText) displayText = errorText;

    let textColor = 'text-neutral-500 dark:text-neutral-400';
    if (success) textColor = 'text-green-500';
    if (error) textColor = 'text-red-500';

    return (
        <div>
            {label && (
                <label className="mb-3 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    {label}
                    {required && (
                        <span className="ml-1 text-red-500">*</span>
                    )}
                </label>
            )}
            <div
                className={composeClasses('flex', orientationStyles[orientation])}
                role="radiogroup"
                aria-label={label}
                aria-required={required}
                aria-invalid={error}
                aria-describedby={displayText ? helperId : undefined}
            >
                {options.map((option) => (
                    <UiRadio
                        key={option.value}
                        id={option.id}
                        checked={value === option.value}
                        onChange={() => handleChange(option.value)}
                        label={option.label}
                        disabled={disabled || option.disabled}
                        size={size}
                        error={error}
                        success={success}
                        helperText={option.helperText}
                        errorText={option.errorText}
                        successText={option.successText}
                        className={option.className}
                        name={name}
                    />
                ))}
            </div>
            {displayText && (
                <div
                    id={helperId}
                    className={composeClasses(
                        'mt-2',
                        textSizeStyles[size],
                        textColor
                    )}
                >
                    {displayText}
                </div>
            )}
        </div>
    );
};

UiRadioGroup.displayName = 'UiRadioGroup';

export default UiRadioGroup;
