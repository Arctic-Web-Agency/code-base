import type { IconProps } from './types';

/**
 * Success/check circle icon for alerts and confirmations
 * Uses currentColor for universal styling
 */
const CheckCircleIcon = ({ className = 'h-5 w-5', ...props }: IconProps) => {
    return (
        <svg
            className={className}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            suppressHydrationWarning
            {...props}
        >
            <circle
                cx="10"
                cy="10"
                r="8"
                stroke="currentColor"
                strokeWidth="2"
                suppressHydrationWarning
            />
            <path
                d="M6 10L8.5 12.5L14 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                suppressHydrationWarning
            />
        </svg>
    );
};

export default CheckCircleIcon;
