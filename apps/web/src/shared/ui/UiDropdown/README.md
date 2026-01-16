# UiDropdown

Universal dropdown component with keyboard navigation, focus management,
and accessible menu semantics.

## Features

- 🎯 **Controlled/uncontrolled**: Works with state or internal toggling
- ⌨️ **Keyboard friendly**: Arrow keys, Enter, Escape, Home/End, Tab
- 🧭 **Placement options**: 12 placements around the trigger
- 🎨 **Sizes**: Small, medium, large item sizing
- 🔗 **Link support**: Items can render as links
- 🚫 **Disabled/danger**: Per-item states and styling
- ♿ **Accessible**: ARIA menu roles and focus management

## Installation

```tsx
import UiDropdown from '@/shared/ui/UiDropdown/UiDropdown';
import type { UiDropdownItem } from '@/shared/ui/UiDropdown';
```

## Usage

### Basic Dropdown

```tsx
const items: UiDropdownItem[] = [
    { key: 'edit', label: 'Edit', onClick: () => {} },
    { key: 'delete', label: 'Delete', danger: true, onClick: () => {} },
];

<UiDropdown
    trigger={<UiButton variant="text">Open</UiButton>}
    items={items}
/>
```

### Controlled State

```tsx
const [open, setOpen] = useState(false);

<UiDropdown
    isOpen={open}
    onOpenChange={setOpen}
    trigger={(isOpen) => (
        <UiButton variant="text">
            {isOpen ? 'Close' : 'Open'}
        </UiButton>
    )}
    items={items}
/>
```

### Links and Disabled Items

```tsx
const items: UiDropdownItem[] = [
    { key: 'profile', label: 'Profile', href: '/profile' },
    {
        key: 'docs',
        label: 'Docs',
        href: 'https://example.com',
        external: true,
    },
    { key: 'billing', label: 'Billing', disabled: true },
];
```

### Placement and Size

```tsx
<UiDropdown
    trigger={<UiButton variant="text">Open</UiButton>}
    items={items}
    placement="right-start"
    size="lg"
/>
```

### Menu Sizing and Offset

```tsx
<UiDropdown
    trigger={<UiButton variant="text">Open</UiButton>}
    items={items}
    offset={6}
    minWidth={200}
    maxHeight={240}
/>
```

### Keep Open on Select

```tsx
<UiDropdown
    trigger={<UiButton variant="text">Open</UiButton>}
    items={items}
    closeOnSelect={false}
/>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `trigger` | `ReactElement \| (open: boolean) => ReactElement` | **required** | Trigger element or render function |
| `items` | `UiDropdownItem[]` | **required** | Menu items |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Item size |
| `placement` | `UiDropdownPlacement` | `'bottom-start'` | Menu placement |
| `closeOnSelect` | `boolean` | `true` | Close menu after selecting an item |
| `closeOnClickOutside` | `boolean` | `true` | Close on outside click |
| `closeOnEsc` | `boolean` | `true` | Close on Escape |
| `disabled` | `boolean` | `false` | Disable the whole dropdown |
| `offset` | `number` | - | Margin offset in px |
| `minWidth` | `number \| string` | - | Menu min-width |
| `maxHeight` | `number \| string` | - | Menu max-height (enables scroll) |
| `className` | `string` | - | Container classes |
| `menuClassName` | `string` | - | Menu classes |
| `itemClassName` | `string` | - | Item classes |
| `ariaLabel` | `string` | - | Trigger ARIA label |
| `onSelect` | `(key: string, item: UiDropdownItem) => void` | - | Selection callback |
| `isOpen` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | - | Controlled state setter |
| `defaultOpen` | `boolean` | `false` | Uncontrolled default open |

### Types

#### UiDropdownItem

```tsx
interface UiDropdownItem {
    key: string;
    label: ReactNode;
    icon?: ReactNode;
    disabled?: boolean;
    danger?: boolean;
    divider?: boolean;
    onClick?: () => void;
    href?: string;
    external?: boolean;
}
```
