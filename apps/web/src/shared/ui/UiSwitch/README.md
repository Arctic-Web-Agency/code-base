# UiSwitch

Universal switch (toggle) component built on Headless UI with full TypeScript support and theme-agnostic styling.

## Features

- 📐 **Three sizes**: Small, medium, large with consistent dimensions
- ♿ **Accessible**: Full ARIA support and keyboard navigation via Headless UI
- 🔒 **Type-safe**: Strict TypeScript with proper prop typing
- 🚫 **Disabled state**: Properly handles disabled interactions
- 🎨 **Customizable**: Theme-agnostic neutral colors, easy to override
- ⚡ **Lightweight**: Minimal styling, no unnecessary dependencies
- 🎭 **Children support**: Optional label or content inside the switch

## Installation

```tsx
import UiSwitch from '@/shared/ui/UiSwitch/UiSwitch';
import type { UiSwitchProps, UiSwitchSize } from '@/shared/ui/UiSwitch/types';
```

## Usage

### Basic Switch

```tsx
const [enabled, setEnabled] = useState(false);

<UiSwitch
    checked={enabled}
    onChange={setEnabled}
/>
```

### Switch with Size

```tsx
<UiSwitch
    checked={enabled}
    onChange={setEnabled}
    size="lg"
/>

<UiSwitch
    checked={enabled}
    onChange={setEnabled}
    size="sm"
/>
```

### Switch with Label

```tsx
<label className="flex items-center gap-3 cursor-pointer">
    <UiSwitch
        checked={enabled}
        onChange={setEnabled}
    />
    <span>Enable notifications</span>
</label>
```

### Disabled State

```tsx
<UiSwitch
    checked={enabled}
    onChange={setEnabled}
    disabled
/>
```

### Custom Styling

Override default styles with className:

```tsx
<UiSwitch
    checked={enabled}
    onChange={setEnabled}
    className="bg-blue-600 data-[checked]:bg-green-600"
/>
```

### With ID and Name (for forms)

```tsx
<UiSwitch
    checked={enabled}
    onChange={setEnabled}
    id="notifications"
    name="notifications"
/>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | **required** | Current state of the switch |
| `onChange` | `(checked: boolean) => void` | - | Callback when switch state changes |
| `children` | `ReactNode` | - | Optional content (label) inside switch |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Switch size |
| `className` | `string` | - | Additional CSS classes for the container |
| `disabled` | `boolean` | `false` | Disable the switch |
| `id` | `string` | - | HTML id attribute |
| `name` | `string` | - | HTML name attribute for forms |

### Types

#### UiSwitchSize

```tsx
type UiSwitchSize = 'sm' | 'md' | 'lg';
```

#### UiSwitchProps

```tsx
interface UiSwitchProps {
    checked: boolean;
    onChange?: (checked: boolean) => void;
    children?: ReactNode;
    size?: UiSwitchSize;
    className?: string;
    disabled?: boolean;
    id?: string;
    name?: string;
}
```

## Size Variants

Controls container and toggle dimensions:

### Container (track) sizes:
- `sm`: `h-5 w-10` (height: 20px, width: 40px)
- `md`: `h-6 w-12` (height: 24px, width: 48px)
- `lg`: `h-7 w-14` (height: 28px, width: 56px)

### Toggle (button) sizes:
- `sm`: `h-4 w-4` (16x16px)
- `md`: `h-5 w-5` (20x20px)
- `lg`: `h-6 w-6` (24x24px)

### Toggle positions:
- `sm`: Translates 12px when checked
- `md`: Translates 16px when checked
- `lg`: Translates 20px when checked

## Styling Details

The switch uses theme-agnostic neutral colors:

**Unchecked state:**
- Background: `neutral-300` (light gray)
- Toggle: `white`

**Checked state:**
- Background: `neutral-700` (dark gray)
- Toggle: `white`

**Disabled state:**
- Opacity: `0.5`
- Cursor: `not-allowed`
- Pointer events: `none`

**Transitions:**
- Background color: 200ms
- Toggle position: 200ms

## TypeScript

Import types for type-safe usage:

```tsx
import type {
    UiSwitchProps,
    UiSwitchSize,
} from '@/shared/ui/UiSwitch/types';

const props: UiSwitchProps = {
    checked: true,
    onChange: (val) => console.log(val),
    size: 'md',
    disabled: false,
};
```

## Accessibility

- Built on Headless UI Switch with full keyboard support
- Proper ARIA attributes automatically handled
- Space and Enter keys toggle the switch
- Disabled state prevents interaction and keyboard focus
- Focus ring for keyboard navigation visibility
- Works with screen readers

## Best Practices

1. **Controlled component**: Always manage `checked` and `onChange` in your state
2. **Labels**: Provide clear labels next to switches for better UX
3. **Form integration**: Use `id` and `name` props when using in forms
4. **Immediate feedback**: Use switches for settings that take effect immediately
5. **Not for forms**: Don't use switches for form submission - use checkboxes instead
6. **Custom styles**: Use `className` sparingly, prefer using `size`

## Examples

### Settings Toggle

```tsx
const [notifications, setNotifications] = useState(false);

<div className="flex items-center justify-between">
    <div>
        <h3 className="font-medium">Enable notifications</h3>
        <p className="text-sm text-gray-500">
            Receive updates about your account
        </p>
    </div>
    <UiSwitch
        checked={notifications}
        onChange={setNotifications}
        size="md"
    />
</div>
```

### Theme Switcher

```tsx
const [isDark, setIsDark] = useState(false);

<label className="flex items-center gap-3 cursor-pointer">
    <UiSwitch
        checked={isDark}
        onChange={setIsDark}
        id="theme-toggle"
    />
    <span>Dark mode</span>
</label>
```

### Multiple Switches

```tsx
const [settings, setSettings] = useState({
    notifications: false,
    marketing: false,
    analytics: true,
});

const updateSetting = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
};

<div className="space-y-4">
    <div className="flex items-center justify-between">
        <label htmlFor="notifications">Notifications</label>
        <UiSwitch
            checked={settings.notifications}
            onChange={(val) => updateSetting('notifications', val)}
            id="notifications"
            size="sm"
        />
    </div>
    <div className="flex items-center justify-between">
        <label htmlFor="marketing">Marketing emails</label>
        <UiSwitch
            checked={settings.marketing}
            onChange={(val) => updateSetting('marketing', val)}
            id="marketing"
            size="sm"
        />
    </div>
    <div className="flex items-center justify-between">
        <label htmlFor="analytics">Analytics</label>
        <UiSwitch
            checked={settings.analytics}
            onChange={(val) => updateSetting('analytics', val)}
            id="analytics"
            size="sm"
        />
    </div>
</div>
```

### Disabled State

```tsx
const [isLoading, setIsLoading] = useState(false);
const [enabled, setEnabled] = useState(false);

<UiSwitch
    checked={enabled}
    onChange={setEnabled}
    disabled={isLoading}
/>
```

### Form Integration

```tsx
const [formData, setFormData] = useState({
    subscribe: false,
    terms: false,
});

<form onSubmit={handleSubmit}>
    <div className="space-y-4">
        <label className="flex items-center gap-3">
            <UiSwitch
                checked={formData.subscribe}
                onChange={(val) => setFormData({ ...formData, subscribe: val })}
                id="subscribe"
                name="subscribe"
            />
            <span>Subscribe to newsletter</span>
        </label>

        <label className="flex items-center gap-3">
            <UiSwitch
                checked={formData.terms}
                onChange={(val) => setFormData({ ...formData, terms: val })}
                id="terms"
                name="terms"
            />
            <span>I agree to terms and conditions</span>
        </label>
    </div>

    <button type="submit">Submit</button>
</form>
```

### Custom Colors

```tsx
<UiSwitch
    checked={enabled}
    onChange={setEnabled}
    className={enabled ? 'bg-green-600' : 'bg-red-300'}
/>
```

## File Structure

```
UiSwitch/
├── UiSwitch.tsx       # Main component
├── types.ts           # TypeScript types
├── index.ts           # Exports
└── README.md          # Documentation
```

## Switch vs Checkbox

**Use Switch when:**
- Setting takes effect immediately
- Toggling a state (on/off)
- User preferences or settings
- No form submission required

**Use Checkbox when:**
- Part of a form that requires submission
- Multiple selections needed
- Agreeing to terms or policies
- Binary choice within a form context

## Common Patterns

### Loading State

```tsx
const [enabled, setEnabled] = useState(false);
const [isLoading, setIsLoading] = useState(false);

const handleChange = async (value: boolean) => {
    setIsLoading(true);
    try {
        await updateSetting(value);
        setEnabled(value);
    } finally {
        setIsLoading(false);
    }
};

<UiSwitch
    checked={enabled}
    onChange={handleChange}
    disabled={isLoading}
/>
```

### Confirmation Dialog

```tsx
const [enabled, setEnabled] = useState(false);
const [showConfirm, setShowConfirm] = useState(false);

const handleChange = (value: boolean) => {
    if (value) {
        setShowConfirm(true);
    } else {
        setEnabled(false);
    }
};

const confirmChange = () => {
    setEnabled(true);
    setShowConfirm(false);
};

<>
    <UiSwitch checked={enabled} onChange={handleChange} />
    {showConfirm && (
        <ConfirmDialog
            onConfirm={confirmChange}
            onCancel={() => setShowConfirm(false)}
        />
    )}
</>
```

## Troubleshooting

**Switch doesn't change:**
- Ensure you're updating state in `onChange` callback
- Check that component is controlled (has `checked` and `onChange`)

**Toggle position is off:**
- Verify you're using the correct size variant
- Check for conflicting CSS classes in `className`

**Accessibility issues:**
- Add proper labels using `<label>` element
- Use `id` prop to associate with label's `htmlFor`
- Don't rely solely on color to indicate state
