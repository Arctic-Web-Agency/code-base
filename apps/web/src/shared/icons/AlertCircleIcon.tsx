import type { IconProps } from './types';

/**
 * Warning/alert circle icon for warnings and cautions
 * Uses currentColor for universal styling
 */
const AlertCircleIcon = ({ className = 'h-5 w-5', ...props }: IconProps) => {
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
                d="M10 6V10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                suppressHydrationWarning
            />
            <circle
                cx="10"
                cy="13.5"
                r="0.75"
                fill="currentColor"
                suppressHydrationWarning
            />
        </svg>
    );
};

export default AlertCircleIcon;
