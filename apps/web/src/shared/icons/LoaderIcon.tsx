import type { IconProps } from './types';

/**
 * Animated loader/spinner icon for loading states
 * Uses currentColor for universal styling
 */
const LoaderIcon = ({ className = 'h-5 w-5', ...props }: IconProps) => {
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
                r="7.5"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="35 12"
                className="animate-spin origin-center"
            />
        </svg>
    );
};

export default LoaderIcon;
