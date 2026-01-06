import type { IconProps } from './types';

/**
 * Error/X circle icon for alerts and errors
 * Uses currentColor for universal styling
 */
const XCircleIcon = ({ className = 'h-5 w-5', ...props }: IconProps) => {
    return (
        <svg
            className={className}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            {...props}
        >
            <circle
                cx="10"
                cy="10"
                r="8"
                stroke="currentColor"
                strokeWidth="2"
            />
            <path
                d="M7.5 7.5L12.5 12.5M12.5 7.5L7.5 12.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default XCircleIcon;
