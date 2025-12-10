'use client';

import Link, { LinkProps } from 'next/link';
import {
    ButtonHTMLAttributes,
    Ref,
    forwardRef,
} from 'react';
import type {
    UiButtonProps,
    UiButtonSize,
    UiButtonVariant,
} from './types';

const composeClasses = (
    ...classes: Array<string | false | undefined>
): string => classes.filter(Boolean).join(' ');

const getVariantClasses = (
    variant: UiButtonVariant,
    { withHover = true, withFocus = true }: Partial<Pick<UiButtonProps, 'withHover' | 'withFocus'>> = {}
) => {
    const base = ['transition-colors', 'duration-200'];
    const variants: Record<UiButtonVariant, string[]> = {
        primary: [
            'bg-blue-600',
            'text-white',
            withHover ? 'hover:bg-blue-700' : '',
            'active:bg-blue-800',
            withFocus ? 'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2' : '',
        ],
        secondary: [
            'border border-blue-600',
            'text-blue-700',
            withHover ? 'hover:bg-blue-50' : '',
            'active:bg-blue-100',
            withFocus ? 'focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-2' : '',
        ],
        ghost: [
            'text-gray-800',
            withHover ? 'hover:bg-gray-100' : '',
            'active:bg-gray-200',
            withFocus ? 'focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2' : '',
        ],
    };

    return composeClasses(...base, ...variants[variant]);
};

const getSizeClasses = (size: UiButtonSize) => {
    const sizes: Record<UiButtonSize, string[]> = {
        sm: ['px-3', 'py-1.5', 'text-sm'],
        md: ['px-4', 'py-2', 'text-base'],
        lg: ['px-5', 'py-3', 'text-lg'],
    };

    return composeClasses(...sizes[size]);
};

const UiButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, UiButtonProps>(
    (props, ref) => {
        const {
            children,
            className,
            variant = 'primary',
            size = 'md',
            Icon,
            IconAfter,
            IconRight,
            withHover = true,
            withFocus = true,
            disabled,
            as = 'button',
            href,
            ...rest
        } = props;

        const buttonClasses = composeClasses(
            'inline-flex items-center justify-center gap-2 rounded-md font-semibold leading-tight',
            'focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            getVariantClasses(variant, { withHover, withFocus }),
            getSizeClasses(size),
            className
        );

        const content = (
            <span className="flex items-center gap-2 leading-none">
                {Icon ? <Icon width={20} height={20} aria-hidden /> : null}
                <span>{children}</span>
                {IconAfter ? <IconAfter width={20} height={20} aria-hidden /> : null}
                {IconRight ? <IconRight width={18} height={18} aria-hidden /> : null}
            </span>
        );

        if (as === 'link' && href) {
            const linkProps = rest as Partial<LinkProps>;

            return (
                <Link
                    {...linkProps}
                    href={href}
                    className={buttonClasses}
                    ref={ref as Ref<HTMLAnchorElement>}
                >
                    {content}
                </Link>
            );
        }

        return (
            <button
                {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
                type={(rest as ButtonHTMLAttributes<HTMLButtonElement>).type ?? 'button'}
                className={buttonClasses}
                disabled={disabled}
                ref={ref as Ref<HTMLButtonElement>}
            >
                {content}
            </button>
        );
    }
);

UiButton.displayName = 'UiButton';

export default UiButton;
