'use client';

import Link from 'next/link';
import { composeClasses, useIsMobile } from '@/shared/lib';
import { ChevronDownIcon } from '@/shared/icons';
import CollapsedDropdown from './CollapsedDropdown';
import type { UiBreadcrumbsProps, UiBreadcrumbSize, UiBreadcrumbItem } from './types';

/**
 * Internal type for collapsed items with hidden items reference
 */
interface CollapsedBreadcrumbItem extends UiBreadcrumbItem {
    isCollapseTrigger?: boolean;
    hiddenItems?: UiBreadcrumbItem[];
}

/**
 * Size styles for breadcrumb items
 */
const sizeStyles: Record<UiBreadcrumbSize, string> = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
};

/**
 * Icon size mapping based on breadcrumb size
 */
const iconSizeMap: Record<UiBreadcrumbSize, number> = {
    sm: 14,
    md: 16,
    lg: 20,
};

/**
 * Separator size mapping based on breadcrumb size
 */
const separatorSizeMap: Record<UiBreadcrumbSize, string> = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
};

/**
 * Separator spacing (horizontal padding) to center it between items
 */
const separatorSpacingMap: Record<UiBreadcrumbSize, string> = {
    sm: 'px-1',   // 4px on each side
    md: 'px-2',   // 8px on each side
    lg: 'px-3',   // 12px on each side
};

/**
 * Truncate label if it exceeds maxLength
 * Returns object with truncated label and whether it was truncated
 */
const truncateLabel = (label: string, maxLength?: number): { text: string; isTruncated: boolean } => {
    if (!maxLength || label.length <= maxLength) {
        return { text: label, isTruncated: false };
    }
    return { text: `${label.slice(0, maxLength)}...`, isTruncated: true };
};

/**
 * Generate JSON-LD structured data for SEO (schema.org BreadcrumbList)
 */
const generateStructuredData = (items: UiBreadcrumbItem[], baseUrl: string) => {
    const itemListElement = items
        .filter((item) => item.href) // Only include items with URLs
        .map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.label,
            item: item.href?.startsWith('http')
                ? item.href
                : `${baseUrl.replace(/\/$/, '')}${item.href}`,
        }));

    // Add current page (last item without href) if exists
    const lastItem = items[items.length - 1];
    if (!lastItem.href) {
        itemListElement.push({
            '@type': 'ListItem',
            position: itemListElement.length + 1,
            name: lastItem.label,
            item: typeof window !== 'undefined' ? window.location.href : baseUrl,
        });
    }

    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement,
    };
};

/**
 * Collapse breadcrumb items when maxItems is exceeded
 * Shows first item, collapse trigger with hidden items, and last N items
 *
 * For maxItems=2: shows first + last (no collapse trigger)
 * For maxItems>=3: shows first + "..." + last (maxItems-2) items
 */
const collapseItems = (
    items: UiBreadcrumbItem[],
    maxItems: number
): CollapsedBreadcrumbItem[] => {
    if (items.length <= maxItems) {
        return items;
    }

    // Special case: maxItems=2 means just show first and last
    if (maxItems === 2) {
        return [items[0], items[items.length - 1]];
    }

    // For maxItems >= 3: show first + collapse trigger + last (maxItems-2) items
    const firstItem = items[0];
    const lastItemsCount = maxItems - 2; // Reserve 1 for first, 1 for "..."
    const lastItems = items.slice(-lastItemsCount);

    // Hidden items are everything between first and last items
    const hiddenItems = items.slice(1, items.length - lastItemsCount);

    return [
        firstItem,
        {
            label: '...',
            href: undefined,
            isCollapseTrigger: true,
            hiddenItems,
        },
        ...lastItems,
    ];
};

/**
 * UiBreadcrumbs - Universal breadcrumb navigation component
 *
 * @example
 * ```tsx
 * <UiBreadcrumbs
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Products', href: '/products' },
 *     { label: 'Laptop' }
 *   ]}
 * />
 * ```
 */
const UiBreadcrumbs = ({
    items,
    size = 'md',
    separator,
    maxItems,
    responsiveMaxItems,
    className,
    itemClassName,
    linkClassName,
    currentClassName,
    separatorClassName,
    collapseTriggerClassName,
    collapseMenuClassName,
    collapseMenuItemClassName,
    ariaLabel = 'Breadcrumb',
    structuredData = false,
    baseUrl,
    maxLabelLength,
}: UiBreadcrumbsProps) => {
    // Detect mobile device for responsive collapse
    const isMobile = useIsMobile();

    // Determine effective maxItems based on screen size
    const effectiveMaxItems = isMobile && responsiveMaxItems
        ? responsiveMaxItems
        : maxItems;

    // Collapse items if effectiveMaxItems is specified
    const displayItems = effectiveMaxItems
        ? collapseItems(items, effectiveMaxItems)
        : items;

    // Use custom separator or default ChevronDownIcon rotated right (-90deg)
    const defaultSeparator = (
        <ChevronDownIcon className={`${separatorSizeMap[size]} -rotate-90`} />
    );
    const separatorElement = separator ?? defaultSeparator;

    const containerClasses = composeClasses(
        'flex items-center flex-wrap',
        sizeStyles[size],
        className
    );

    // Default styles - used when custom className is not provided
    const defaultLinkClasses = composeClasses(
        'text-neutral-600 dark:text-neutral-400',
        'hover:text-neutral-900 dark:hover:text-neutral-100',
        'transition-colors',
        'focus:outline-none focus:underline'
    );

    const defaultCurrentClasses = composeClasses(
        'text-neutral-900 dark:text-neutral-100',
        'font-medium'
    );

    const defaultSeparatorClasses = composeClasses(
        'text-neutral-400 dark:text-neutral-600',
        'shrink-0'
    );

    const disabledClasses = 'opacity-50 cursor-not-allowed';

    // Use custom classes if provided, otherwise use defaults
    const linkClasses = linkClassName ?? defaultLinkClasses;
    const currentClasses = currentClassName ?? defaultCurrentClasses;
    const separatorClasses = separatorClassName
        ? composeClasses('shrink-0', separatorClassName)
        : defaultSeparatorClasses;

    // Generate structured data JSON-LD
    const jsonLd = structuredData && baseUrl
        ? generateStructuredData(items, baseUrl)
        : null;

    return (
        <>
            {/* JSON-LD Structured Data for SEO */}
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}

            <nav aria-label={ariaLabel}>
                <ol className={containerClasses}>
                {displayItems.map((item, index) => {
                    const collapsedItem = item as CollapsedBreadcrumbItem;
                    const isLast = index === displayItems.length - 1;
                    const isCurrent = isLast && !item.href;
                    const isCollapseTrigger = collapsedItem.isCollapseTrigger;
                    const iconSize = iconSizeMap[size];

                    // Truncate label if maxLabelLength is specified
                    const { text: displayLabel, isTruncated } = truncateLabel(item.label, maxLabelLength);
                    const titleAttr = isTruncated ? item.label : undefined;

                    return (
                        <li key={`${item.label}-${index}`} className={composeClasses('flex items-center', itemClassName)}>
                            {/* Breadcrumb item */}
                            <div className="flex items-center gap-1.5">
                                {/* Optional icon */}
                                {item.icon && (
                                    <span
                                        className="shrink-0"
                                        style={{ width: iconSize, height: iconSize }}
                                        aria-hidden="true"
                                    >
                                        {item.icon}
                                    </span>
                                )}

                                {/* Collapse trigger with dropdown */}
                                {isCollapseTrigger && collapsedItem.hiddenItems && (
                                    <CollapsedDropdown
                                        hiddenItems={collapsedItem.hiddenItems}
                                        triggerClassName={collapseTriggerClassName}
                                        menuClassName={collapseMenuClassName}
                                        menuItemClassName={collapseMenuItemClassName}
                                        iconSize={iconSize}
                                    />
                                )}

                                {/* Current page (last item) */}
                                {!isCollapseTrigger && isCurrent && (
                                    <span
                                        className={composeClasses(currentClasses, item.disabled && disabledClasses)}
                                        aria-current="page"
                                        aria-disabled={item.disabled}
                                        title={titleAttr}
                                    >
                                        {displayLabel}
                                    </span>
                                )}

                                {/* Disabled link - render as non-clickable span */}
                                {!isCollapseTrigger && !isCurrent && item.disabled && (
                                    <span
                                        className={composeClasses(linkClasses, disabledClasses)}
                                        aria-disabled="true"
                                        title={titleAttr}
                                    >
                                        {displayLabel}
                                    </span>
                                )}

                                {/* Active link */}
                                {!isCollapseTrigger && !isCurrent && !item.disabled && item.href && (
                                    <Link href={item.href} className={linkClasses} title={titleAttr}>
                                        {displayLabel}
                                    </Link>
                                )}

                                {/* Text without link (fallback) */}
                                {!isCollapseTrigger && !isCurrent && !item.disabled && !item.href && (
                                    <span className={currentClasses} title={titleAttr}>
                                        {displayLabel}
                                    </span>
                                )}
                            </div>

                            {/* Separator (not shown after last item) */}
                            {!isLast && (
                                <span className={composeClasses(separatorClasses, separatorSpacingMap[size])} aria-hidden="true">
                                    {separatorElement}
                                </span>
                            )}
                        </li>
                    );
                })}
                </ol>
            </nav>
        </>
    );
};

export default UiBreadcrumbs;
