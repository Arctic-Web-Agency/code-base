# UiTooltip

Universal tooltip component built on [Radix UI](https://www.radix-ui.com/primitives/docs/components/tooltip) with size variants, visual styles, and full accessibility support.

## Features

- 🎯 **Four positioning sides**: Top, bottom, left, right
- 📐 **Three alignment options**: Start, center, end
- 📏 **Three sizes**: Small, medium, large
- 🎨 **Three visual variants**: Dark, light, neutral
- 🎯 **Smart positioning**: Automatic collision detection and boundary awareness
- 🏹 **Optional arrow**: Pointing indicator with auto-positioning
- ⏱️ **Configurable delays**: Customizable show/hide timing
- ♿ **Accessible**: Full ARIA support and keyboard navigation
- 🔒 **Type-safe**: Strict TypeScript props and variants
- 🌗 **Theme-independent**: Variants maintain consistent appearance across themes
- ⚡ **Performance optimized**: Global Provider for shared context

## Installation

```tsx
import UiTooltip, { UiTooltipProvider } from '@/shared/ui/UiTooltip';
import type { UiTooltipProps, UiTooltipSize } from '@/shared/ui/UiTooltip';
```

## Setup

Wrap your app with `UiTooltipProvider` (typically in root layout):

```tsx
import { UiTooltipProvider } from '@/shared/ui/UiTooltip';

export default function RootLayout({ children }) {
    return (
        <html>
            <body>
                <UiTooltipProvider>
                    {children}
                </UiTooltipProvider>
            </body>
        </html>
    );
}
```

## Usage

### Basic Tooltip

```tsx
<UiTooltip content="This is a helpful hint">
    <button>Hover me</button>
</UiTooltip>
```

### Positioning

```tsx
<UiTooltip content="Top tooltip" side="top">
    <button>Top</button>
</UiTooltip>

<UiTooltip content="Bottom tooltip" side="bottom">
    <button>Bottom</button>
</UiTooltip>

<UiTooltip content="Left tooltip" side="left">
    <button>Left</button>
</UiTooltip>

<UiTooltip content="Right tooltip" side="right">
    <button>Right</button>
</UiTooltip>
```

### Alignment

```tsx
<UiTooltip content="Aligned to start" side="bottom" align="start">
    <button>Start</button>
</UiTooltip>

<UiTooltip content="Aligned to center" side="bottom" align="center">
    <button>Center</button>
</UiTooltip>

<UiTooltip content="Aligned to end" side="bottom" align="end">
    <button>End</button>
</UiTooltip>
```

### Size Variants

```tsx
<UiTooltip content="Small tooltip" size="sm">
    <button>Small</button>
</UiTooltip>

<UiTooltip content="Medium tooltip" size="md">
    <button>Medium</button>
</UiTooltip>

<UiTooltip content="Large tooltip" size="lg">
    <button>Large</button>
</UiTooltip>
```

### Visual Variants

```tsx
{/* Dark variant - always dark background with white text */}
<UiTooltip content="Dark tooltip" variant="dark">
    <button>Dark</button>
</UiTooltip>

{/* Light variant - always light background with dark text */}
<UiTooltip content="Light tooltip" variant="light">
    <button>Light</button>
</UiTooltip>

{/* Neutral variant - always neutral gray background */}
<UiTooltip content="Neutral tooltip" variant="neutral">
    <button>Neutral</button>
</UiTooltip>
```

### Without Arrow

```tsx
<UiTooltip content="No arrow indicator" showArrow={false}>
    <button>No Arrow</button>
</UiTooltip>
```

### Long Content

```tsx
<UiTooltip
    content="This is a longer tooltip with more text that demonstrates wrapping behavior"
    maxWidth={250}
>
    <button>Long Content</button>
</UiTooltip>
```

### Disabled State

```tsx
<UiTooltip content="Won't show" disabled>
    <button>Disabled Tooltip</button>
</UiTooltip>
```

### Custom Styling

```tsx
<UiTooltip
    content="Custom styled tooltip"
    className="font-bold border-2 border-blue-500"
    arrowClassName="fill-blue-500"
>
    <button>Custom</button>
</UiTooltip>
```

## API Reference

### UiTooltipProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **required** | Child components |
| `delayDuration` | `number` | `200` | Delay before showing tooltip (ms) |
| `skipDelayDuration` | `number` | `300` | Skip delay when moving between tooltips (ms) |

### UiTooltip Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **required** | Element that triggers the tooltip |
| `content` | `ReactNode` | **required** | Content to display in tooltip |
| `side` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Tooltip position |
| `align` | `'start' \| 'center' \| 'end'` | `'center'` | Tooltip alignment |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tooltip size |
| `variant` | `'dark' \| 'light' \| 'neutral'` | `'dark'` | Visual style |
| `showArrow` | `boolean` | `true` | Show arrow indicator |
| `sideOffset` | `number` | `5` | Distance from trigger (px) |
| `maxWidth` | `number` | `320` | Maximum width (px) |
| `disabled` | `boolean` | `false` | Disable tooltip |
| `className` | `string` | - | Additional CSS classes for content |
| `arrowClassName` | `string` | - | Additional CSS classes for arrow |

## Types

### UiTooltipSide

```tsx
type UiTooltipSide = 'top' | 'bottom' | 'left' | 'right';
```

### UiTooltipAlign

```tsx
type UiTooltipAlign = 'start' | 'center' | 'end';
```

### UiTooltipSize

```tsx
type UiTooltipSize = 'sm' | 'md' | 'lg';
```

### UiTooltipVariant

```tsx
type UiTooltipVariant = 'dark' | 'light' | 'neutral';
```

### UiTooltipProps

```tsx
interface UiTooltipProps {
    children: ReactNode;
    content: ReactNode;
    side?: UiTooltipSide;
    align?: UiTooltipAlign;
    size?: UiTooltipSize;
    variant?: UiTooltipVariant;
    showArrow?: boolean;
    sideOffset?: number;
    maxWidth?: number;
    disabled?: boolean;
    className?: string;
    arrowClassName?: string;
}
```

## Size Variants

Controls padding and text size:

- `sm`: `px-2 py-1 text-xs`
- `md`: `px-3 py-2 text-sm`
- `lg`: `px-4 py-3 text-base`

## Visual Variants

Each variant maintains consistent appearance across light/dark themes:

**Dark variant** (default):
- Background: `neutral-900`
- Text: `white`
- Use for: High contrast tooltips

**Light variant**:
- Background: `white`
- Text: `neutral-900`
- Use for: Subtle hints on dark backgrounds

**Neutral variant**:
- Background: `neutral-400`
- Text: `white`
- Use for: Mid-tone tooltips

## Positioning Details

**Smart collision detection:**
- Tooltip automatically repositions if it would overflow viewport
- `collisionPadding={8}` prevents tooltip from touching screen edges

**Side options:**
- `top`: Above the trigger
- `bottom`: Below the trigger
- `left`: Left of the trigger
- `right`: Right of the trigger

**Align options:**
- `start`: Align to start edge
- `center`: Align to center (default)
- `end`: Align to end edge

## Performance

The `UiTooltipProvider` should be placed at the app root for optimal performance:

- Shares tooltip context across all tooltips in the app
- Enables smooth transitions when moving between multiple tooltips
- Single event listener management
- Reduces re-renders

## Accessibility

- Uses Radix UI primitives for full ARIA support
- Keyboard navigation: Tooltips appear on focus, dismiss on blur
- Screen reader compatible with `aria-describedby`
- Respects `prefers-reduced-motion` for animations
- Focus management handled automatically

## Browser Compatibility

Built on Radix UI, supports:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Best Practices

**Do:**
- Use for short, helpful hints (1-2 sentences)
- Place tooltips on interactive elements (buttons, links, icons)
- Keep content concise and scannable
- Use consistent `variant` choices across your app

**Don't:**
- Don't put critical information in tooltips (they're easily missed)
- Don't use tooltips on mobile-only elements (hover doesn't work on touch)
- Don't nest interactive elements inside tooltip content
- Don't use for form validation errors (use dedicated error components)

## Examples

### Icon with Tooltip

```tsx
<UiTooltip content="Settings">
    <button className="p-2 rounded hover:bg-gray-100">
        <SettingsIcon className="w-5 h-5" />
    </button>
</UiTooltip>
```

### Help Text

```tsx
<div className="flex items-center gap-2">
    <label>API Key</label>
    <UiTooltip content="Your unique API key for authentication">
        <InfoIcon className="w-4 h-4 text-gray-400 cursor-help" />
    </UiTooltip>
</div>
```

### Status Indicator

```tsx
<UiTooltip content="Server is healthy" variant="dark" side="right">
    <div className="w-3 h-3 bg-green-500 rounded-full" />
</UiTooltip>
```
