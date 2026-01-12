'use client';

import { ReactElement } from 'react';
import { toast, Toaster } from 'sonner';
import type { ExternalToast } from 'sonner';
import {
    CheckCircleIcon,
    XCircleIcon,
    AlertCircleIcon,
    InfoCircleIcon,
} from '@/shared/icons';
import { composeClasses } from '@/shared/lib';
import UiButton from '../UiButton/UiButton';
import type {
    UiAlertOptions,
    UiAlertProviderProps,
    UiAlertPromiseOptions,
    UiAlertStatus,
} from './types';
import './UiAlert.css';

/**
 * Status icons mapping
 */
const statusIcons = {
    success: CheckCircleIcon,
    error: XCircleIcon,
    warning: AlertCircleIcon,
    info: InfoCircleIcon,
} as const;

/**
 * Status color classes for icons and text
 */
const STATUS_COLORS: Record<UiAlertStatus, string> = {
    success: 'text-green-600 dark:text-green-500',
    error: 'text-red-600 dark:text-red-500',
    warning: 'text-amber-600 dark:text-amber-500',
    info: 'text-blue-600 dark:text-blue-500',
} as const;

/**
 * Common style constants
 */
const ICON_SIZE = 'w-5 h-5';
const TEXT_SIZE = 'text-sm';

/**
 * Build alert content with title, message, and actions
 */
const buildAlertContent = (
    options: Omit<UiAlertOptions, 'position' | 'duration'>,
    toastId?: string | number
) => {
    const {
        status,
        title,
        message,
        actions,
        icon,
        hideIcon,
    } = options;

    const StatusIcon = statusIcons[status];
    const showIcon = !hideIcon && (icon || StatusIcon);

    return (
        <div className="flex items-start gap-3 w-full">
            {/* Icon */}
            {showIcon && (
                <div className="shrink-0" aria-hidden="true">
                    {icon || <StatusIcon className={composeClasses(ICON_SIZE, STATUS_COLORS[status])} />}
                </div>
            )}

            {/* Content */}
            <div className="flex-1 min-w-0">
                {title && (
                    <div className={composeClasses('font-semibold mb-1 text-neutral-900 dark:text-white', TEXT_SIZE)}>
                        {title}
                    </div>
                )}
                <div className={composeClasses('text-neutral-700 dark:text-neutral-300', TEXT_SIZE)}>
                    {message}
                </div>

                {/* Actions */}
                {actions && actions.length > 0 && (
                    <div className="flex gap-2 mt-3">
                        {actions.map((action, index) => (
                            <UiButton
                                key={index}
                                variant={action.variant || 'text'}
                                size="sm"
                                onClick={() => {
                                    action.onClick();
                                    if (action.closeOnClick !== false && toastId) {
                                        toast.dismiss(toastId);
                                    }
                                }}
                            >
                                {action.label}
                            </UiButton>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

/**
 * Base alert function
 */
const showAlert = (options: UiAlertOptions) => {
    const {
        status,
        title,
        message,
        duration,
        position = 'top-right',
        actions,
        icon,
        hideIcon,
        dismissible = true,
        onDismiss,
        className,
    } = options;

    const resolvedDuration = duration ?? (actions && actions.length > 0 ? Infinity : 5000);

    const sonnerOptions: ExternalToast = {
        duration: resolvedDuration === Infinity ? Infinity : resolvedDuration,
        position,
        dismissible,
        onDismiss,
        className,
    };

    let toastId: string | number;

    // Use Sonner's built-in variants when possible (no custom icon/title/actions)
    if (!icon && !title && !actions && !hideIcon) {
        switch (status) {
            case 'success':
                toastId = toast.success(message, sonnerOptions);
                break;
            case 'error':
                toastId = toast.error(message, sonnerOptions);
                break;
            case 'warning':
                toastId = toast.warning(message, sonnerOptions);
                break;
            case 'info':
                toastId = toast.info(message, sonnerOptions);
                break;
            default:
                toastId = toast(message, sonnerOptions);
                break;
        }
    } else {
        // Custom alert with our content builder
        toastId = toast.custom(
            (id) => buildAlertContent({
                status,
                title,
                message,
                actions,
                icon,
                hideIcon,
            }, id),
            sonnerOptions
        );
    }

    return toastId;
};

/**
 * Alert API
 */
export const alert = Object.assign(showAlert, {
    /**
     * Show success alert
     */
    success: (
        message: UiAlertOptions['message'],
        options?: Partial<Omit<UiAlertOptions, 'status' | 'message'>>
    ) => showAlert({ ...options, status: 'success', message }),

    /**
     * Show error alert
     */
    error: (
        message: UiAlertOptions['message'],
        options?: Partial<Omit<UiAlertOptions, 'status' | 'message'>>
    ) => showAlert({ ...options, status: 'error', message }),

    /**
     * Show warning alert
     */
    warning: (
        message: UiAlertOptions['message'],
        options?: Partial<Omit<UiAlertOptions, 'status' | 'message'>>
    ) => showAlert({ ...options, status: 'warning', message }),

    /**
     * Show info alert
     */
    info: (
        message: UiAlertOptions['message'],
        options?: Partial<Omit<UiAlertOptions, 'status' | 'message'>>
    ) => showAlert({ ...options, status: 'info', message }),

    /**
     * Promise-based alert for async operations
     */
    promise: <T = unknown>(
        promise: Promise<T>,
        options: UiAlertPromiseOptions<T>
    ) => {
        const { loading, success, error, duration = 5000, position = 'top-right', className } = options;

        return toast.promise(promise, {
            loading,
            success: (data) => {
                if (typeof success === 'function') {
                    return success(data);
                }
                return success;
            },
            error: (err) => {
                if (typeof error === 'function') {
                    return error(err);
                }
                return error;
            },
            duration,
            position,
            unstyled: true,
            className,
        });
    },

    /**
     * Custom alert with full control
     * @param jsx - Function that receives toast ID and returns a React element
     * @param options - Additional toast options
     */
    custom: (
        jsx: (id: string | number) => ReactElement,
        options?: ExternalToast
    ) => {
        return toast.custom(jsx, options);
    },

    /**
     * Dismiss alert by ID
     */
    dismiss: (toastId?: string | number) => {
        toast.dismiss(toastId);
    },

    /**
     * Dismiss all alerts
     */
    dismissAll: () => {
        toast.dismiss();
    },
});

/**
 * Alert Provider Component
 * Wraps the Sonner Toaster with custom configuration
 */
export const UiAlertProvider = (props: UiAlertProviderProps) => {
    const {
        children,
        position = 'top-right',
        duration = 5000,
        visibleToasts = 3,
        expand = true,
        gap = 14,
        offset = 16,
        className,
        richColors = false,
    } = props;

    return (
        <>
            {children}
            <Toaster
                position={position}
                duration={duration}
                visibleToasts={visibleToasts}
                expand={expand}
                gap={gap}
                offset={`${offset}px`}
                className={className}
                richColors={richColors}
                closeButton={false}
                toastOptions={{
                    unstyled: true,
                    classNames: {
                        toast: composeClasses(
                            'bg-white dark:bg-neutral-900',
                            'border border-neutral-200 dark:border-neutral-800',
                            'shadow-lg',
                            'rounded-lg',
                            'p-4',
                            'text-neutral-900 dark:text-white',
                            'flex items-center gap-3',
                        ),
                        title: composeClasses('font-semibold text-neutral-900 dark:text-white', TEXT_SIZE),
                        description: composeClasses('text-neutral-700 dark:text-neutral-300', TEXT_SIZE),
                        icon: composeClasses('text-current', 'shrink-0'),
                        actionButton: 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900',
                        cancelButton: 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white',
                        closeButton: 'bg-transparent border-neutral-200 dark:border-neutral-800',
                        success: STATUS_COLORS.success,
                        error: STATUS_COLORS.error,
                        warning: STATUS_COLORS.warning,
                        info: STATUS_COLORS.info,
                        loading: STATUS_COLORS.info,
                    },
                }}
            />
        </>
    );
};

UiAlertProvider.displayName = 'UiAlertProvider';
