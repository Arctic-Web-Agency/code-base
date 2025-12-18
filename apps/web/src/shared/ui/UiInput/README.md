# UiInput

Universal input component with full TypeScript support and theme-agnostic styling.

## Features

- 📐 **Three sizes**: Small, medium, large with consistent padding
- 🎨 **Two variants**: Filled and outlined styles
- ♿ **Accessible**: Full ARIA support and keyboard navigation
- 🔒 **Type-safe**: Strict TypeScript with proper prop typing
- 🚫 **Disabled state**: Properly handles disabled interactions
- ❌ **Error state**: Visual feedback for validation errors
- ✅ **Success state**: Positive feedback with green border
- 🏷️ **Label support**: Optional label with proper accessibility
- 💬 **Helper text**: Contextual messages (helper/error/success)
- 🔢 **Character counter**: Shows current/max character count
- 🎯 **Icons**: Left and right icon support
- 🧹 **Clear button**: Quick input reset functionality
- 💲 **Prefix/Suffix**: Text adornments for currency, units, etc.
- 🎭 **Customizable**: Theme-agnostic neutral colors, easy to override
- ⚡ **Lightweight**: Minimal styling, no unnecessary dependencies

## Installation

```tsx
import UiInput from '@/shared/ui/UiInput';
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

### Input with Required Field

```tsx
<UiInput
    label="Username"
    required
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    placeholder="Enter username"
/>
```

### Input with Helper Text

```tsx
<UiInput
    label="Website"
    value={website}
    onChange={(e) => setWebsite(e.target.value)}
    helperText="Include the full URL with https://"
    placeholder="https://example.com"
/>
```

### Input with Error State

```tsx
<UiInput
    label="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    error={password.length < 8}
    errorText="Password must be at least 8 characters"
    placeholder="Enter password"
/>
```

### Input with Success State

```tsx
<UiInput
    label="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    success={isValidEmail(email)}
    successText="Valid email address"
/>
```

### Input with Character Counter

```tsx
<UiInput
    label="Bio"
    value={bio}
    onChange={(e) => setBio(e.target.value)}
    maxLength={150}
    showCharCount
    placeholder="Tell us about yourself"
/>
```

### Input with Clear Button

```tsx
<UiInput
    label="Search"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    clearable
    onClear={() => setSearch('')}
    placeholder="Search..."
/>
```

### Input with Icons

```tsx
import { SearchIcon, CheckIcon } from '@/shared/icons';

<UiInput
    leftIcon={<SearchIcon />}
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search..."
/>

<UiInput
    rightIcon={<CheckIcon />}
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Email"
/>

<UiInput
    leftIcon={<SearchIcon />}
    rightIcon={<CheckIcon />}
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder="Search with validation"
/>
```

### Input with Prefix/Suffix

```tsx
<UiInput
    label="Price"
    prefix="$"
    value={price}
    onChange={(e) => setPrice(e.target.value)}
    placeholder="0.00"
/>

<UiInput
    label="Weight"
    suffix="kg"
    value={weight}
    onChange={(e) => setWeight(e.target.value)}
    placeholder="Enter weight"
/>

<UiInput
    label="Amount"
    prefix="$"
    suffix="USD"
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
    placeholder="0.00"
/>
```

### Different Sizes

```tsx
<UiInput
    size="sm"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    placeholder="Small input"
/>

<UiInput
    size="md"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    placeholder="Medium input"
/>

<UiInput
    size="lg"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    placeholder="Large input"
/>
```

### Different Variants

```tsx
<UiInput
    variant="filled"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    placeholder="Filled variant"
/>

<UiInput
    variant="outlined"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    placeholder="Outlined variant"
/>
```

### Different Input Types

```tsx
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

<UiInput
    type="url"
    value={website}
    onChange={(e) => setWebsite(e.target.value)}
    placeholder="Website URL"
/>

<UiInput
    type="tel"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    placeholder="Phone number"
/>
```

### Disabled State

```tsx
<UiInput
    value={value}
    onChange={(e) => setValue(e.target.value)}
    disabled
    placeholder="This input is disabled"
/>
```

### Combined Features

```tsx
import { MailIcon } from '@/shared/icons';

<UiInput
    label="Email Address"
    required
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    leftIcon={<MailIcon />}
    clearable
    onClear={() => setEmail('')}
    size="lg"
    variant="outlined"
    maxLength={100}
    showCharCount
    error={!isValidEmail(email) && email.length > 0}
    errorText="Please enter a valid email address"
    helperText="We'll never share your email with anyone else"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'filled' \| 'outlined'` | `'filled'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the input |
| `error` | `boolean` | `false` | Whether input is in error state |
| `success` | `boolean` | `false` | Whether input is in success state |
| `label` | `string` | - | Label text displayed above input |
| `leftIcon` | `ReactNode` | - | Icon or element displayed on the left |
| `rightIcon` | `ReactNode` | - | Icon or element displayed on the right |
| `helperText` | `string` | - | Helper text displayed below input |
| `errorText` | `string` | - | Error message (shown when error=true) |
| `successText` | `string` | - | Success message (shown when success=true) |
| `showCharCount` | `boolean` | `false` | Show character counter (requires maxLength) |
| `clearable` | `boolean` | `false` | Show clear button when input has value |
| `onClear` | `function` | - | Callback when clear button is clicked |
| `prefix` | `string` | - | Text displayed before the input value |
| `suffix` | `string` | - | Text displayed after the input value |
| `required` | `boolean` | `false` | Whether input is required |
| `disabled` | `boolean` | `false` | Whether input is disabled |
| `maxLength` | `number` | - | Maximum character length |
| `value` | `string` | - | Controlled value |
| `onChange` | `function` | - | Change handler |

All standard input HTML attributes are also supported.

## TypeScript

```tsx
import type { UiInputProps } from '@/shared/ui/UiInput';

const MyForm = () => {
    const [email, setEmail] = useState<string>('');

    const inputProps: UiInputProps = {
        value: email,
        onChange: (e) => setEmail(e.target.value),
        size: 'md',
        variant: 'filled',
        label: 'Email',
        required: true,
        maxLength: 100,
        showCharCount: true,
    };

    return <UiInput {...inputProps} />;
};
```

## Accessibility

- Proper label association via `htmlFor` and `id`
- Required fields marked with red asterisk
- ARIA attributes supported via spread props
- Disabled state properly communicated
- Clear button has `aria-label` for screen readers
- Semantic HTML with native `<input>` element

## Variants

### Filled (default)
Dark background with subtle focus state. Best for dark interfaces.

### Outlined
Transparent background with visible border. Best for light interfaces or when you need clear visual separation.

## Size Guide

- **Small (sm)**: Compact forms, sidebars, modals
- **Medium (md)**: Default for most use cases
- **Large (lg)**: Prominent forms, landing pages

## State Priority

Text display priority (highest to lowest):
1. Error text (red) - shown when `error={true}` and `errorText` provided
2. Success text (green) - shown when `success={true}` and `successText` provided
3. Helper text (neutral) - default informational text

Adornment priority:
- **Left side**: `leftIcon` > `prefix`
- **Right side**: `clearButton` (when clearable & has value) > `rightIcon` > `suffix`

## Examples

### Login Form

```tsx
import { MailIcon, LockIcon } from '@/shared/icons';

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

<form onSubmit={handleSubmit}>
    <UiInput
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        leftIcon={<MailIcon />}
        clearable
        onClear={() => setEmail('')}
        placeholder="you@example.com"
        variant="outlined"
        size="md"
        required
    />

    <UiInput
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        leftIcon={<LockIcon />}
        placeholder="••••••••"
        variant="outlined"
        size="md"
        required
    />

    <button type="submit">Sign in</button>
</form>
```

### Search Input with Clear

```tsx
import { SearchIcon } from '@/shared/icons';

const [search, setSearch] = useState('');

<UiInput
    type="search"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    leftIcon={<SearchIcon />}
    clearable
    onClear={() => setSearch('')}
    placeholder="Search..."
    variant="outlined"
    size="sm"
/>
```

### Validated Email Input

```tsx
import { MailIcon } from '@/shared/icons';

const [email, setEmail] = useState('');
const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

<UiInput
    id="email"
    label="Email Address"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    leftIcon={<MailIcon />}
    error={!isValid && email.length > 0}
    errorText="Please enter a valid email address"
    success={isValid && email.length > 0}
    successText="Valid email format"
    placeholder="you@example.com"
/>
```

### Price Input with Prefix/Suffix

```tsx
const [price, setPrice] = useState('');

<UiInput
    id="price"
    label="Product Price"
    type="number"
    value={price}
    onChange={(e) => setPrice(e.target.value)}
    prefix="$"
    suffix="USD"
    placeholder="0.00"
    helperText="Enter price in US dollars"
/>
```

### Bio Input with Character Counter

```tsx
const [bio, setBio] = useState('');

<UiInput
    id="bio"
    label="Biography"
    value={bio}
    onChange={(e) => setBio(e.target.value)}
    maxLength={150}
    showCharCount
    clearable
    onClear={() => setBio('')}
    placeholder="Tell us about yourself"
    helperText="Keep it short and sweet"
/>
```

### Username Input with Validation

```tsx
const [username, setUsername] = useState('');
const [touched, setTouched] = useState(false);

const isValid = username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);
const showError = touched && !isValid && username.length > 0;

<UiInput
    id="username"
    label="Username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    onBlur={() => setTouched(true)}
    error={showError}
    errorText="Username must be at least 3 characters (letters, numbers, underscore only)"
    success={isValid}
    successText="Username is available"
    maxLength={20}
    showCharCount
    placeholder="johndoe"
/>
```

### Phone Number Input

```tsx
const [phone, setPhone] = useState('');

<UiInput
    id="phone"
    label="Phone Number"
    type="tel"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    prefix="+1"
    placeholder="(555) 123-4567"
    helperText="US phone numbers only"
/>
```

### Website URL Input

```tsx
const [website, setWebsite] = useState('');

<UiInput
    id="website"
    label="Website"
    type="url"
    value={website}
    onChange={(e) => setWebsite(e.target.value)}
    prefix="https://"
    clearable
    onClear={() => setWebsite('')}
    placeholder="example.com"
    helperText="Your personal or company website"
/>
```

## Best Practices

1. **Labels**: Always provide labels for better accessibility
2. **Helper text**: Use helperText for additional context, errorText for validation messages
3. **Success feedback**: Provide positive feedback with success state for important validations
4. **Character counter**: Enable showCharCount for inputs with maxLength to help users
5. **Clear button**: Use clearable for search and filter inputs for better UX
6. **Icons**: Use leftIcon for context (search, email) and rightIcon for status (validation)
7. **Prefix/Suffix**: Use for currency, units, or domain prefixes
8. **Validation**: Validate on blur or submit, not on every keystroke
9. **Type attribute**: Use appropriate `type` for different inputs (email, password, tel, url, etc.)
10. **Controlled components**: Always manage value and onChange in state

## Related Components

- [UiPasswordInput](../UiPasswordInput/README.md) - Password input with visibility toggle
- [UiTextarea](../UiTextarea/README.md) - Multi-line text input
