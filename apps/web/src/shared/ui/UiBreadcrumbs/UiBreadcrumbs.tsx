import Link from 'next/link';
import { composeClasses } from '@/shared/lib';
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
 * Collapse breadcrumb items when maxItems is exceeded
 * Shows first item, collapse trigger with hidden items, and last N items
 */
const collapseItems = (
    items: UiBreadcrumbItem[],
    maxItems: number
): CollapsedBreadcrumbItem[] => {
    if (items.length <= maxItems) {
        return items;
    }

    // Always show first and last items
    const firstItem = items[0];
    const lastItems = items.slice(-(maxItems - 2));

    // Hidden items are everything between first and last items
    const hiddenItems = items.slice(1, items.length - (maxItems - 2));

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
    className,
    itemClassName,
    linkClassName,
    currentClassName,
    separatorClassName,
    collapseTriggerClassName,
    collapseMenuClassName,
    collapseMenuItemClassName,
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

    // Use custom classes if provided, otherwise use defaults
    const linkClasses = linkClassName ?? defaultLinkClasses;
    const currentClasses = currentClassName ?? defaultCurrentClasses;
    const separatorClasses = separatorClassName
        ? composeClasses('shrink-0', separatorClassName)
        : defaultSeparatorClasses;

    return (
        <nav aria-label={ariaLabel}>
            <ol className={containerClasses}>
                {displayItems.map((item, index) => {
                    const collapsedItem = item as CollapsedBreadcrumbItem;
                    const isLast = index === displayItems.length - 1;
                    const isCurrent = isLast && !item.href;
                    const isCollapseTrigger = collapsedItem.isCollapseTrigger;
                    const iconSize = iconSizeMap[size];

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
                                {isCollapseTrigger && collapsedItem.hiddenItems ? (
                                    <CollapsedDropdown
                                        hiddenItems={collapsedItem.hiddenItems}
                                        triggerClassName={collapseTriggerClassName}
                                        menuClassName={collapseMenuClassName}
                                        menuItemClassName={collapseMenuItemClassName}
                                        iconSize={iconSize}
                                    />
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
                                <span className={composeClasses(separatorClasses, separatorSpacingMap[size])} aria-hidden="true">
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
