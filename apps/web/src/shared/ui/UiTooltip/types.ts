import { ReactElement, ReactNode } from 'react';

/**
 * Tooltip position relative to trigger element
 */
export type UiTooltipPosition =
    | 'top'
    | 'bottom'
    | 'left'
    | 'right';

/**
 * Trigger event(s) for showing tooltip
 */
export type UiTooltipTrigger = 'hover' | 'focus' | 'click' | 'manual';

/**
 * Props for UiTooltip component
 */
export interface UiTooltipProps {
    /**
     * Single child element that triggers the tooltip
     * Must be a single ReactElement (not text or multiple elements)
     */
    children: ReactElement;

    /**
     * Content to display inside tooltip
     */
    content: ReactNode;

    /**
     * Position of tooltip relative to trigger element
     * @default 'top'
     */
    position?: UiTooltipPosition;

    /**
     * Delay in milliseconds before showing tooltip
     * @default 200
     */
    showDelay?: number;

    /**
     * Delay in milliseconds before hiding tooltip
     * @default 0
     */
    hideDelay?: number;

    /**
     * Event(s) that trigger tooltip display
     * Can be a single trigger or array of triggers
     * @default 'hover'
     */
    trigger?: UiTooltipTrigger | UiTooltipTrigger[];

    /**
     * Disable tooltip (won't show on any trigger)
     * @default false
     */
    disabled?: boolean;

    /**
     * Distance in pixels between tooltip and trigger element
     * @default 8
     */
    offset?: number;

    /**
     * Maximum width of tooltip in pixels
     * @default 200
     */
    maxWidth?: number;

    /**
     * Show arrow pointer pointing to trigger element
     * @default true
     */
    showArrow?: boolean;

    /**
     * Custom CSS classes for tooltip container
     */
    className?: string;

    /**
     * Controlled mode: manually control open state
     * When provided, tooltip becomes controlled
     */
    open?: boolean;

    /**
     * Callback when open state changes (for controlled mode)
     */
    onOpenChange?: (open: boolean) => void;

    /**
     * ARIA label for accessibility
     */
    ariaLabel?: string;
}
