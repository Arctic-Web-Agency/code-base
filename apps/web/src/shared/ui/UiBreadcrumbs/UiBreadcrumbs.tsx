'use client';

import Link from 'next/link';
import { composeClasses } from '@/shared/lib';
import { ChevronDownIcon } from '@/shared/icons';
import type { UiBreadcrumbsProps, UiBreadcrumbSize, UiBreadcrumbItem } from './types';

/**
 * Size styles for breadcrumb items
 */
const sizeStyles: Record<UiBreadcrumbSize, string> = {
    sm: 'text-xs gap-1',
    md: 'text-sm gap-2',
    lg: 'text-base gap-3',
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
 * Collapse breadcrumb items when maxItems is exceeded
 * Shows first item, "...", and last N items
 */
const collapseItems = (items: UiBreadcrumbItem[], maxItems: number): UiBreadcrumbItem[] => {
    if (items.length <= maxItems) {
        return items;
    }

    // Always show first and last items
    const firstItem = items[0];
    const lastItems = items.slice(-(maxItems - 2));

    return [
        firstItem,
        { label: '...', href: undefined },
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
    className,
    ariaLabel = 'Breadcrumb',
}: UiBreadcrumbsProps) => {
    // Collapse items if maxItems is specified
    const displayItems = maxItems ? collapseItems(items, maxItems) : items;

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

    const linkClasses = composeClasses(
        'text-neutral-600 dark:text-neutral-400',
        'hover:text-neutral-900 dark:hover:text-neutral-100',
        'transition-colors',
        'focus:outline-none focus:underline'
    );

    const currentClasses = composeClasses(
        'text-neutral-900 dark:text-neutral-100',
        'font-medium'
    );

    const separatorClasses = composeClasses(
        'text-neutral-400 dark:text-neutral-600',
        'flex-shrink-0'
    );

    return (
        <nav aria-label={ariaLabel}>
            <ol className={containerClasses}>
                {displayItems.map((item, index) => {
                    const isLast = index === displayItems.length - 1;
                    const isCurrent = isLast && !item.href;
                    const isCollapsed = item.label === '...';
                    const iconSize = iconSizeMap[size];

                    return (
                        <li key={`${item.label}-${index}`} className="flex items-center gap-inherit">
                            {/* Breadcrumb item */}
                            <div className="flex items-center gap-1.5">
                                {/* Optional icon */}
                                {item.icon && (
                                    <span
                                        className="flex-shrink-0"
                                        style={{ width: iconSize, height: iconSize }}
                                        aria-hidden="true"
                                    >
                                        {item.icon}
                                    </span>
                                )}

                                {/* Collapsed indicator (non-interactive) */}
                                {isCollapsed ? (
                                    <span className={currentClasses} aria-hidden="true">
                                        {item.label}
                                    </span>
                                ) : /* Current page (non-link) */
                                isCurrent ? (
                                    <span
                                        className={currentClasses}
                                        aria-current="page"
                                    >
                                        {item.label}
                                    </span>
                                ) : /* Link to other pages */
                                item.href ? (
                                    <Link href={item.href} className={linkClasses}>
                                        {item.label}
                                    </Link>
                                ) : (
                                    /* Fallback for items without href but not last */
                                    <span className={currentClasses}>
                                        {item.label}
                                    </span>
                                )}
                            </div>

                            {/* Separator (not shown after last item) */}
                            {!isLast && (
                                <span className={separatorClasses} aria-hidden="true">
                                    {separatorElement}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default UiBreadcrumbs;
