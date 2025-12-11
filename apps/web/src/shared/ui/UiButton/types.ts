import { AnchorHTMLAttributes, ButtonHTMLAttributes, ComponentType, ReactNode, SVGProps } from 'react';
import { LinkProps } from 'next/link';

export type UiButtonVariant = 'filled' | 'text';
export type UiButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
    children?: ReactNode;
    variant?: UiButtonVariant;
    size?: UiButtonSize;
    className?: string;
    IconLeft?: ComponentType<SVGProps<SVGSVGElement>>;
    IconRight?: ComponentType<SVGProps<SVGSVGElement>>;
    disabled?: boolean;
}

interface ButtonAsButton extends BaseButtonProps, ButtonHTMLAttributes<HTMLButtonElement> {
    as?: 'button';
    href?: never;
    external?: never;
}

interface ButtonAsInternalLink extends BaseButtonProps, Omit<LinkProps, 'href'> {
    as: 'link';
    href: LinkProps['href'];
    external?: false;
}

interface ButtonAsExternalLink extends BaseButtonProps, AnchorHTMLAttributes<HTMLAnchorElement> {
    as: 'link';
    href: string;
    external: true;
}

export type UiButtonProps = ButtonAsButton | ButtonAsInternalLink | ButtonAsExternalLink;
