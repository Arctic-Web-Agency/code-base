import { ComponentType, SVGProps } from 'react';

export type UiPaginationSize = 'sm' | 'md' | 'lg';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export interface UiPaginationProps {
    /**
     * Current active page (1-indexed)
     */
    value: number;
    /**
     * Total number of pages
     */
    totalPages: number;
    /**
     * Callback when page changes
     */
    onChange: (page: number) => void;
    /**
     * Component size
     * @default 'md'
     */
    size?: UiPaginationSize;
    /**
     * Number of pages to show on each side of current page
     * @default 1
     */
    siblingCount?: number;
    /**
     * Number of pages to show at the start and end
     * @default 1
     */
    boundaryCount?: number;
    /**
     * Show first/last page buttons
     * @default false
     */
    showFirstLast?: boolean;
    /**
     * Disable all pagination controls
     * @default false
     */
    disabled?: boolean;
    /**
     * Custom icon for previous button
     */
    IconPrev?: IconComponent;
    /**
     * Custom icon for next button
     */
    IconNext?: IconComponent;
    /**
     * Custom icon for first page button
     */
    IconFirst?: IconComponent;
    /**
     * Custom icon for last page button
     */
    IconLast?: IconComponent;
    /**
     * Additional CSS classes for the container
     */
    className?: string;
    /**
     * Custom class names for individual parts
     */
    classNames?: {
        container?: string;
        item?: string;
        activeItem?: string;
        navButton?: string;
        ellipsis?: string;
    };
}
