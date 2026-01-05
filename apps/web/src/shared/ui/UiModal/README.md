# UiModal

Universal modal dialog with portal rendering, focus management, and
accessibility helpers.

## Features

- 🧩 **Portal-based**: Renders to `document.body` with overlay
- 🎯 **Five sizes**: sm, md, lg, xl, full
- ♿ **Accessible**: `role="dialog"`, ARIA labeling, focus trap
- ⌨️ **Keyboard support**: ESC to close (configurable)
- 🧼 **Scroll lock**: Prevents body scroll when open
- 🧰 **Configurable**: Title, footer, close button, overlay behavior
- 🔒 **Type-safe**: Strict TypeScript props

## Installation

```tsx
import UiModal from '@/shared/ui/UiModal/UiModal';
import type { UiModalProps, UiModalSize } from '@/shared/ui/UiModal/types';
```

## Usage

### Basic Modal

```tsx
const [open, setOpen] = useState(false);

<UiModal
    isOpen={open}
    onClose={() => setOpen(false)}
    title="Example"
>
    Modal content goes here.
</UiModal>
```

### With Footer Actions

```tsx
<UiModal
    isOpen={open}
    onClose={() => setOpen(false)}
    title="Delete item"
    footer={(
        <div className="flex justify-end gap-2">
            <UiButton variant="text" onClick={() => setOpen(false)}>
                Cancel
            </UiButton>
            <UiButton variant="filled">
                Delete
            </UiButton>
        </div>
    )}
>
    Are you sure you want to delete this item?
</UiModal>
```

### Sizes

```tsx
<UiModal isOpen={open} onClose={() => setOpen(false)} size="sm">
    Small modal
</UiModal>

<UiModal isOpen={open} onClose={() => setOpen(false)} size="full">
    Full-width modal
</UiModal>
```

### Disable Overlay or ESC Close

```tsx
<UiModal
    isOpen={open}
    onClose={() => setOpen(false)}
    closeOnOverlayClick={false}
    closeOnEsc={false}
>
    Persistent modal
</UiModal>
```

### Custom Styling

```tsx
<UiModal
    isOpen={open}
    onClose={() => setOpen(false)}
    className="rounded-lg border border-neutral-200"
    overlayClassName="bg-black/70"
>
    Styled modal
</UiModal>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | **required** | Whether the modal is open |
| `onClose` | `() => void` | **required** | Close callback |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Modal size |
| `title` | `ReactNode` | - | Header title content |
| `children` | `ReactNode` | **required** | Modal body content |
| `footer` | `ReactNode` | - | Footer content (actions) |
| `showCloseButton` | `boolean` | `true` | Show close button in header |
| `closeOnOverlayClick` | `boolean` | `true` | Close on overlay click |
| `closeOnEsc` | `boolean` | `true` | Close on Escape key |
| `className` | `string` | - | Additional classes for modal panel |
| `overlayClassName` | `string` | - | Additional classes for overlay |
| `ariaLabel` | `string` | - | Accessible label override |
| `ariaDescribedBy` | `string` | - | ID for described-by element |

### Types

#### UiModalSize

```tsx
type UiModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
```

#### UiModalProps

```tsx
interface UiModalProps {
    isOpen: boolean;
    onClose: () => void;
    size?: UiModalSize;
    title?: ReactNode;
    children: ReactNode;
    footer?: ReactNode;
    showCloseButton?: boolean;
    closeOnOverlayClick?: boolean;
    closeOnEsc?: boolean;
    className?: string;
    overlayClassName?: string;
    ariaLabel?: string;
    ariaDescribedBy?: string;
}
```

## Size Variants

Controls maximum width of the modal panel:

- `sm`: `max-w-sm`
- `md`: `max-w-md`
- `lg`: `max-w-lg`
- `xl`: `max-w-xl`
- `full`: `max-w-full` with `mx-4`

## Accessibility

- Uses `role="dialog"` and `aria-modal="true"`
- Auto-focuses the first focusable element when opened
- Traps focus within the modal while open
- Supports `aria-label` override and `aria-describedby`

## Behavior Notes

- Renders in a portal to `document.body`
- Locks body scroll while open
- Overlay click and ESC close are configurable
