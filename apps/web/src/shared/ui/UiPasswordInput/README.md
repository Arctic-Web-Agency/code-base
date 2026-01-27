# UiPasswordInput

Password input component with built-in visibility toggle. Wrapper around UiInput that adds eye icon functionality for showing/hiding password.

## Features

- 👁️ **Visibility toggle**: Built-in eye icon to show/hide password
- 🎨 **Inherits UiInput features**: All sizes, variants, and styles from UiInput
- ♿ **Accessible**: Proper ARIA labels and keyboard navigation
- 🔒 **Type-safe**: Full TypeScript support
- 🎭 **Customizable**: Override default visibility state
- ⚡ **Lightweight**: Simple wrapper, no heavy dependencies

## Installation

```tsx
import UiPasswordInput from '@/shared/ui/UiPasswordInput';
import type { UiPasswordInputProps } from '@/shared/ui/UiPasswordInput';
```

## Usage

### Basic Password Input

```tsx
const [password, setPassword] = useState('');

<UiPasswordInput
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Enter password..."
/>
```

### Password Input with Label

```tsx
<UiPasswordInput
    id="password"
    label="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Enter your password"
/>
```

### Password Input with Required Field

```tsx
<UiPasswordInput
    label="Password"
    required
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Password"
/>
```

### Password Input with Default Visibility

```tsx
<UiPasswordInput
    defaultVisible={true}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Password"
/>
```

### Password Input with Different Sizes

```tsx
<UiPasswordInput
    size="sm"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Small password input"
/>

<UiPasswordInput
    size="md"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Medium password input"
/>

<UiPasswordInput
    size="lg"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Large password input"
/>
```

### Password Input with Different Variants

```tsx
<UiPasswordInput
    variant="filled"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Filled variant"
/>

<UiPasswordInput
    variant="outlined"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Outlined variant"
/>
```

### Password Input with Error State

```tsx
<UiPasswordInput
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    error={password.length < 8}
    placeholder="Minimum 8 characters"
/>
```

### Password Input with Disabled State

```tsx
<UiPasswordInput
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    disabled
    placeholder="Disabled input"
/>
```

## Props

All props from [UiInput](../UiInput/README.md) are supported except:
- `type` (always 'password' or 'text' based on visibility)
- `rightIcon` (used internally for eye icon)

### Additional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultVisible` | `boolean` | `false` | Whether password should be visible by default |

## TypeScript

```tsx
import type { UiPasswordInputProps } from '@/shared/ui/UiPasswordInput';

const MyForm = () => {
    const [password, setPassword] = useState<string>('');

    const inputProps: UiPasswordInputProps = {
        value: password,
        onChange: (e) => setPassword(e.target.value),
        size: 'md',
        variant: 'filled',
        label: 'Password',
        required: true,
    };

    return <UiPasswordInput {...inputProps} />;
};
```

## Accessibility

- Eye icon button has proper `aria-label` ("Show password" / "Hide password")
- Button has `type="button"` to prevent form submission
- Button has `tabIndex={-1}` to keep it out of tab order (input remains focused)
- Icon inherits current text color for theme compatibility

## Implementation Details

The component:
- Wraps `UiInput` with controlled `type` prop
- Uses `useState` to manage visibility state
- Renders eye icon as clickable button in `rightIcon` slot
- Toggles between `EyeIcon` and `EyeOffIcon` based on state
- Supports all UiInput features (sizes, variants, error states, etc.)

## Related

- [UiInput](../UiInput/README.md) - Base input component
- [EyeIcon](../../icons/EyeIcon.tsx) - Eye icon for visibility
- [EyeOffIcon](../../icons/EyeOffIcon.tsx) - Eye off icon for hiding
