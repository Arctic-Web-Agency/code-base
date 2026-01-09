'use client';

import { ReactNode } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { composeClasses } from '@/shared/lib';
import type {
    UiTooltipProps,
    UiTooltipSize,
    UiTooltipVariant,
    UiTooltipProviderProps,
} from './types';

/**
 * Size styles for tooltip content
 */
const sizeStyles: Record<UiTooltipSize, { padding: string; text: string }> = {
    sm: {
        padding: 'px-2 py-1',
        text: 'text-xs',
    },
    md: {
        padding: 'px-3 py-2',
        text: 'text-sm',
    },
    lg: {
        padding: 'px-4 py-3',
        text: 'text-base',
    },
};

/**
 * Variant styles for tooltip background and text
 */
const variantStyles: Record<UiTooltipVariant, { bg: string; text: string; arrow: string }> = {
    dark: {
        bg: 'bg-neutral-900 dark:bg-neutral-800',
        text: 'text-white',
        arrow: 'fill-neutral-900 dark:fill-neutral-800',
    },
    light: {
        bg: 'bg-white dark:bg-neutral-100',
        text: 'text-neutral-900 dark:text-neutral-800',
        arrow: 'fill-white dark:fill-neutral-100',
    },
    neutral: {
        bg: 'bg-neutral-200 dark:bg-neutral-700',
        text: 'text-neutral-800 dark:text-neutral-200',
        arrow: 'fill-neutral-200 dark:fill-neutral-700',
    },
};

/**
 * Tooltip Provider Component
 * Should be placed at the root of your app for optimal performance
 */
export const UiTooltipProvider = (props: UiTooltipProviderProps) => {
    const {
        children,
        delayDuration = 200,
        skipDelayDuration = 300,
    } = props;

    return (
        <Tooltip.Provider
            delayDuration={delayDuration}
            skipDelayDuration={skipDelayDuration}
        >
            {children}
        </Tooltip.Provider>
    );
};

UiTooltipProvider.displayName = 'UiTooltipProvider';

/**
 * Universal Tooltip component built on Radix UI
 * Provides accessible hover/focus hints with minimal styling
 *
 * @example
 * ```tsx
 * // Wrap your app with UiTooltipProvider first:
 * <UiTooltipProvider>
 *   <App />
 * </UiTooltipProvider>
 *
 * // Then use UiTooltip anywhere:
 * <UiTooltip content="Helpful hint" side="top">
 *   <button>Hover me</button>
 * </UiTooltip>
 * ```
 */
const UiTooltip = (props: UiTooltipProps) => {
    const {
        children,
        content,
        side = 'top',
        align = 'center',
        size = 'md',
        variant = 'dark',
        showArrow = true,
        sideOffset = 5,
        maxWidth = 320,
        disabled = false,
        className,
        arrowClassName,
    } = props;

    if (disabled) {
        return <>{children}</>;
    }

    const sizeStyle = sizeStyles[size];
    const variantStyle = variantStyles[variant];

    const tooltipClasses = composeClasses(
        'z-50',
        'rounded-md',
        'shadow-lg',
        'break-words',
        'animate-fadeIn',
        sizeStyle.padding,
        sizeStyle.text,
        variantStyle.bg,
        variantStyle.text,
        className
    );

    const arrowClasses = composeClasses(
        variantStyle.arrow,
        arrowClassName
    );

    return (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>

            <Tooltip.Portal>
                <Tooltip.Content
                    side={side}
                    align={align}
                    sideOffset={sideOffset}
                    collisionPadding={8}
                    className={tooltipClasses}
                    style={{ maxWidth }}
                >
                    {content}
                    {showArrow && (
                        <Tooltip.Arrow className={arrowClasses} />
                    )}
                </Tooltip.Content>
            </Tooltip.Portal>
        </Tooltip.Root>
    );
};

UiTooltip.displayName = 'UiTooltip';

export default UiTooltip;
