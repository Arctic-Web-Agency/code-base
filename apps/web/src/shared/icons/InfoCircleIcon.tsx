import type { IconProps } from './types';

/**
 * Info circle icon for informational alerts
 * Uses currentColor for universal styling
 */
const InfoCircleIcon = ({ className = 'h-5 w-5', ...props }: IconProps) => {
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
            />
            <path
                d="M10 14V10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <circle
                cx="10"
                cy="6.5"
                r="0.75"
                fill="currentColor"
            />
        </svg>
    );
};

export default InfoCircleIcon;
