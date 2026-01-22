'use client';

import {
    createContext,
    useContext,
    useState,
    useCallback,
    useMemo,
    useId,
    Children,
    isValidElement,
    KeyboardEvent,
    ReactNode,
} from 'react';
import { composeClasses } from '@/shared/lib';
import ChevronDownIcon from '@/shared/icons/ChevronDownIcon';
import type {
    UiAccordionProps,
    UiAccordionItemProps,
    UiAccordionTriggerProps,
    UiAccordionContentProps,
    UiAccordionSize,
} from './types';

/**
 * Size styles for accordion triggers
 */
const SIZE_STYLES: Record<UiAccordionSize, string> = {
    sm: 'py-2 px-3 text-sm',
    md: 'py-3 px-4 text-base',
    lg: 'py-4 px-5 text-lg',
};

/**
 * Icon size classes based on accordion size
 */
const ICON_SIZE_STYLES: Record<UiAccordionSize, string> = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
};

// --- Context ---

interface UiAccordionContextProps {
    expandedValues: string[];
    toggleItem: (value: string) => void;
    registerItem: (value: string) => void;
    unregisterItem: (value: string) => void;
    size: UiAccordionSize;
    classNames?: UiAccordionProps['classNames'];
    itemValues: string[];
    focusItem: (value: string) => void;
}

const UiAccordionContext = createContext<UiAccordionContextProps | null>(null);

const useAccordionContext = () => {
    const context = useContext(UiAccordionContext);
    if (!context) {
        throw new Error(
            'UiAccordion.* components must be used within a UiAccordion'
        );
    }
    return context;
};

// --- Item Context ---

interface UiAccordionItemContextProps {
    value: string;
    isExpanded: boolean;
    isDisabled: boolean;
    triggerId: string;
    contentId: string;
}

const UiAccordionItemContext =
    createContext<UiAccordionItemContextProps | null>(null);

const useAccordionItemContext = () => {
    const context = useContext(UiAccordionItemContext);
    if (!context) {
        throw new Error(
            'UiAccordion.Trigger/Content must be used within UiAccordion.Item'
        );
    }
    return context;
};

// --- Subcomponents ---

const Item = ({ value, disabled = false, className, children }: UiAccordionItemProps) => {
    const { expandedValues, classNames } = useAccordionContext();
    const generatedId = useId();
    const triggerId = `accordion-trigger-${generatedId}`;
    const contentId = `accordion-content-${generatedId}`;

    const isExpanded = expandedValues.includes(value);

    const itemContextValue = useMemo(
        () => ({
            value,
            isExpanded,
            isDisabled: disabled,
            triggerId,
            contentId,
        }),
        [value, isExpanded, disabled, triggerId, contentId]
    );

    return (
        <UiAccordionItemContext.Provider value={itemContextValue}>
            <div
                data-state={isExpanded ? 'open' : 'closed'}
                data-disabled={disabled || undefined}
                className={composeClasses(
                    'border-b border-neutral-200 dark:border-neutral-700',
                    className,
                    classNames?.item
                )}
            >
                {children}
            </div>
        </UiAccordionItemContext.Provider>
    );
};

const Trigger = ({ children, className }: UiAccordionTriggerProps) => {
    const { toggleItem, size, classNames, itemValues, focusItem } =
        useAccordionContext();
    const { value, isExpanded, isDisabled, triggerId, contentId } =
        useAccordionItemContext();

    const handleClick = () => {
        if (!isDisabled) {
            toggleItem(value);
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        if (isDisabled) return;

        const currentIndex = itemValues.indexOf(value);

        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                if (currentIndex < itemValues.length - 1) {
                    focusItem(itemValues[currentIndex + 1]);
                }
                break;

            case 'ArrowUp':
                event.preventDefault();
                if (currentIndex > 0) {
                    focusItem(itemValues[currentIndex - 1]);
                }
                break;

            case 'Home':
                event.preventDefault();
                focusItem(itemValues[0]);
                break;

            case 'End':
                event.preventDefault();
                focusItem(itemValues[itemValues.length - 1]);
                break;
        }
    };

    return (
        <h3 className="m-0">
            <button
                type="button"
                id={triggerId}
                aria-expanded={isExpanded}
                aria-controls={contentId}
                aria-disabled={isDisabled}
                disabled={isDisabled}
                data-trigger={value}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                className={composeClasses(
                    'flex w-full items-center justify-between',
                    'text-left font-medium',
                    'transition-colors duration-200',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400',
                    'text-neutral-900 dark:text-neutral-100',
                    !isDisabled &&
                        'hover:bg-neutral-50 dark:hover:bg-neutral-800/50',
                    isDisabled && 'opacity-50 cursor-not-allowed',
                    SIZE_STYLES[size],
                    className,
                    classNames?.trigger
                )}
            >
                <span>{children}</span>
                <ChevronDownIcon
                    className={composeClasses(
                        ICON_SIZE_STYLES[size],
                        'shrink-0 transition-transform duration-200',
                        isExpanded && 'rotate-180',
                        classNames?.icon
                    )}
                />
            </button>
        </h3>
    );
};

const Content = ({ children, className }: UiAccordionContentProps) => {
    const { size, classNames } = useAccordionContext();
    const { isExpanded, triggerId, contentId } = useAccordionItemContext();

    return (
        <div
            id={contentId}
            role="region"
            aria-labelledby={triggerId}
            hidden={!isExpanded}
            data-state={isExpanded ? 'open' : 'closed'}
            className={composeClasses(
                'overflow-hidden transition-all duration-200',
                isExpanded ? 'animate-accordion-down' : 'animate-accordion-up',
                className,
                classNames?.content
            )}
        >
            <div className={composeClasses(SIZE_STYLES[size], 'pt-0')}>
                {children}
            </div>
        </div>
    );
};

// --- Main Component ---

/**
 * Universal Accordion component with keyboard navigation and accessibility
 *
 * Features:
 * - Single and multiple expansion modes
 * - Controlled and uncontrolled modes
 * - Full keyboard navigation (Arrow keys, Home, End, Enter, Space)
 * - Support for both items array and composition patterns
 * - Collapsible option (allow closing all items)
 * - Accessible with ARIA attributes
 *
 * @example
 * ```tsx
 * // Simple (with items array)
 * <UiAccordion
 *   items={[
 *     { value: 'item-1', trigger: 'Section 1', content: 'Content 1' },
 *     { value: 'item-2', trigger: 'Section 2', content: 'Content 2' },
 *   ]}
 * />
 *
 * // Composition pattern
 * <UiAccordion>
 *   <UiAccordion.Item value="item-1">
 *     <UiAccordion.Trigger>Section 1</UiAccordion.Trigger>
 *     <UiAccordion.Content>Content 1</UiAccordion.Content>
 *   </UiAccordion.Item>
 * </UiAccordion>
 *
 * // Controlled with multiple selection
 * <UiAccordion
 *   multiple
 *   value={expanded}
 *   onChange={setExpanded}
 *   items={items}
 * />
 * ```
 */
const UiAccordionRoot = ({
    items,
    value,
    defaultValue,
    onChange,
    multiple = false,
    collapsible = true,
    size = 'md',
    className,
    classNames,
    children,
}: UiAccordionProps) => {
    // Normalize value to array
    const normalizeValue = useCallback(
        (val: string | string[] | undefined): string[] => {
            if (val === undefined) return [];
            return Array.isArray(val) ? val : [val];
        },
        []
    );

    // Controlled vs uncontrolled
    const isControlled = value !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState<string[]>(() =>
        normalizeValue(defaultValue)
    );

    const expandedValues = isControlled
        ? normalizeValue(value)
        : uncontrolledValue;

    // Track registered items for keyboard navigation
    const [registeredItems, setRegisteredItems] = useState<string[]>([]);

    const registerItem = useCallback((itemValue: string) => {
        setRegisteredItems((prev) =>
            prev.includes(itemValue) ? prev : [...prev, itemValue]
        );
    }, []);

    const unregisterItem = useCallback((itemValue: string) => {
        setRegisteredItems((prev) => prev.filter((v) => v !== itemValue));
    }, []);

    // Get item values for keyboard navigation
    const itemValues = useMemo(() => {
        if (items) {
            return items.filter((item) => !item.disabled).map((item) => item.value);
        }
        // For composition pattern, extract values from children
        const values: string[] = [];
        Children.forEach(children, (child) => {
            if (isValidElement<UiAccordionItemProps>(child) && child.type === Item) {
                if (!child.props.disabled) {
                    values.push(child.props.value);
                }
            }
        });
        return values;
    }, [items, children]);

    // Toggle item expansion
    const toggleItem = useCallback(
        (itemValue: string) => {
            const isCurrentlyExpanded = expandedValues.includes(itemValue);

            let newValues: string[];

            if (isCurrentlyExpanded) {
                // Closing
                if (!collapsible && expandedValues.length === 1) {
                    // Can't close the last item if not collapsible
                    return;
                }
                newValues = expandedValues.filter((v) => v !== itemValue);
            } else {
                // Opening
                if (multiple) {
                    newValues = [...expandedValues, itemValue];
                } else {
                    newValues = [itemValue];
                }
            }

            if (!isControlled) {
                setUncontrolledValue(newValues);
            }

            // Call onChange with appropriate format
            if (onChange) {
                if (multiple) {
                    onChange(newValues);
                } else {
                    onChange(newValues[0] ?? '');
                }
            }
        },
        [expandedValues, multiple, collapsible, isControlled, onChange]
    );

    // Focus management for keyboard navigation
    const focusItem = useCallback((itemValue: string) => {
        const trigger = document.querySelector(
            `[data-trigger="${itemValue}"]`
        ) as HTMLButtonElement | null;
        trigger?.focus();
    }, []);

    const contextValue = useMemo(
        () => ({
            expandedValues,
            toggleItem,
            registerItem,
            unregisterItem,
            size,
            classNames,
            itemValues,
            focusItem,
        }),
        [
            expandedValues,
            toggleItem,
            registerItem,
            unregisterItem,
            size,
            classNames,
            itemValues,
            focusItem,
        ]
    );

    // Render with items array
    if (items) {
        return (
            <UiAccordionContext.Provider value={contextValue}>
                <div
                    className={composeClasses(
                        'border-t border-neutral-200 dark:border-neutral-700',
                        className
                    )}
                >
                    {items.map((item) => (
                        <Item
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                        >
                            <Trigger>{item.trigger}</Trigger>
                            <Content>{item.content}</Content>
                        </Item>
                    ))}
                </div>
            </UiAccordionContext.Provider>
        );
    }

    // Render with composition pattern
    return (
        <UiAccordionContext.Provider value={contextValue}>
            <div
                className={composeClasses(
                    'border-t border-neutral-200 dark:border-neutral-700',
                    className
                )}
            >
                {children}
            </div>
        </UiAccordionContext.Provider>
    );
};

export const UiAccordion = Object.assign(UiAccordionRoot, {
    Item,
    Trigger,
    Content,
});

export default UiAccordion;
