'use client';

import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { UiModalProps, UiModalSize } from './types';

const composeClasses = (
    ...classes: Array<string | false | undefined>
): string => classes.filter(Boolean).join(' ');

/**
 * Size styles for modal content
 */
const sizeStyles: Record<UiModalSize, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4',
};

/**
 * Close icon SVG
 */
const CloseIcon = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <path
            d="M15 5L5 15M5 5L15 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

/**
 * Universal Modal component with Portal, animations, and accessibility
 */
const UiModal = (props: UiModalProps) => {
    const {
        isOpen,
        onClose,
        size = 'md',
        title,
        children,
        footer,
        showCloseButton = true,
        closeOnOverlayClick = true,
        closeOnEsc = true,
        className,
        overlayClassName,
        ariaLabel,
        ariaDescribedBy,
    } = props;

    const modalRef = useRef<HTMLDivElement>(null);
    const titleId = `${useId()}-title`;
    const descriptionId = ariaDescribedBy || `${useId()}-description`;

    // Handle ESC key press
    useEffect(() => {
        if (!isOpen || !closeOnEsc) return;

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [isOpen, closeOnEsc, onClose]);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (!isOpen) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [isOpen]);

    // Focus trap and initial focus
    useEffect(() => {
        if (!isOpen || !modalRef.current) return;

        const modal = modalRef.current;
        const focusableElements = modal.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        // Focus first element
        firstElement.focus();

        const handleTab = (event: KeyboardEvent) => {
            if (event.key !== 'Tab') return;

            if (event.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        };

        modal.addEventListener('keydown', handleTab as EventListener);
        return () =>
            modal.removeEventListener('keydown', handleTab as EventListener);
    }, [isOpen]);

    // Handle overlay click
    const handleOverlayClick = (
        event: React.MouseEvent<HTMLDivElement>
    ) => {
        if (closeOnOverlayClick && event.target === event.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    const modalContent = (
        <div
            className={composeClasses(
                'fixed inset-0 z-50',
                'flex items-center justify-center',
                'p-4',
                'bg-black/50',
                'backdrop-blur-sm',
                'animate-fadeIn',
                overlayClassName
            )}
            onClick={handleOverlayClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            aria-label={ariaLabel}
            aria-describedby={descriptionId}
        >
            <div
                ref={modalRef}
                className={composeClasses(
                    'relative w-full',
                    sizeStyles[size],
                    'bg-white dark:bg-neutral-800',
                    'rounded-lg shadow-xl',
                    'animate-scaleIn',
                    'flex flex-col',
                    'max-h-[90vh]',
                    className
                )}
            >
                {/* Header */}
                {(title || showCloseButton) && (
                    <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
                        {title && (
                            <h2
                                id={titleId}
                                className="text-lg font-semibold text-neutral-900 dark:text-neutral-100"
                            >
                                {title}
                            </h2>
                        )}
                        {showCloseButton && (
                            <button
                                type="button"
                                onClick={onClose}
                                className={composeClasses(
                                    'p-1.5 rounded-lg',
                                    'text-neutral-400 hover:text-neutral-600',
                                    'dark:text-neutral-500 dark:hover:text-neutral-300',
                                    'hover:bg-neutral-100 dark:hover:bg-neutral-700',
                                    'transition-colors',
                                    'focus:outline-none focus:ring-2 focus:ring-neutral-500',
                                    !title && 'ml-auto'
                                )}
                                aria-label="Close modal"
                            >
                                <CloseIcon />
                            </button>
                        )}
                    </div>
                )}

                {/* Body */}
                <div
                    id={descriptionId}
                    className="flex-1 overflow-y-auto px-6 py-4"
                >
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="px-6 py-4 border-t border-neutral-200 dark:border-neutral-700">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );

    // Render modal in portal
    if (typeof window === 'undefined') return null;

    return createPortal(modalContent, document.body);
};

UiModal.displayName = 'UiModal';

export default UiModal;
