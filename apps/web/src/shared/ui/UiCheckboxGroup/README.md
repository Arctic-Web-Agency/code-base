# UiCheckboxGroup

Checkbox group component for managing multiple checkboxes with shared state and validation.

## Features

- 📐 **Three sizes**: Small, medium, large inherited by all checkboxes
- 🔄 **Orientation**: Vertical or horizontal layout
- ♿ **Accessible**: Full ARIA support with role="group"
- 🔒 **Type-safe**: Strict TypeScript with proper prop typing
- 🚫 **Disabled state**: Disable entire group or individual options
- ❌ **Error state**: Visual feedback for validation errors
- ✅ **Success state**: Positive feedback for valid selections
- 🏷️ **Label support**: Optional group label with accessibility
- 💬 **Helper text**: Contextual messages (helper/error/success)
- 🎭 **Customizable**: Theme-agnostic neutral colors
- ⚡ **Lightweight**: Built on top of UiCheckbox

## Installation

```tsx
import UiCheckboxGroup from '@/shared/ui/UiCheckboxGroup';
import type { UiCheckboxGroupProps, UiCheckboxOption } from '@/shared/ui/UiCheckboxGroup';
```

## Usage

### Basic Checkbox Group

```tsx
const [interests, setInterests] = useState<string[]>([]);

const options = [
    { value: 'tech', label: 'Technology' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
];

<UiCheckboxGroup
    options={options}
    value={interests}
    onChange={setInterests}
    label="Select your interests"
/>
```

### Checkbox Group with Required Field

```tsx
<UiCheckboxGroup
    options={options}
    value={selected}
    onChange={setSelected}
    label="Choose at least one option"
    required
/>
```

### Checkbox Group with Helper Text

```tsx
<UiCheckboxGroup
    options={options}
    value={selected}
    onChange={setSelected}
    label="Notification preferences"
    helperText="You can change these settings at any time"
/>
```

### Checkbox Group with Error State

```tsx
const [skills, setSkills] = useState<string[]>([]);
const [touched, setTouched] = useState(false);

<UiCheckboxGroup
    options={skillOptions}
    value={skills}
    onChange={(value) => {
        setSkills(value);
        setTouched(true);
    }}
    label="Select your skills"
    error={touched && skills.length === 0}
    errorText="Please select at least one skill"
/>
```

### Checkbox Group with Success State

```tsx
<UiCheckboxGroup
    options={options}
    value={selected}
    onChange={setSelected}
    label="Required selections"
    success={selected.length >= 2}
    successText="Great! You've selected enough options"
/>
```

### Horizontal Orientation

```tsx
<UiCheckboxGroup
    options={options}
    value={selected}
    onChange={setSelected}
    label="Quick filters"
    orientation="horizontal"
/>
```

### Different Sizes

```tsx
<UiCheckboxGroup
    options={options}
    value={selected}
    onChange={setSelected}
    size="sm"
    label="Small checkboxes"
/>

<UiCheckboxGroup
    options={options}
    value={selected}
    onChange={setSelected}
    size="md"
    label="Medium checkboxes"
/>

<UiCheckboxGroup
    options={options}
    value={selected}
    onChange={setSelected}
    size="lg"
    label="Large checkboxes"
/>
```

### Disabled State

```tsx
<UiCheckboxGroup
    options={options}
    value={selected}
    onChange={setSelected}
    label="Disabled group"
    disabled
/>
```

### Individual Disabled Options

```tsx
const options = [
    { value: '1', label: 'Available option' },
    { value: '2', label: 'Disabled option', disabled: true },
    { value: '3', label: 'Another available option' },
];

<UiCheckboxGroup
    options={options}
    value={selected}
    onChange={setSelected}
    label="Mixed availability"
/>
```

### Individual Option Properties

```tsx
const options: UiCheckboxOption[] = [
    {
        value: 'option1',
        label: 'Standard option',
        id: 'custom-id-1',
    },
    {
        value: 'option2',
        label: 'Disabled option',
        disabled: true,
        helperText: 'This option is temporarily unavailable',
    },
    {
        value: 'option3',
        label: 'Option with custom styling',
        className: 'bg-blue-50',
    },
    {
        value: 'option4',
        label: 'Partially selected',
        indeterminate: true,
        helperText: 'Some sub-items selected',
    },
];

<UiCheckboxGroup
    options={options}
    value={selected}
    onChange={setSelected}
    label="Advanced options"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `UiCheckboxOption[]` | **required** | Array of checkbox options |
| `value` | `string[]` | **required** | Array of selected values |
| `onChange` | `(value: string[]) => void` | **required** | Change handler for selected values |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of all checkboxes in group |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout direction |
| `error` | `boolean` | `false` | Whether group is in error state |
| `success` | `boolean` | `false` | Whether group is in success state |
| `label` | `string` | - | Label text displayed above group |
| `helperText` | `string` | - | Helper text displayed below group |
| `errorText` | `string` | - | Error message (shown when error=true) |
| `successText` | `string` | - | Success message (shown when success=true) |
| `required` | `boolean` | `false` | Whether group is required |
| `disabled` | `boolean` | `false` | Whether entire group is disabled |
| `name` | `string` | - | Name attribute for all checkboxes |

### UiCheckboxOption

```tsx
interface UiCheckboxOption {
    value: string;
    label: string;
    id?: string;
    disabled?: boolean;
    helperText?: string;
    errorText?: string;
    successText?: string;
    className?: string;
    indeterminate?: boolean;
}
```

## TypeScript

```tsx
import type { UiCheckboxGroupProps, UiCheckboxOption } from '@/shared/ui/UiCheckboxGroup';

const MyForm = () => {
    const [selected, setSelected] = useState<string[]>([]);

    const options: UiCheckboxOption[] = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
    ];

    const groupProps: UiCheckboxGroupProps = {
        options,
        value: selected,
        onChange: setSelected,
        label: 'Select options',
        required: true,
    };

    return <UiCheckboxGroup {...groupProps} />;
};
```

## Accessibility

- Proper group labeling with `role="group"` and `aria-label`
- Required fields marked with red asterisk
- Individual checkbox accessibility inherited from UiCheckbox
- Keyboard navigation for all checkboxes
- Screen reader friendly with proper semantic HTML

## Orientation

### Vertical (default)
Checkboxes stacked vertically with consistent spacing. Best for:
- Forms with multiple options
- Settings panels
- Long lists of options

### Horizontal
Checkboxes arranged horizontally with wrapping. Best for:
- Filters and quick selections
- Short lists (3-5 options)
- Toolbar-style interfaces

## State Priority

Text display priority (highest to lowest):
1. Error text (red) - shown when `error={true}` and `errorText` provided
2. Success text (green) - shown when `success={true}` and `successText` provided
3. Helper text (neutral) - default informational text

## Examples

### Skills Selection Form

```tsx
const [skills, setSkills] = useState<string[]>([]);
const [touched, setTouched] = useState(false);

const skillOptions: UiCheckboxOption[] = [
    { value: 'js', label: 'JavaScript' },
    { value: 'ts', label: 'TypeScript' },
    { value: 'react', label: 'React' },
    { value: 'node', label: 'Node.js' },
    { value: 'python', label: 'Python' },
];

const hasError = touched && skills.length === 0;

<UiCheckboxGroup
    options={skillOptions}
    value={skills}
    onChange={(value) => {
        setSkills(value);
        setTouched(true);
    }}
    label="Technical Skills (select at least one)"
    required
    error={hasError}
    errorText="Please select at least one skill"
    helperText="Choose all that apply"
/>
```

### Notification Preferences

```tsx
const [notifications, setNotifications] = useState<string[]>(['email']);

const notificationOptions: UiCheckboxOption[] = [
    { value: 'email', label: 'Email notifications' },
    { value: 'push', label: 'Push notifications' },
    { value: 'sms', label: 'SMS notifications', disabled: true },
    { value: 'slack', label: 'Slack notifications' },
];

<UiCheckboxGroup
    options={notificationOptions}
    value={notifications}
    onChange={setNotifications}
    label="How would you like to be notified?"
    helperText="SMS notifications coming soon"
    size="md"
/>
```

### Horizontal Filters

```tsx
const [filters, setFilters] = useState<string[]>([]);

const filterOptions: UiCheckboxOption[] = [
    { value: 'new', label: 'New' },
    { value: 'popular', label: 'Popular' },
    { value: 'sale', label: 'On Sale' },
    { value: 'free', label: 'Free Shipping' },
];

<UiCheckboxGroup
    options={filterOptions}
    value={filters}
    onChange={setFilters}
    label="Filters"
    orientation="horizontal"
    size="sm"
/>
```

### Privacy Settings

```tsx
const [privacy, setPrivacy] = useState<string[]>([]);

const privacyOptions: UiCheckboxOption[] = [
    { value: 'profile', label: 'Show my profile publicly' },
    { value: 'email', label: 'Show my email address' },
    { value: 'activity', label: 'Show my activity' },
    { value: 'stats', label: 'Show my statistics' },
];

<UiCheckboxGroup
    options={privacyOptions}
    value={privacy}
    onChange={setPrivacy}
    label="Profile Visibility"
    helperText="Control what information is visible to others"
    success={privacy.length > 0}
    successText="Your privacy preferences have been set"
/>
```

### Form with Validation

```tsx
const [interests, setInterests] = useState<string[]>([]);
const [submitted, setSubmitted] = useState(false);

const interestOptions: UiCheckboxOption[] = [
    { value: 'tech', label: 'Technology' },
    { value: 'design', label: 'Design' },
    { value: 'business', label: 'Business' },
    { value: 'marketing', label: 'Marketing' },
];

const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (interests.length === 0) {
        return; // Show error
    }

    // Submit form...
};

<form onSubmit={handleSubmit}>
    <UiCheckboxGroup
        options={interestOptions}
        value={interests}
        onChange={setInterests}
        label="Select your interests"
        required
        error={submitted && interests.length === 0}
        errorText="Please select at least one interest"
        helperText="We'll use this to personalize your experience"
    />

    <button type="submit">Continue</button>
</form>
```

### Feature Toggles

```tsx
const [features, setFeatures] = useState<string[]>(['analytics']);

const featureOptions: UiCheckboxOption[] = [
    { value: 'analytics', label: 'Analytics Dashboard' },
    { value: 'reports', label: 'Advanced Reports' },
    { value: 'api', label: 'API Access', disabled: true },
    { value: 'export', label: 'Data Export' },
];

<UiCheckboxGroup
    options={featureOptions}
    value={features}
    onChange={setFeatures}
    label="Enabled Features"
    helperText="API Access available on Pro plan"
    orientation="vertical"
    size="md"
/>
```

## Best Practices

1. **Labels**: Always provide a group label for context
2. **Validation**: Show errors only after user interaction (touched state)
3. **Helper text**: Use for explaining the purpose or constraints
4. **Required groups**: Validate minimum selections when required
5. **Success feedback**: Confirm when user meets requirements
6. **Disabled options**: Explain why options are disabled (via helper text)
7. **Orientation**: Use vertical for 4+ options, horizontal for 2-3 options
8. **Option labels**: Keep them short and clear
9. **Initial values**: Consider providing sensible defaults
10. **Name attribute**: Use when working with native form submissions

## Related Components

- [UiCheckbox](../UiCheckbox/README.md) - Individual checkbox component
- [UiRadioGroup](../UiRadioGroup/README.md) - Single selection from multiple options (coming soon)
