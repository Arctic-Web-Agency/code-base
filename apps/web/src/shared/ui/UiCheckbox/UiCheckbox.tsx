import { forwardRef, useEffect, useRef, type RefObject } from 'react';
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
 * Override via className prop for custom design systems
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

        const internalRef = useRef<HTMLInputElement>(null);
        const checkboxRef = (ref ||
            internalRef) as RefObject<HTMLInputElement>;

        // Handle indeterminate state (DOM property, not HTML attribute)
        useEffect(() => {
            if (checkboxRef.current) {
                checkboxRef.current.indeterminate = indeterminate;
            }
        }, [indeterminate, checkboxRef]);

        const checkboxClasses = composeClasses(
            checkboxSizeStyles[size],
            'transition-colors duration-200',
            'cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
            'focus:outline-none',
            error
                ? 'border-red-500 focus:ring-red-500'
                : success
                ? 'border-green-500 focus:ring-green-500'
                : 'border-neutral-300 focus:ring-neutral-400',
            checked || indeterminate
                ? error
                    ? 'bg-red-500 border-red-500'
                    : success
                    ? 'bg-green-500 border-green-500'
                    : 'bg-neutral-700 border-neutral-700'
                : 'bg-white',
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
                    <div className="flex items-center h-5">
                        <input
                            ref={checkboxRef}
                            type="checkbox"
                            id={id}
                            disabled={disabled}
                            required={required}
                            checked={checked}
                            className={checkboxClasses}
                            {...rest}
                        />
                    </div>
                    {label && (
                        <label
                            htmlFor={id}
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
