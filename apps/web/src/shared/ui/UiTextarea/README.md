# UiTextarea

Universal textarea component with full TypeScript support and theme-agnostic styling.

## Features

- 📐 **Three sizes**: Small, medium, large with consistent padding
- 🎨 **Two variants**: Filled and outlined styles
- 🔄 **Resize control**: None, vertical, horizontal, or both
- ♿ **Accessible**: Full ARIA support and keyboard navigation
- 🔒 **Type-safe**: Strict TypeScript with proper prop typing
- 🚫 **Disabled state**: Properly handles disabled interactions
- ❌ **Error state**: Visual feedback for validation errors
- ✅ **Success state**: Positive feedback with green border
- 🏷️ **Label support**: Optional label with proper accessibility
- 💬 **Helper text**: Contextual messages (helper/error/success)
- 🔢 **Character counter**: Shows current/max character count
- 🎭 **Customizable**: Theme-agnostic neutral colors, easy to override
- ⚡ **Lightweight**: Minimal styling, no unnecessary dependencies

## Installation

```tsx
import UiTextarea from '@/shared/ui/UiTextarea';
import type { UiTextareaProps, UiTextareaVariant, UiTextareaSize } from '@/shared/ui/UiTextarea';
```

## Usage

### Basic Textarea

```tsx
const [value, setValue] = useState('');

<UiTextarea
    value={value}
    onChange={(e) => setValue(e.target.value)}
    placeholder="Enter your message..."
/>
```

### Textarea with Label

```tsx
<UiTextarea
    id="description"
    label="Description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    placeholder="Describe your project..."
    rows={6}
/>
```

### Textarea with Required Field

```tsx
<UiTextarea
    label="Feedback"
    required
    value={feedback}
    onChange={(e) => setFeedback(e.target.value)}
    placeholder="Your feedback is important to us"
/>
```

### Textarea with Character Counter

```tsx
<UiTextarea
    label="Bio"
    value={bio}
    onChange={(e) => setBio(e.target.value)}
    maxLength={500}
    showCharCount
    placeholder="Tell us about yourself (max 500 chars)"
/>
```

### Textarea with Helper Text

```tsx
<UiTextarea
    label="Comments"
    value={comments}
    onChange={(e) => setComments(e.target.value)}
    helperText="Your comments will be reviewed before publication"
/>
```

### Textarea with Error State

```tsx
<UiTextarea
    label="Message"
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    error={message.length < 10}
    errorText="Message must be at least 10 characters"
    placeholder="Enter your message"
/>
```

### Textarea with Success State

```tsx
<UiTextarea
    label="Review"
    value={review}
    onChange={(e) => setReview(e.target.value)}
    success={review.length >= 50}
    successText="Great! Your review meets the minimum length"
/>
```

### Different Sizes

```tsx
<UiTextarea
    size="sm"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    placeholder="Small textarea"
/>

<UiTextarea
    size="md"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    placeholder="Medium textarea"
/>

<UiTextarea
    size="lg"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    placeholder="Large textarea"
/>
```

### Different Variants

```tsx
<UiTextarea
    variant="filled"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    placeholder="Filled variant"
/>

<UiTextarea
    variant="outlined"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    placeholder="Outlined variant"
/>
```

### Resize Options

```tsx
<UiTextarea
    resize="none"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    placeholder="No resize"
/>

<UiTextarea
    resize="vertical"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    placeholder="Vertical resize only"
/>

<UiTextarea
    resize="horizontal"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    placeholder="Horizontal resize only"
/>

<UiTextarea
    resize="both"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    placeholder="Resize in both directions"
/>
```

### Custom Number of Rows

```tsx
<UiTextarea
    rows={8}
    value={value}
    onChange={(e) => setValue(e.target.value)}
    placeholder="8 rows tall"
/>
```

### Disabled State

```tsx
<UiTextarea
    value={value}
    onChange={(e) => setValue(e.target.value)}
    disabled
    placeholder="This textarea is disabled"
/>
```

### Combined Features

```tsx
<UiTextarea
    label="Product Review"
    required
    value={review}
    onChange={(e) => setReview(e.target.value)}
    size="lg"
    variant="outlined"
    resize="vertical"
    rows={6}
    maxLength={1000}
    showCharCount
    error={review.length < 50}
    errorText="Review must be at least 50 characters"
    helperText="Share your honest experience with this product"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'filled' \| 'outlined'` | `'filled'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the textarea |
| `resize` | `'none' \| 'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | Resize behavior |
| `error` | `boolean` | `false` | Whether textarea is in error state |
| `success` | `boolean` | `false` | Whether textarea is in success state |
| `label` | `string` | - | Label text displayed above textarea |
| `helperText` | `string` | - | Helper text displayed below textarea |
| `errorText` | `string` | - | Error message (shown when error=true) |
| `successText` | `string` | - | Success message (shown when success=true) |
| `showCharCount` | `boolean` | `false` | Show character counter (requires maxLength) |
| `required` | `boolean` | `false` | Whether textarea is required |
| `disabled` | `boolean` | `false` | Whether textarea is disabled |
| `rows` | `number` | `4` | Number of visible text rows |
| `maxLength` | `number` | - | Maximum character length |
| `value` | `string` | - | Controlled value |
| `onChange` | `function` | - | Change handler |

All standard textarea HTML attributes are also supported.

## TypeScript

```tsx
import type { UiTextareaProps } from '@/shared/ui/UiTextarea';

const MyForm = () => {
    const [message, setMessage] = useState<string>('');

    const textareaProps: UiTextareaProps = {
        value: message,
        onChange: (e) => setMessage(e.target.value),
        size: 'md',
        variant: 'filled',
        label: 'Message',
        required: true,
        maxLength: 500,
        showCharCount: true,
    };

    return <UiTextarea {...textareaProps} />;
};
```

## Accessibility

- Proper label association via `htmlFor` and `id`
- Required fields marked with red asterisk
- ARIA attributes supported via spread props
- Disabled state properly communicated
- Semantic HTML with native `<textarea>` element

## Variants

### Filled (default)
Dark background with subtle focus state. Best for dark interfaces.

### Outlined
Transparent background with visible border. Best for light interfaces or when you need clear visual separation.

## Size Guide

- **Small (sm)**: Compact forms, sidebars, modals
- **Medium (md)**: Default for most use cases
- **Large (lg)**: Prominent forms, landing pages

## Resize Control

- **none**: Fixed size, no user resizing
- **vertical**: User can resize height (default, most common)
- **horizontal**: User can resize width (rarely used)
- **both**: User can resize in all directions

## State Priority

Text display priority (highest to lowest):
1. Error text (red) - shown when `error={true}` and `errorText` provided
2. Success text (green) - shown when `success={true}` and `successText` provided
3. Helper text (neutral) - default informational text

## Related Components

- [UiInput](../UiInput/README.md) - Single-line text input
- [UiPasswordInput](../UiPasswordInput/README.md) - Password input with visibility toggle
