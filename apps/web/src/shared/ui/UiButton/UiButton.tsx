'use client';

import Link from 'next/link';
import {
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

/**
 * Size styles specifically for icon variant (square buttons)
 */
const iconSizeStyles: Record<UiButtonSize, string> = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
};

/**
 * Theme-agnostic variant styles using neutral colors
 * Override via className prop for custom design systems
 */
const variantStyles: Record<UiButtonVariant, string> = {
    filled: 'bg-neutral-800 text-white hover:bg-neutral-700 active:bg-neutral-900 disabled:bg-neutral-300 disabled:text-neutral-500',
    text: 'bg-transparent text-neutral-600 dark:text-neutral-300 hover:text-neutral-400 active:text-neutral-200 disabled:text-neutral-500',
    icon: 'bg-transparent text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 active:text-neutral-800 dark:active:text-neutral-100 disabled:text-neutral-300',
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

/**
 * Shared UI attributes for all button/link variants
 */
interface CommonProps {
    className: string;
    variant: UiButtonVariant;
    size: UiButtonSize;
}

const getCommonProps = ({ className, variant, size }: CommonProps) => ({
    className,
    'data-variant': variant,
    'data-size': size,
});

/**
 * Additional props for link elements (internal and external)
 */
const getLinkAccessibilityProps = (disabled?: boolean) => ({
    'aria-disabled': disabled,
    tabIndex: disabled ? -1 : undefined,
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
        } = props;

        const classes = composeClasses(
            'inline-flex items-center justify-center',
            variant !== 'icon' && 'gap-2',
            'cursor-pointer disabled:cursor-not-allowed',
            'focus:outline-none',
            'transition-colors',
            disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
            variant === 'icon' ? iconSizeStyles[size] : sizeStyles[size],
            variantStyles[variant],
            className
        );

        const content = renderContent({ IconLeft, IconRight, children });
        const commonProps = getCommonProps({ className: classes, variant, size });
        const accessibilityProps = getLinkAccessibilityProps(disabled);

        // Type guard: External link
        if (props.as === 'link' && props.external === true) {
            const { as, href, external, variant: _, size: __, className: ___, IconLeft: ____, IconRight: _____, disabled: ______, children: _______, ...anchorProps } = props;

            return (
                <a
                    {...anchorProps}
                    {...commonProps}
                    {...accessibilityProps}
                    href={href}
                    target={anchorProps.target || '_blank'}
                    rel={anchorProps.rel || 'noopener noreferrer'}
                    onClick={(e) => {
                        if (disabled) {
                            e.preventDefault();
                            e.stopPropagation();
                            return;
                        }
                        anchorProps.onClick?.(e);
                    }}
                    ref={ref as Ref<HTMLAnchorElement>}
                >
                    {content}
                </a>
            );
        }

        // Type guard: Internal link
        if (props.as === 'link') {
            const { as, href, external, variant: _, size: __, className: ___, IconLeft: ____, IconRight: _____, disabled: ______, children: _______, ...linkProps } = props;

            return (
                <Link
                    {...linkProps}
                    {...commonProps}
                    {...accessibilityProps}
                    href={href}
                    onClick={(e) => {
                        if (disabled) {
                            e.preventDefault();
                            e.stopPropagation();
                            return;
                        }
                        linkProps.onClick?.(e);
                    }}
                    ref={ref as Ref<HTMLAnchorElement>}
                >
                    {content}
                </Link>
            );
        }

        // Default: Button
        const { as, variant: _, size: __, className: ___, IconLeft: ____, IconRight: _____, disabled: ______, children: _______, ...buttonProps } = props;

        return (
            <button
                {...buttonProps}
                {...commonProps}
                type={buttonProps.type ?? 'button'}
                disabled={disabled}
                onClick={(e) => {
                    if (disabled) {
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                    }
                    buttonProps.onClick?.(e);
                }}
                ref={ref as Ref<HTMLButtonElement>}
            >
                {content}
            </button>
        );
    }
);

UiButton.displayName = 'UiButton';

export default UiButton;
