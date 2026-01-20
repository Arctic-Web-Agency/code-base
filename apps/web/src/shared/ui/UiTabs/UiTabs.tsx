/* eslint-disable react/prop-types */
'use client';

import {
    createContext,
    Fragment,
    useContext,
    useMemo,
    Children,
    isValidElement,
} from 'react';
import { Tab as HeadlessTab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { cva, VariantProps } from 'class-variance-authority';
import { composeClasses } from '@/shared/lib';
import type {
    UiTabsProps,
    UiTabProps,
    UiTabListProps,
    UiTabPanelProps,
    UiTabPanelsProps,
} from './types';

const tabListStyles = cva('flex', {
    variants: {
        variant: {
            primary: 'bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl',
            underline: '',
        },
        orientation: {
            horizontal: 'flex-row space-x-1',
            vertical: 'flex-col space-y-1',
        },
    },
    compoundVariants: [
        {
            variant: 'underline',
            orientation: 'horizontal',
            className: 'border-b border-neutral-200 dark:border-neutral-700',
        },
        {
            variant: 'underline',
            orientation: 'vertical',
            className: 'border-l border-neutral-200 dark:border-neutral-700',
        },
    ],
    defaultVariants: {
        variant: 'primary',
        orientation: 'horizontal',
    },
});

const tabStyles = cva(
    'font-medium transition-all duration-200 focus:outline-none flex items-center gap-2',
    {
        variants: {
            variant: {
                primary:
                    'rounded-lg data-[selected]:bg-white data-[selected]:text-neutral-900 data-[selected]:shadow-sm dark:data-[selected]:bg-neutral-700 dark:data-[selected]:text-white text-neutral-600 hover:text-neutral-900 hover:bg-white/50 dark:text-neutral-400 dark:hover:text-neutral-200 dark:hover:bg-neutral-700/50',
                underline:
                    'data-[selected]:text-neutral-900 dark:data-[selected]:text-white text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200',
            },
            orientation: {
                horizontal: '',
                vertical: '',
            },
            size: {
                sm: 'text-xs py-1.5 px-3',
                md: 'text-sm py-2 px-4',
                lg: 'text-base py-3 px-6',
            },
            fullWidth: {
                true: 'flex-1',
            },
        },
        compoundVariants: [
            {
                variant: 'underline',
                orientation: 'horizontal',
                className:
                    'border-b-2 data-[selected]:border-neutral-900 dark:data-[selected]:border-white border-transparent hover:border-neutral-300 dark:hover:border-neutral-600 -mb-px px-1',
            },
            {
                variant: 'underline',
                orientation: 'vertical',
                className:
                    'border-l-2 data-[selected]:border-neutral-900 dark:data-[selected]:border-white border-transparent hover:border-neutral-300 dark:hover:border-neutral-600 -ml-px pl-1',
            },
        ],
        defaultVariants: {
            variant: 'primary',
            size: 'md',
            orientation: 'horizontal',
        },
    }
);

interface UiTabsContextProps extends VariantProps<typeof tabStyles> {
    classNames?: UiTabsProps['classNames'];
    lazy?: boolean;
}

const UiTabsContext = createContext<UiTabsContextProps | null>(null);

const useUiTabsContext = () => {
    const context = useContext(UiTabsContext);
    if (!context) {
        throw new Error('UiTabs.* components must be used within a UiTabs component');
    }
    return context;
};

const List = ({ children, className }: UiTabListProps) => {
    const { variant, orientation, classNames } = useUiTabsContext();
    return (
        <TabList
            className={composeClasses(
                tabListStyles({ variant, orientation }),
                className,
                classNames?.list
            )}
        >
            {children}
        </TabList>
    );
};

const Tab = ({ value, disabled, icon, children, className }: UiTabProps) => {
    const { variant, size, fullWidth, orientation, classNames } = useUiTabsContext();

    return (
        <HeadlessTab as={Fragment} disabled={disabled}>
            <button
                data-value={value}
                className={composeClasses(
                    tabStyles({ variant, size, fullWidth, orientation }),
                    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
                    className,
                    classNames?.tab
                )}
            >
                {icon && <span className="shrink-0">{icon}</span>}
                <span>{children}</span>
            </button>
        </HeadlessTab>
    );
};

const Panels = ({ children, className }: UiTabPanelsProps) => {
    const { orientation, classNames } = useUiTabsContext();
    const isVertical = orientation === 'vertical';
    return (
        <TabPanels
            className={composeClasses(
                'flex-1',
                !isVertical && 'mt-4',
                isVertical && 'ml-4',
                className,
                classNames?.panels
            )}
        >
            {children}
        </TabPanels>
    );
};

const Panel = ({ value, children, className }: UiTabPanelProps) => {
    const { classNames, lazy } = useUiTabsContext();
    return (
        <TabPanel
            key={value}
            unmount={lazy}
            className={composeClasses(
                'focus:outline-none',
                className,
                classNames?.panel
            )}
        >
            {children}
        </TabPanel>
    );
};

const UiTabsRoot = ({
    items,
    value,
    defaultValue,
    onChange,
    variant = 'primary',
    size = 'md',
    orientation = 'horizontal',
    className,
    fullWidth = false,
    lazy = false,
    classNames,
    children,
}: UiTabsProps) => {
    const isVertical = orientation === 'vertical';
    const contextValue = { variant, size, orientation, fullWidth, classNames, lazy };

    const indices = useMemo(() => {
        if (!items) return { selected: undefined, default: 0 };
        const valueIndex = value
            ? items.findIndex((item) => item.value === value)
            : undefined;
        const defaultIndex = defaultValue
            ? items.findIndex((item) => item.value === defaultValue)
            : 0;
        return {
            selected: valueIndex !== undefined && valueIndex >= 0 ? valueIndex : undefined,
            default: defaultIndex >= 0 ? defaultIndex : 0,
        };
    }, [items, value, defaultValue]);

    const handleTabChange = (index: number) => {
        if (onChange && items) {
            onChange(items[index].value);
        }
    };

    if (items) {
        return (
            <TabGroup
                vertical={isVertical}
                selectedIndex={indices.selected}
                defaultIndex={indices.default}
                onChange={handleTabChange}
                className={composeClasses(isVertical && 'flex gap-4', className)}
            >
                <UiTabsContext.Provider value={contextValue}>
                    <List>
                        {items.map((item) => (
                            <Tab key={item.value} {...item}>
                                {item.label}
                            </Tab>
                        ))}
                    </List>
                    <Panels>
                        {items.map((item) => (
                            <Panel key={item.value} value={item.value}>
                                {item.content}
                            </Panel>
                        ))}
                    </Panels>
                </UiTabsContext.Provider>
            </TabGroup>
        );
    }

    const tabValues = useMemo(() => {
        const values: string[] = [];
        Children.forEach(children, (child) => {
            if (isValidElement<UiTabListProps>(child) && child.type === List) {
                Children.forEach(child.props.children, (tab) => {
                    if (isValidElement<UiTabProps>(tab) && tab.type === Tab && tab.props.value) {
                        values.push(tab.props.value);
                    }
                });
            }
        });
        return values;
    }, [children]);

    const compositionIndices = useMemo(() => {
        const valueIndex = value ? tabValues.indexOf(value) : undefined;
        const defaultIndex = defaultValue ? tabValues.indexOf(defaultValue) : 0;
        return {
            selected: valueIndex !== undefined && valueIndex >= 0 ? valueIndex : undefined,
            default: defaultIndex >= 0 ? defaultIndex : 0,
        };
    }, [tabValues, value, defaultValue]);

    const handleCompositionChange = (index: number) => {
        if (onChange && tabValues[index]) {
            onChange(tabValues[index]);
        }
    };

    return (
        <TabGroup
            vertical={isVertical}
            selectedIndex={compositionIndices.selected}
            defaultIndex={compositionIndices.default}
            onChange={handleCompositionChange}
            className={composeClasses(isVertical && 'flex gap-4', className)}
        >
            <UiTabsContext.Provider value={contextValue}>
                {children}
            </UiTabsContext.Provider>
        </TabGroup>
    );
};

export const UiTabs = Object.assign(UiTabsRoot, {
    List,
    Tab,
    Panels,
    Panel,
});

export default UiTabs;
