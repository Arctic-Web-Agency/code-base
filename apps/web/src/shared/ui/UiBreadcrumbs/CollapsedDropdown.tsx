'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { composeClasses } from '@/shared/lib';
import UiButton from '@/shared/ui/UiButton';
import type { UiBreadcrumbItem } from './types';

interface CollapsedDropdownProps {
    /**
     * Hidden items to display in dropdown
     */
    hiddenItems: UiBreadcrumbItem[];

    /**
     * CSS classes for the trigger button
     */
    triggerClassName?: string;

    /**
     * CSS classes for the dropdown menu
     */
    menuClassName?: string;

    /**
     * CSS classes for menu items
     */
    menuItemClassName?: string;

    /**
     * Icon size for item icons
     */
    iconSize: number;
}

/**
 * Dropdown component for collapsed breadcrumb items
 */
const CollapsedDropdown = ({
    hiddenItems,
    triggerClassName,
    menuClassName,
    menuItemClassName,
    iconSize,
}: CollapsedDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Close dropdown on Escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen]);

    const defaultMenuClasses = composeClasses(
        'absolute top-full left-0 mt-1 z-50',
        'min-w-[160px] py-1',
        'bg-white dark:bg-neutral-900',
        'border border-neutral-200 dark:border-neutral-700',
        'rounded-md shadow-lg'
    );

    const defaultMenuItemClasses = composeClasses(
        'flex items-center gap-2 w-full px-3 py-2',
        'text-neutral-600 dark:text-neutral-400',
        'hover:text-neutral-900 dark:hover:text-neutral-100',
        'hover:bg-neutral-100 dark:hover:bg-neutral-800',
        'transition-colors'
    );

    const menuClasses = menuClassName ?? defaultMenuClasses;
    const menuItemClasses = menuItemClassName ?? defaultMenuItemClasses;

    return (
        <div ref={dropdownRef} className="relative">
            <UiButton
                variant="text"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className={triggerClassName}
                aria-expanded={isOpen}
                aria-haspopup="true"
                aria-label="Show hidden breadcrumbs"
            >
                ...
            </UiButton>

            {isOpen && (
                <ul className={menuClasses} role="menu">
                    {hiddenItems.map((item, index) => (
                        <li key={`hidden-${item.label}-${index}`} role="none">
                            {item.href ? (
                                <Link
                                    href={item.href}
                                    className={menuItemClasses}
                                    role="menuitem"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.icon && (
                                        <span
                                            className="shrink-0"
                                            style={{
                                                width: iconSize,
                                                height: iconSize,
                                            }}
                                            aria-hidden="true"
                                        >
                                            {item.icon}
                                        </span>
                                    )}
                                    {item.label}
                                </Link>
                            ) : (
                                <span className={menuItemClasses} role="menuitem">
                                    {item.icon && (
                                        <span
                                            className="shrink-0"
                                            style={{
                                                width: iconSize,
                                                height: iconSize,
                                            }}
                                            aria-hidden="true"
                                        >
                                            {item.icon}
                                        </span>
                                    )}
                                    {item.label}
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CollapsedDropdown;
