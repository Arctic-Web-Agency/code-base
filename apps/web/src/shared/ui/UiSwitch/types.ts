import { ReactNode } from 'react';

export interface UiSwitchProps {
    checked: boolean;
    onChange?: (event: boolean) => void;
    children?: ReactNode;
    id?: string;
    name?: string;
}
