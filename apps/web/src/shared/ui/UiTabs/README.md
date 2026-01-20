# UiTabs

Universal tabs component built on Headless UI with full TypeScript support, two API styles, and theme-agnostic styling.

## Features

- 🎯 **Two API styles**: Declarative `items` prop or flexible composition API
- 🎨 **Two variants**: Primary (pill-style) and underline styles
- 📐 **Three sizes**: Small, medium, large with consistent padding
- 📍 **Two orientations**: Horizontal and vertical layouts
- ♿ **Accessible**: Full ARIA support and keyboard navigation via Headless UI
- 🔒 **Type-safe**: Strict TypeScript with proper prop typing
- 🎭 **Icons**: Support for icons in tabs
- 🚫 **Disabled state**: Per-tab disable support
- ⚡ **Lazy loading**: Optional unmount of inactive panels
- 🎨 **Customizable**: Theme-agnostic neutral colors, granular `classNames` override

## Installation

```tsx
import UiTabs from '@/shared/ui/UiTabs';
import type { UiTabsItem, UiTabsProps } from '@/shared/ui/UiTabs';
```

## Usage

### Basic Tabs (Declarative API)

```tsx
const tabs: UiTabsItem[] = [
    { label: 'Account', value: 'account', content: <AccountPanel /> },
    { label: 'Settings', value: 'settings', content: <SettingsPanel /> },
    { label: 'Billing', value: 'billing', content: <BillingPanel /> },
];

<UiTabs items={tabs} />
```

### Composition API

For more control over rendering:

```tsx
<UiTabs defaultValue="account">
    <UiTabs.List>
        <UiTabs.Tab value="account">Account</UiTabs.Tab>
        <UiTabs.Tab value="settings">Settings</UiTabs.Tab>
        <UiTabs.Tab value="billing" disabled>Billing</UiTabs.Tab>
    </UiTabs.List>
    <UiTabs.Panels>
        <UiTabs.Panel value="account">
            <AccountPanel />
        </UiTabs.Panel>
        <UiTabs.Panel value="settings">
            <SettingsPanel />
        </UiTabs.Panel>
        <UiTabs.Panel value="billing">
            <BillingPanel />
        </UiTabs.Panel>
    </UiTabs.Panels>
</UiTabs>
```

### With Icons

```tsx
import { UserIcon, BellIcon, LockIcon } from '@/shared/icons';

const tabs: UiTabsItem[] = [
    { label: 'Account', value: 'account', icon: <UserIcon />, content: <AccountPanel /> },
    { label: 'Notifications', value: 'notifications', icon: <BellIcon />, content: <NotificationsPanel /> },
    { label: 'Security', value: 'security', icon: <LockIcon />, content: <SecurityPanel /> },
];

<UiTabs items={tabs} />

// Or with composition API
<UiTabs.Tab value="account" icon={<UserIcon />}>Account</UiTabs.Tab>
```

### Variants

```tsx
// Primary (default) - pill-style background
<UiTabs items={tabs} variant="primary" />

// Underline - border-based indicator
<UiTabs items={tabs} variant="underline" />
```

### Sizes

```tsx
<UiTabs items={tabs} size="sm" />  // Compact
<UiTabs items={tabs} size="md" />  // Default
<UiTabs items={tabs} size="lg" />  // Large
```

### Full Width

```tsx
<UiTabs items={tabs} fullWidth />
```

### Vertical Orientation

```tsx
<UiTabs items={tabs} orientation="vertical" />
```

### Controlled Component

```tsx
const [activeTab, setActiveTab] = useState('account');

<UiTabs
    items={tabs}
    value={activeTab}
    onChange={setActiveTab}
/>
```

### Lazy Loading

Unmount inactive panels to save memory:

```tsx
<UiTabs items={tabs} lazy />
```

### Custom Styling

Override styles with `classNames`:

```tsx
<UiTabs
    items={tabs}
    classNames={{
        list: 'bg-blue-50 rounded-t-lg',
        tab: 'data-[selected]:text-blue-600',
        panels: 'border rounded-b-lg',
        panel: 'p-6',
    }}
/>
```

## API Reference

### UiTabs Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `UiTabsItem[]` | - | Array of tab items (declarative API) |
| `value` | `string` | - | Controlled active tab value |
| `defaultValue` | `string` | - | Default active tab (uncontrolled) |
| `onChange` | `(value: string) => void` | - | Callback when tab changes |
| `variant` | `'primary' \| 'underline'` | `'primary'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tab size |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout orientation |
| `fullWidth` | `boolean` | `false` | Stretch tabs to fill container |
| `lazy` | `boolean` | `false` | Unmount inactive panels |
| `className` | `string` | - | Container classes |
| `classNames` | `object` | - | Granular style overrides |
| `children` | `ReactNode` | - | Composition API children |

### UiTabsItem

```tsx
interface UiTabsItem {
    label: ReactNode;      // Tab button content
    value: string;         // Unique identifier
    content?: ReactNode;   // Panel content
    disabled?: boolean;    // Disable this tab
    icon?: ReactNode;      // Icon element
}
```

### UiTabs.Tab Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | **required** | Unique tab identifier |
| `disabled` | `boolean` | `false` | Disable this tab |
| `icon` | `ReactNode` | - | Icon element |
| `children` | `ReactNode` | **required** | Tab label content |
| `className` | `string` | - | Additional classes |

### UiTabs.Panel Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | **required** | Matching tab identifier |
| `children` | `ReactNode` | **required** | Panel content |
| `className` | `string` | - | Additional classes |

### classNames Object

| Key | Description |
|-----|-------------|
| `list` | Tab list container |
| `tab` | Individual tab button |
| `panels` | Panels container |
| `panel` | Individual panel |

## Types

```tsx
import type {
    UiTabsProps,
    UiTabsItem,
    UiTabsVariant,
    UiTabsSize,
    UiTabProps,
    UiTabListProps,
    UiTabPanelsProps,
    UiTabPanelProps,
} from '@/shared/ui/UiTabs';
```

## Variants

### Size

Controls padding and text size:

- `sm`: `text-xs py-1.5 px-3`
- `md`: `text-sm py-2 px-4`
- `lg`: `text-base py-3 px-6`

### Variant

Controls visual style:

- `primary`: Pill-style with background on selected tab
- `underline`: Border-based indicator on selected tab

## Accessibility

- Built on Headless UI Tab components with full ARIA support
- Keyboard navigation: Arrow keys, Home, End, Enter, Space
- Proper `role="tablist"`, `role="tab"`, `role="tabpanel"` semantics
- Focus management and visible focus indicators
- Disabled tabs are not focusable

## Best Practices

1. **Use declarative API for simple cases**: `items` prop is cleaner for basic tabs
2. **Use composition API for complex layouts**: When you need custom rendering or conditional tabs
3. **Unique values**: Ensure each tab has a unique `value` string
4. **Controlled for forms**: Use `value` + `onChange` when tab state affects form logic
5. **Lazy for heavy content**: Enable `lazy` when panels contain expensive components
6. **Icons with labels**: Use icons alongside labels, not instead of them

## Examples

### Settings Page

```tsx
const settingsTabs: UiTabsItem[] = [
    { label: 'Profile', value: 'profile', icon: <UserIcon />, content: <ProfileSettings /> },
    { label: 'Notifications', value: 'notifications', icon: <BellIcon />, content: <NotificationSettings /> },
    { label: 'Security', value: 'security', icon: <LockIcon />, content: <SecuritySettings /> },
];

<UiTabs items={settingsTabs} variant="underline" />
```

### Dashboard Navigation

```tsx
<UiTabs
    defaultValue="overview"
    orientation="vertical"
    className="min-h-[400px]"
>
    <UiTabs.List>
        <UiTabs.Tab value="overview">Overview</UiTabs.Tab>
        <UiTabs.Tab value="analytics">Analytics</UiTabs.Tab>
        <UiTabs.Tab value="reports">Reports</UiTabs.Tab>
    </UiTabs.List>
    <UiTabs.Panels>
        <UiTabs.Panel value="overview"><OverviewDashboard /></UiTabs.Panel>
        <UiTabs.Panel value="analytics"><AnalyticsDashboard /></UiTabs.Panel>
        <UiTabs.Panel value="reports"><ReportsDashboard /></UiTabs.Panel>
    </UiTabs.Panels>
</UiTabs>
```

### Product Tabs

```tsx
const [activeTab, setActiveTab] = useState('description');

<UiTabs
    value={activeTab}
    onChange={setActiveTab}
    variant="underline"
    fullWidth
>
    <UiTabs.List>
        <UiTabs.Tab value="description">Description</UiTabs.Tab>
        <UiTabs.Tab value="specs">Specifications</UiTabs.Tab>
        <UiTabs.Tab value="reviews">Reviews (24)</UiTabs.Tab>
    </UiTabs.List>
    <UiTabs.Panels>
        <UiTabs.Panel value="description">
            <ProductDescription />
        </UiTabs.Panel>
        <UiTabs.Panel value="specs">
            <ProductSpecs />
        </UiTabs.Panel>
        <UiTabs.Panel value="reviews">
            <ProductReviews />
        </UiTabs.Panel>
    </UiTabs.Panels>
</UiTabs>
```

## File Structure

```
UiTabs/
├── UiTabs.tsx    # Main component
├── types.ts      # TypeScript types
├── index.ts      # Exports
└── README.md     # Documentation
```

## Dependencies

- `@headlessui/react` - Accessible UI primitives
- `class-variance-authority` - Variant styling
- `@/shared/lib` - Utility functions (composeClasses)
