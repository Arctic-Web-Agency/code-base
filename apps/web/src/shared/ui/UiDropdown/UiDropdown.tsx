'use client';

import {
    useState,
    useRef,
    useEffect,
    useCallback,
    cloneElement,
    isValidElement,
    KeyboardEvent,
    useId,
} from 'react';
import { composeClasses } from '@/shared/lib';
import UiButton from '@/shared/ui/UiButton';
import type {
    UiDropdownProps,
    UiDropdownItem,
    UiDropdownSize,
    UiDropdownPlacement,
} from './types';

/**
 * Size styles for dropdown menu items
 */
const SIZE_STYLES: Record<UiDropdownSize, string> = {
    sm: 'px-2 py-1.5 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-2.5 text-lg',
};

/**
 * Placement styles for positioning the dropdown menu
 */
const PLACEMENT_STYLES: Record<UiDropdownPlacement, string> = {
    'top': 'bottom-full left-1/2 -translate-x-1/2 mb-1',
    'top-start': 'bottom-full left-0 mb-1',
    'top-end': 'bottom-full right-0 mb-1',
    'bottom': 'top-full left-1/2 -translate-x-1/2 mt-1',
    'bottom-start': 'top-full left-0 mt-1',
    'bottom-end': 'top-full right-0 mt-1',
    'left': 'right-full top-1/2 -translate-y-1/2 mr-1',
    'left-start': 'right-full top-0 mr-1',
    'left-end': 'right-full bottom-0 mr-1',
    'right': 'left-full top-1/2 -translate-y-1/2 ml-1',
    'right-start': 'left-full top-0 ml-1',
    'right-end': 'left-full bottom-0 ml-1',
};

/**
 * Universal Dropdown component with keyboard navigation and accessibility
 *
 * Features:
 * - Controlled and uncontrolled modes
 * - Full keyboard navigation (Arrow keys, Enter, Escape, Tab)
 * - Click outside detection
 * - Focus management
 * - Support for links and action items
 * - Accessible with ARIA attributes
 *
 * @example
 * ```tsx
 * // Uncontrolled (simple)
 * <UiDropdown
 *   trigger={<button>Open Menu</button>}
 *   items={[
 *     { key: 'edit', label: 'Edit', onClick: handleEdit },
 *     { key: 'delete', label: 'Delete', danger: true, onClick: handleDelete },
 *   ]}
 * />
 *
 * // Controlled
 * <UiDropdown
 *   isOpen={isOpen}
 *   onOpenChange={setIsOpen}
 *   trigger={(open) => <button>{open ? 'Close' : 'Open'}</button>}
 *   items={items}
 * />
 * ```
 */
const UiDropdown = (props: UiDropdownProps) => {
    const {
        trigger,
        items,
        size = 'md',
        placement = 'bottom-start',
        closeOnSelect = true,
        closeOnClickOutside = true,
        closeOnEsc = true,
        disabled = false,
        offset,
        minWidth,
        maxHeight,
        className,
        menuClassName,
        itemClassName,
        ariaLabel,
        onSelect,
        // Controlled props
        isOpen: controlledIsOpen,
        onOpenChange,
        // Uncontrolled props
        defaultOpen = false,
        ...restProps
    } = props;

    // Determine if controlled or uncontrolled
    const isControlled = controlledIsOpen !== undefined;
    const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(defaultOpen);

    const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;

    const setIsOpen = useCallback(
        (value: boolean | ((prev: boolean) => boolean)) => {
            if (isControlled) {
                const newValue = typeof value === 'function' ? value(controlledIsOpen!) : value;
                onOpenChange?.(newValue);
            } else {
                // useState handles functional updates correctly
                setUncontrolledIsOpen(value);
            }
        },
        [isControlled, controlledIsOpen, onOpenChange]
    );

    // Refs
    const containerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);
    const triggerRef = useRef<HTMLElement>(null);

    // Focus management
    const [focusedIndex, setFocusedIndex] = useState(-1);

    // Generate unique IDs
    const generatedId = useId();
    const menuId = `dropdown-menu-${generatedId}`;
    const triggerId = `dropdown-trigger-${generatedId}`;

    // Get enabled items for keyboard navigation
    const enabledItems = items.filter((item) => !item.disabled);
    const enabledIndices = items
        .map((item, index) => (!item.disabled ? index : -1))
        .filter((index) => index !== -1);

    // Toggle dropdown
    const toggle = useCallback(() => {
        if (disabled) return;
        setIsOpen((prev) => !prev);
    }, [disabled, setIsOpen]);

    // Close dropdown
    const close = useCallback(() => {
        setIsOpen(false);
        setFocusedIndex(-1);
        // Return focus to trigger
        triggerRef.current?.focus();
    }, [setIsOpen]);

    // Handle item selection
    const handleItemSelect = useCallback(
        (item: UiDropdownItem) => {
            if (item.disabled) return;

            item.onClick?.();
            onSelect?.(item.key, item);

            if (closeOnSelect && !item.href) {
                close();
            }
        },
        [closeOnSelect, close, onSelect]
    );

    // Click outside detection
    useEffect(() => {
        if (!isOpen || !closeOnClickOutside) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                close();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, closeOnClickOutside, close]);

    // Escape key handling
    useEffect(() => {
        if (!isOpen || !closeOnEsc) return;

        const handleEscape = (event: globalThis.KeyboardEvent) => {
            if (event.key === 'Escape') {
                close();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, closeOnEsc, close]);

    // Focus first item when dropdown opens
    useEffect(() => {
        if (isOpen && enabledIndices.length > 0) {
            setFocusedIndex(enabledIndices[0]);
        }
    }, [isOpen]);

    // Keyboard navigation handler
    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (disabled) return;

            switch (event.key) {
                case 'Enter':
                case ' ':
                    if (!isOpen) {
                        event.preventDefault();
                        setIsOpen(true);
                    } else if (focusedIndex >= 0 && items[focusedIndex]) {
                        event.preventDefault();
                        handleItemSelect(items[focusedIndex]);
                    }
                    break;

                case 'ArrowDown':
                    event.preventDefault();
                    if (!isOpen) {
                        setIsOpen(true);
                    } else {
                        const currentEnabledIndex = enabledIndices.indexOf(focusedIndex);
                        const nextIndex =
                            currentEnabledIndex < enabledIndices.length - 1
                                ? enabledIndices[currentEnabledIndex + 1]
                                : enabledIndices[0];
                        setFocusedIndex(nextIndex);
                    }
                    break;

                case 'ArrowUp':
                    event.preventDefault();
                    if (!isOpen) {
                        setIsOpen(true);
                    } else {
                        const currentEnabledIndex = enabledIndices.indexOf(focusedIndex);
                        const prevIndex =
                            currentEnabledIndex > 0
                                ? enabledIndices[currentEnabledIndex - 1]
                                : enabledIndices[enabledIndices.length - 1];
                        setFocusedIndex(prevIndex);
                    }
                    break;

                case 'Home':
                    if (isOpen) {
                        event.preventDefault();
                        setFocusedIndex(enabledIndices[0]);
                    }
                    break;

                case 'End':
                    if (isOpen) {
                        event.preventDefault();
                        setFocusedIndex(enabledIndices[enabledIndices.length - 1]);
                    }
                    break;

                case 'Tab':
                    if (isOpen) {
                        close();
                    }
                    break;
            }
        },
        [
            disabled,
            isOpen,
            focusedIndex,
            items,
            enabledIndices,
            handleItemSelect,
            setIsOpen,
            close,
        ]
    );

    // Clone trigger element with props
    const renderTrigger = () => {
        const triggerElement =
            typeof trigger === 'function' ? trigger(isOpen) : trigger;

        if (!isValidElement(triggerElement)) {
            return null;
        }

        const triggerProps = triggerElement.props as Record<string, unknown>;

        return cloneElement(triggerElement, {
            ref: triggerRef,
            id: triggerId,
            onClick: toggle,
            onKeyDown: handleKeyDown,
            'aria-haspopup': 'menu',
            'aria-expanded': isOpen,
            'aria-controls': isOpen ? menuId : undefined,
            'aria-label': ariaLabel,
            disabled: disabled || Boolean(triggerProps.disabled),
            tabIndex: disabled ? -1 : 0,
        } as Record<string, unknown>);
    };

    // Render menu item content
    const renderItemContent = (item: UiDropdownItem) => (
        <>
            {item.icon && (
                <span className="shrink-0" aria-hidden="true">
                    {item.icon}
                </span>
            )}
            <span className="flex-1">{item.label}</span>
        </>
    );

    // Menu item classes (override UiButton default styles)
    const getItemClasses = (item: UiDropdownItem, index: number) =>
        composeClasses(
            '!justify-start gap-2 w-full rounded-none',
            'select-none',
            SIZE_STYLES[size],
            // Default colors (override UiButton text variant)
            '!text-neutral-700 dark:!text-neutral-300',
            'hover:!text-neutral-700 dark:hover:!text-neutral-300',
            'hover:bg-neutral-100 dark:hover:bg-neutral-800',
            // Danger state
            item.danger &&
                '!text-red-600 dark:!text-red-400 hover:!text-red-600 dark:hover:!text-red-400 hover:bg-red-50 dark:hover:bg-red-950',
            // Focus state
            focusedIndex === index &&
                'bg-neutral-100 dark:bg-neutral-800',
            itemClassName
        );

    // Menu container classes
    const menuClasses = composeClasses(
        'absolute z-50',
        'py-1',
        'bg-white dark:bg-neutral-900',
        'border border-neutral-200 dark:border-neutral-700',
        'rounded-md shadow-lg',
        'outline-none',
        PLACEMENT_STYLES[placement],
        menuClassName
    );

    // Container style with offset
    const menuStyle: React.CSSProperties = {
        ...(offset && { margin: offset }),
        ...(minWidth && { minWidth }),
        ...(maxHeight && { maxHeight, overflowY: 'auto' }),
    };

    return (
        <div
            ref={containerRef}
            className={composeClasses('relative inline-block', className)}
            {...restProps}
        >
            {renderTrigger()}

            {isOpen && (
                <ul
                    ref={menuRef}
                    id={menuId}
                    role="menu"
                    aria-labelledby={triggerId}
                    className={menuClasses}
                    style={menuStyle}
                    tabIndex={-1}
                >
                    {items.map((item, index) => (
                        <li
                            key={item.key}
                            role="none"
                            className={item.divider ? 'border-b border-neutral-200 dark:border-neutral-700' : undefined}
                        >
                            {item.href ? (
                                <UiButton
                                    as="link"
                                    href={item.href}
                                    external={item.external}
                                    variant="text"
                                    role="menuitem"
                                    className={getItemClasses(item, index)}
                                    tabIndex={focusedIndex === index ? 0 : -1}
                                    disabled={item.disabled}
                                    onMouseEnter={() => setFocusedIndex(index)}
                                    onClick={() => handleItemSelect(item)}
                                >
                                    {renderItemContent(item)}
                                </UiButton>
                            ) : (
                                <UiButton
                                    variant="text"
                                    role="menuitem"
                                    className={getItemClasses(item, index)}
                                    tabIndex={focusedIndex === index ? 0 : -1}
                                    disabled={item.disabled}
                                    onMouseEnter={() => setFocusedIndex(index)}
                                    onClick={() => handleItemSelect(item)}
                                >
                                    {renderItemContent(item)}
                                </UiButton>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

UiDropdown.displayName = 'UiDropdown';

export default UiDropdown;
