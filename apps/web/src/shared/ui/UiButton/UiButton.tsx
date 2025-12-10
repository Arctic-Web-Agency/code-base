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

const getVariantClasses = (variant: UiButtonVariant) => {
    const variants: Record<UiButtonVariant, string> = {
        filled: 'bg-neutral-800 text-white hover:bg-neutral-700 active:bg-neutral-900',
        text: 'text-neutral-800 hover:bg-neutral-100 active:bg-neutral-200',
    };

    return variants[variant];
};

const getSizeClasses = (size: UiButtonSize) => {
    const sizes: Record<UiButtonSize, string> = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-5 py-3 text-lg',
    };

    return sizes[size];
};

const UiButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, UiButtonProps>(
    (props, ref) => {
        const {
            children,
            className,
            variant = 'filled',
            size = 'md',
            Icon,
            IconAfter,
            IconRight,
            disabled,
            as = 'button',
            href,
            ...rest
        } = props;

        const buttonClasses = composeClasses(
            'inline-flex items-center justify-center gap-2 rounded-md font-semibold leading-tight',
            'transition-colors duration-200',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            getVariantClasses(variant),
            getSizeClasses(size),
            className
        );

        const content = (
            <>
                {Icon && <Icon width={20} height={20} aria-hidden />}
                {children && <span>{children}</span>}
                {IconAfter && <IconAfter width={20} height={20} aria-hidden />}
                {IconRight && <IconRight width={18} height={18} aria-hidden />}
            </>
        );

        if (as === 'link' && href) {
            const linkProps = rest as Partial<LinkProps>;

            return (
                <Link
                    {...linkProps}
                    href={href}
                    className={buttonClasses}
                    ref={ref as Ref<HTMLAnchorElement>}
                    aria-disabled={disabled}
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
