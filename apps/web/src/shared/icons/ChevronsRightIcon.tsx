import type { IconProps } from './types';

/**
 * Double chevron right icon component for navigation (first/last page)
 * Use CSS rotate-180 for left direction
 * Uses currentColor for universal styling
 */
const ChevronsRightIcon = ({ className = 'h-5 w-5', ...props }: IconProps) => {
    return (
        <svg
            className={className}
            viewBox="0 0 20 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            suppressHydrationWarning
            {...props}
        >
            <path
                fillRule="evenodd"
                d="M4.21 14.77a.75.75 0 01.02-1.06L8.168 10 4.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
                suppressHydrationWarning
            />
            <path
                fillRule="evenodd"
                d="M9.21 14.77a.75.75 0 01.02-1.06L13.168 10 9.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
                suppressHydrationWarning
            />
        </svg>
    );
};

export default ChevronsRightIcon;
