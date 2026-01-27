# UiRadioGroup

Universal radio group component for managing multiple radio buttons with shared state and validation.

## Features

- 📦 **Simplified API**: Manage multiple radios with a single component
- 📐 **Inherited sizing**: All radios inherit size from group
- 🔄 **Shared state**: Single value and onChange handler
- ♿ **Accessible**: ARIA radiogroup role with proper labeling
- 🚫 **Disabled state**: Disable entire group or individual options
- ❌ **Error state**: Shared error state for all radios
- ✅ **Success state**: Shared success state for validation feedback
- 💬 **Helper text**: Group-level and option-level messages
- 📏 **Flexible layout**: Vertical or horizontal orientation
- 🎭 **Customizable**: Per-option customization support

## Installation

```tsx
import UiRadioGroup from '@/shared/ui/UiRadioGroup';
import type {
    UiRadioGroupProps,
    UiRadioOption,
    UiRadioGroupOrientation
} from '@/shared/ui/UiRadioGroup';
```

## Usage

### Basic Radio Group

```tsx
const [selected, setSelected] = useState('option1');

<UiRadioGroup
    value={selected}
    onChange={setSelected}
    options={[
        { value: 'option1', label: 'First Option' },
        { value: 'option2', label: 'Second Option' },
        { value: 'option3', label: 'Third Option' },
    ]}
    name="basic-group"
/>
```

### Radio Group with Label

```tsx
<UiRadioGroup
    label="Choose your plan"
    value={plan}
    onChange={setPlan}
    options={[
        { value: 'free', label: 'Free Plan' },
        { value: 'pro', label: 'Pro Plan' },
        { value: 'enterprise', label: 'Enterprise Plan' },
    ]}
    name="plan"
/>
```

### Radio Group with Helper Text

```tsx
<UiRadioGroup
    label="Notification Frequency"
    helperText="Choose how often you want to receive updates"
    value={frequency}
    onChange={setFrequency}
    options={[
        { value: 'realtime', label: 'Real-time', helperText: 'Instant notifications' },
        { value: 'hourly', label: 'Hourly', helperText: 'Once per hour' },
        { value: 'daily', label: 'Daily', helperText: 'Daily digest' },
    ]}
    name="frequency"
/>
```

### Radio Group with Error State

```tsx
const [method, setMethod] = useState('');
const [submitted, setSubmitted] = useState(false);

<UiRadioGroup
    label="Contact Method"
    value={method}
    onChange={setMethod}
    options={[
        { value: 'email', label: 'Email' },
        { value: 'phone', label: 'Phone' },
        { value: 'sms', label: 'SMS' },
    ]}
    name="contact"
    required
    error={!method && submitted}
    errorText="Please select a contact method"
/>
```

### Radio Group with Success State

```tsx
<UiRadioGroup
    label="Account Type"
    value={accountType}
    onChange={setAccountType}
    options={[
        { value: 'personal', label: 'Personal' },
        { value: 'business', label: 'Business' },
    ]}
    name="account-type"
    success={!!accountType}
    successText="Account type selected"
/>
```

### Horizontal Layout

```tsx
<UiRadioGroup
    label="Gender"
    orientation="horizontal"
    value={gender}
    onChange={setGender}
    options={[
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
    ]}
    name="gender"
/>
```

### Different Sizes

```tsx
<UiRadioGroup
    size="sm"
    value={size}
    onChange={setSize}
    options={[
        { value: 's', label: 'Small' },
        { value: 'm', label: 'Medium' },
        { value: 'l', label: 'Large' },
    ]}
    name="size"
/>
```

### Disabled Options

```tsx
<UiRadioGroup
    label="Subscription Tier"
    value={tier}
    onChange={setTier}
    options={[
        { value: 'free', label: 'Free', helperText: 'Always available' },
        { value: 'pro', label: 'Pro', helperText: '$9.99/month' },
        { value: 'enterprise', label: 'Enterprise', helperText: 'Contact sales', disabled: true },
    ]}
    name="tier"
/>
```

### Disabled Group

```tsx
<UiRadioGroup
    label="Unavailable Options"
    value={selected}
    onChange={setSelected}
    options={[
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
    ]}
    name="disabled-group"
    disabled
/>
```

## Props

### UiRadioGroupProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `UiRadioOption[]` | **required** | Array of radio options |
| `value` | `string` | **required** | Currently selected value |
| `onChange` | `(value: string) => void` | **required** | Change handler receiving selected value |
| `name` | `string` | - | Name attribute for all radios in group |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size applied to all radios |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout direction |
| `label` | `string` | - | Group label |
| `helperText` | `string` | - | Group helper text |
| `errorText` | `string` | - | Group error message |
| `successText` | `string` | - | Group success message |
| `error` | `boolean` | `false` | Whether group is in error state |
| `success` | `boolean` | `false` | Whether group is in success state |
| `required` | `boolean` | `false` | Whether selection is required |
| `disabled` | `boolean` | `false` | Disable entire group |

### UiRadioOption

| Prop | Type | Description |
|------|------|-------------|
| `value` | `string` | Option value (required) |
| `label` | `string` | Option label (required) |
| `id` | `string` | Custom id for the radio |
| `disabled` | `boolean` | Disable this specific option |
| `helperText` | `string` | Option-specific helper text |
| `errorText` | `string` | Option-specific error text |
| `successText` | `string` | Option-specific success text |
| `className` | `string` | Custom class for this option |

## TypeScript

```tsx
import type { UiRadioGroupProps, UiRadioOption } from '@/shared/ui/UiRadioGroup';

const paymentOptions: UiRadioOption[] = [
    { value: 'card', label: 'Credit Card', helperText: 'Visa, Mastercard' },
    { value: 'paypal', label: 'PayPal', helperText: 'Pay with PayPal' },
    { value: 'crypto', label: 'Crypto', disabled: true },
];

const PaymentForm = () => {
    const [payment, setPayment] = useState<string>('card');

    const groupProps: UiRadioGroupProps = {
        options: paymentOptions,
        value: payment,
        onChange: setPayment,
        label: 'Payment Method',
        size: 'md',
        name: 'payment',
    };

    return <UiRadioGroup {...groupProps} />;
};
```

## Accessibility

- Uses `role="radiogroup"` for proper semantics
- Group label linked via `aria-label`
- All accessibility features from UiRadio inherited
- Keyboard navigation works across all group options
- Required indicator shown on group label
- Error messages announced to screen readers

## Layout Guide

### Vertical (default)
- Best for most use cases
- Easier to scan and read
- Better for longer labels
- Recommended for 3+ options

### Horizontal
- Good for 2-3 short options
- Saves vertical space
- Works well for binary choices (Yes/No, Male/Female)
- Labels should be short

## Examples

### Payment Method Selection

```tsx
const [payment, setPayment] = useState('');
const [submitted, setSubmitted] = useState(false);

<UiRadioGroup
    label="Payment Method"
    value={payment}
    onChange={setPayment}
    options={[
        {
            value: 'card',
            label: 'Credit/Debit Card',
            helperText: 'Visa, Mastercard, Amex',
        },
        {
            value: 'paypal',
            label: 'PayPal',
            helperText: 'Pay with your PayPal account',
        },
        {
            value: 'bank',
            label: 'Bank Transfer',
            helperText: '2-3 business days',
        },
    ]}
    name="payment"
    required
    error={!payment && submitted}
    errorText="Please select a payment method"
/>
```

### Subscription Plans

```tsx
const [plan, setPlan] = useState('free');

<UiRadioGroup
    label="Choose Your Plan"
    value={plan}
    onChange={setPlan}
    options={[
        {
            value: 'free',
            label: 'Free',
            helperText: 'Perfect for getting started',
        },
        {
            value: 'pro',
            label: 'Pro ($9.99/mo)',
            helperText: 'Unlock premium features',
        },
        {
            value: 'enterprise',
            label: 'Enterprise',
            helperText: 'Custom pricing for teams',
        },
    ]}
    name="plan"
    size="md"
    success={plan === 'pro'}
    successText="Great choice! Pro features unlocked"
/>
```

### Shipping Options

```tsx
const [shipping, setShipping] = useState('standard');

const shippingOptions: UiRadioOption[] = [
    {
        value: 'standard',
        label: 'Standard Shipping (5-7 days)',
        helperText: 'Free',
    },
    {
        value: 'express',
        label: 'Express Shipping (2-3 days)',
        helperText: '$9.99',
    },
    {
        value: 'overnight',
        label: 'Overnight Delivery',
        helperText: '$24.99',
    },
];

<UiRadioGroup
    label="Shipping Method"
    value={shipping}
    onChange={setShipping}
    options={shippingOptions}
    name="shipping"
    size="md"
/>
```

### Survey Question

```tsx
const [rating, setRating] = useState('');
const [touched, setTouched] = useState(false);

<form onSubmit={handleSubmit}>
    <UiRadioGroup
        label="How would you rate our service?"
        value={rating}
        onChange={(val) => {
            setRating(val);
            setTouched(true);
        }}
        options={[
            { value: '5', label: 'Excellent' },
            { value: '4', label: 'Good' },
            { value: '3', label: 'Average' },
            { value: '2', label: 'Poor' },
            { value: '1', label: 'Very Poor' },
        ]}
        name="rating"
        required
        error={!rating && touched}
        errorText="Please select a rating"
    />

    <button type="submit">Submit Feedback</button>
</form>
```

### Account Type Selection

```tsx
const [accountType, setAccountType] = useState('personal');

<UiRadioGroup
    label="Account Type"
    orientation="horizontal"
    value={accountType}
    onChange={setAccountType}
    options={[
        {
            value: 'personal',
            label: 'Personal',
            helperText: 'For individual use',
        },
        {
            value: 'business',
            label: 'Business',
            helperText: 'For organizations',
        },
    ]}
    name="account-type"
    size="lg"
/>
```

## Best Practices

1. **Use for mutually exclusive choices**: Radio groups are perfect for "select one" scenarios
2. **Limit options**: Keep to 2-7 options (use UiSelect for more)
3. **Vertical by default**: Easier to scan, especially with helper text
4. **Provide helper text**: Help users understand each option
5. **Pre-select when possible**: Default to most common choice
6. **Validate on interaction**: Show errors after user touches the group
7. **Use consistent naming**: All radios should share the same `name`
8. **Clear labels**: Make each option distinct and clear
9. **Consider order**: Put most common options first
10. **Group related options**: Use fieldset/legend pattern for related groups

## Comparison with Individual Radios

### Use UiRadioGroup when:
- You have 2+ related radio options
- They share the same state
- You want simplified state management
- Group-level validation is needed

### Use individual UiRadio when:
- You need fine-grained control over each radio
- Radios are in different parts of the UI
- Each radio needs unique event handlers
- Layout is highly customized

## Related Components

- [UiRadio](../UiRadio/README.md) - Individual radio button component
- [UiCheckboxGroup](../UiCheckboxGroup/README.md) - Multiple selection group
- [UiSelect](../UiSelect/README.md) - Dropdown for many options
