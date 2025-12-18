# UiCheckbox

Universal checkbox component with full TypeScript support and theme-agnostic styling.

## Features

- 📐 **Three sizes**: Small, medium, large with consistent scaling
- ♿ **Accessible**: Full ARIA support and keyboard navigation
- 🔒 **Type-safe**: Strict TypeScript with proper prop typing
- 🚫 **Disabled state**: Properly handles disabled interactions
- ❌ **Error state**: Visual feedback for validation errors
- ✅ **Success state**: Positive feedback with green checkbox
- 🏷️ **Label support**: Optional label with proper accessibility
- 💬 **Helper text**: Contextual messages (helper/error/success)
- ➖ **Indeterminate state**: Third state for "select all" scenarios
- 🎭 **Customizable**: Theme-agnostic neutral colors, easy to override
- ⚡ **Lightweight**: Minimal styling, no unnecessary dependencies

## Installation

```tsx
import UiCheckbox from '@/shared/ui/UiCheckbox';
import type { UiCheckboxProps, UiCheckboxSize } from '@/shared/ui/UiCheckbox';
```

## Usage

### Basic Checkbox

```tsx
const [accepted, setAccepted] = useState(false);

<UiCheckbox
    checked={accepted}
    onChange={(e) => setAccepted(e.target.checked)}
    label="I accept the terms and conditions"
/>
```

### Checkbox with Required Field

```tsx
<UiCheckbox
    checked={agreed}
    onChange={(e) => setAgreed(e.target.checked)}
    label="I agree to the privacy policy"
    required
/>
```

### Checkbox with Helper Text

```tsx
<UiCheckbox
    checked={subscribe}
    onChange={(e) => setSubscribe(e.target.checked)}
    label="Subscribe to newsletter"
    helperText="You can unsubscribe at any time"
/>
```

### Checkbox with Error State

```tsx
<UiCheckbox
    checked={terms}
    onChange={(e) => setTerms(e.target.checked)}
    label="Accept terms"
    error={!terms && submitted}
    errorText="You must accept the terms to continue"
/>
```

### Checkbox with Success State

```tsx
<UiCheckbox
    checked={verified}
    onChange={(e) => setVerified(e.target.checked)}
    label="Email verified"
    success={verified}
    successText="Your email has been verified"
/>
```

### Checkbox with Indeterminate State

```tsx
const [selectedAll, setSelectedAll] = useState(false);
const [selectedItems, setSelectedItems] = useState([]);

const allSelected = selectedItems.length === totalItems;
const someSelected = selectedItems.length > 0 && !allSelected;

<UiCheckbox
    checked={allSelected}
    indeterminate={someSelected}
    onChange={(e) => {
        if (e.target.checked) {
            setSelectedItems(allItems);
        } else {
            setSelectedItems([]);
        }
    }}
    label="Select all"
/>
```

### Different Sizes

```tsx
<UiCheckbox
    size="sm"
    checked={checked}
    onChange={(e) => setChecked(e.target.checked)}
    label="Small checkbox"
/>

<UiCheckbox
    size="md"
    checked={checked}
    onChange={(e) => setChecked(e.target.checked)}
    label="Medium checkbox"
/>

<UiCheckbox
    size="lg"
    checked={checked}
    onChange={(e) => setChecked(e.target.checked)}
    label="Large checkbox"
/>
```

### Disabled State

```tsx
<UiCheckbox
    checked={checked}
    onChange={(e) => setChecked(e.target.checked)}
    label="Disabled checkbox"
    disabled
/>

<UiCheckbox
    checked={true}
    onChange={(e) => setChecked(e.target.checked)}
    label="Disabled and checked"
    disabled
/>
```

### Checkbox without Label

```tsx
<UiCheckbox
    checked={checked}
    onChange={(e) => setChecked(e.target.checked)}
    aria-label="Select item"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the checkbox |
| `error` | `boolean` | `false` | Whether checkbox is in error state |
| `success` | `boolean` | `false` | Whether checkbox is in success state |
| `label` | `string` | - | Label text displayed next to checkbox |
| `helperText` | `string` | - | Helper text displayed below checkbox |
| `errorText` | `string` | - | Error message (shown when error=true) |
| `successText` | `string` | - | Success message (shown when success=true) |
| `indeterminate` | `boolean` | `false` | Whether checkbox is in indeterminate state |
| `required` | `boolean` | `false` | Whether checkbox is required |
| `disabled` | `boolean` | `false` | Whether checkbox is disabled |
| `checked` | `boolean` | - | Controlled checked state |
| `onChange` | `function` | - | Change handler |

All standard input HTML attributes are also supported.

## TypeScript

```tsx
import type { UiCheckboxProps } from '@/shared/ui/UiCheckbox';

const MyForm = () => {
    const [accepted, setAccepted] = useState<boolean>(false);

    const checkboxProps: UiCheckboxProps = {
        checked: accepted,
        onChange: (e) => setAccepted(e.target.checked),
        size: 'md',
        label: 'Accept terms',
        required: true,
    };

    return <UiCheckbox {...checkboxProps} />;
};
```

## Accessibility

- Proper label association via `htmlFor` and `id`
- Required fields marked with red asterisk
- ARIA attributes supported via spread props
- Disabled state properly communicated
- Keyboard navigation support (Space to toggle)
- Semantic HTML with native `<input type="checkbox">` element
- Indeterminate state properly set via DOM property

## Size Guide

- **Small (sm)**: Compact checkboxes for dense layouts
- **Medium (md)**: Default for most use cases
- **Large (lg)**: Prominent checkboxes for important selections

## State Priority

Text display priority (highest to lowest):
1. Error text (red) - shown when `error={true}` and `errorText` provided
2. Success text (green) - shown when `success={true}` and `successText` provided
3. Helper text (neutral) - default informational text

## Examples

### Terms and Conditions Form

```tsx
const [terms, setTerms] = useState(false);
const [privacy, setPrivacy] = useState(false);
const [marketing, setMarketing] = useState(false);
const [submitted, setSubmitted] = useState(false);

<form onSubmit={handleSubmit}>
    <UiCheckbox
        id="terms"
        checked={terms}
        onChange={(e) => setTerms(e.target.checked)}
        label="I accept the Terms and Conditions"
        required
        error={!terms && submitted}
        errorText="You must accept the terms to continue"
    />

    <UiCheckbox
        id="privacy"
        checked={privacy}
        onChange={(e) => setPrivacy(e.target.checked)}
        label="I have read the Privacy Policy"
        required
        error={!privacy && submitted}
        errorText="You must accept the privacy policy"
    />

    <UiCheckbox
        id="marketing"
        checked={marketing}
        onChange={(e) => setMarketing(e.target.checked)}
        label="Send me marketing emails"
        helperText="Optional - you can opt out at any time"
    />

    <button type="submit">Continue</button>
</form>
```

### Select All with Items

```tsx
const allItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
const [selectedItems, setSelectedItems] = useState<string[]>([]);

const allSelected = selectedItems.length === allItems.length;
const someSelected = selectedItems.length > 0 && !allSelected;

const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
        setSelectedItems(allItems);
    } else {
        setSelectedItems([]);
    }
};

const handleItemToggle = (item: string) => {
    setSelectedItems(prev =>
        prev.includes(item)
            ? prev.filter(i => i !== item)
            : [...prev, item]
    );
};

<div>
    <UiCheckbox
        checked={allSelected}
        indeterminate={someSelected}
        onChange={handleSelectAll}
        label="Select all items"
        size="md"
    />

    <div className="ml-6 mt-2 space-y-2">
        {allItems.map(item => (
            <UiCheckbox
                key={item}
                checked={selectedItems.includes(item)}
                onChange={() => handleItemToggle(item)}
                label={item}
                size="sm"
            />
        ))}
    </div>

    <p className="mt-2 text-sm text-neutral-600">
        {selectedItems.length} of {allItems.length} selected
    </p>
</div>
```

### Settings Panel

```tsx
const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
});

<div className="space-y-4">
    <h3>Notification Preferences</h3>

    <UiCheckbox
        checked={notifications.email}
        onChange={(e) =>
            setNotifications(prev => ({ ...prev, email: e.target.checked }))
        }
        label="Email notifications"
        helperText="Receive updates via email"
        success={notifications.email}
    />

    <UiCheckbox
        checked={notifications.push}
        onChange={(e) =>
            setNotifications(prev => ({ ...prev, push: e.target.checked }))
        }
        label="Push notifications"
        helperText="Receive real-time push notifications"
    />

    <UiCheckbox
        checked={notifications.sms}
        onChange={(e) =>
            setNotifications(prev => ({ ...prev, sms: e.target.checked }))
        }
        label="SMS notifications"
        helperText="Receive text message alerts"
        disabled
    />
</div>
```

### Checkbox List with Validation

```tsx
const [interests, setInterests] = useState<string[]>([]);
const [touched, setTouched] = useState(false);

const options = ['Technology', 'Design', 'Marketing', 'Sales'];
const hasError = touched && interests.length === 0;

<div>
    <p className="mb-2 text-sm font-medium">
        Select your interests (at least one required)
    </p>

    <div className="space-y-2">
        {options.map(option => (
            <UiCheckbox
                key={option}
                checked={interests.includes(option)}
                onChange={(e) => {
                    if (e.target.checked) {
                        setInterests(prev => [...prev, option]);
                    } else {
                        setInterests(prev => prev.filter(i => i !== option));
                    }
                    setTouched(true);
                }}
                label={option}
                error={hasError}
            />
        ))}
    </div>

    {hasError && (
        <p className="mt-2 text-sm text-red-500">
            Please select at least one interest
        </p>
    )}
</div>
```

### Profile Visibility Settings

```tsx
const [visibility, setVisibility] = useState({
    showEmail: false,
    showPhone: false,
    showAddress: false,
});

<div className="space-y-3">
    <h3>Profile Visibility</h3>
    <p className="text-sm text-neutral-600">
        Choose what information is visible on your public profile
    </p>

    <UiCheckbox
        checked={visibility.showEmail}
        onChange={(e) =>
            setVisibility(prev => ({ ...prev, showEmail: e.target.checked }))
        }
        label="Show email address"
        helperText="Your email will be visible to other users"
        size="md"
    />

    <UiCheckbox
        checked={visibility.showPhone}
        onChange={(e) =>
            setVisibility(prev => ({ ...prev, showPhone: e.target.checked }))
        }
        label="Show phone number"
        helperText="Your phone number will be visible to other users"
        size="md"
    />

    <UiCheckbox
        checked={visibility.showAddress}
        onChange={(e) =>
            setVisibility(prev => ({ ...prev, showAddress: e.target.checked }))
        }
        label="Show address"
        helperText="Your address will be visible to other users"
        size="md"
    />
</div>
```

### Todo List with Select All

```tsx
const [todos, setTodos] = useState([
    { id: 1, text: 'Buy groceries', completed: false },
    { id: 2, text: 'Walk the dog', completed: true },
    { id: 3, text: 'Finish project', completed: false },
]);

const completedCount = todos.filter(t => t.completed).length;
const allCompleted = completedCount === todos.length;
const someCompleted = completedCount > 0 && !allCompleted;

<div>
    <UiCheckbox
        checked={allCompleted}
        indeterminate={someCompleted}
        onChange={(e) => {
            setTodos(todos.map(t => ({ ...t, completed: e.target.checked })));
        }}
        label={`${completedCount} of ${todos.length} completed`}
        size="md"
    />

    <div className="mt-4 ml-2 space-y-2">
        {todos.map(todo => (
            <UiCheckbox
                key={todo.id}
                checked={todo.completed}
                onChange={(e) => {
                    setTodos(todos.map(t =>
                        t.id === todo.id
                            ? { ...t, completed: e.target.checked }
                            : t
                    ));
                }}
                label={todo.text}
                size="sm"
            />
        ))}
    </div>
</div>
```

## Best Practices

1. **Labels**: Always provide labels for better accessibility (use aria-label if no visible label)
2. **Required fields**: Mark required checkboxes with the required prop
3. **Validation**: Show error state only after user interaction (touched state)
4. **Indeterminate**: Use for "select all" functionality when some items are selected
5. **Helper text**: Provide context for what the checkbox does
6. **Groups**: When using multiple checkboxes, wrap them in a logical group
7. **Disabled state**: Use sparingly and provide explanation why it's disabled
8. **Success feedback**: Provide positive feedback for important confirmations
9. **Controlled components**: Always manage checked state explicitly
10. **Single checkbox**: For single yes/no questions, a checkbox is better than radio buttons

## Related Components

- [UiRadio](../UiRadio/README.md) - Single selection from multiple options (coming soon)
- [UiSwitch](../UiSwitch/README.md) - Toggle switch for on/off states
