import type { IconProps } from './types';

/**
 * Close (X) icon component for modals, dialogs, and dismissible elements
 * Uses currentColor for universal styling
 */
const CloseIcon = ({ className = 'h-5 w-5', ...props }: IconProps) => {
    return (
        <svg
            className={className}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            {...props}
        >
            <path
                d="M15 5L5 15M5 5L15 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default CloseIcon;
