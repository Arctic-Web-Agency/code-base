import { forwardRef, useMemo } from 'react';
import UiButton from '../UiButton/UiButton';
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
 * Text size styles for prefix, suffix, and helper text
 */
const textSizeStyles: Record<UiInputSize, string> = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
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
        success = false,
        label,
        className,
        disabled = false,
        required = false,
        leftIcon,
        rightIcon,
        helperText,
        errorText,
        successText,
        showCharCount = false,
        clearable = false,
        onClear,
        prefix,
        suffix,
        id,
        value,
        maxLength,
        ...rest
    } = props;

    const showClearButton = clearable && value;

    const hasLeftAdornment = !!(leftIcon || prefix);
    const hasRightAdornment = !!(
        rightIcon ||
        suffix ||
        showClearButton
    );

    const inputClasses = composeClasses(
        'w-full',
        'focus:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        sizeStyles[size],
        variantStyles[variant],
        error && 'border-red-500 focus:border-red-500',
        success && !error && 'border-green-500 focus:border-green-500',
        hasLeftAdornment ? iconPaddingStyles[size].left : false,
        hasRightAdornment ? iconPaddingStyles[size].right : false,
        className
    );

    const currentLength = useMemo(() => {
        if (typeof value === 'string') return value.length;
        if (typeof value === 'number') return String(value).length;
        return 0;
    }, [value]);

    let displayText = helperText;
    if (success && successText) displayText = successText;
    if (error && errorText) displayText = errorText;

    let textColor = 'text-neutral-500 dark:text-neutral-400';
    if (success) textColor = 'text-green-500';
    if (error) textColor = 'text-red-500';

    return (
        <div>
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
                {leftIcon ? (
                    <div className="absolute top-1/2 -translate-y-1/2 left-0">
                        {leftIcon}
                    </div>
                ) : prefix ? (
                    <div
                        className={composeClasses(
                            'absolute top-1/2 -translate-y-1/2 left-0 pointer-events-none',
                            'text-neutral-500',
                            textSizeStyles[size]
                        )}
                    >
                        {prefix}
                    </div>
                ) : null}
                <input
                    ref={ref}
                    id={id}
                    disabled={disabled}
                    required={required}
                    className={inputClasses}
                    value={value}
                    maxLength={maxLength}
                    {...rest}
                />
                {showClearButton ? (
                    <div className="absolute top-1/2 -translate-y-1/2 right-0">
                        <UiButton
                            variant="icon"
                            size="sm"
                            onClick={onClear}
                            tabIndex={-1}
                            aria-label="Clear input"
                            className="text-xl leading-none"
                        >
                            ×
                        </UiButton>
                    </div>
                ) : rightIcon ? (
                    <div className="absolute top-1/2 -translate-y-1/2 right-0">
                        {rightIcon}
                    </div>
                ) : suffix ? (
                    <div
                        className={composeClasses(
                            'absolute top-1/2 -translate-y-1/2 right-0 pointer-events-none',
                            'text-neutral-500',
                            textSizeStyles[size]
                        )}
                    >
                        {suffix}
                    </div>
                ) : null}
            </div>
            {(displayText || (showCharCount && maxLength)) && (
                <div
                    className={composeClasses(
                        'mt-1.5 flex justify-between items-center',
                        textSizeStyles[size]
                    )}
                >
                    {displayText && (
                        <span className={textColor}>{displayText}</span>
                    )}
                    {showCharCount && maxLength && (
                        <span className="text-neutral-500 dark:text-neutral-400 ml-auto">
                            {currentLength} / {maxLength}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
});

UiInput.displayName = 'UiInput';

export default UiInput;
