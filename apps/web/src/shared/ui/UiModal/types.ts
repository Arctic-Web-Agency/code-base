import { ReactNode } from 'react';

export type UiModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Base props for UiModal component
 */
export interface UiModalProps {
    /**
     * Whether the modal is open
     */
    isOpen: boolean;

    /**
     * Callback when modal should close
     */
    onClose: () => void;

    /**
     * Modal size variant
     * @default 'md'
     */
    size?: UiModalSize;

    /**
     * Modal title (header)
     */
    title?: ReactNode;

    /**
     * Modal content (body)
     */
    children: ReactNode;

    /**
     * Footer content (typically action buttons)
     */
    footer?: ReactNode;

    /**
     * Whether to show close button in header
     * @default true
     */
    showCloseButton?: boolean;

    /**
     * Whether clicking overlay closes modal
     * @default true
     */
    closeOnOverlayClick?: boolean;

    /**
     * Whether pressing ESC closes modal
     * @default true
     */
    closeOnEsc?: boolean;

    /**
     * Custom className for modal content
     */
    className?: string;

    /**
     * Custom className for overlay
     */
    overlayClassName?: string;

    /**
     * Accessible label for screen readers
     */
    ariaLabel?: string;

    /**
     * ID of element that describes modal
     */
    ariaDescribedBy?: string;
}
