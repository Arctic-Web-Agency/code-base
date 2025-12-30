import { composeClasses } from '@/shared/lib';
import UiCheckbox from '../UiCheckbox/UiCheckbox';
import type {
    UiCheckboxGroupProps,
    UiCheckboxGroupOrientation,
} from './types';

/**
 * Orientation styles for checkbox group layout
 */
const orientationStyles: Record<UiCheckboxGroupOrientation, string> = {
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
 * Checkbox group component for managing multiple checkboxes
 */
const UiCheckboxGroup = (props: UiCheckboxGroupProps) => {
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

    const handleChange = (optionValue: string, checked: boolean) => {
        if (checked) {
            onChange([...value, optionValue]);
        } else {
            onChange(value.filter((v) => v !== optionValue));
        }
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
                role="group"
                aria-label={label}
            >
                {options.map((option) => (
                    <UiCheckbox
                        key={option.value}
                        id={option.id}
                        checked={value.includes(option.value)}
                        onChange={(e) =>
                            handleChange(option.value, e.target.checked)
                        }
                        label={option.label}
                        disabled={disabled || option.disabled}
                        size={size}
                        error={error}
                        success={success}
                        helperText={option.helperText}
                        errorText={option.errorText}
                        successText={option.successText}
                        className={option.className}
                        indeterminate={option.indeterminate}
                        name={name}
                    />
                ))}
            </div>
            {displayText && (
                <div
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

UiCheckboxGroup.displayName = 'UiCheckboxGroup';

export default UiCheckboxGroup;
