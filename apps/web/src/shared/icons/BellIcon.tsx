import type { IconProps } from './types';

/**
 * Bell icon component for notifications
 * Uses currentColor for universal styling
 */
const BellIcon = ({ className = 'h-5 w-5', ...props }: IconProps) => {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            {...props}
        >
            <path d="M12 2C8.13401 2 5 5.13401 5 9V14L3 16V17H21V16L19 14V9C19 5.13401 15.866 2 12 2Z" />
            <path d="M9.5 21C9.5 21.8284 10.6716 22.5 12 22.5C13.3284 22.5 14.5 21.8284 14.5 21H9.5Z" />
        </svg>
    );
};

export default BellIcon;
