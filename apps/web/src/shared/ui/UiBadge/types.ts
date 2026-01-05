import { ReactNode } from 'react';

/**
 * Badge status variants
 */
export type UiBadgeStatus = 'success' | 'error' | 'warning';

/**
 * Badge visual variants
 */
export type UiBadgeVariant = 'solid' | 'outline' | 'subtle';

/**
 * Badge size variants
 */
export type UiBadgeSize = 'sm' | 'md' | 'lg';

/**
 * Base props for UiBadge component
 */
export interface UiBadgeProps {
    /**
     * Badge status
     */
    status: UiBadgeStatus;

    /**
     * Visual variant
     * @default 'subtle'
     */
    variant?: UiBadgeVariant;

    /**
     * Size variant
     * @default 'md'
     */
    size?: UiBadgeSize;

    /**
     * Badge content
     */
    children: ReactNode;

    /**
     * Show status dot indicator
     * @default false
     */
    dot?: boolean;

    /**
     * Custom icon element
     */
    icon?: ReactNode;

    /**
     * Whether badge can be dismissed
     * @default false
     */
    dismissible?: boolean;

    /**
     * Callback when badge is dismissed
     */
    onDismiss?: () => void;

    /**
     * Custom className for badge
     */
    className?: string;

    /**
     * Accessible label for screen readers
     */
    ariaLabel?: string;
}
