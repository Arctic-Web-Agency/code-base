import { ReactNode } from 'react';

/**
 * Alert status variants
 */
export type UiAlertStatus = 'success' | 'error' | 'warning' | 'info';

/**
 * Alert position on screen
 */
export type UiAlertPosition =
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';

/**
 * Action button configuration
 */
export interface UiAlertAction {
    /**
     * Button label
     */
    label: string;

    /**
     * Click handler
     */
    onClick: () => void;

    /**
     * Button variant (uses UiButton variants)
     * @default 'text'
     */
    variant?: 'filled' | 'text';

    /**
     * Whether this action closes the alert after execution
     * @default true
     */
    closeOnClick?: boolean;
}

/**
 * Alert display options
 */
export interface UiAlertOptions {
    /**
     * Alert status (determines icon and colors)
     */
    status: UiAlertStatus;

    /**
     * Alert title
     */
    title?: string;

    /**
     * Alert message/description
     */
    message: ReactNode;

    /**
     * Duration in milliseconds before auto-dismiss
     * Set to 0 or Infinity to disable auto-dismiss
     * @default 5000
     */
    duration?: number;

    /**
     * Position on screen
     * @default 'top-right'
     */
    position?: UiAlertPosition;

    /**
     * Action buttons
     */
    actions?: UiAlertAction[];

    /**
     * Custom icon (overrides default status icon)
     */
    icon?: ReactNode;

    /**
     * Hide default status icon
     * @default false
     */
    hideIcon?: boolean;

    /**
     * Show close button
     * @default true
     */
    dismissible?: boolean;

    /**
     * Callback when alert is dismissed
     */
    onDismiss?: () => void;

    /**
     * Custom className for the alert
     */
    className?: string;

    /**
     * Custom description ID for accessibility
     */
    ariaDescribedBy?: string;
}

/**
 * Provider configuration
 */
export interface UiAlertProviderProps {
    /**
     * Child components
     */
    children: ReactNode;

    /**
     * Default position for all alerts
     * @default 'top-right'
     */
    position?: UiAlertPosition;

    /**
     * Default duration for all alerts
     * @default 5000
     */
    duration?: number;

    /**
     * Maximum number of visible alerts
     * @default 3
     */
    visibleToasts?: number;

    /**
     * Enable/disable expand on hover
     * @default true
     */
    expand?: boolean;

    /**
     * Gap between alerts in pixels
     * @default 14
     */
    gap?: number;

    /**
     * Offset from screen edge in pixels
     * @default 16
     */
    offset?: number;

    /**
     * Custom className for toaster container
     */
    className?: string;

    /**
     * Rich colors mode (more vibrant colors)
     * @default false
     */
    richColors?: boolean;
}

/**
 * Promise-based alert options for async operations
 */
export interface UiAlertPromiseOptions<T = unknown> {
    /**
     * Loading state message
     */
    loading: string | ReactNode;

    /**
     * Success state message (can be function receiving resolved value)
     */
    success: string | ReactNode | ((data: T) => string | ReactNode);

    /**
     * Error state message (can be function receiving error)
     */
    error: string | ReactNode | ((error: unknown) => string | ReactNode);

    /**
     * Duration for success/error states
     * @default 5000
     */
    duration?: number;

    /**
     * Position for the alert
     * @default 'top-right'
     */
    position?: UiAlertPosition;

    /**
     * Custom className for the alert
     */
    className?: string;
}
