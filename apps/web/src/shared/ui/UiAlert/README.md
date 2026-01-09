# UiAlert

Universal alert/toast notification system built on top of [Sonner](https://sonner.emilkowal.ski/) with powerful features and minimal styling for easy project adaptation.

## Features

- 🎯 **Four status types**: Success, error, warning, info with automatic icons
- 📍 **Six positions**: Top/bottom × left/center/right placement
- ⏱️ **Auto-dismiss**: Configurable duration or persistent alerts
- 🎬 **Smooth animations**: Built-in swipe gestures and transitions
- 🎨 **Action buttons**: Add interactive buttons to alerts
- 🔄 **Promise support**: Automatic loading/success/error states for async operations
- ♿ **Accessible**: Full ARIA support and keyboard navigation
- 🔒 **Type-safe**: Full TypeScript support with detailed types
- 🌗 **Dark mode**: Automatic dark mode support
- 📦 **Lightweight**: Built on Sonner (~3-4KB)
- 🎛️ **Global configuration**: Provider for app-wide defaults
- 🎨 **Minimal styles**: Easy to adapt to any design system

## Installation

```tsx
import { UiAlertProvider, alert } from '@/shared/ui/UiAlert';
```

## Setup

Wrap your app with `UiAlertProvider` (typically in root layout):

```tsx
import { UiAlertProvider } from '@/shared/ui/UiAlert';

export default function RootLayout({ children }) {
    return (
        <html>
            <body>
                <UiAlertProvider>
                    {children}
                </UiAlertProvider>
            </body>
        </html>
    );
}
```

## Basic Usage

### Simple Alerts

```tsx
import { alert } from '@/shared/ui/UiAlert';

// Success
alert.success('Profile updated successfully!');

// Error
alert.error('Failed to save changes');

// Warning
alert.warning('Your session will expire soon');

// Info
alert.info('New features available');
```

### With Custom Duration

```tsx
// Show for 10 seconds
alert.success('Saved!', { duration: 10000 });

// Never auto-dismiss
alert.error('Critical error', { duration: Infinity });

// Quick notification (2 seconds)
alert.info('Copied to clipboard', { duration: 2000 });
```

### With Title and Message

```tsx
alert({
    status: 'success',
    title: 'Order Confirmed',
    message: 'Your order #12345 has been placed successfully',
    duration: 5000,
});
```

### Different Positions

```tsx
alert.success('Top left', { position: 'top-left' });
alert.error('Top center', { position: 'top-center' });
alert.warning('Top right', { position: 'top-right' });
alert.info('Bottom left', { position: 'bottom-left' });
alert.success('Bottom center', { position: 'bottom-center' });
alert.error('Bottom right', { position: 'bottom-right' });
```

## Advanced Usage

### With Action Buttons

```tsx
alert.warning('Unsaved changes detected', {
    title: 'Warning',
    actions: [
        {
            label: 'Save',
            onClick: () => saveChanges(),
            variant: 'filled',
        },
        {
            label: 'Discard',
            onClick: () => discardChanges(),
            variant: 'text',
        },
    ],
});
```

### Action Button Options

```tsx
alert.info('New message received', {
    actions: [
        {
            label: 'View',
            onClick: () => openMessage(),
            variant: 'filled',
            closeOnClick: true, // Close alert after click (default)
        },
        {
            label: 'Mark as Read',
            onClick: () => markAsRead(),
            variant: 'text',
            closeOnClick: false, // Keep alert open
        },
    ],
});
```

### Promise-based Alerts (Async Operations)

Perfect for API calls, file uploads, or any async operation:

```tsx
import { alert } from '@/shared/ui/UiAlert';

const saveData = async () => {
    await alert.promise(
        fetch('/api/save').then(res => res.json()),
        {
            loading: 'Saving...',
            success: 'Saved successfully!',
            error: 'Failed to save',
        }
    );
};
```

### Promise with Dynamic Messages

```tsx
const uploadFile = async (file: File) => {
    await alert.promise(
        uploadFileToServer(file),
        {
            loading: `Uploading ${file.name}...`,
            success: (data) => `${file.name} uploaded! (${data.size} bytes)`,
            error: (err) => `Upload failed: ${err.message}`,
            duration: 7000,
            position: 'bottom-center',
        }
    );
};
```

### Custom Icons

```tsx
import { StarIcon } from '@/shared/icons';

alert.success('Achievement unlocked!', {
    icon: <StarIcon className="w-5 h-5 text-yellow-500" />,
});

// Hide default icon
alert.info('Plain message', {
    hideIcon: true,
});
```

### Rich Content

```tsx
alert.info(
    <div>
        <p>You have <strong>3 new messages</strong></p>
        <p className="text-sm text-neutral-500 mt-1">
            from John, Sarah, and Mike
        </p>
    </div>,
    {
        title: 'Notifications',
        duration: 8000,
    }
);
```

### Programmatic Control

```tsx
// Store alert ID
const alertId = alert.success('Processing...');

// Dismiss specific alert later
setTimeout(() => {
    alert.dismiss(alertId);
}, 3000);

// Dismiss all alerts
alert.dismissAll();
```

### Custom Alert with Full Control

```tsx
alert.custom(
    (id) => (
        <div className="flex items-center gap-3 p-4">
            <img src="/avatar.jpg" className="w-10 h-10 rounded-full" />
            <div>
                <p className="font-semibold">John Doe</p>
                <p className="text-sm text-neutral-500">liked your post</p>
            </div>
        </div>
    ),
    {
        duration: 5000,
        position: 'top-right',
    }
);
```

## Provider Configuration

Customize global defaults for all alerts:

```tsx
<UiAlertProvider
    position="top-right"          // Default position
    duration={5000}                // Default duration
    visibleToasts={3}              // Max visible alerts
    expand={true}                  // Expand on hover
    gap={14}                       // Gap between alerts (px)
    offset={16}                    // Offset from edge (px)
    richColors={false}             // More vibrant colors
>
    {children}
</UiAlertProvider>
```

### Multiple Providers for Different Regions

```tsx
// Top notifications
<UiAlertProvider position="top-center" visibleToasts={1}>
    {/* System notifications */}
</UiAlertProvider>

// Bottom notifications
<UiAlertProvider position="bottom-right" visibleToasts={5}>
    {/* User actions */}
</UiAlertProvider>
```

## API Reference

### `alert(options)`

Main function to show alerts with full control.

**Options:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `status` | `'success' \| 'error' \| 'warning' \| 'info'` | - | Alert status (required) |
| `message` | `ReactNode` | - | Alert message (required) |
| `title` | `string` | - | Alert title |
| `duration` | `number` | `5000` | Duration in ms (0 or Infinity for persistent) |
| `position` | `UiAlertPosition` | `'top-right'` | Position on screen |
| `actions` | `UiAlertAction[]` | - | Action buttons |
| `icon` | `ReactNode` | - | Custom icon (overrides status icon) |
| `hideIcon` | `boolean` | `false` | Hide default status icon |
| `dismissible` | `boolean` | `true` | Show close button |
| `onDismiss` | `() => void` | - | Callback when dismissed |
| `className` | `string` | - | Custom CSS classes |
| `ariaDescribedBy` | `string` | - | Custom ARIA description ID |

### `alert.success(message, options?)`

Show success alert.

```tsx
alert.success('Success message', {
    title: 'Success',
    duration: 5000,
});
```

### `alert.error(message, options?)`

Show error alert.

```tsx
alert.error('Error message', {
    title: 'Error',
    duration: Infinity, // Persistent
});
```

### `alert.warning(message, options?)`

Show warning alert.

```tsx
alert.warning('Warning message', {
    actions: [{ label: 'Got it', onClick: () => {} }],
});
```

### `alert.info(message, options?)`

Show info alert.

```tsx
alert.info('Info message', {
    position: 'bottom-center',
});
```

### `alert.promise(promise, options)`

Show alert based on promise state.

**Options:**

| Property | Type | Description |
|----------|------|-------------|
| `loading` | `string \| ReactNode` | Message during loading |
| `success` | `string \| ReactNode \| (data) => string \| ReactNode` | Success message |
| `error` | `string \| ReactNode \| (error) => string \| ReactNode` | Error message |
| `duration` | `number` | Duration for success/error states |
| `position` | `UiAlertPosition` | Position on screen |

```tsx
await alert.promise(
    apiCall(),
    {
        loading: 'Loading...',
        success: (data) => `Loaded ${data.count} items`,
        error: (err) => `Error: ${err.message}`,
    }
);
```

### `alert.custom(jsx, options?)`

Show fully custom alert with a render function that receives the toast ID.

```tsx
alert.custom(
    (id) => <CustomComponent toastId={id} />,
    {
        duration: 5000,
        position: 'top-center',
    }
);
```

### `alert.dismiss(toastId?)`

Dismiss specific alert or all if no ID provided.

```tsx
const id = alert.success('Message');
alert.dismiss(id);
```

### `alert.dismissAll()`

Dismiss all visible alerts.

```tsx
alert.dismissAll();
```

## Types

### `UiAlertAction`

```tsx
interface UiAlertAction {
    label: string;
    onClick: () => void;
    variant?: 'filled' | 'text';
    closeOnClick?: boolean;
}
```

### `UiAlertPosition`

```tsx
type UiAlertPosition =
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
```

### `UiAlertStatus`

```tsx
type UiAlertStatus = 'success' | 'error' | 'warning' | 'info';
```

## Real-World Examples

### Form Submission

```tsx
const handleSubmit = async (formData: FormData) => {
    try {
        await alert.promise(
            submitForm(formData),
            {
                loading: 'Submitting form...',
                success: 'Form submitted successfully!',
                error: 'Failed to submit form',
            }
        );
        router.push('/success');
    } catch (error) {
        // Error already shown by alert.promise
    }
};
```

### Delete Confirmation

```tsx
const handleDelete = (itemId: string) => {
    alert.warning('This action cannot be undone', {
        title: 'Delete Item?',
        actions: [
            {
                label: 'Delete',
                onClick: async () => {
                    await deleteItem(itemId);
                    alert.success('Item deleted');
                },
                variant: 'filled',
            },
            {
                label: 'Cancel',
                onClick: () => {}, // Just closes the alert
                variant: 'text',
            },
        ],
        duration: Infinity, // Wait for user action
    });
};
```

### File Upload Progress

```tsx
const uploadFile = async (file: File) => {
    const uploadPromise = uploadFileWithProgress(file);

    await alert.promise(uploadPromise, {
        loading: (
            <div>
                <p>Uploading {file.name}</p>
                <p className="text-xs text-neutral-500 mt-1">
                    {file.size} bytes
                </p>
            </div>
        ),
        success: (result) => `${file.name} uploaded successfully!`,
        error: (err) => `Upload failed: ${err.message}`,
        duration: 5000,
        position: 'bottom-right',
    });
};
```

### Network Status

```tsx
// Monitor connection
window.addEventListener('online', () => {
    alert.success('Connection restored', {
        position: 'top-center',
        duration: 3000,
    });
});

window.addEventListener('offline', () => {
    alert.error('No internet connection', {
        position: 'top-center',
        duration: Infinity,
    });
});
```

### Clipboard Copy

```tsx
const copyToClipboard = async (text: string) => {
    try {
        await navigator.clipboard.writeText(text);
        alert.success('Copied to clipboard', {
            duration: 2000,
            position: 'bottom-center',
        });
    } catch (error) {
        alert.error('Failed to copy');
    }
};
```

## Styling

The component uses minimal base styles with Tailwind CSS classes. Customize by:

1. **Provider-level styling:**
```tsx
<UiAlertProvider
    className="font-custom"
    richColors={true}
>
```

2. **Per-alert styling:**
```tsx
alert.success('Message', {
    className: 'border-2 border-green-500',
});
```

3. **Override default colors in your Tailwind config** to match your design system.

## Accessibility

UiAlert is built with accessibility in mind, following WCAG 2.1 guidelines:

### Core Features

- **ARIA attributes**: Alerts use `role="status"` and `aria-live="polite"` for non-intrusive screen reader announcements
- **Keyboard navigation**: Press `Escape` to dismiss alerts, `Tab` to navigate action buttons
- **Screen reader support**: Automatic announcements for alert messages and state changes
- **Focus management**: Action buttons are keyboard-accessible with visible focus indicators
- **Touch-friendly**: Swipe-to-dismiss gesture for mobile devices

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Escape` | Dismiss the most recent alert |
| `Tab` / `Shift+Tab` | Navigate through action buttons |
| `Enter` / `Space` | Activate focused button |

### Accessibility Examples

**1. Screen Reader-Friendly Messages**

```tsx
// Good: Clear, descriptive messages
alert.success('Profile updated successfully');
alert.error('Password must be at least 8 characters');

// Avoid: Vague messages
alert.success('Done'); // Not descriptive enough
alert.error('Error'); // Doesn't explain the problem
```

**2. Important Alerts with Actions**

```tsx
// Use persistent alerts for critical actions
alert.warning('Your session will expire in 2 minutes', {
    title: 'Session Timeout',
    duration: Infinity, // User must acknowledge
    actions: [
        {
            label: 'Extend Session',
            onClick: () => extendSession(),
            variant: 'filled',
        },
    ],
});
```

**3. Loading States for Screen Readers**

```tsx
// Promise alerts announce state changes automatically
alert.promise(
    saveUserProfile(),
    {
        loading: 'Saving your profile...', // Announced to screen readers
        success: 'Profile saved successfully', // Announced when complete
        error: 'Failed to save profile. Please try again',
    }
);
```

### Best Practices for Accessibility

1. **Use descriptive messages**: Avoid generic text like "Success" or "Error"
2. **Provide context**: Include what succeeded or failed
3. **Use persistent alerts for critical actions**: Set `duration: Infinity` for important decisions
4. **Add meaningful action labels**: "Save Changes" instead of "OK"
5. **Avoid alert spam**: Don't show multiple alerts simultaneously for unrelated events
6. **Test with screen readers**: Verify announcements with NVDA, JAWS, or VoiceOver

## Best Practices

1. **Use appropriate status**: Match the alert status to the message severity
2. **Keep messages concise**: Short, clear messages are more effective
3. **Don't overuse**: Too many alerts can be annoying
4. **Use promise alerts for async**: Provides better UX for loading states
5. **Position strategically**: Place alerts where users expect them
6. **Limit visible alerts**: Use `visibleToasts` to prevent clutter
7. **Provide actions when needed**: Give users clear next steps
8. **Consider duration**: Important messages need longer duration

## Browser Support

Works in all modern browsers that support:
- ES6+
- React 18+
- CSS Grid/Flexbox

## File Structure

```
UiAlert/
├── UiAlert.tsx       # Main component and alert API
├── types.ts          # TypeScript types
├── index.ts          # Exports
└── README.md         # Documentation
```

## Dependencies

- `sonner` (^2.0.7) - Toast notification library
- `@/shared/ui/UiButton` - Button component for actions
- `@/shared/icons` - Status icons (CheckCircle, XCircle, AlertCircle, InfoCircle)
- `@/shared/lib` - Utility functions (composeClasses)

## Credits

Built on top of [Sonner](https://sonner.emilkowal.ski/) by Emil Kowalski.
