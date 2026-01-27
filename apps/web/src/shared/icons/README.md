# Icons

Universal icon components with theme-agnostic styling and minimal dependencies.

## Features

- 🎨 **Theme-agnostic**: Uses `currentColor` for universal styling
- 📐 **Consistent API**: All icons use standard `className` prop
- ♿ **Accessible**: All icons include `aria-hidden="true"` by default
- 🔒 **Type-safe**: Full TypeScript support with `IconProps`
- 🎭 **Flexible**: Supports all SVG attributes via spread props
- ⚡ **Lightweight**: No unnecessary dependencies or styling

## Installation

```tsx
import { SunIcon, MoonIcon, ChevronDownIcon } from '@/shared/icons';
import type { IconProps } from '@/shared/icons';
```

## Usage

### Basic Usage

All icons accept standard SVG props, including `className`:

```tsx
<SunIcon />
<MoonIcon className="h-6 w-6" />
<ChevronDownIcon className="h-4 w-4 text-blue-500" />
```

### Custom Styling

Icons use `currentColor` by default, inheriting text color from parent:

```tsx
<div className="text-red-500">
    <SunIcon /> {/* Will be red */}
</div>

<SunIcon className="text-blue-600" /> {/* Will be blue */}
```

### With Custom Size

```tsx
<SunIcon className="h-8 w-8" />
<MoonIcon className="h-10 w-10" />
<ChevronDownIcon className="h-3 w-3" />
```

### With Transitions

Add transitions via className (not built into icons):

```tsx
<SunIcon className="h-5 w-5 transition-colors duration-300" />
```

### All SVG Props Supported

```tsx
<SunIcon
    className="h-6 w-6"
    onClick={() => console.log('clicked')}
    style={{ opacity: 0.5 }}
    role="img"
    aria-label="Light theme"
/>
```

## Available Icons

### SunIcon

Light theme icon with stroke-based design.

```tsx
import { SunIcon } from '@/shared/icons';

<SunIcon className="h-5 w-5 text-yellow-500" />
```

**Type**: Stroke icon
**Default size**: `h-5 w-5`
**Use case**: Light theme toggle, brightness controls

### MoonIcon

Dark theme icon with fill-based design.

```tsx
import { MoonIcon } from '@/shared/icons';

<MoonIcon className="h-5 w-5 text-blue-700" />
```

**Type**: Fill icon
**Default size**: `h-5 w-5`
**Use case**: Dark theme toggle, night mode

### ChevronDownIcon

Dropdown indicator icon.

```tsx
import { ChevronDownIcon } from '@/shared/icons';

<ChevronDownIcon className="h-5 w-5" />
```

**Type**: Fill icon
**Default size**: `h-5 w-5`
**Use case**: Select dropdowns, accordion toggles, collapse indicators

## TypeScript

### IconProps Type

```tsx
import type { IconProps } from '@/shared/icons';
import type { SVGProps } from 'react';

// IconProps is simply an alias for SVGProps<SVGSVGElement>
type IconProps = SVGProps<SVGSVGElement>;
```

This means icons support all standard SVG attributes:
- `className` - CSS classes
- `style` - Inline styles
- `onClick`, `onMouseEnter`, etc. - Event handlers
- `aria-*` - ARIA attributes
- `data-*` - Data attributes
- `width`, `height` - Dimensions
- And all other SVG element attributes

### Creating Custom Icons

Use the same pattern for consistency:

```tsx
import type { IconProps } from '@/shared/icons';

const CustomIcon = ({ className = 'h-5 w-5', ...props }: IconProps) => {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            {...props}
        >
            {/* Your SVG paths */}
        </svg>
    );
};

export default CustomIcon;
```

## Best Practices

### 1. Use currentColor

Always use `currentColor` for fill/stroke to make icons universal:

```tsx
// Good
<svg fill="currentColor">...</svg>
<svg stroke="currentColor">...</svg>

// Bad
<svg fill="#000">...</svg>
<svg stroke="rgb(255, 0, 0)">...</svg>
```

### 2. Default Size

Provide sensible defaults but allow override:

```tsx
const Icon = ({ className = 'h-5 w-5', ...props }: IconProps) => {
    // h-5 w-5 is 20px, a good default for most icons
}
```

### 3. Spread Props

Always spread remaining props for flexibility:

```tsx
const Icon = ({ className, ...props }: IconProps) => {
    return <svg className={className} {...props}>...</svg>;
};
```

### 4. Accessibility

Include `aria-hidden="true"` by default since icons are usually decorative:

```tsx
<svg aria-hidden="true">...</svg>
```

If the icon has semantic meaning, override with `aria-label`:

```tsx
<SunIcon aria-hidden={undefined} aria-label="Switch to light theme" />
```

### 5. No Hardcoded Colors

Avoid theme-specific or hardcoded colors in icons:

```tsx
// Bad
<svg className="fill-primary text-blue-500">...</svg>

// Good
<svg className="h-5 w-5">...</svg>
```

Let the parent component control colors:

```tsx
<div className="text-blue-500">
    <Icon />
</div>
```

## Examples

### Theme Toggle

```tsx
import { SunIcon, MoonIcon } from '@/shared/icons';

<button onClick={toggleTheme}>
    {theme === 'light' ? (
        <SunIcon className="h-5 w-5 text-yellow-500" />
    ) : (
        <MoonIcon className="h-5 w-5 text-blue-700" />
    )}
</button>
```

### Dropdown Select

```tsx
import { ChevronDownIcon } from '@/shared/icons';

<button className="flex items-center gap-2">
    Select option
    <ChevronDownIcon className="h-4 w-4" />
</button>
```

### With Animation

```tsx
import { ChevronDownIcon } from '@/shared/icons';

<ChevronDownIcon
    className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
/>
```

### Inherit Parent Color

```tsx
<div className="text-red-500 hover:text-red-700">
    <ChevronDownIcon className="h-4 w-4" />
</div>
```

## File Structure

```
icons/
├── SunIcon.tsx           # Sun icon component
├── MoonIcon.tsx          # Moon icon component
├── ChevronDownIcon.tsx   # Chevron down icon
├── types.ts              # TypeScript types
├── index.ts              # Exports
└── README.md             # Documentation
```

## Adding New Icons

1. Create new icon file following the pattern
2. Use `IconProps` interface
3. Set default `className = 'h-5 w-5'`
4. Use `currentColor` for fill/stroke
5. Include `aria-hidden="true"`
6. Spread remaining props
7. Export from `index.ts`

Example:

```tsx
// ArrowRightIcon.tsx
import type { IconProps } from './types';

const ArrowRightIcon = ({ className = 'h-5 w-5', ...props }: IconProps) => {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            {...props}
        >
            <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
    );
};

export default ArrowRightIcon;
```

Then add to `index.ts`:

```tsx
export { default as ArrowRightIcon } from './ArrowRightIcon';
```
