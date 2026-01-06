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
                d="M10 6V10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <circle
                cx="10"
                cy="13.5"
                r="0.75"
                fill="currentColor"
            />
        </svg>
    );
};

export default AlertCircleIcon;
