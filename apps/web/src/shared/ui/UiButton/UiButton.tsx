'use client';

import Link, { LinkProps } from 'next/link';
import {
    AnchorHTMLAttributes,
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

const sizeStyles: Record<UiButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
};

const variantStyles: Record<UiButtonVariant, string> = {
    filled: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300',
    text: 'bg-transparent text-blue-600 hover:bg-blue-50 disabled:text-gray-400',
};

const UiButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, UiButtonProps>(
    (props, ref) => {
        const {
            children,
            className,
            variant = 'filled',
            size = 'md',
            IconLeft,
            IconRight,
            disabled,
            as = 'button',
            href,
            external,
            ...rest
        } = props;

        const buttonClasses = composeClasses(
            'inline-flex items-center justify-center gap-2',
            'cursor-pointer disabled:cursor-not-allowed',
            'focus:outline-none',
            disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
            sizeStyles[size],
            variantStyles[variant],
            className
        );

        const content = (
            <>
                {IconLeft && <IconLeft width={20} height={20} aria-hidden />}
                {children && <span>{children}</span>}
                {IconRight && <IconRight width={20} height={20} aria-hidden />}
            </>
        );

        if (as === 'link' && href) {
            // External link - use native <a> tag
            if (external) {
                const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;

                return (
                    <a
                        {...anchorProps}
                        href={disabled ? undefined : href}
                        className={buttonClasses}
                        data-variant={variant}
                        data-size={size}
                        ref={ref as Ref<HTMLAnchorElement>}
                        aria-disabled={disabled}
                        target={anchorProps.target || '_blank'}
                        rel={anchorProps.rel || 'noopener noreferrer'}
                        onClick={(e) => {
                            if (disabled) {
                                e.preventDefault();
                            }
                            anchorProps.onClick?.(e);
                        }}
                        tabIndex={disabled ? -1 : undefined}
                    >
                        {content}
                    </a>
                );
            }

            // Internal link - use Next.js Link
            const linkProps = rest as Partial<LinkProps>;

            return (
                <Link
                    {...linkProps}
                    href={disabled ? '#' : href}
                    className={buttonClasses}
                    data-variant={variant}
                    data-size={size}
                    ref={ref as Ref<HTMLAnchorElement>}
                    aria-disabled={disabled}
                    onClick={(e) => {
                        if (disabled) {
                            e.preventDefault();
                        }
                    }}
                    tabIndex={disabled ? -1 : undefined}
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
                data-variant={variant}
                data-size={size}
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
