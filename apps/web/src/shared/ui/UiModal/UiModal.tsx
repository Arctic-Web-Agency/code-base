'use client';

import { MouseEvent, useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@/shared/icons';
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
        event: MouseEvent<HTMLDivElement>
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
                    'animate-scaleIn',
                    'flex flex-col',
                    'max-h-[90vh]',
                    className
                )}
            >
                {/* Header */}
                {(title || showCloseButton) && (
                    <div className="flex items-center justify-between px-6 py-4">
                        {title && (
                            <div id={titleId}>
                                {title}
                            </div>
                        )}
                        {showCloseButton && (
                            <button
                                type="button"
                                onClick={onClose}
                                className={composeClasses(
                                    'p-1.5',
                                    'focus:outline-none',
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
                    <div className="px-6 py-4">
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
