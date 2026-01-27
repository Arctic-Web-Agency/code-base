'use client';

import * as Tooltip from '@radix-ui/react-tooltip';
import { composeClasses } from '@/shared/lib';
import type {
    UiTooltipProps,
    UiTooltipSize,
    UiTooltipVariant,
    UiTooltipProviderProps,
} from './types';

/**
 * Default collision padding in pixels
 */
const DEFAULT_COLLISION_PADDING = 8;

/**
 * Base tooltip classes applied to all variants
 */
const BASE_TOOLTIP_CLASSES = [
    'z-50',
    'rounded-md',
    'shadow-lg',
    'break-words',
    'animate-fadeIn',
] as const;

/**
 * Size styles for tooltip content
 */
const SIZE_STYLES: Record<UiTooltipSize, { padding: string; text: string }> = {
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
 * Each variant maintains consistent appearance across light/dark themes
 */
const VARIANT_STYLES: Record<UiTooltipVariant, { bg: string; text: string; arrow: string }> = {
    dark: {
        bg: 'bg-neutral-900',
        text: 'text-white',
        arrow: 'fill-neutral-900',
    },
    light: {
        bg: 'bg-white',
        text: 'text-neutral-900',
        arrow: 'fill-white',
    },
    neutral: {
        bg: 'bg-neutral-400',
        text: 'text-white',
        arrow: 'fill-neutral-400',
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

    const { padding, text } = SIZE_STYLES[size];
    const { bg, text: textColor, arrow } = VARIANT_STYLES[variant];

    const tooltipClasses = composeClasses(
        ...BASE_TOOLTIP_CLASSES,
        padding,
        text,
        bg,
        textColor,
        className
    );

    const arrowClasses = composeClasses(arrow, arrowClassName);

    return (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>

            <Tooltip.Portal>
                <Tooltip.Content
                    side={side}
                    align={align}
                    sideOffset={sideOffset}
                    collisionPadding={DEFAULT_COLLISION_PADDING}
                    className={tooltipClasses}
                    style={{ maxWidth }}
                >
                    {content}
                    {showArrow && <Tooltip.Arrow className={arrowClasses} />}
                </Tooltip.Content>
            </Tooltip.Portal>
        </Tooltip.Root>
    );
};

UiTooltip.displayName = 'UiTooltip';

export default UiTooltip;
