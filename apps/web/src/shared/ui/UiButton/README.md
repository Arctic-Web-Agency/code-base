# UiButton

Universal button component that supports native buttons, internal links (Next.js), and external links with full TypeScript support.

## Features

- 🎯 **Three variants**: Native button, internal link (Next.js), external link
- 📐 **Three sizes**: Small, medium, large with consistent padding
- 🎨 **Two styles**: Filled and text variants
- ♿ **Accessible**: Full ARIA support and keyboard navigation
- 🔒 **Type-safe**: Strict TypeScript with discriminated unions
- 🎭 **Icons**: Support for left and right icons
- 🚫 **Disabled state**: Works consistently across all variants

## Installation

```tsx
import UiButton from '@/shared/ui/UiButton/UiButton';
```

## Usage

### Basic Button

```tsx
<UiButton>Click me</UiButton>
```

### Button with Size and Variant

```tsx
<UiButton size="lg" variant="filled">
    Large Button
</UiButton>

<UiButton size="sm" variant="text">
    Small Text Button
</UiButton>
```

### Internal Link (Next.js)

Uses Next.js `<Link>` component for client-side navigation:

```tsx
<UiButton as="link" href="/about">
    About Page
</UiButton>

<UiButton as="link" href={{ pathname: '/posts/[id]', query: { id: '123' } }}>
    Dynamic Route
</UiButton>
```

### External Link

Uses native `<a>` tag with security attributes:

```tsx
<UiButton as="link" href="https://example.com" external>
    External Site
</UiButton>

<UiButton
    as="link"
    href="https://github.com"
    external
    target="_self"
    rel="nofollow"
>
    Custom Target
</UiButton>
```

### With Icons

```tsx
import { ArrowLeft, ArrowRight } from '@/icons';

<UiButton IconLeft={ArrowLeft}>
    Back
</UiButton>

<UiButton IconRight={ArrowRight}>
    Next
</UiButton>

<UiButton IconLeft={ArrowLeft} IconRight={ArrowRight}>
    Both Sides
</UiButton>
```

### Disabled State

```tsx
<UiButton disabled>
    Disabled Button
</UiButton>

<UiButton as="link" href="/page" disabled>
    Disabled Link
</UiButton>
```

### Custom Styling

Override default styles with className:

```tsx
<UiButton
    className="bg-green-600 hover:bg-green-700 text-white font-bold"
>
    Custom Style
</UiButton>
```

## API Reference

### Props

#### Common Props

All variants accept these props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Button content |
| `variant` | `'filled' \| 'text'` | `'filled'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size (controls padding) |
| `className` | `string` | - | Additional CSS classes |
| `IconLeft` | `ComponentType<SVGProps>` | - | Icon component for left side |
| `IconRight` | `ComponentType<SVGProps>` | - | Icon component for right side |
| `disabled` | `boolean` | `false` | Disable button/link |

#### Button-specific Props

When `as` is `'button'` or omitted:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Button type |
| `onClick` | `(e: MouseEvent) => void` | - | Click handler |
| All other standard button HTML attributes |

#### Internal Link Props

When `as="link"` (without `external` or `external={false}`):

| Prop | Type | Description |
|------|------|-------------|
| `href` | `string \| UrlObject` | Next.js route |
| `prefetch` | `boolean` | Enable route prefetching |
| `replace` | `boolean` | Replace history instead of push |
| `scroll` | `boolean` | Scroll to top after navigation |
| All other Next.js Link props |

#### External Link Props

When `as="link"` and `external={true}`:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | - | External URL |
| `target` | `string` | `'_blank'` | Link target |
| `rel` | `string` | `'noopener noreferrer'` | Link relationship |
| All other standard anchor HTML attributes |

## Variants

### Size

Controls padding and text size:

- `sm`: `px-3 py-1.5 text-sm`
- `md`: `px-4 py-2 text-base`
- `lg`: `px-6 py-3 text-lg`

### Variant

Controls background and text colors:

- `filled`: Background color with hover state
- `text`: Transparent background with hover state

## TypeScript

The component uses discriminated unions for type safety:

```tsx
import type {
    UiButtonProps,
    ButtonProps,
    InternalLinkProps,
    ExternalLinkProps
} from '@/shared/ui/UiButton/types';

// Button
const buttonProps: ButtonProps = {
    onClick: () => {},
    // href and external not allowed
};

// Internal link
const internalProps: InternalLinkProps = {
    as: 'link',
    href: '/about',
    // external must be false or omitted
};

// External link
const externalProps: ExternalLinkProps = {
    as: 'link',
    href: 'https://example.com',
    external: true, // required
};
```

## Accessibility

- Proper ARIA attributes (`aria-disabled`, `aria-hidden`)
- Keyboard navigation support
- Disabled links prevent navigation and are not keyboard-focusable
- Icons marked as decorative with `aria-hidden`

## Best Practices

1. **Use semantic types**: Use `as="link"` for navigation, regular button for actions
2. **Disabled links**: Avoid disabling links when possible, hide them instead
3. **Icons**: Use meaningful icons that enhance the button's purpose
4. **External links**: Always use `external` prop for external URLs
5. **Custom styles**: Use `className` sparingly, prefer using `variant` and `size`

## Examples

### Form Submit Button

```tsx
<form onSubmit={handleSubmit}>
    <UiButton type="submit" size="lg">
        Submit Form
    </UiButton>
</form>
```

### Navigation Menu

```tsx
<nav>
    <UiButton as="link" href="/" variant="text">Home</UiButton>
    <UiButton as="link" href="/about" variant="text">About</UiButton>
    <UiButton as="link" href="/contact" variant="text">Contact</UiButton>
</nav>
```

### Call-to-Action

```tsx
<UiButton
    as="link"
    href="https://example.com/signup"
    external
    size="lg"
    className="bg-gradient-to-r from-purple-600 to-blue-600"
>
    Get Started
</UiButton>
```

### Loading State

```tsx
<UiButton disabled={isLoading}>
    {isLoading ? 'Loading...' : 'Submit'}
</UiButton>
```

## File Structure

```
UiButton/
├── UiButton.tsx       # Main component
├── types.ts           # TypeScript types
├── index.ts           # Exports
└── README.md          # Documentation
```
