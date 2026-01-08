# UiTooltip

Small popup with helpful hints that appears on hover, focus, or click over an element.

## Features

- 📍 **Smart positioning**: Top, bottom, left, right with automatic viewport boundary detection
- ⏱️ **Configurable delays**: Control show/hide timing for better UX
- 🎯 **Multiple triggers**: Hover, focus, click, or manual control
- 🎨 **Arrow indicator**: Optional pointer showing tooltip direction
- ♿ **Accessible**: Full ARIA support with proper roles and attributes
- 🎬 **Smooth animations**: Fade-in effect for polished appearance
- 🔒 **Type-safe**: Full TypeScript support
- 📦 **Lightweight**: Zero dependencies beyond React
- 🌗 **Dark mode**: Automatic dark mode support
- 🎛️ **Controlled/Uncontrolled**: Works in both modes

## Installation

```tsx
import { UiTooltip } from '@/shared/ui/UiTooltip';
```

## Basic Usage

### Simple Tooltip

```tsx
import { UiTooltip } from '@/shared/ui/UiTooltip';

<UiTooltip content="This is a helpful hint">
    <button>Hover me</button>
</UiTooltip>
```

### Different Positions

```tsx
<UiTooltip content="Top tooltip" position="top">
    <button>Top</button>
</UiTooltip>

<UiTooltip content="Bottom tooltip" position="bottom">
    <button>Bottom</button>
</UiTooltip>

<UiTooltip content="Left tooltip" position="left">
    <button>Left</button>
</UiTooltip>

<UiTooltip content="Right tooltip" position="right">
    <button>Right</button>
</UiTooltip>
```

### With Custom Delay

```tsx
// Show immediately, hide after 100ms
<UiTooltip content="Quick tooltip" showDelay={0} hideDelay={100}>
    <button>Quick</button>
</UiTooltip>

// Show after 1 second
<UiTooltip content="Delayed tooltip" showDelay={1000}>
    <button>Delayed</button>
</UiTooltip>
```

## Advanced Usage

### Rich Content

```tsx
<UiTooltip
    content={
        <div>
            <strong>Bold Title</strong>
            <p className="text-xs mt-1">Additional description text</p>
        </div>
    }
>
    <button>Rich Content</button>
</UiTooltip>
```

### Custom Styling

```tsx
<UiTooltip
    content="Custom styled tooltip"
    className="bg-blue-600 text-white font-bold"
    maxWidth={300}
>
    <button>Custom Style</button>
</UiTooltip>
```

### Without Arrow

```tsx
<UiTooltip content="No arrow tooltip" showArrow={false}>
    <button>No Arrow</button>
</UiTooltip>
```

### Click Trigger

```tsx
<UiTooltip content="Click to toggle" trigger="click">
    <button>Click me</button>
</UiTooltip>
```

### Multiple Triggers

```tsx
<UiTooltip content="Hover or focus" trigger={['hover', 'focus']}>
    <button>Multiple Triggers</button>
</UiTooltip>
```

### Controlled Mode

```tsx
const [isOpen, setIsOpen] = useState(false);

<UiTooltip
    content="Controlled tooltip"
    open={isOpen}
    onOpenChange={setIsOpen}
    trigger="manual"
>
    <button onClick={() => setIsOpen(!isOpen)}>
        Toggle Tooltip
    </button>
</UiTooltip>
```

### Disabled State

```tsx
<UiTooltip content="This won't show" disabled={true}>
    <button>Disabled Tooltip</button>
</UiTooltip>
```

## API Reference

### `UiTooltip`

Main tooltip component that wraps a trigger element.

**Props:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `children` | `ReactElement` | - | Single child element that triggers the tooltip (required) |
| `content` | `ReactNode` | - | Content to display inside tooltip (required) |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Position relative to trigger element |
| `showDelay` | `number` | `200` | Delay in ms before showing tooltip |
| `hideDelay` | `number` | `0` | Delay in ms before hiding tooltip |
| `trigger` | `UiTooltipTrigger \| UiTooltipTrigger[]` | `'hover'` | Event(s) that trigger tooltip |
| `disabled` | `boolean` | `false` | Disable tooltip (won't show) |
| `offset` | `number` | `8` | Distance in pixels from trigger element |
| `maxWidth` | `number` | `200` | Maximum tooltip width in pixels |
| `showArrow` | `boolean` | `true` | Show arrow pointer |
| `className` | `string` | - | Custom CSS classes for tooltip |
| `open` | `boolean` | - | Controlled mode: manually control open state |
| `onOpenChange` | `(open: boolean) => void` | - | Callback when open state changes |
| `ariaLabel` | `string` | - | ARIA label for accessibility |

### Trigger Types

```tsx
type UiTooltipTrigger = 'hover' | 'focus' | 'click' | 'manual';
```

- **hover**: Show on mouse enter, hide on mouse leave
- **focus**: Show on focus, hide on blur
- **click**: Toggle on click
- **manual**: Only controlled via `open` prop

### Position Types

```tsx
type UiTooltipPosition = 'top' | 'bottom' | 'left' | 'right';
```

## Real-World Examples

### Icon with Explanation

```tsx
import { InfoCircleIcon } from '@/shared/icons';

<UiTooltip content="This field is required for authentication">
    <InfoCircleIcon className="w-5 h-5 text-neutral-500 cursor-help" />
</UiTooltip>
```

### Form Field Help

```tsx
<div className="flex items-center gap-2">
    <label htmlFor="password">Password</label>
    <UiTooltip
        content="Password must be at least 8 characters with 1 number and 1 special character"
        position="right"
        maxWidth={250}
    >
        <InfoCircleIcon className="w-4 h-4 text-neutral-400" />
    </UiTooltip>
</div>
```

### Button with Explanation

```tsx
<UiTooltip content="Save your changes to the database" position="bottom">
    <button className="px-4 py-2 bg-blue-600 text-white">
        Save Changes
    </button>
</UiTooltip>
```

### Disabled Button Explanation

```tsx
<UiTooltip
    content="You must fill all required fields before submitting"
    trigger={['hover', 'focus']}
>
    <button disabled className="px-4 py-2 bg-neutral-300 cursor-not-allowed">
        Submit Form
    </button>
</UiTooltip>
```

### Truncated Text

```tsx
<UiTooltip content={fullText} position="top" maxWidth={300}>
    <p className="truncate w-48">
        {fullText}
    </p>
</UiTooltip>
```

### Interactive Tooltip (Click)

```tsx
<UiTooltip
    content={
        <div>
            <p className="font-semibold mb-1">Quick Actions</p>
            <button className="text-xs">Copy</button>
            <button className="text-xs ml-2">Delete</button>
        </div>
    }
    trigger="click"
    showArrow={false}
    maxWidth={150}
>
    <button>Options</button>
</UiTooltip>
```

## Styling

The component uses minimal base styles with Tailwind CSS classes. Customize by:

1. **Per-tooltip styling:**
```tsx
<UiTooltip
    content="Custom tooltip"
    className="bg-green-600 text-white font-bold rounded-lg"
>
    <button>Custom</button>
</UiTooltip>
```

2. **Global styles** in your CSS:
```css
[role="tooltip"] {
    /* Your global tooltip styles */
}
```

## Accessibility

UiTooltip follows WCAG 2.1 accessibility guidelines:

### Core Features

- **ARIA attributes**: Uses `role="tooltip"` and `aria-describedby` to link tooltip to trigger
- **Keyboard support**: Focus trigger works with `Tab` key navigation
- **Screen readers**: Tooltip content announced when trigger receives focus
- **Multiple triggers**: Supports both mouse and keyboard interactions

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Focus trigger element (shows tooltip if `trigger` includes `'focus'`) |
| `Shift+Tab` | Focus previous element |
| `Escape` | Close tooltip (when using `click` trigger) |

### Accessibility Examples

**1. Accessible Icon Buttons**

```tsx
// Good: Provides context for icon-only buttons
<UiTooltip content="Delete item" trigger={['hover', 'focus']}>
    <button aria-label="Delete">
        <TrashIcon className="w-5 h-5" />
    </button>
</UiTooltip>
```

**2. Form Field Help**

```tsx
// Good: Additional context without cluttering UI
<div>
    <label htmlFor="email">Email Address</label>
    <UiTooltip content="We'll never share your email" trigger={['hover', 'focus']}>
        <InfoCircleIcon className="inline-block ml-1" tabIndex={0} />
    </UiTooltip>
    <input id="email" type="email" />
</div>
```

**3. Disabled Elements**

```tsx
// Good: Explain why action is unavailable
<UiTooltip content="Save feature unlocks at level 5">
    <button disabled aria-label="Save (locked)">
        Save
    </button>
</UiTooltip>
```

### Best Practices for Accessibility

1. **Use both hover and focus triggers**: `trigger={['hover', 'focus']}` for keyboard users
2. **Keep content concise**: Tooltips should be brief and scannable
3. **Don't hide critical info**: Essential information shouldn't be tooltip-only
4. **Make interactive elements focusable**: Add `tabIndex={0}` to non-interactive elements
5. **Provide aria-label**: Use `ariaLabel` prop for complex tooltip content
6. **Avoid nested interactive elements**: Don't put buttons/links inside tooltips

## Best Practices

1. **Keep it short**: Tooltips are for brief hints, not long explanations
2. **Use appropriate triggers**: Hover for quick info, click for interactive content
3. **Position wisely**: Consider where tooltip appears relative to viewport
4. **Don't overuse**: Too many tooltips can be overwhelming
5. **Provide delays**: Default 200ms delay prevents accidental triggers
6. **Test on mobile**: Consider touch interactions (hover doesn't work)
7. **Avoid essential info**: Critical information should be always visible
8. **Make trigger obvious**: Users should know an element has a tooltip

## Browser Support

Works in all modern browsers that support:
- ES6+
- React 18+
- CSS Transforms
- DOM APIs (getBoundingClientRect, createPortal)

## File Structure

```
UiTooltip/
├── UiTooltip.tsx     # Main component with positioning logic
├── types.ts          # TypeScript type definitions
├── index.ts          # Public exports
└── README.md         # Documentation (this file)
```

## Dependencies

- `react` - Core React library
- `react-dom` - For portal rendering
- `@/shared/lib` - Utility functions (composeClasses)

## Performance Notes

- **Portal rendering**: Tooltips render at document.body level to avoid z-index issues
- **Event listeners**: Cleaned up automatically on unmount
- **Position calculation**: Only calculates when tooltip is open
- **Scroll/resize**: Recalculates position on window scroll/resize (throttled)

## Common Patterns

### Conditional Tooltip

```tsx
<UiTooltip content="Help text" disabled={!showHelp}>
    <button>Action</button>
</UiTooltip>
```

### Dynamic Content

```tsx
<UiTooltip content={`${progress}% complete`}>
    <div className="progress-bar" />
</UiTooltip>
```

### Tooltip Chain

```tsx
<div className="flex gap-2">
    {actions.map((action) => (
        <UiTooltip key={action.id} content={action.description}>
            <button onClick={action.handler}>
                {action.icon}
            </button>
        </UiTooltip>
    ))}
</div>
```

## Limitations

- **Single child**: Tooltip requires exactly one child element (use a wrapper if needed)
- **No text children**: Children must be a React element, not plain text
- **Mobile hover**: Hover trigger doesn't work on touch devices (use click or focus)
- **Nested tooltips**: Avoid nesting tooltips within tooltips

## Troubleshooting

**Tooltip doesn't appear:**
- Check if `disabled` prop is `true`
- Verify child element accepts event handlers
- Ensure content is not empty

**Position is wrong:**
- Check viewport boundaries (tooltip auto-adjusts)
- Adjust `offset` prop
- Try different `position` value

**Tooltip flickers:**
- Increase `hideDelay` to prevent rapid hide/show
- Check for conflicting event handlers on child

**Tooltip cuts off:**
- Increase `maxWidth` prop
- Check for parent overflow: hidden

## Credits

Built with React Portals and modern positioning techniques. Inspired by popular tooltip libraries like Tippy.js and Radix UI.
