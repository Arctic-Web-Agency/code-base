import { ReactNode } from 'react';

export type UiAccordionSize = 'sm' | 'md' | 'lg';

export interface UiAccordionItem {
    value: string;
    trigger: ReactNode;
    content: ReactNode;
    disabled?: boolean;
}

export interface UiAccordionProps {
    /** Array of accordion items (alternative to composition pattern) */
    items?: UiAccordionItem[];
    /** Controlled expanded value(s) */
    value?: string | string[];
    /** Default expanded value(s) for uncontrolled mode */
    defaultValue?: string | string[];
    /** Callback when expanded items change */
    onChange?: (value: string | string[]) => void;
    /** Allow multiple items to be expanded simultaneously */
    multiple?: boolean;
    /** Allow all items to be collapsed */
    collapsible?: boolean;
    /** Size variant */
    size?: UiAccordionSize;
    /** Additional class name */
    className?: string;
    /** Class names for subcomponents */
    classNames?: {
        item?: string;
        trigger?: string;
        content?: string;
        icon?: string;
    };
    /** Children for composition pattern */
    children?: ReactNode;
}

export interface UiAccordionItemProps {
    /** Unique value identifier */
    value: string;
    /** Whether this item is disabled */
    disabled?: boolean;
    /** Additional class name */
    className?: string;
    /** Children (Trigger and Content) */
    children: ReactNode;
}

export interface UiAccordionTriggerProps {
    /** Trigger content */
    children: ReactNode;
    /** Additional class name */
    className?: string;
}

export interface UiAccordionContentProps {
    /** Panel content */
    children: ReactNode;
    /** Additional class name */
    className?: string;
}
