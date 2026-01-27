# UiAccordion

Universal accordion component with keyboard navigation, accessibility support, and flexible API styles.

## Features

- 🎯 **Two API styles**: Declarative `items` prop or flexible composition API
- 📐 **Three sizes**: Small, medium, large with consistent padding
- 🔄 **Single/Multiple modes**: Expand one item or many simultaneously
- 🔒 **Controlled & Uncontrolled**: Full state management flexibility
- ♿ **Accessible**: Full ARIA support and keyboard navigation
- 🚫 **Disabled state**: Per-item disable support
- 🔐 **Collapsible option**: Optionally prevent closing all items
- 🎨 **Customizable**: Theme-agnostic neutral colors, granular `classNames` override

## Installation

```tsx
import UiAccordion from '@/shared/ui/UiAccordion';
import type { UiAccordionProps, UiAccordionItem } from '@/shared/ui/UiAccordion';
```

## Usage

### Basic Accordion (Declarative API)

```tsx
const items: UiAccordionItem[] = [
    { value: 'item-1', trigger: 'Section 1', content: 'Content for section 1' },
    { value: 'item-2', trigger: 'Section 2', content: 'Content for section 2' },
    { value: 'item-3', trigger: 'Section 3', content: 'Content for section 3' },
];

<UiAccordion items={items} defaultValue="item-1" />
```

### Composition API

For more control over rendering:

```tsx
<UiAccordion defaultValue="item-1">
    <UiAccordion.Item value="item-1">
        <UiAccordion.Trigger>Section 1</UiAccordion.Trigger>
        <UiAccordion.Content>
            Content for section 1
        </UiAccordion.Content>
    </UiAccordion.Item>
    <UiAccordion.Item value="item-2">
        <UiAccordion.Trigger>Section 2</UiAccordion.Trigger>
        <UiAccordion.Content>
            Content for section 2
        </UiAccordion.Content>
    </UiAccordion.Item>
</UiAccordion>
```

### Multiple Expansion

Allow multiple items to be open simultaneously:

```tsx
const [expanded, setExpanded] = useState<string[]>(['item-1', 'item-2']);

<UiAccordion
    items={items}
    multiple
    value={expanded}
    onChange={(value) => setExpanded(value as string[])}
/>
```

### Sizes

```tsx
<UiAccordion items={items} size="sm" />  // Compact
<UiAccordion items={items} size="md" />  // Default
<UiAccordion items={items} size="lg" />  // Large
```

### Non-Collapsible

Prevent closing the last open item:

```tsx
<UiAccordion
    items={items}
    collapsible={false}
    defaultValue="item-1"
/>
```

### Disabled Items

```tsx
const items: UiAccordionItem[] = [
    { value: 'item-1', trigger: 'Active', content: 'Content 1' },
    { value: 'item-2', trigger: 'Disabled', content: 'Content 2', disabled: true },
];

<UiAccordion items={items} />

// Or with composition API
<UiAccordion.Item value="item-2" disabled>
    <UiAccordion.Trigger>Disabled</UiAccordion.Trigger>
    <UiAccordion.Content>Content</UiAccordion.Content>
</UiAccordion.Item>
```

### Controlled Component

```tsx
const [activeItem, setActiveItem] = useState('item-1');

<UiAccordion
    items={items}
    value={activeItem}
    onChange={(value) => setActiveItem(value as string)}
/>
```

### Custom Styling

Override styles with `classNames`:

```tsx
<UiAccordion
    items={items}
    className="border-t-blue-200 dark:border-t-blue-800"
    classNames={{
        item: 'border-blue-200 dark:border-blue-800',
        trigger: 'bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100',
        content: 'bg-blue-50/50 dark:bg-blue-900/10',
        icon: 'text-blue-600 dark:text-blue-400',
    }}
/>
```

## API Reference

### UiAccordion Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `UiAccordionItem[]` | - | Array of accordion items (declarative API) |
| `value` | `string \| string[]` | - | Controlled expanded value(s) |
| `defaultValue` | `string \| string[]` | - | Default expanded value(s) (uncontrolled) |
| `onChange` | `(value: string \| string[]) => void` | - | Callback when expanded items change |
| `multiple` | `boolean` | `false` | Allow multiple items to be expanded |
| `collapsible` | `boolean` | `true` | Allow all items to be collapsed |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `className` | `string` | - | Container classes |
| `classNames` | `object` | - | Granular style overrides |
| `children` | `ReactNode` | - | Composition API children |

### UiAccordionItem

```tsx
interface UiAccordionItem {
    value: string;         // Unique identifier
    trigger: ReactNode;    // Header/trigger content
    content: ReactNode;    // Panel content
    disabled?: boolean;    // Disable this item
}
```

### UiAccordion.Item Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | **required** | Unique item identifier |
| `disabled` | `boolean` | `false` | Disable this item |
| `className` | `string` | - | Additional classes |
| `children` | `ReactNode` | **required** | Trigger and Content components |

### UiAccordion.Trigger Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **required** | Trigger label content |
| `className` | `string` | - | Additional classes |

### UiAccordion.Content Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **required** | Panel content |
| `className` | `string` | - | Additional classes |

### classNames Object

| Key | Description |
|-----|-------------|
| `item` | Individual accordion item wrapper |
| `trigger` | Trigger button |
| `content` | Content panel |
| `icon` | Chevron icon |

## Types

```tsx
import type {
    UiAccordionProps,
    UiAccordionItem,
    UiAccordionSize,
    UiAccordionItemProps,
    UiAccordionTriggerProps,
    UiAccordionContentProps,
} from '@/shared/ui/UiAccordion';
```

## Size Variants

Controls padding and text size:

- `sm`: `py-2 px-3 text-sm` (icon: `h-4 w-4`)
- `md`: `py-3 px-4 text-base` (icon: `h-5 w-5`)
- `lg`: `py-4 px-5 text-lg` (icon: `h-6 w-6`)

## Accessibility

- Full keyboard navigation: Arrow Up/Down, Home, End
- `aria-expanded` indicates open/closed state
- `aria-controls` links trigger to content panel
- `aria-labelledby` links content to trigger
- `role="region"` on content panels
- Disabled items have `aria-disabled` and are not focusable
- Focus ring visible on keyboard navigation

## Data Attributes

Available for CSS targeting:

- `data-state="open"` / `data-state="closed"` on Item and Content
- `data-disabled` on disabled items
- `data-trigger` with item value for focus management

## Best Practices

1. **Use declarative API for simple cases**: `items` prop is cleaner for basic accordions
2. **Use composition API for complex content**: When you need custom rendering or rich content
3. **Unique values**: Ensure each item has a unique `value` string
4. **Controlled for forms**: Use `value` + `onChange` when accordion state affects form logic
5. **Non-collapsible for required selection**: Set `collapsible={false}` when at least one item must always be open
6. **Multiple for FAQ sections**: Enable `multiple` when users may want to compare content

## Examples

### FAQ Section

```tsx
const faqItems: UiAccordionItem[] = [
    { value: 'faq-1', trigger: 'How do I reset my password?', content: <PasswordResetInstructions /> },
    { value: 'faq-2', trigger: 'Where can I find my order history?', content: <OrderHistoryGuide /> },
    { value: 'faq-3', trigger: 'How do I contact support?', content: <SupportContactInfo /> },
];

<UiAccordion items={faqItems} multiple />
```

### Settings Panel

```tsx
<UiAccordion defaultValue="general" collapsible={false}>
    <UiAccordion.Item value="general">
        <UiAccordion.Trigger>General Settings</UiAccordion.Trigger>
        <UiAccordion.Content>
            <GeneralSettingsForm />
        </UiAccordion.Content>
    </UiAccordion.Item>
    <UiAccordion.Item value="notifications">
        <UiAccordion.Trigger>Notification Preferences</UiAccordion.Trigger>
        <UiAccordion.Content>
            <NotificationSettingsForm />
        </UiAccordion.Content>
    </UiAccordion.Item>
    <UiAccordion.Item value="privacy">
        <UiAccordion.Trigger>Privacy & Security</UiAccordion.Trigger>
        <UiAccordion.Content>
            <PrivacySettingsForm />
        </UiAccordion.Content>
    </UiAccordion.Item>
</UiAccordion>
```

### Product Details

```tsx
const [expanded, setExpanded] = useState<string[]>(['description']);

<UiAccordion
    multiple
    value={expanded}
    onChange={(value) => setExpanded(value as string[])}
    size="lg"
>
    <UiAccordion.Item value="description">
        <UiAccordion.Trigger>Description</UiAccordion.Trigger>
        <UiAccordion.Content>
            <ProductDescription />
        </UiAccordion.Content>
    </UiAccordion.Item>
    <UiAccordion.Item value="specifications">
        <UiAccordion.Trigger>Specifications</UiAccordion.Trigger>
        <UiAccordion.Content>
            <ProductSpecs />
        </UiAccordion.Content>
    </UiAccordion.Item>
    <UiAccordion.Item value="reviews">
        <UiAccordion.Trigger>Reviews (24)</UiAccordion.Trigger>
        <UiAccordion.Content>
            <ProductReviews />
        </UiAccordion.Content>
    </UiAccordion.Item>
</UiAccordion>
```

## File Structure

```
UiAccordion/
├── UiAccordion.tsx    # Main component
├── types.ts           # TypeScript types
├── index.ts           # Exports
└── README.md          # Documentation
```

## Dependencies

- `react` - React hooks and context
- `@/shared/lib` - Utility functions (composeClasses)
- `@/shared/icons` - ChevronDownIcon
