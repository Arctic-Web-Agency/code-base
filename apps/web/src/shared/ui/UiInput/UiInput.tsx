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
 * Icon container positioning styles based on size
 */
const iconContainerStyles: Record<UiInputSize, string> = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
};

/**
 * Icon positioning from edges
 */
const iconPositionStyles: Record<UiInputSize, { left: string; right: string }> = {
    sm: { left: 'left-3', right: 'right-3' },
    md: { left: 'left-4', right: 'right-4' },
    lg: { left: 'left-6', right: 'right-6' },
};

/**
 * Input padding adjustments when icons are present
 */
const iconPaddingStyles: Record<UiInputSize, { left: string; right: string }> = {
    sm: { left: 'pl-9', right: 'pr-9' },
    md: { left: 'pl-10', right: 'pr-10' },
    lg: { left: 'pl-12', right: 'pr-12' },
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
        required = false,
        leftIcon,
        rightIcon,
        id,
        ...rest
    } = props;

    const inputClasses = composeClasses(
        'w-full transition-colors duration-200',
        'focus:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        sizeStyles[size],
        variantStyles[variant],
        error && 'border-red-500 focus:border-red-500',
        leftIcon ? iconPaddingStyles[size].left : false,
        rightIcon ? iconPaddingStyles[size].right : false,
        className
    );

    const iconClasses = composeClasses(
        'absolute top-1/2 -translate-y-1/2 pointer-events-none',
        'text-neutral-400',
        iconContainerStyles[size]
    );

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                    {label}
                    {required && (
                        <span className="ml-1 text-red-500">*</span>
                    )}
                </label>
            )}
            <div className="relative">
                {leftIcon && (
                    <div
                        className={composeClasses(
                            iconClasses,
                            iconPositionStyles[size].left
                        )}
                    >
                        {leftIcon}
                    </div>
                )}
                <input
                    ref={ref}
                    id={id}
                    disabled={disabled}
                    required={required}
                    className={inputClasses}
                    {...rest}
                />
                {rightIcon && (
                    <div
                        className={composeClasses(
                            iconClasses,
                            iconPositionStyles[size].right
                        )}
                    >
                        {rightIcon}
                    </div>
                )}
            </div>
        </div>
    );
});

UiInput.displayName = 'UiInput';

export default UiInput;
