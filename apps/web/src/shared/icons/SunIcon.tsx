import type { IconProps } from './types';

/**
 * Sun icon component for light theme toggle
 * Uses currentColor for universal styling
 */
const SunIcon = ({ className = 'h-5 w-5', ...props }: IconProps) => {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            suppressHydrationWarning
            {...props}
        >
            <circle cx="12" cy="12" r="5" strokeWidth="1.5" suppressHydrationWarning />
            <path d="M12 2V4" strokeWidth="1.5" strokeLinecap="round" suppressHydrationWarning />
            <path d="M12 20V22" strokeWidth="1.5" strokeLinecap="round" suppressHydrationWarning />
            <path d="M4 12L2 12" strokeWidth="1.5" strokeLinecap="round" suppressHydrationWarning />
            <path d="M22 12L20 12" strokeWidth="1.5" strokeLinecap="round" suppressHydrationWarning />
            <path
                d="M19.7778 4.22266L17.5558 6.25424"
                strokeWidth="1.5"
                strokeLinecap="round"
                suppressHydrationWarning
            />
            <path
                d="M4.22217 4.22266L6.44418 6.25424"
                strokeWidth="1.5"
                strokeLinecap="round"
                suppressHydrationWarning
            />
            <path
                d="M6.44434 17.5557L4.22211 19.7779"
                strokeWidth="1.5"
                strokeLinecap="round"
                suppressHydrationWarning
            />
            <path
                d="M19.7778 19.7773L17.5558 17.5551"
                strokeWidth="1.5"
                strokeLinecap="round"
                suppressHydrationWarning
            />
        </svg>
    );
};

export default SunIcon;
