import type { IconProps } from './types';

/**
 * Lock icon component for security related UI
 * Uses currentColor for universal styling
 */
const LockIcon = ({ className = 'h-5 w-5', ...props }: IconProps) => {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            {...props}
        >
            <path d="M12 2C9.23858 2 7 4.23858 7 7V10H6C4.89543 10 4 10.8954 4 12V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V12C20 10.8954 19.1046 10 18 10H17V7C17 4.23858 14.7614 2 12 2ZM9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7V10H9V7ZM13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V14C11 13.4477 11.4477 13 12 13C12.5523 13 13 13.4477 13 14V16Z" />
        </svg>
    );
};

export default LockIcon;
