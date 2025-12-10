import { ButtonHTMLAttributes, ComponentType, ReactNode, SVGProps } from 'react';
import { LinkProps } from 'next/link';

export type UiButtonVariant = 'primary' | 'secondary' | 'ghost';
export type UiButtonSize = 'sm' | 'md' | 'lg';

export interface UiButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        Partial<LinkProps>
{
    children?: ReactNode;
    variant?: UiButtonVariant;
    size?: UiButtonSize;
    className?: string;
    Icon?: ComponentType<SVGProps<SVGSVGElement>>;
    IconAfter?: ComponentType<SVGProps<SVGSVGElement>>;
    IconRight?: ComponentType<SVGProps<SVGSVGElement>>;
    disabled?: boolean;
    withHover?: boolean;
    withFocus?: boolean;
    as?: 'button' | 'link';
    href?: LinkProps['href'];
}
