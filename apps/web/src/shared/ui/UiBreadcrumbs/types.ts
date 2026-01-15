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

    /**
     * Whether the breadcrumb item is disabled
     * Disabled items are not clickable and have reduced opacity
     * @default false
     */
    disabled?: boolean;
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
     * Additional CSS classes for each breadcrumb item wrapper (li element)
     */
    itemClassName?: string;

    /**
     * Additional CSS classes for breadcrumb links
     * Overrides default link styles when provided
     */
    linkClassName?: string;

    /**
     * Additional CSS classes for the current (last) breadcrumb item
     * Overrides default current item styles when provided
     */
    currentClassName?: string;

    /**
     * Additional CSS classes for the separator between items
     * Overrides default separator styles when provided
     */
    separatorClassName?: string;

    /**
     * Additional CSS classes for the collapse trigger button ("...")
     */
    collapseTriggerClassName?: string;

    /**
     * Additional CSS classes for the collapse dropdown menu
     */
    collapseMenuClassName?: string;

    /**
     * Additional CSS classes for items inside the collapse dropdown
     */
    collapseMenuItemClassName?: string;

    /**
     * Accessible label for the breadcrumb navigation
     * @default 'Breadcrumb'
     */
    ariaLabel?: string;

    /**
     * Enable JSON-LD structured data for SEO (schema.org BreadcrumbList)
     * Requires baseUrl to generate absolute URLs
     * @default false
     */
    structuredData?: boolean;

    /**
     * Base URL for generating absolute URLs in structured data
     * Required when structuredData is enabled
     * @example 'https://example.com'
     */
    baseUrl?: string;

    /**
     * Maximum number of characters for breadcrumb labels
     * Labels exceeding this length will be truncated with "..."
     * Full label is preserved in title attribute for hover tooltip
     * @default undefined (no truncation)
     */
    maxLabelLength?: number;
}
