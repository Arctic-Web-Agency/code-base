'use client';

import { useMemo } from 'react';
import { composeClasses } from '@/shared/lib';
import { ChevronDownIcon, ChevronsRightIcon } from '@/shared/icons';
import type {
    UiPaginationProps,
    UiPaginationSize,
    UiPaginationVariant,
} from './types';

/**
 * Size styles for pagination items
 */
const sizeStyles: Record<UiPaginationSize, string> = {
    sm: 'min-w-7 h-7 text-sm',
    md: 'min-w-9 h-9 text-base',
    lg: 'min-w-11 h-11 text-lg',
};

/**
 * Icon size classes based on pagination size
 */
const iconSizeStyles: Record<UiPaginationSize, string> = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
};

/**
 * Gap styles based on size
 */
const gapStyles: Record<UiPaginationSize, string> = {
    sm: 'gap-1',
    md: 'gap-1.5',
    lg: 'gap-2',
};

/**
 * Variant styles for pagination items (non-active state)
 */
const variantStyles: Record<UiPaginationVariant, string> = {
    filled: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700',
    outlined:
        'border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800',
    ghost: 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800',
};

/**
 * Variant styles for active pagination item
 */
const activeVariantStyles: Record<UiPaginationVariant, string> = {
    filled: 'bg-neutral-800 dark:bg-neutral-100 text-white dark:text-neutral-900',
    outlined:
        'border border-neutral-800 dark:border-neutral-100 bg-neutral-800 dark:bg-neutral-100 text-white dark:text-neutral-900',
    ghost: 'bg-neutral-800 dark:bg-neutral-100 text-white dark:text-neutral-900',
};

/**
 * Disabled styles
 */
const disabledStyles = 'opacity-50 cursor-not-allowed pointer-events-none';

/**
 * Ellipsis component
 */
const ELLIPSIS = 'ellipsis';

/**
 * Generate pagination range with ellipsis
 */
function usePaginationRange(
    currentPage: number,
    totalPages: number,
    siblingCount: number,
    boundaryCount: number
): (number | typeof ELLIPSIS)[] {
    return useMemo(() => {
        const totalPageNumbers = siblingCount * 2 + 3 + boundaryCount * 2;

        // Case 1: Total pages fits without ellipsis
        if (totalPageNumbers >= totalPages) {
            return range(1, totalPages);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(
            currentPage + siblingCount,
            totalPages
        );

        const showLeftEllipsis = leftSiblingIndex > boundaryCount + 2;
        const showRightEllipsis =
            rightSiblingIndex < totalPages - boundaryCount - 1;

        const firstPages = range(1, boundaryCount);
        const lastPages = range(totalPages - boundaryCount + 1, totalPages);

        // Case 2: No left ellipsis, show right ellipsis
        if (!showLeftEllipsis && showRightEllipsis) {
            const leftItemCount = 3 + 2 * siblingCount;
            const leftRange = range(1, leftItemCount);
            return [...leftRange, ELLIPSIS, ...lastPages];
        }

        // Case 3: No right ellipsis, show left ellipsis
        if (showLeftEllipsis && !showRightEllipsis) {
            const rightItemCount = 3 + 2 * siblingCount;
            const rightRange = range(totalPages - rightItemCount + 1, totalPages);
            return [...firstPages, ELLIPSIS, ...rightRange];
        }

        // Case 4: Both ellipsis
        const middleRange = range(leftSiblingIndex, rightSiblingIndex);
        return [...firstPages, ELLIPSIS, ...middleRange, ELLIPSIS, ...lastPages];
    }, [currentPage, totalPages, siblingCount, boundaryCount]);
}

/**
 * Helper to generate range array
 */
function range(start: number, end: number): number[] {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
}

/**
 * Universal pagination component with support for multiple variants and sizes.
 */
const UiPagination = ({
    value,
    totalPages,
    onChange,
    variant = 'filled',
    size = 'md',
    siblingCount = 1,
    boundaryCount = 1,
    showFirstLast = false,
    disabled = false,
    IconPrev,
    IconNext,
    IconFirst,
    IconLast,
    className,
    classNames,
}: UiPaginationProps) => {
    const paginationRange = usePaginationRange(
        value,
        totalPages,
        siblingCount,
        boundaryCount
    );

    const isFirstPage = value === 1;
    const isLastPage = value === totalPages;

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== value && !disabled) {
            onChange(page);
        }
    };

    const baseItemClasses = composeClasses(
        'inline-flex items-center justify-center rounded-md',
        'cursor-pointer select-none',
        'transition-colors duration-150',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2',
        sizeStyles[size]
    );

    const iconClasses = iconSizeStyles[size];

    // Don't render if only one page
    if (totalPages <= 1) {
        return null;
    }

    return (
        <nav
            className={composeClasses(
                'inline-flex items-center',
                gapStyles[size],
                disabled && disabledStyles,
                className,
                classNames?.container
            )}
            aria-label="Pagination"
            role="navigation"
        >
            {/* First page button */}
            {showFirstLast && (
                <button
                    type="button"
                    onClick={() => handlePageChange(1)}
                    disabled={isFirstPage || disabled}
                    className={composeClasses(
                        baseItemClasses,
                        variantStyles[variant],
                        (isFirstPage || disabled) && disabledStyles,
                        classNames?.navButton
                    )}
                    aria-label="Go to first page"
                >
                    {IconFirst ? (
                        <IconFirst className={iconClasses} />
                    ) : (
                        <ChevronsRightIcon className={composeClasses(iconClasses, 'rotate-180')} />
                    )}
                </button>
            )}

            {/* Previous page button */}
            <button
                type="button"
                onClick={() => handlePageChange(value - 1)}
                disabled={isFirstPage || disabled}
                className={composeClasses(
                    baseItemClasses,
                    variantStyles[variant],
                    (isFirstPage || disabled) && disabledStyles,
                    classNames?.navButton
                )}
                aria-label="Go to previous page"
            >
                {IconPrev ? (
                    <IconPrev className={iconClasses} />
                ) : (
                    <ChevronDownIcon className={composeClasses(iconClasses, 'rotate-90')} />
                )}
            </button>

            {/* Page numbers */}
            {paginationRange.map((page, index) => {
                if (page === ELLIPSIS) {
                    return (
                        <span
                            key={`ellipsis-${index}`}
                            className={composeClasses(
                                baseItemClasses,
                                'cursor-default',
                                'text-neutral-500 dark:text-neutral-400',
                                classNames?.ellipsis
                            )}
                            aria-hidden="true"
                        >
                            ...
                        </span>
                    );
                }

                const isActive = page === value;

                return (
                    <button
                        key={page}
                        type="button"
                        onClick={() => handlePageChange(page)}
                        disabled={disabled}
                        className={composeClasses(
                            baseItemClasses,
                            isActive
                                ? activeVariantStyles[variant]
                                : variantStyles[variant],
                            disabled && disabledStyles,
                            isActive ? classNames?.activeItem : classNames?.item
                        )}
                        aria-label={`Go to page ${page}`}
                        aria-current={isActive ? 'page' : undefined}
                    >
                        {page}
                    </button>
                );
            })}

            {/* Next page button */}
            <button
                type="button"
                onClick={() => handlePageChange(value + 1)}
                disabled={isLastPage || disabled}
                className={composeClasses(
                    baseItemClasses,
                    variantStyles[variant],
                    (isLastPage || disabled) && disabledStyles,
                    classNames?.navButton
                )}
                aria-label="Go to next page"
            >
                {IconNext ? (
                    <IconNext className={iconClasses} />
                ) : (
                    <ChevronDownIcon className={composeClasses(iconClasses, '-rotate-90')} />
                )}
            </button>

            {/* Last page button */}
            {showFirstLast && (
                <button
                    type="button"
                    onClick={() => handlePageChange(totalPages)}
                    disabled={isLastPage || disabled}
                    className={composeClasses(
                        baseItemClasses,
                        variantStyles[variant],
                        (isLastPage || disabled) && disabledStyles,
                        classNames?.navButton
                    )}
                    aria-label="Go to last page"
                >
                    {IconLast ? (
                        <IconLast className={iconClasses} />
                    ) : (
                        <ChevronsRightIcon className={iconClasses} />
                    )}
                </button>
            )}
        </nav>
    );
};

UiPagination.displayName = 'UiPagination';

export default UiPagination;
