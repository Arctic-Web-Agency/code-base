# UiRadio

Universal radio button component with full TypeScript support and theme-agnostic styling.

## Features

- 📐 **Three sizes**: Small, medium, large with consistent scaling
- ♿ **Accessible**: Full ARIA support and keyboard navigation
- 🔒 **Type-safe**: Strict TypeScript with proper prop typing
- 🚫 **Disabled state**: Properly handles disabled interactions
- ❌ **Error state**: Visual feedback for validation errors
- ✅ **Success state**: Positive feedback with green radio
- 🏷️ **Label support**: Optional label with proper accessibility
- 💬 **Helper text**: Contextual messages (helper/error/success)
- 🎭 **Customizable**: Theme-agnostic neutral colors, easy to override
- ⚡ **Lightweight**: Minimal styling, no unnecessary dependencies

## Installation

```tsx
import UiRadio from '@/shared/ui/UiRadio';
import type { UiRadioProps, UiRadioSize } from '@/shared/ui/UiRadio';
```

## Usage

### Basic Radio Button

```tsx
const [selected, setSelected] = useState('option1');

<UiRadio
    checked={selected === 'option1'}
    onChange={() => setSelected('option1')}
    label="Option 1"
    name="options"
/>
<UiRadio
    checked={selected === 'option2'}
    onChange={() => setSelected('option2')}
    label="Option 2"
    name="options"
/>
```

### Radio with Required Field

```tsx
<UiRadio
    checked={selected === 'yes'}
    onChange={() => setSelected('yes')}
    label="I agree to the terms"
    name="agreement"
    required
/>
```

### Radio with Helper Text

```tsx
<UiRadio
    checked={paymentMethod === 'card'}
    onChange={() => setPaymentMethod('card')}
    label="Credit Card"
    helperText="Visa, Mastercard, Amex accepted"
    name="payment"
/>
```

### Radio with Error State

```tsx
<UiRadio
    checked={method === 'email'}
    onChange={() => setMethod('email')}
    label="Email"
    name="contact"
    error={!method && submitted}
    errorText="Please select a contact method"
/>
```

### Radio with Success State

```tsx
<UiRadio
    checked={verified === 'yes'}
    onChange={() => setVerified('yes')}
    label="Account verified"
    name="verification"
    success={verified === 'yes'}
    successText="Your account is verified"
/>
```

### Different Sizes

```tsx
<UiRadio
    size="sm"
    checked={selected === 'small'}
    onChange={() => setSelected('small')}
    label="Small radio"
    name="size"
/>

<UiRadio
    size="md"
    checked={selected === 'medium'}
    onChange={() => setSelected('medium')}
    label="Medium radio"
    name="size"
/>

<UiRadio
    size="lg"
    checked={selected === 'large'}
    onChange={() => setSelected('large')}
    label="Large radio"
    name="size"
/>
```

### Disabled State

```tsx
<UiRadio
    checked={false}
    onChange={() => {}}
    label="Disabled option"
    name="options"
    disabled
/>

<UiRadio
    checked={true}
    onChange={() => {}}
    label="Disabled and selected"
    name="options"
    disabled
/>
```

### Radio without Label

```tsx
<UiRadio
    checked={selected === 'option'}
    onChange={() => setSelected('option')}
    name="options"
    aria-label="Select this option"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the radio button |
| `error` | `boolean` | `false` | Whether radio is in error state |
| `success` | `boolean` | `false` | Whether radio is in success state |
| `label` | `string` | - | Label text displayed next to radio |
| `helperText` | `string` | - | Helper text displayed below radio |
| `errorText` | `string` | - | Error message (shown when error=true) |
| `successText` | `string` | - | Success message (shown when success=true) |
| `required` | `boolean` | `false` | Whether radio selection is required |
| `disabled` | `boolean` | `false` | Whether radio is disabled |
| `checked` | `boolean` | - | Controlled checked state |
| `onChange` | `function` | - | Change handler |
| `name` | `string` | - | Radio group name (required for grouping) |

All standard input HTML attributes are also supported.

## TypeScript

```tsx
import type { UiRadioProps } from '@/shared/ui/UiRadio';

const MyForm = () => {
    const [selection, setSelection] = useState<string>('option1');

    const radioProps: UiRadioProps = {
        checked: selection === 'option1',
        onChange: () => setSelection('option1'),
        size: 'md',
        label: 'Option 1',
        name: 'options',
    };

    return <UiRadio {...radioProps} />;
};
```

## Accessibility

- Proper label association via `htmlFor` and `id`
- Auto-generated `id` using React's `useId()` hook
- Required fields marked with red asterisk
- ARIA attributes supported via spread props
- Disabled state properly communicated
- Keyboard navigation support (Arrow keys to navigate, Space to select)
- Semantic HTML with native `<input type="radio">` element
- Proper `name` attribute for radio grouping

## Size Guide

- **Small (sm)**: Compact radios for dense layouts
- **Medium (md)**: Default for most use cases
- **Large (lg)**: Prominent radios for important selections

## State Priority

Text display priority (highest to lowest):
1. Error text (red) - shown when `error={true}` and `errorText` provided
2. Success text (green) - shown when `success={true}` and `successText` provided
3. Helper text (neutral) - default informational text

## Examples

### Payment Method Selection

```tsx
const [paymentMethod, setPaymentMethod] = useState('card');

<div className="space-y-3">
    <h3>Select Payment Method</h3>

    <UiRadio
        checked={paymentMethod === 'card'}
        onChange={() => setPaymentMethod('card')}
        label="Credit Card"
        helperText="Visa, Mastercard, Amex"
        name="payment"
    />

    <UiRadio
        checked={paymentMethod === 'paypal'}
        onChange={() => setPaymentMethod('paypal')}
        label="PayPal"
        helperText="Pay with your PayPal account"
        name="payment"
    />

    <UiRadio
        checked={paymentMethod === 'crypto'}
        onChange={() => setPaymentMethod('crypto')}
        label="Cryptocurrency"
        helperText="Bitcoin, Ethereum accepted"
        name="payment"
        disabled
    />
</div>
```

### Shipping Options

```tsx
const [shipping, setShipping] = useState('standard');
const [submitted, setSubmitted] = useState(false);

<form onSubmit={handleSubmit}>
    <h3>Shipping Method</h3>

    <UiRadio
        checked={shipping === 'standard'}
        onChange={() => setShipping('standard')}
        label="Standard Shipping (5-7 days)"
        helperText="Free"
        name="shipping"
        error={!shipping && submitted}
    />

    <UiRadio
        checked={shipping === 'express'}
        onChange={() => setShipping('express')}
        label="Express Shipping (2-3 days)"
        helperText="$9.99"
        name="shipping"
    />

    <UiRadio
        checked={shipping === 'overnight'}
        onChange={() => setShipping('overnight')}
        label="Overnight Delivery"
        helperText="$24.99"
        name="shipping"
    />

    <button type="submit">Continue</button>
</form>
```

### Survey Question

```tsx
const [satisfaction, setSatisfaction] = useState('');
const [touched, setTouched] = useState(false);

<div>
    <p className="mb-3 font-medium">How satisfied are you with our service?</p>

    {['very-satisfied', 'satisfied', 'neutral', 'dissatisfied', 'very-dissatisfied'].map(value => (
        <UiRadio
            key={value}
            checked={satisfaction === value}
            onChange={() => {
                setSatisfaction(value);
                setTouched(true);
            }}
            label={value.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            name="satisfaction"
            error={!satisfaction && touched}
        />
    ))}

    {!satisfaction && touched && (
        <p className="mt-2 text-sm text-red-500">Please select an option</p>
    )}
</div>
```

## Best Practices

1. **Name attribute**: Always provide the same `name` for radio buttons in a group
2. **Labels**: Always provide labels for better accessibility
3. **Required groups**: Mark at least one radio as required when selection is mandatory
4. **Validation**: Show error state only after user interaction
5. **Helper text**: Provide context for each option
6. **Default selection**: Consider pre-selecting the most common option
7. **Disabled state**: Use sparingly and explain why it's disabled
8. **Option count**: Keep radio groups to 2-7 options (use select for more)
9. **Controlled components**: Always manage checked state explicitly
10. **Vertical layout**: Stack radio buttons vertically for better scannability

## Radio vs Checkbox

Use **radio buttons** when:
- User must select exactly one option from a set
- Options are mutually exclusive
- All options should be visible at once

Use **checkboxes** when:
- User can select zero, one, or multiple options
- Each option is independent
- User needs to see all options to make a decision

## Related Components

- [UiRadioGroup](../UiRadioGroup/README.md) - Simplified radio group management
- [UiCheckbox](../UiCheckbox/README.md) - Multiple selection component
- [UiSelect](../UiSelect/README.md) - Dropdown selection for many options
