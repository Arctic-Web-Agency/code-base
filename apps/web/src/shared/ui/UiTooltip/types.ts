import { ReactNode } from 'react';

export type UiTooltipSide = 'top' | 'bottom' | 'left' | 'right';
export type UiTooltipAlign = 'start' | 'center' | 'end';

/**
 * Tooltip size variants
 */
export type UiTooltipSize = 'sm' | 'md' | 'lg';

/**
 * Tooltip visual variants
 */
export type UiTooltipVariant = 'dark' | 'light' | 'neutral';

/**
 * Props for UiTooltipProvider component
 */
export interface UiTooltipProviderProps {
    /**
     * Child components
     */
    children: ReactNode;

    /**
     * Delay in ms before showing tooltip
     * @default 200
     */
    delayDuration?: number;

    /**
     * Time to skip delay when moving between tooltips
     * @default 300
     */
    skipDelayDuration?: number;
}

/**
 * Base props for UiTooltip component
 */
export interface UiTooltipProps {
    /**
     * Element that triggers the tooltip
     */
    children: ReactNode;

    /**
     * Content to display in the tooltip
     */
    content: ReactNode;

    /**
     * Side where tooltip appears relative to trigger
     * @default 'top'
     */
    side?: UiTooltipSide;

    /**
     * Alignment of tooltip along the side
     * @default 'center'
     */
    align?: UiTooltipAlign;

    /**
     * Size variant
     * @default 'md'
     */
    size?: UiTooltipSize;

    /**
     * Visual variant
     * @default 'dark'
     */
    variant?: UiTooltipVariant;

    /**
     * Whether to show arrow pointing to trigger
     * @default true
     */
    showArrow?: boolean;

    /**
     * Distance in pixels from the trigger element
     * @default 5
     */
    sideOffset?: number;

    /**
     * Maximum width in pixels
     * @default 320
     */
    maxWidth?: number;

    /**
     * Whether tooltip is disabled
     * @default false
     */
    disabled?: boolean;

    /**
     * Custom className for tooltip content
     */
    className?: string;

    /**
     * Custom className for arrow
     */
    arrowClassName?: string;
}
