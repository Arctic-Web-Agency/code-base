import { ButtonHTMLAttributes, ComponentType, ReactNode, SVGProps } from 'react';
import { LinkProps } from 'next/link';

export type UiButtonVariant = 'filled' | 'text';
export type UiButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
    children?: ReactNode;
    variant?: UiButtonVariant;
    size?: UiButtonSize;
    className?: string;
    Icon?: ComponentType<SVGProps<SVGSVGElement>>;
    IconAfter?: ComponentType<SVGProps<SVGSVGElement>>;
    IconRight?: ComponentType<SVGProps<SVGSVGElement>>;
    disabled?: boolean;
}

interface ButtonAsButton extends BaseButtonProps, ButtonHTMLAttributes<HTMLButtonElement> {
    as?: 'button';
    href?: never;
}

interface ButtonAsLink extends BaseButtonProps, Omit<LinkProps, 'href'> {
    as: 'link';
    href: LinkProps['href'];
}

export type UiButtonProps = ButtonAsButton | ButtonAsLink;
