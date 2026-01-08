'use client';

import {
    cloneElement,
    useEffect,
    useId,
    useRef,
    useState,
} from 'react';
import { createPortal } from 'react-dom';
import { composeClasses } from '@/shared/lib';
import type { UiTooltipProps, UiTooltipTrigger } from './types';

/**
 * Calculate tooltip position based on trigger element and desired position
 */
const calculatePosition = (
    triggerRect: DOMRect,
    tooltipRect: DOMRect,
    position: NonNullable<UiTooltipProps['position']>,
    offset: number
): { top: number; left: number } => {
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    let top = 0;
    let left = 0;

    switch (position) {
        case 'top':
            top = triggerRect.top + scrollY - tooltipRect.height - offset;
            left =
                triggerRect.left +
                scrollX +
                triggerRect.width / 2 -
                tooltipRect.width / 2;
            break;
        case 'bottom':
            top = triggerRect.bottom + scrollY + offset;
            left =
                triggerRect.left +
                scrollX +
                triggerRect.width / 2 -
                tooltipRect.width / 2;
            break;
        case 'left':
            top =
                triggerRect.top +
                scrollY +
                triggerRect.height / 2 -
                tooltipRect.height / 2;
            left = triggerRect.left + scrollX - tooltipRect.width - offset;
            break;
        case 'right':
            top =
                triggerRect.top +
                scrollY +
                triggerRect.height / 2 -
                tooltipRect.height / 2;
            left = triggerRect.right + scrollX + offset;
            break;
    }

    // Ensure tooltip stays within viewport bounds
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Horizontal bounds
    if (left < scrollX + 8) {
        left = scrollX + 8;
    } else if (left + tooltipRect.width > scrollX + viewportWidth - 8) {
        left = scrollX + viewportWidth - tooltipRect.width - 8;
    }

    // Vertical bounds
    if (top < scrollY + 8) {
        top = scrollY + 8;
    } else if (top + tooltipRect.height > scrollY + viewportHeight - 8) {
        top = scrollY + viewportHeight - tooltipRect.height - 8;
    }

    return { top, left };
};

/**
 * UiTooltip - Small popup with hint that appears on hover/focus
 *
 * @example
 * ```tsx
 * <UiTooltip content="This is a helpful hint" position="top">
 *   <button>Hover me</button>
 * </UiTooltip>
 * ```
 */
const UiTooltip = (props: UiTooltipProps) => {
    const {
        children,
        content,
        position = 'top',
        showDelay = 200,
        hideDelay = 0,
        trigger = 'hover',
        disabled = false,
        offset = 8,
        maxWidth = 200,
        showArrow = true,
        className,
        open: controlledOpen,
        onOpenChange,
        ariaLabel,
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

    const triggerRef = useRef<HTMLElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const tooltipId = useId();

    // Use controlled open state if provided
    const isTooltipOpen = controlledOpen !== undefined ? controlledOpen : isOpen;

    // Normalize trigger to array
    const triggers = Array.isArray(trigger) ? trigger : [trigger];
    const hasTrigger = (t: UiTooltipTrigger) => triggers.includes(t);

    // Handle show tooltip
    const handleShow = () => {
        if (disabled) return;

        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }

        showTimeoutRef.current = setTimeout(() => {
            if (controlledOpen === undefined) {
                setIsOpen(true);
            }
            onOpenChange?.(true);
        }, showDelay);
    };

    // Handle hide tooltip
    const handleHide = () => {
        if (showTimeoutRef.current) {
            clearTimeout(showTimeoutRef.current);
            showTimeoutRef.current = null;
        }

        hideTimeoutRef.current = setTimeout(() => {
            if (controlledOpen === undefined) {
                setIsOpen(false);
            }
            onOpenChange?.(false);
        }, hideDelay);
    };

    // Handle click trigger
    const handleClick = () => {
        if (!hasTrigger('click')) return;

        if (isTooltipOpen) {
            handleHide();
        } else {
            handleShow();
        }
    };

    // Calculate tooltip position when it opens
    useEffect(() => {
        if (!isTooltipOpen || !triggerRef.current || !tooltipRef.current) return;

        const updatePosition = () => {
            if (!triggerRef.current || !tooltipRef.current) return;

            const triggerRect = triggerRef.current.getBoundingClientRect();
            const tooltipRect = tooltipRef.current.getBoundingClientRect();

            const pos = calculatePosition(triggerRect, tooltipRect, position, offset);
            setTooltipPosition(pos);
        };

        // Initial position calculation
        updatePosition();

        // Recalculate on scroll/resize
        window.addEventListener('scroll', updatePosition, true);
        window.addEventListener('resize', updatePosition);

        return () => {
            window.removeEventListener('scroll', updatePosition, true);
            window.removeEventListener('resize', updatePosition);
        };
    }, [isTooltipOpen, position, offset]);

    // Clean up timeouts on unmount
    useEffect(() => {
        return () => {
            if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
            if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        };
    }, []);

    // Clone child element and attach event handlers
    const childProps = children.props as any;
    const triggerElement = cloneElement(children, {
        ref: triggerRef,
        'aria-describedby': isTooltipOpen ? tooltipId : undefined,
        ...(hasTrigger('hover') && {
            onMouseEnter: (e: any) => {
                handleShow();
                childProps.onMouseEnter?.(e);
            },
            onMouseLeave: (e: any) => {
                handleHide();
                childProps.onMouseLeave?.(e);
            },
        }),
        ...(hasTrigger('focus') && {
            onFocus: (e: any) => {
                handleShow();
                childProps.onFocus?.(e);
            },
            onBlur: (e: any) => {
                handleHide();
                childProps.onBlur?.(e);
            },
        }),
        ...(hasTrigger('click') && {
            onClick: (e: any) => {
                handleClick();
                childProps.onClick?.(e);
            },
        }),
    } as any);

    // Don't render tooltip if closed or disabled or on server
    if (!isTooltipOpen || disabled || typeof window === 'undefined') {
        return triggerElement;
    }

    // Arrow styles based on position
    const arrowClasses = composeClasses(
        'absolute w-2 h-2 bg-neutral-800 dark:bg-neutral-700 transform rotate-45',
        position === 'top' && 'bottom-[-4px] left-1/2 -translate-x-1/2',
        position === 'bottom' && 'top-[-4px] left-1/2 -translate-x-1/2',
        position === 'left' && 'right-[-4px] top-1/2 -translate-y-1/2',
        position === 'right' && 'left-[-4px] top-1/2 -translate-y-1/2'
    );

    const tooltipClasses = composeClasses(
        'fixed z-[9999]',
        'px-3 py-2',
        'bg-neutral-800 dark:bg-neutral-700',
        'text-white text-sm',
        'pointer-events-none',
        'animate-fadeIn',
        className
    );

    const tooltipContent = (
        <div
            ref={tooltipRef}
            id={tooltipId}
            role="tooltip"
            aria-label={ariaLabel}
            className={tooltipClasses}
            style={{
                top: tooltipPosition.top,
                left: tooltipPosition.left,
                maxWidth,
            }}
        >
            {content}
            {showArrow && <div className={arrowClasses} />}
        </div>
    );

    return (
        <>
            {triggerElement}
            {createPortal(tooltipContent, document.body)}
        </>
    );
};

UiTooltip.displayName = 'UiTooltip';

export default UiTooltip;
