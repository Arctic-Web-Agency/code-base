import { forwardRef, useEffect, useRef, useId, type RefObject } from 'react';
import type { UiCheckboxProps, UiCheckboxSize } from './types';

const composeClasses = (
    ...classes: Array<string | false | undefined>
): string => classes.filter(Boolean).join(' ');

/**
 * Size styles for checkbox and label
 */
const checkboxSizeStyles: Record<UiCheckboxSize, string> = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
};

/**
 * Checkmark size styles (width and height for rotated border trick)
 */
const checkmarkSizeStyles: Record<UiCheckboxSize, string> = {
    sm: 'w-1.5 h-2.5',
    md: 'w-2 h-3.5',
    lg: 'w-2.5 h-4',
};

/**
 * Indeterminate line size styles
 */
const indeterminateSizeStyles: Record<UiCheckboxSize, string> = {
    sm: 'w-2 h-0.5',
    md: 'w-2.5 h-0.5',
    lg: 'w-3 h-0.5',
};

const labelSizeStyles: Record<UiCheckboxSize, string> = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
};

const textSizeStyles: Record<UiCheckboxSize, string> = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
};

/**
 * Theme-agnostic checkbox component using neutral colors
 * Uses custom checkbox for cross-browser consistency
 */
const UiCheckbox = forwardRef<HTMLInputElement, UiCheckboxProps>(
    (props, ref) => {
        const {
            size = 'md',
            error = false,
            success = false,
            label,
            className,
            disabled = false,
            required = false,
            helperText,
            errorText,
            successText,
            indeterminate = false,
            id,
            checked,
            ...rest
        } = props;

        const autoId = useId();
        const checkboxId = id || autoId;

        const internalRef = useRef<HTMLInputElement>(null);
        const checkboxRef = (ref ||
            internalRef) as RefObject<HTMLInputElement>;

        // Handle indeterminate state (DOM property, not HTML attribute)
        useEffect(() => {
            if (checkboxRef.current) {
                checkboxRef.current.indeterminate = indeterminate;
            }
        }, [indeterminate, checkboxRef]);

        // Border color based on state
        let borderColor = 'border-neutral-300';
        if (error) borderColor = 'border-red-500';
        if (success) borderColor = 'border-green-500';

        // Background and border when checked/indeterminate
        let activeBgColor = 'bg-neutral-700 border-neutral-700';
        if (error) activeBgColor = 'bg-red-500 border-red-500';
        if (success) activeBgColor = 'bg-green-500 border-green-500';

        const customCheckboxClasses = composeClasses(
            checkboxSizeStyles[size],
            'border-2',
            'flex items-center justify-center',
            'cursor-pointer',
            'peer-disabled:opacity-50 peer-disabled:cursor-not-allowed',
            checked || indeterminate ? activeBgColor : `bg-white ${borderColor}`,
            className
        );

        let displayText = helperText;
        if (success && successText) displayText = successText;
        if (error && errorText) displayText = errorText;

        let textColor = 'text-neutral-500 dark:text-neutral-400';
        if (success) textColor = 'text-green-500';
        if (error) textColor = 'text-red-500';

        return (
            <div>
                <div className="flex items-start">
                    <div className="relative flex items-center h-5">
                        {/* Hidden native input for accessibility and functionality */}
                        <input
                            ref={checkboxRef}
                            type="checkbox"
                            id={checkboxId}
                            disabled={disabled}
                            required={required}
                            checked={checked}
                            className="peer sr-only"
                            {...rest}
                        />

                        {/* Custom visual checkbox */}
                        <label
                            htmlFor={checkboxId}
                            className={customCheckboxClasses}
                        >
                            {/* Show checkmark when checked (not indeterminate) */}
                            {checked && !indeterminate && (
                                <div
                                    className={composeClasses(
                                        checkmarkSizeStyles[size],
                                        'border-white border-r-2 border-b-2 rotate-45 -mt-0.5'
                                    )}
                                />
                            )}

                            {/* Show minus when indeterminate */}
                            {indeterminate && (
                                <div
                                    className={composeClasses(
                                        indeterminateSizeStyles[size],
                                        'bg-white'
                                    )}
                                />
                            )}
                        </label>
                    </div>
                    {label && (
                        <label
                            htmlFor={checkboxId}
                            className={composeClasses(
                                'ml-3 cursor-pointer',
                                labelSizeStyles[size],
                                'text-neutral-700 dark:text-neutral-300',
                                disabled && 'cursor-not-allowed opacity-50'
                            )}
                        >
                            {label}
                            {required && (
                                <span className="ml-1 text-red-500">*</span>
                            )}
                        </label>
                    )}
                </div>
                {displayText && (
                    <div
                        className={composeClasses(
                            'mt-1.5 ml-8',
                            textSizeStyles[size],
                            textColor
                        )}
                    >
                        {displayText}
                    </div>
                )}
            </div>
        );
    }
);

UiCheckbox.displayName = 'UiCheckbox';

export default UiCheckbox;
