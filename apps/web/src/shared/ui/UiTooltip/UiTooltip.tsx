'use client';

import * as Tooltip from '@radix-ui/react-tooltip';
import { composeClasses } from '@/shared/lib';
import type { UiTooltipProps } from './types';

/**
 * Universal Tooltip component built on Radix UI
 * Provides accessible hover/focus hints with minimal styling
 */
const UiTooltip = (props: UiTooltipProps) => {
    const {
        children,
        content,
        side = 'top',
        align = 'center',
        delayDuration = 200,
        skipDelayDuration = 300,
        showArrow = true,
        sideOffset = 5,
        disabled = false,
        className,
        arrowClassName,
    } = props;

    if (disabled) {
        return <>{children}</>;
    }

    const tooltipClasses = composeClasses(
        'z-50',
        'px-3 py-2',
        'rounded-md',
        'bg-neutral-900 dark:bg-neutral-100',
        'text-white dark:text-neutral-900',
        'text-sm',
        'shadow-lg',
        'max-w-xs',
        'break-words',
        'animate-fadeIn',
        className
    );

    const arrowClasses = composeClasses(
        'fill-neutral-900 dark:fill-neutral-100',
        arrowClassName
    );

    return (
        <Tooltip.Provider
            delayDuration={delayDuration}
            skipDelayDuration={skipDelayDuration}
        >
            <Tooltip.Root>
                <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>

                <Tooltip.Portal>
                    <Tooltip.Content
                        side={side}
                        align={align}
                        sideOffset={sideOffset}
                        className={tooltipClasses}
                    >
                        {content}
                        {showArrow && (
                            <Tooltip.Arrow className={arrowClasses} />
                        )}
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
};

UiTooltip.displayName = 'UiTooltip';

export default UiTooltip;
