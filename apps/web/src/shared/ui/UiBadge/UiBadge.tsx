'use client';

import { useId, useState } from 'react';
import { CloseIcon } from '@/shared/icons';
import { composeClasses } from '@/shared/lib';
import type {
    UiBadgeProps,
    UiBadgeStatus,
    UiBadgeVariant,
    UiBadgeSize,
} from './types';

/**
 * Status color styles for different variants
 */
const statusStyles: Record<
    UiBadgeStatus,
    Record<UiBadgeVariant, string>
> = {
    success: {
        solid: 'bg-green-600 text-white dark:bg-green-700',
        outline: 'border border-green-600 text-green-700 dark:border-green-500 dark:text-green-400',
        subtle: 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300',
    },
    error: {
        solid: 'bg-red-600 text-white dark:bg-red-700',
        outline: 'border border-red-600 text-red-700 dark:border-red-500 dark:text-red-400',
        subtle: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300',
    },
    warning: {
        solid: 'bg-amber-600 text-white dark:bg-amber-700',
        outline: 'border border-amber-600 text-amber-700 dark:border-amber-500 dark:text-amber-400',
        subtle: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
    },
};

/**
 * Dot indicator styles for different statuses
 */
const dotStyles: Record<UiBadgeStatus, string> = {
    success: 'bg-green-600 dark:bg-green-500',
    error: 'bg-red-600 dark:bg-red-500',
    warning: 'bg-amber-600 dark:bg-amber-500',
};

/**
 * Size styles
 */
const sizeStyles: Record<UiBadgeSize, { container: string; text: string; dot: string }> = {
    sm: {
        container: 'px-2 py-0.5 gap-1',
        text: 'text-xs',
        dot: 'w-1.5 h-1.5',
    },
    md: {
        container: 'px-2.5 py-1 gap-1.5',
        text: 'text-sm',
        dot: 'w-2 h-2',
    },
    lg: {
        container: 'px-3 py-1.5 gap-2',
        text: 'text-base',
        dot: 'w-2.5 h-2.5',
    },
};

/**
 * Universal Badge component with status variants, icons, and dismiss functionality
 */
const UiBadge = (props: UiBadgeProps) => {
    const {
        status,
        variant = 'subtle',
        size = 'md',
        children,
        dot = false,
        icon,
        dismissible = false,
        onDismiss,
        className,
        ariaLabel,
    } = props;

    const badgeId = useId();
    const [isDismissed, setIsDismissed] = useState(false);

    /**
     * Handle dismiss action
     */
    const handleDismiss = () => {
        setIsDismissed(true);
        onDismiss?.();
    };

    // Don't render if dismissed
    if (isDismissed) return null;

    const statusStyle = statusStyles[status][variant];
    const sizeStyle = sizeStyles[size];

    return (
        <span
            id={`badge-${badgeId}`}
            role="status"
            aria-label={ariaLabel || `${status} badge`}
            aria-live="polite"
            className={composeClasses(
                'inline-flex items-center justify-center',
                'font-medium',
                'rounded',
                'select-none',
                statusStyle,
                sizeStyle.container,
                sizeStyle.text,
                className
            )}
        >
            {/* Dot indicator */}
            {dot && (
                <span
                    className={composeClasses(
                        'rounded-full',
                        'shrink-0',
                        sizeStyle.dot,
                        dotStyles[status]
                    )}
                    aria-hidden="true"
                />
            )}

            {/* Custom icon */}
            {icon && (
                <span
                    className="shrink-0 flex items-center"
                    aria-hidden="true"
                >
                    {icon}
                </span>
            )}

            {/* Content */}
            <span className="shrink-0">
                {children}
            </span>

            {/* Dismiss button */}
            {dismissible && (
                <button
                    type="button"
                    onClick={handleDismiss}
                    className={composeClasses(
                        'shrink-0',
                        'flex items-center justify-center',
                        'rounded',
                        'transition-opacity',
                        'hover:opacity-70',
                        'focus:outline-none focus:ring-2 focus:ring-offset-1',
                        status === 'success' && 'focus:ring-green-600',
                        status === 'error' && 'focus:ring-red-600',
                        status === 'warning' && 'focus:ring-amber-600'
                    )}
                    aria-label="Dismiss badge"
                >
                    <CloseIcon className="w-3 h-3" />
                </button>
            )}
        </span>
    );
};

UiBadge.displayName = 'UiBadge';

export default UiBadge;
