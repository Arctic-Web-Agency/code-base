import { ReactNode } from 'react';

/**
 * Size variants for breadcrumb component
 */
export type UiBreadcrumbSize = 'sm' | 'md' | 'lg';

/**
 * Individual breadcrumb item
 */
export interface UiBreadcrumbItem {
    /**
     * Display label for the breadcrumb item
     */
    label: string;

    /**
     * URL for the breadcrumb item
     * If not provided, the item will be rendered as text (typically for current page)
     */
    href?: string;

    /**
     * Optional icon to display before the label
     */
    icon?: ReactNode;
}

/**
 * Props for the UiBreadcrumbs component
 */
export interface UiBreadcrumbsProps {
    /**
     * Array of breadcrumb items to display
     */
    items: UiBreadcrumbItem[];

    /**
     * Size of the breadcrumb text and spacing
     * @default 'md'
     */
    size?: UiBreadcrumbSize;

    /**
     * Custom separator element between breadcrumb items
     * @default ChevronRightIcon
     */
    separator?: ReactNode;

    /**
     * Maximum number of items to display before collapsing
     * When exceeded, middle items will be replaced with "..."
     * First and last items are always shown
     * @default undefined (no collapse)
     */
    maxItems?: number;

    /**
     * Additional CSS classes for the breadcrumb container
     */
    className?: string;

    /**
     * Accessible label for the breadcrumb navigation
     * @default 'Breadcrumb'
     */
    ariaLabel?: string;
}
