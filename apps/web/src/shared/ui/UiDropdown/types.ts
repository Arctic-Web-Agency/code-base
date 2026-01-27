import { ReactNode, ReactElement, HTMLAttributes } from 'react';

export type UiDropdownSize = 'sm' | 'md' | 'lg';
export type UiDropdownPlacement =
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end';

/**
 * Individual dropdown menu item
 */
export interface UiDropdownItem {
    /**
     * Unique identifier for the item
     */
    key: string;

    /**
     * Display label for the item
     */
    label: ReactNode;

    /**
     * Optional icon to display before the label
     */
    icon?: ReactNode;

    /**
     * Whether the item is disabled
     */
    disabled?: boolean;

    /**
     * Whether the item should be visually marked as dangerous/destructive
     */
    danger?: boolean;

    /**
     * Whether to show a divider after this item
     */
    divider?: boolean;

    /**
     * Click handler for the item
     */
    onClick?: () => void;

    /**
     * Optional href for link items
     */
    href?: string;

    /**
     * Whether the link is external (opens in new tab)
     */
    external?: boolean;
}

/**
 * Props for controlled dropdown state
 */
interface ControlledProps {
    /**
     * Whether the dropdown is open (controlled mode)
     */
    isOpen: boolean;

    /**
     * Callback when dropdown should open/close (controlled mode)
     */
    onOpenChange: (isOpen: boolean) => void;

    defaultOpen?: never;
}

/**
 * Props for uncontrolled dropdown state
 */
interface UncontrolledProps {
    /**
     * Default open state (uncontrolled mode)
     */
    defaultOpen?: boolean;

    isOpen?: never;
    onOpenChange?: never;
}

/**
 * Base props shared by all dropdown configurations
 */
interface BaseDropdownProps {
    /**
     * Trigger element that opens the dropdown
     * Can be a ReactElement or a render function receiving open state
     */
    trigger: ReactElement | ((isOpen: boolean) => ReactElement);

    /**
     * Array of menu items to display
     */
    items: UiDropdownItem[];

    /**
     * Size variant for the dropdown
     * @default 'md'
     */
    size?: UiDropdownSize;

    /**
     * Placement of the dropdown relative to the trigger
     * @default 'bottom-start'
     */
    placement?: UiDropdownPlacement;

    /**
     * Whether to close the dropdown when an item is clicked
     * @default true
     */
    closeOnSelect?: boolean;

    /**
     * Whether to close the dropdown when clicking outside
     * @default true
     */
    closeOnClickOutside?: boolean;

    /**
     * Whether to close the dropdown when pressing Escape
     * @default true
     */
    closeOnEsc?: boolean;

    /**
     * Whether the dropdown is disabled
     * @default false
     */
    disabled?: boolean;

    /**
     * Offset from the trigger element in pixels
     * @default 4
     */
    offset?: number;

    /**
     * Minimum width of the dropdown menu (in pixels or CSS value)
     */
    minWidth?: number | string;

    /**
     * Maximum height of the dropdown menu (enables scrolling)
     */
    maxHeight?: number | string;

    /**
     * Custom className for the dropdown container
     */
    className?: string;

    /**
     * Custom className for the menu
     */
    menuClassName?: string;

    /**
     * Custom className for menu items
     */
    itemClassName?: string;

    /**
     * Accessible label for the dropdown
     */
    ariaLabel?: string;

    /**
     * Callback fired when an item is selected
     */
    onSelect?: (key: string, item: UiDropdownItem) => void;
}

/**
 * UiDropdown component props
 * Supports both controlled and uncontrolled modes
 */
export type UiDropdownProps = BaseDropdownProps &
    (ControlledProps | UncontrolledProps) &
    Omit<HTMLAttributes<HTMLDivElement>, keyof BaseDropdownProps>;
