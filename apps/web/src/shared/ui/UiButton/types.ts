import {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    ComponentType,
    ReactNode,
    SVGProps,
} from 'react';
import { LinkProps } from 'next/link';

export type UiButtonVariant = 'filled' | 'text';
export type UiButtonSize = 'sm' | 'md' | 'lg';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

interface BaseProps {
    children?: ReactNode;
    variant?: UiButtonVariant;
    size?: UiButtonSize;
    className?: string;
    IconLeft?: IconComponent;
    IconRight?: IconComponent;
    disabled?: boolean;
}

/**
 * Native button element
 */
type ButtonProps = BaseProps &
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
        as?: 'button';
    };

/**
 * Internal link using Next.js Link component (client-side navigation)
 */
type InternalLinkProps = BaseProps &
    Omit<LinkProps, keyof BaseProps | 'href'> & {
        as: 'link';
        href: LinkProps['href'];
        external?: false;
    };

/**
 * External link using native anchor element (opens in new tab)
 */
type ExternalLinkProps = BaseProps &
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps | 'href'> & {
        as: 'link';
        href: string;
        external: true;
    };

export type UiButtonProps = ButtonProps | InternalLinkProps | ExternalLinkProps;
