# UiSelect

Universal select component built on Headless UI with full TypeScript support and theme-agnostic styling.

## Features

- 🎯 **Two variants**: Filled and outlined styles
- 📐 **Three sizes**: Small, medium, large with consistent padding
- ♿ **Accessible**: Full ARIA support and keyboard navigation via Headless UI
- 🔒 **Type-safe**: Strict TypeScript with proper prop typing
- 🚫 **Disabled state**: Properly handles disabled interactions
- 🎨 **Customizable**: Theme-agnostic neutral colors, easy to override
- ⚡ **Lightweight**: Minimal styling, no unnecessary dependencies

## Installation

```tsx
import UiSelect from '@/shared/ui/UiSelect/UiSelect';
import type { UiSelectOption } from '@/shared/ui/UiSelect';
```

## Usage

### Basic Select

```tsx
const [value, setValue] = useState('option1');

const options: UiSelectOption[] = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
];

<UiSelect
    options={options}
    value={value}
    onChange={setValue}
/>
```

### Select with Size and Variant

```tsx
<UiSelect
    options={options}
    value={value}
    onChange={setValue}
    size="lg"
    variant="filled"
/>

<UiSelect
    options={options}
    value={value}
    onChange={setValue}
    size="sm"
    variant="outlined"
/>
```

### With Placeholder

```tsx
<UiSelect
    options={options}
    value={value}
    onChange={setValue}
    placeholder="Choose an option"
/>
```

### With Label

```tsx
<UiSelect
    options={options}
    value={value}
    onChange={setValue}
    label="Select your preference"
/>
```

### Disabled State

```tsx
<UiSelect
    options={options}
    value={value}
    onChange={setValue}
    disabled
/>
```

### Custom Styling

Override default styles with className:

```tsx
<UiSelect
    options={options}
    value={value}
    onChange={setValue}
    className="bg-blue-600 hover:bg-blue-700 text-white"
/>
```

### ReactNode Labels

Options support ReactNode for complex labels:

```tsx
const options: UiSelectOption[] = [
    {
        label: (
            <div className="flex items-center gap-2">
                <img src="/flag-us.png" alt="" className="w-4 h-4" />
                <span>United States</span>
            </div>
        ),
        value: 'us'
    },
    {
        label: (
            <div className="flex items-center gap-2">
                <img src="/flag-uk.png" alt="" className="w-4 h-4" />
                <span>United Kingdom</span>
            </div>
        ),
        value: 'uk'
    },
];
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `UiSelectOption[]` | **required** | Array of options to display |
| `value` | `string` | **required** | Currently selected value |
| `onChange` | `(value: string) => void` | **required** | Callback when selection changes |
| `variant` | `'filled' \| 'outlined'` | `'filled'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Select size (controls padding) |
| `className` | `string` | - | Additional CSS classes for the button |
| `disabled` | `boolean` | `false` | Disable the select |
| `placeholder` | `string` | `'Select an option'` | Text shown when no option selected |
| `label` | `string` | - | Accessible label for screen readers |

### Types

#### UiSelectOption

```tsx
interface UiSelectOption {
    label: ReactNode;  // Display text or element
    value: string;     // Unique identifier
}
```

#### UiSelectProps

```tsx
interface UiSelectProps {
    options: UiSelectOption[];
    value: string;
    onChange: (value: string) => void;
    variant?: 'filled' | 'outlined';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    disabled?: boolean;
    placeholder?: string;
    label?: string;
}
```

## Variants

### Size

Controls padding and text size:

- `sm`: `px-3 py-1.5 text-sm`
- `md`: `px-4 py-2 text-base`
- `lg`: `px-6 py-3 text-lg`

### Variant

Controls background, border, and text colors:

- `filled`: Dark background with white text, ideal for dark themes
- `outlined`: Transparent background with border, ideal for light themes

## Styling Details

### Button Styles

The select button uses theme-agnostic neutral colors:

**Filled variant:**
- Background: `neutral-800`
- Hover: `neutral-700`
- Disabled: `neutral-300` background, `neutral-500` text

**Outlined variant:**
- Background: `transparent`
- Border: `neutral-300`
- Hover border: `neutral-400`
- Disabled: `neutral-200` border, `neutral-400` text

### Dropdown Options

Options inherit the variant style:

**Filled variant:**
- Background: `neutral-800`
- Focus: `neutral-700`
- Selected: `neutral-900`

**Outlined variant:**
- Background: `white`
- Focus: `neutral-100`
- Selected: `neutral-200`

## TypeScript

Import types for type-safe usage:

```tsx
import type {
    UiSelectProps,
    UiSelectOption,
    UiSelectVariant,
    UiSelectSize,
} from '@/shared/ui/UiSelect';

const options: UiSelectOption[] = [
    { label: 'First', value: '1' },
    { label: 'Second', value: '2' },
];

const props: UiSelectProps = {
    options,
    value: '1',
    onChange: (val) => console.log(val),
    variant: 'filled',
    size: 'md',
};
```

## Accessibility

- Built on Headless UI Listbox with full keyboard support
- Proper ARIA attributes automatically handled
- Disabled state prevents interaction and keyboard focus
- Custom `label` prop for screen reader announcements
- Focus ring for keyboard navigation visibility

## Best Practices

1. **Controlled component**: Always manage `value` and `onChange` in your state
2. **Unique values**: Ensure each option has a unique `value` string
3. **Placeholder**: Provide clear placeholder text for better UX
4. **Labels**: Use `label` prop for accessibility when visual label isn't present
5. **Custom styles**: Use `className` sparingly, prefer `variant` and `size`
6. **ReactNode labels**: Use for icons, flags, or complex option display

## Examples

### Language Selector

```tsx
const [language, setLanguage] = useState('en');

const languages: UiSelectOption[] = [
    { label: 'English', value: 'en' },
    { label: 'Español', value: 'es' },
    { label: 'Français', value: 'fr' },
];

<UiSelect
    options={languages}
    value={language}
    onChange={setLanguage}
    variant="outlined"
    size="sm"
    label="Select language"
/>
```

### Settings Dropdown

```tsx
const [theme, setTheme] = useState('system');

const themeOptions: UiSelectOption[] = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
    { label: 'System', value: 'system' },
];

<UiSelect
    options={themeOptions}
    value={theme}
    onChange={setTheme}
    variant="filled"
    placeholder="Choose theme"
/>
```

### Form Field

```tsx
<div className="space-y-2">
    <label className="text-sm font-medium">Country</label>
    <UiSelect
        options={countries}
        value={selectedCountry}
        onChange={setSelectedCountry}
        variant="outlined"
        placeholder="Select your country"
    />
</div>
```

### Disabled State

```tsx
const [isLoading, setIsLoading] = useState(false);

<UiSelect
    options={options}
    value={value}
    onChange={setValue}
    disabled={isLoading}
/>
```

## File Structure

```
UiSelect/
├── UiSelect.tsx       # Main component
├── types.ts           # TypeScript types
├── index.ts           # Exports
└── README.md          # Documentation
```
