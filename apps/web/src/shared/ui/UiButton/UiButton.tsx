'use client';

import Link, { LinkProps } from 'next/link';
import {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    ReactNode,
    Ref,
    forwardRef,
} from 'react';
import type {
    UiButtonProps,
    UiButtonSize,
    UiButtonVariant,
} from './types';

const ICON_SIZE = 20;

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

interface RenderContentProps {
    IconLeft?: UiButtonProps['IconLeft'];
    IconRight?: UiButtonProps['IconRight'];
    children?: ReactNode;
}

const renderContent = ({ IconLeft, IconRight, children }: RenderContentProps) => (
    <>
        {IconLeft && <IconLeft width={ICON_SIZE} height={ICON_SIZE} aria-hidden />}
        {children && <span>{children}</span>}
        {IconRight && <IconRight width={ICON_SIZE} height={ICON_SIZE} aria-hidden />}
    </>
);

interface CommonLinkProps {
    className: string;
    variant: UiButtonVariant;
    size: UiButtonSize;
    disabled?: boolean;
    tabIndex?: number;
}

const getCommonLinkProps = ({
    className,
    variant,
    size,
    disabled,
    tabIndex,
}: CommonLinkProps) => ({
    className,
    'data-variant': variant,
    'data-size': size,
    'aria-disabled': disabled,
    tabIndex,
});

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

        const classes = composeClasses(
            'inline-flex items-center justify-center gap-2',
            'cursor-pointer disabled:cursor-not-allowed',
            'focus:outline-none',
            disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
            sizeStyles[size],
            variantStyles[variant],
            className
        );

        const content = renderContent({ IconLeft, IconRight, children });
        const commonLinkProps = getCommonLinkProps({
            className: classes,
            variant,
            size,
            disabled,
            tabIndex: disabled ? -1 : undefined,
        });

        // External link
        if (as === 'link' && href && external) {
            const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;

            return (
                <a
                    {...anchorProps}
                    {...commonLinkProps}
                    href={disabled ? undefined : href}
                    target={anchorProps.target || '_blank'}
                    rel={anchorProps.rel || 'noopener noreferrer'}
                    onClick={(e) => {
                        if (disabled) e.preventDefault();
                        anchorProps.onClick?.(e);
                    }}
                    ref={ref as Ref<HTMLAnchorElement>}
                >
                    {content}
                </a>
            );
        }

        // Internal link
        if (as === 'link' && href) {
            const linkProps = rest as Partial<LinkProps>;

            return (
                <Link
                    {...linkProps}
                    {...commonLinkProps}
                    href={disabled ? '#' : href}
                    onClick={(e) => {
                        if (disabled) e.preventDefault();
                    }}
                    ref={ref as Ref<HTMLAnchorElement>}
                >
                    {content}
                </Link>
            );
        }

        // Button
        const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;

        return (
            <button
                {...buttonProps}
                type={buttonProps.type ?? 'button'}
                className={classes}
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
