import { forwardRef, useId } from 'react';
import { composeClasses } from '@/shared/lib';
import type { UiRadioProps, UiRadioSize } from './types';

/**
 * Size styles for radio and label
 */
const radioSizeStyles: Record<UiRadioSize, string> = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
};

/**
 * Inner dot size styles for checked state
 */
const dotSizeStyles: Record<UiRadioSize, string> = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
};

const labelSizeStyles: Record<UiRadioSize, string> = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
};

const textSizeStyles: Record<UiRadioSize, string> = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
};

/**
 * Container height to match radio size
 */
const containerHeightStyles: Record<UiRadioSize, string> = {
    sm: 'h-4',
    md: 'h-5',
    lg: 'h-6',
};

/**
 * Helper text margin-left to align with label
 * Accounts for radio width + gap (ml-3 = 12px)
 */
const helperTextMarginStyles: Record<UiRadioSize, string> = {
    sm: 'ml-7',  // 16px (w-4) + 12px (gap) = 28px
    md: 'ml-8',  // 20px (w-5) + 12px (gap) = 32px
    lg: 'ml-9',  // 24px (w-6) + 12px (gap) = 36px
};

/**
 * Theme-agnostic radio component using neutral colors
 * Uses custom radio for cross-browser consistency
 */
const UiRadio = forwardRef<HTMLInputElement, UiRadioProps>(
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
            id,
            checked,
            ...rest
        } = props;

        const autoId = useId();
        const radioId = id || autoId;
        const helperId = `${radioId}-helper`;

        // Border color based on state
        let borderColor = 'border-neutral-300';
        if (error) borderColor = 'border-red-500';
        if (success) borderColor = 'border-green-500';

        // Background and border when checked
        let activeBgColor = 'bg-neutral-700 border-neutral-700';
        if (error) activeBgColor = 'bg-red-500 border-red-500';
        if (success) activeBgColor = 'bg-green-500 border-green-500';

        const customRadioClasses = composeClasses(
            radioSizeStyles[size],
            'rounded-full border-2',
            'flex items-center justify-center',
            'peer-disabled:opacity-50',
            checked ? activeBgColor : `bg-white ${borderColor}`,
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
                <label
                    className={composeClasses(
                        'flex items-start',
                        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
                    )}
                >
                    <div className={composeClasses(
                        'relative flex items-center',
                        containerHeightStyles[size]
                    )}>
                        {/* Hidden native input for accessibility and functionality */}
                        <input
                            ref={ref}
                            type="radio"
                            id={radioId}
                            disabled={disabled}
                            required={required}
                            checked={checked}
                            aria-invalid={error}
                            aria-describedby={displayText ? helperId : undefined}
                            className="peer sr-only"
                            {...rest}
                        />

                        {/* Custom visual radio */}
                        <div className={customRadioClasses}>
                            {/* Show inner dot when checked */}
                            {checked && (
                                <div
                                    className={composeClasses(
                                        dotSizeStyles[size],
                                        'rounded-full bg-white'
                                    )}
                                />
                            )}
                        </div>
                    </div>
                    {label && (
                        <span
                            className={composeClasses(
                                'ml-3',
                                labelSizeStyles[size],
                                'text-neutral-700 dark:text-neutral-300',
                                disabled && 'opacity-50'
                            )}
                        >
                            {label}
                            {required && (
                                <span className="ml-1 text-red-500">*</span>
                            )}
                        </span>
                    )}
                </label>
                {displayText && (
                    <div
                        id={helperId}
                        className={composeClasses(
                            'mt-1.5',
                            helperTextMarginStyles[size],
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

UiRadio.displayName = 'UiRadio';

export default UiRadio;
