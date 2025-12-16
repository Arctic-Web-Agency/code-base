# UiInput

Universal input component with full TypeScript support and theme-agnostic styling.

## Features

- 📐 **Three sizes**: Small, medium, large with consistent padding
- 🎨 **Two variants**: Filled and outlined styles
- ♿ **Accessible**: Full ARIA support and keyboard navigation
- 🔒 **Type-safe**: Strict TypeScript with proper prop typing
- 🚫 **Disabled state**: Properly handles disabled interactions
- ❌ **Error state**: Visual feedback for validation errors
- 🏷️ **Label support**: Optional label with proper accessibility
- 🎭 **Customizable**: Theme-agnostic neutral colors, easy to override
- ⚡ **Lightweight**: Minimal styling, no unnecessary dependencies

## Installation

```tsx
import UiInput from '@/shared/ui/UiInput/UiInput';
import type { UiInputProps, UiInputVariant, UiInputSize } from '@/shared/ui/UiInput';
```

## Usage

### Basic Input

```tsx
const [value, setValue] = useState('');

<UiInput
    value={value}
    onChange={(e) => setValue(e.target.value)}
    placeholder="Enter text..."
/>
```

### Input with Size and Variant

```tsx
<UiInput
    value={value}
    onChange={(e) => setValue(e.target.value)}
    size="lg"
    variant="filled"
    placeholder="Large filled input"
/>

<UiInput
    value={value}
    onChange={(e) => setValue(e.target.value)}
    size="sm"
    variant="outlined"
    placeholder="Small outlined input"
/>
```

### Input with Label

```tsx
<UiInput
    id="email"
    label="Email address"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="you@example.com"
/>
```

### Input with Error State

```tsx
<UiInput
    value={value}
    onChange={(e) => setValue(e.target.value)}
    error={!!validationError}
    placeholder="Enter value..."
/>
```

### Different Input Types

```tsx
<UiInput
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Password"
/>

<UiInput
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Email"
/>

<UiInput
    type="number"
    value={age}
    onChange={(e) => setAge(e.target.value)}
    placeholder="Age"
/>
```

### Disabled State

```tsx
<UiInput
    value={value}
    onChange={(e) => setValue(e.target.value)}
    disabled
    placeholder="Disabled input"
/>
```

### Custom Styling

Override default styles with className:

```tsx
<UiInput
    value={value}
    onChange={(e) => setValue(e.target.value)}
    className="bg-blue-600 text-white border-blue-500"
    placeholder="Custom styled input"
/>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'filled' \| 'outlined'` | `'filled'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input size (controls padding) |
| `error` | `boolean` | `false` | Show error state |
| `label` | `string` | - | Label text (renders above input) |
| `className` | `string` | - | Additional CSS classes |
| `disabled` | `boolean` | `false` | Disable the input |
| All other `InputHTMLAttributes<HTMLInputElement>` props are supported |

### Types

#### UiInputVariant

```tsx
type UiInputVariant = 'filled' | 'outlined';
```

#### UiInputSize

```tsx
type UiInputSize = 'sm' | 'md' | 'lg';
```

#### UiInputProps

```tsx
interface UiInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    variant?: UiInputVariant;
    size?: UiInputSize;
    error?: boolean;
    label?: string;
}
```

## Size Variants

Controls padding and text size:

- `sm`: `px-3 py-1.5 text-sm`
- `md`: `px-4 py-2 text-base`
- `lg`: `px-6 py-3 text-lg`

## Style Variants

Controls background, border, and text colors:

### Filled variant:
- Background: `neutral-800`
- Text: `white`
- Placeholder: `neutral-400`
- Focus: `neutral-700` background
- Disabled: `neutral-300` background, `neutral-500` text

### Outlined variant:
- Background: `transparent`
- Text: `neutral-600` (light) / `neutral-300` (dark)
- Border: `neutral-300`
- Placeholder: `neutral-400`
- Focus: `neutral-400` border
- Disabled: `neutral-200` border, `neutral-400` text

## Error State

When `error={true}`:
- Border: `red-500`
- Focus border: `red-500`
- Focus ring: `red-500`

## TypeScript

Import types for type-safe usage:

```tsx
import type {
    UiInputProps,
    UiInputVariant,
    UiInputSize,
} from '@/shared/ui/UiInput';

const props: UiInputProps = {
    value: '',
    onChange: (e) => console.log(e.target.value),
    variant: 'filled',
    size: 'md',
    placeholder: 'Enter text',
};
```

## Accessibility

- Proper label association via `id` and `htmlFor`
- Keyboard navigation support
- Focus ring for visibility
- Disabled state prevents interaction
- ARIA attributes automatically handled
- Semantic HTML input element

## Best Practices

1. **Labels**: Always provide labels for better accessibility
2. **Placeholders**: Use placeholder text as hints, not as labels
3. **Error messages**: Combine `error` prop with error message text below input
4. **Validation**: Validate on blur or submit, not on every keystroke
5. **Type attribute**: Use appropriate `type` for different inputs (email, password, etc.)
6. **Controlled components**: Always manage value and onChange in state

## Examples

### Login Form

```tsx
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

<form onSubmit={handleSubmit}>
    <UiInput
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        variant="outlined"
        size="md"
    />

    <UiInput
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        variant="outlined"
        size="md"
    />

    <button type="submit">Sign in</button>
</form>
```

### Search Input

```tsx
const [search, setSearch] = useState('');

<UiInput
    type="search"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search..."
    variant="outlined"
    size="sm"
/>
```

### Validated Input

```tsx
const [username, setUsername] = useState('');
const [error, setError] = useState('');

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);

    if (value.length < 3) {
        setError('Username must be at least 3 characters');
    } else {
        setError('');
    }
};

<div>
    <UiInput
        id="username"
        label="Username"
        value={username}
        onChange={handleChange}
        error={!!error}
        placeholder="Enter username"
    />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
</div>
```

### Form Field with Helper Text

```tsx
<div className="space-y-1">
    <UiInput
        id="website"
        label="Website"
        type="url"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        placeholder="https://example.com"
        variant="outlined"
    />
    <p className="text-sm text-neutral-500">
        Include the full URL with https://
    </p>
</div>
```

### Disabled Input

```tsx
const [isLoading, setIsLoading] = useState(false);

<UiInput
    value={value}
    onChange={(e) => setValue(e.target.value)}
    disabled={isLoading}
    placeholder="Loading..."
/>
```

### Number Input

```tsx
const [quantity, setQuantity] = useState('1');

<UiInput
    id="quantity"
    label="Quantity"
    type="number"
    min="1"
    max="100"
    value={quantity}
    onChange={(e) => setQuantity(e.target.value)}
    variant="outlined"
/>
```

## File Structure

```
UiInput/
├── UiInput.tsx       # Main component
├── types.ts          # TypeScript types
├── index.ts          # Exports
└── README.md         # Documentation
```

## Common Patterns

### Real-time Validation

```tsx
const [email, setEmail] = useState('');
const [touched, setTouched] = useState(false);

const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const showError = touched && !isValid && email.length > 0;

<UiInput
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    onBlur={() => setTouched(true)}
    error={showError}
    placeholder="Email address"
/>
```

### Debounced Input

```tsx
const [search, setSearch] = useState('');
const [debouncedSearch, setDebouncedSearch] = useState('');

useEffect(() => {
    const timer = setTimeout(() => {
        setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
}, [search]);

<UiInput
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search..."
/>
```

### Password with Toggle

```tsx
const [password, setPassword] = useState('');
const [showPassword, setShowPassword] = useState(false);

<div className="relative">
    <UiInput
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
    />
    <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2"
    >
        {showPassword ? 'Hide' : 'Show'}
    </button>
</div>
```

## Troubleshooting

**Input doesn't update:**
- Ensure you're using controlled component pattern (value + onChange)
- Check that onChange handler updates state correctly

**Styles don't apply:**
- Verify Tailwind classes are not being purged
- Check for conflicting className prop

**Label not associated:**
- Ensure `id` prop matches label's `htmlFor`
- Both should be unique on the page

**Focus ring not showing:**
- Check for custom styles overriding focus states
- Ensure focus-visible styles are not disabled
