import { ReactNode } from 'react';

export type UiTabsVariant = 'primary' | 'underline';
export type UiTabsSize = 'sm' | 'md' | 'lg';

export interface UiTabsItem {
    label: ReactNode;
    value: string;
    content?: ReactNode;
    disabled?: boolean;
    icon?: ReactNode;
}

export interface UiTabsProps {
    items?: UiTabsItem[];
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    variant?: UiTabsVariant;
    size?: UiTabsSize;
    orientation?: 'horizontal' | 'vertical';
    className?: string;
    fullWidth?: boolean;
    lazy?: boolean;
    children?: ReactNode;
    classNames?: {
        list?: string;
        tab?: string;
        panels?: string;
        panel?: string;
    };
}

export interface UiTabProps {
    value: string;
    disabled?: boolean;
    icon?: ReactNode;
    children: ReactNode;
    className?: string;
}

export interface UiTabListProps {
    children: ReactNode;
    className?: string;
}

export interface UiTabPanelsProps {
    children: ReactNode;
    className?: string;
}

export interface UiTabPanelProps {
    value: string;
    children: ReactNode;
    className?: string;
}
