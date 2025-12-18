import { forwardRef, useMemo } from 'react';
import type {
    UiTextareaProps,
    UiTextareaSize,
    UiTextareaVariant,
    UiTextareaResize,
} from './types';

const composeClasses = (
    ...classes: Array<string | false | undefined>
): string => classes.filter(Boolean).join(' ');

/**
 * Size styles for textarea padding and text
 */
const sizeStyles: Record<UiTextareaSize, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
};

/**
 * Variant styles for background, border, and text colors
 */
const variantStyles: Record<UiTextareaVariant, string> = {
    filled:
        'bg-neutral-800 text-white placeholder:text-neutral-400 focus:bg-neutral-700 disabled:bg-neutral-300 disabled:text-neutral-500',
    outlined:
        'bg-transparent text-neutral-600 dark:text-neutral-300 placeholder:text-neutral-400 border border-neutral-300 focus:border-neutral-400 disabled:border-neutral-200 disabled:text-neutral-400',
};

/**
 * Resize control styles
 */
const resizeStyles: Record<UiTextareaResize, string> = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize',
};

/**
 * Text size styles for helper text
 */
const textSizeStyles: Record<UiTextareaSize, string> = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
};

/**
 * Theme-agnostic textarea component using neutral colors
 * Override via className prop for custom design systems
 */
const UiTextarea = forwardRef<HTMLTextAreaElement, UiTextareaProps>(
    (props, ref) => {
        const {
            variant = 'filled',
            size = 'md',
            resize = 'vertical',
            error = false,
            success = false,
            label,
            className,
            disabled = false,
            required = false,
            helperText,
            errorText,
            successText,
            showCharCount = false,
            id,
            value,
            maxLength,
            rows = 4,
            ...rest
        } = props;

        const textareaClasses = composeClasses(
            'w-full transition-colors duration-200',
            'focus:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
            sizeStyles[size],
            variantStyles[variant],
            resizeStyles[resize],
            error && 'border-red-500 focus:border-red-500',
            success && !error && 'border-green-500 focus:border-green-500',
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
                <textarea
                    ref={ref}
                    id={id}
                    disabled={disabled}
                    required={required}
                    className={textareaClasses}
                    value={value}
                    maxLength={maxLength}
                    rows={rows}
                    {...rest}
                />
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
    }
);

UiTextarea.displayName = 'UiTextarea';

export default UiTextarea;
