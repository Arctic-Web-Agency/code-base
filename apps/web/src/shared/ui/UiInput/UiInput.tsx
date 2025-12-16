import { forwardRef } from 'react';
import type { UiInputProps, UiInputSize, UiInputVariant } from './types';

const composeClasses = (
    ...classes: Array<string | false | undefined>
): string => classes.filter(Boolean).join(' ');

/**
 * Size styles for input padding and text
 */
const sizeStyles: Record<UiInputSize, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
};

/**
 * Variant styles for background, border, and text colors
 */
const variantStyles: Record<UiInputVariant, string> = {
    filled:
        'bg-neutral-800 text-white placeholder:text-neutral-400 focus:bg-neutral-700 disabled:bg-neutral-300 disabled:text-neutral-500',
    outlined:
        'bg-transparent text-neutral-600 dark:text-neutral-300 placeholder:text-neutral-400 border border-neutral-300 focus:border-neutral-400 disabled:border-neutral-200 disabled:text-neutral-400',
};

/**
 * Theme-agnostic input component using neutral colors
 * Override via className prop for custom design systems
 */
const UiInput = forwardRef<HTMLInputElement, UiInputProps>((props, ref) => {
    const {
        variant = 'filled',
        size = 'md',
        error = false,
        label,
        className,
        disabled = false,
        id,
        ...rest
    } = props;

    const inputClasses = composeClasses(
        'w-full rounded-lg transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        sizeStyles[size],
        variantStyles[variant],
        error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
        className
    );

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                    {label}
                </label>
            )}
            <input
                ref={ref}
                id={id}
                disabled={disabled}
                className={inputClasses}
                {...rest}
            />
        </div>
    );
});

UiInput.displayName = 'UiInput';

export default UiInput;
