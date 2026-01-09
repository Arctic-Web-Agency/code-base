import { ReactNode } from 'react';

export type UiTooltipSide = 'top' | 'bottom' | 'left' | 'right';
export type UiTooltipAlign = 'start' | 'center' | 'end';

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
     * Delay in ms before showing tooltip
     * @default 200
     */
    delayDuration?: number;

    /**
     * Whether to skip delay when moving between tooltips
     * @default true
     */
    skipDelayDuration?: number;

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
