'use client';

import { ComponentType, useMemo, SVGProps } from 'react';
import { composeClasses } from '@/shared/lib';
import { ChevronDownIcon, ChevronsRightIcon } from '@/shared/icons';
import UiButton from '@/shared/ui/UiButton';
import type { UiPaginationProps } from './types';

/**
 * Active page item styles
 */
const activeItemStyles =
    'font-semibold text-neutral-900 dark:text-neutral-100';

/**
 * Ellipsis marker
 */
const ELLIPSIS = 'ellipsis';

/**
 * HOC to create rotated icon component
 */
const withRotation = (Icon: ComponentType<SVGProps<SVGSVGElement>>, className: string) => {
    const Rotated = (props: SVGProps<SVGSVGElement>) => (
        <span className={className}><Icon {...props} /></span>
    );
    Rotated.displayName = `Rotated(${Icon.displayName || 'Icon'})`;
    return Rotated;
};

/**
 * Default navigation icons (created once at module level)
 */
const IconPrevDefault = withRotation(ChevronDownIcon, 'rotate-90');
const IconNextDefault = withRotation(ChevronDownIcon, '-rotate-90');
const IconFirstDefault = withRotation(ChevronsRightIcon, 'rotate-180');

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
 * Universal pagination component with ellipsis support and multiple sizes.
 */
const UiPagination = ({
    value,
    totalPages,
    onChange,
    size = 'md',
    siblingCount = 1,
    boundaryCount = 1,
    showFirstLast = false,
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
        if (page >= 1 && page <= totalPages && page !== value) {
            onChange(page);
        }
    };

    const ellipsisClasses = composeClasses(
        'inline-flex items-center justify-center',
        'cursor-default',
        classNames?.ellipsis
    );

    // Don't render if only one page
    if (totalPages <= 1) {
        return null;
    }

    return (
        <nav
            className={composeClasses(
                'inline-flex items-center',
                className,
                classNames?.container
            )}
            aria-label="Pagination"
        >
            {/* First page button */}
            {showFirstLast && (
                <UiButton
                    variant="text"
                    size={size}
                    onClick={() => handlePageChange(1)}
                    disabled={isFirstPage}
                    IconLeft={IconFirst || IconFirstDefault}
                    className={classNames?.navButton}
                    aria-label="Go to first page"
                />
            )}

            {/* Previous page button */}
            <UiButton
                variant="text"
                size={size}
                onClick={() => handlePageChange(value - 1)}
                disabled={isFirstPage}
                IconLeft={IconPrev || IconPrevDefault}
                className={classNames?.navButton}
                aria-label="Go to previous page"
            />

            {/* Page numbers */}
            {paginationRange.map((page, index) => {
                if (page === ELLIPSIS) {
                    return (
                        <span
                            key={`ellipsis-${index}`}
                            className={ellipsisClasses}
                            aria-hidden="true"
                        >
                            ...
                        </span>
                    );
                }

                const isActive = page === value;

                return (
                    <UiButton
                        key={page}
                        variant="text"
                        size={size}
                        onClick={() => handlePageChange(page)}
                        className={composeClasses(
                            isActive && activeItemStyles,
                            isActive ? classNames?.activeItem : classNames?.item
                        )}
                        aria-label={`Go to page ${page}`}
                        aria-current={isActive ? 'page' : undefined}
                    >
                        {page}
                    </UiButton>
                );
            })}

            {/* Next page button */}
            <UiButton
                variant="text"
                size={size}
                onClick={() => handlePageChange(value + 1)}
                disabled={isLastPage}
                IconLeft={IconNext || IconNextDefault}
                className={classNames?.navButton}
                aria-label="Go to next page"
            />

            {/* Last page button */}
            {showFirstLast && (
                <UiButton
                    variant="text"
                    size={size}
                    onClick={() => handlePageChange(totalPages)}
                    disabled={isLastPage}
                    IconLeft={IconLast || ChevronsRightIcon}
                    className={classNames?.navButton}
                    aria-label="Go to last page"
                />
            )}
        </nav>
    );
};

UiPagination.displayName = 'UiPagination';

export default UiPagination;
