# UiBadge

Universal badge component with status variants, icons, dots, and dismissible
behavior.

## Features

- 🎯 **Status-based styles**: Success, error, warning with consistent colors
- 🎨 **Two variants**: Subtle and outline
- 📐 **Three sizes**: Small, medium, large
- ⚡ **Dot and icon support**: Optional status dot or custom icon
- 🧹 **Dismissible**: Optional close button with internal state
- ♿ **Accessible**: ARIA labels and live region updates
- 🔒 **Type-safe**: Strict TypeScript props and variants

## Installation

```tsx
import UiBadge from '@/shared/ui/UiBadge/UiBadge';
import type { UiBadgeProps, UiBadgeSize } from '@/shared/ui/UiBadge/types';
```

## Usage

### Basic Badge

```tsx
<UiBadge status="success">
    Active
</UiBadge>
```

### Variants

```tsx
<UiBadge status="success" variant="subtle">
    Subtle
</UiBadge>

<UiBadge status="success" variant="outline">
    Outline
</UiBadge>
```

### Sizes

```tsx
<UiBadge status="success" size="sm">
    Small
</UiBadge>

<UiBadge status="success" size="md">
    Medium
</UiBadge>

<UiBadge status="success" size="lg">
    Large
</UiBadge>
```

### Dot Indicator

```tsx
<UiBadge status="warning" dot>
    Pending
</UiBadge>
```

### Custom Icon

```tsx
import { ShieldCheckIcon } from '@/shared/icons';

<UiBadge status="success" icon={<ShieldCheckIcon />}>
    Verified
</UiBadge>
```

### Dismissible

```tsx
<UiBadge
    status="error"
    dismissible
    onDismiss={() => console.log('dismissed')}
>
    Failed
</UiBadge>
```

### Custom Styling

Override default styles with className:

```tsx
<UiBadge
    status="success"
    className="uppercase tracking-wide"
>
    Custom
</UiBadge>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `status` | `'success' \| 'error' \| 'warning'` | **required** | Badge status |
| `variant` | `'outline' \| 'subtle'` | `'subtle'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Badge size |
| `children` | `ReactNode` | **required** | Badge content |
| `dot` | `boolean` | `false` | Show status dot |
| `icon` | `ReactNode` | - | Custom icon element |
| `dismissible` | `boolean` | `false` | Show dismiss button |
| `onDismiss` | `() => void` | - | Callback when dismissed |
| `className` | `string` | - | Additional CSS classes |
| `ariaLabel` | `string` | - | Accessible label override |

### Types

#### UiBadgeStatus

```tsx
type UiBadgeStatus = 'success' | 'error' | 'warning';
```

#### UiBadgeVariant

```tsx
type UiBadgeVariant = 'outline' | 'subtle';
```

#### UiBadgeSize

```tsx
type UiBadgeSize = 'sm' | 'md' | 'lg';
```

#### UiBadgeProps

```tsx
interface UiBadgeProps {
    status: UiBadgeStatus;
    variant?: UiBadgeVariant;
    size?: UiBadgeSize;
    children: ReactNode;
    dot?: boolean;
    icon?: ReactNode;
    dismissible?: boolean;
    onDismiss?: () => void;
    className?: string;
    ariaLabel?: string;
}
```

## Size Variants

Controls padding, text size, and dot size:

- `sm`: `px-2 py-0.5 text-xs`, dot `w-1.5 h-1.5`
- `md`: `px-2.5 py-1 text-sm`, dot `w-2 h-2`
- `lg`: `px-3 py-1.5 text-base`, dot `w-2.5 h-2.5`

## Styling Details

**Subtle variant:**
- Background color based on status
- Dark mode uses deeper background colors

**Outline variant:**
- Transparent background with colored border and text
- Dark mode uses brighter borders for contrast

## Dismissible Behavior

- When dismissed, the badge unmounts itself (internal state)
- `onDismiss` fires after the internal state updates
- Use a wrapper component if you need a controlled dismiss lifecycle

## Accessibility

- Uses `role="status"` and `aria-live="polite"` for status updates
- `aria-label` defaults to "`<status> badge`" unless overridden
- Dismiss button includes `aria-label="Dismiss badge"`
