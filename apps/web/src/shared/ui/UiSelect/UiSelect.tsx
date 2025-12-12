'use client';

import { forwardRef } from 'react';
import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
} from '@headlessui/react';
import { ChevronDownIcon } from '@/shared/icons';
import type {
    UiSelectProps,
    UiSelectSize,
    UiSelectVariant,
} from './types';

const composeClasses = (
    ...classes: Array<string | false | undefined>
): string => classes.filter(Boolean).join(' ');

const sizeStyles: Record<UiSelectSize, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
};

/**
 * Theme-agnostic variant styles using neutral colors
 * Override via className prop for custom design systems
 */
const variantStyles: Record<UiSelectVariant, string> = {
    filled: 'bg-neutral-800 text-white hover:bg-neutral-700 disabled:bg-neutral-300 disabled:text-neutral-500',
    outlined: 'bg-transparent border border-neutral-300 text-neutral-800 hover:border-neutral-400 disabled:border-neutral-200 disabled:text-neutral-400',
};

const optionStyles: Record<UiSelectVariant, string> = {
    filled: 'bg-neutral-800 text-white data-[focus]:bg-neutral-700 data-[selected]:bg-neutral-900',
    outlined: 'bg-white text-neutral-800 data-[focus]:bg-neutral-100 data-[selected]:bg-neutral-200',
};

const UiSelect = forwardRef<HTMLButtonElement, UiSelectProps>(
    (props, ref) => {
        const {
            options,
            value,
            onChange,
            variant = 'filled',
            size = 'md',
            className,
            disabled = false,
            placeholder = 'Select an option',
            label,
        } = props;

        const selected = options.find((o) => o.value === value);

        const buttonClasses = composeClasses(
            'inline-flex items-center justify-between gap-2',
            'cursor-pointer disabled:cursor-not-allowed',
            'focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2',
            disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
            sizeStyles[size],
            variantStyles[variant],
            className
        );

        const optionsClasses = composeClasses(
            'absolute z-50 mt-1 w-full',
            'focus:outline-none',
            'border border-neutral-300',
            optionStyles[variant]
        );

        return (
            <Listbox
                value={value}
                onChange={onChange}
                disabled={disabled}
            >
                <div className="relative">
                    <ListboxButton
                        ref={ref}
                        aria-label={label}
                        className={buttonClasses}
                        data-variant={variant}
                        data-size={size}
                    >
                        <span>{selected?.label || placeholder}</span>
                        <ChevronDownIcon />
                    </ListboxButton>

                    <ListboxOptions className={optionsClasses}>
                        {options.map((option) => (
                            <ListboxOption
                                key={option.value}
                                value={option.value}
                                className={composeClasses(
                                    'cursor-pointer select-none',
                                    sizeStyles[size]
                                )}
                            >
                                {option.label}
                            </ListboxOption>
                        ))}
                    </ListboxOptions>
                </div>
            </Listbox>
        );
    }
);

UiSelect.displayName = 'UiSelect';

export default UiSelect;
