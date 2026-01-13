# UiBreadcrumbs

Universal breadcrumb navigation component with Next.js integration, accessibility support, and flexible customization.

## Features

- 🎯 **Semantic HTML**: Uses `<nav>` and `<ol>` for proper structure
- 🔗 **Next.js integration**: Client-side navigation with Next.js Link
- 📐 **Three sizes**: Small, medium, large with consistent spacing
- 🎨 **Custom separators**: Replace default chevron with any ReactNode
- 🔢 **Smart collapse**: Automatically collapse long breadcrumb trails
- 🎭 **Icon support**: Optional icons for each breadcrumb item
- ♿ **Accessible**: Full ARIA support and semantic markup
- 🔒 **Type-safe**: Strict TypeScript with proper prop typing
- 🌗 **Theme-agnostic**: Neutral colors that work in light/dark themes
- ⚡ **Lightweight**: No external dependencies beyond Next.js

## Installation

```tsx
import UiBreadcrumbs from '@/shared/ui/UiBreadcrumbs';
import type { UiBreadcrumbsProps, UiBreadcrumbItem } from '@/shared/ui/UiBreadcrumbs';
```

## Usage

### Basic Breadcrumbs

```tsx
<UiBreadcrumbs
    items={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Laptops' },
    ]}
/>
```

### Different Sizes

```tsx
<UiBreadcrumbs
    size="sm"
    items={[
        { label: 'Home', href: '/' },
        { label: 'About' },
    ]}
/>

<UiBreadcrumbs
    size="md"
    items={[
        { label: 'Home', href: '/' },
        { label: 'About' },
    ]}
/>

<UiBreadcrumbs
    size="lg"
    items={[
        { label: 'Home', href: '/' },
        { label: 'About' },
    ]}
/>
```

### With Icons

```tsx
import { HomeIcon, FolderIcon, DocumentIcon } from '@/shared/icons';

<UiBreadcrumbs
    items={[
        {
            label: 'Home',
            href: '/',
            icon: <HomeIcon />,
        },
        {
            label: 'Documents',
            href: '/documents',
            icon: <FolderIcon />,
        },
        {
            label: 'Report.pdf',
            icon: <DocumentIcon />,
        },
    ]}
/>
```

### Custom Separator

```tsx
import { SlashIcon } from '@/shared/icons';

// Using slash separator
<UiBreadcrumbs
    items={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Laptops' },
    ]}
    separator={<span className="text-neutral-400">/</span>}
/>

// Using custom icon
<UiBreadcrumbs
    items={[
        { label: 'Home', href: '/' },
        { label: 'About' },
    ]}
    separator={<SlashIcon />}
/>
```

### Collapsed Long Breadcrumbs

When breadcrumb trail is too long, use `maxItems` to collapse middle items:

```tsx
<UiBreadcrumbs
    maxItems={4}
    items={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Electronics', href: '/products/electronics' },
        { label: 'Computers', href: '/products/electronics/computers' },
        { label: 'Laptops', href: '/products/electronics/computers/laptops' },
        { label: 'Gaming Laptops' },
    ]}
/>
// Displays: Home > ... > Computers > Laptops > Gaming Laptops
```

### Dynamic Breadcrumbs

```tsx
'use client';

import { usePathname } from 'next/navigation';
import UiBreadcrumbs from '@/shared/ui/UiBreadcrumbs';

const DynamicBreadcrumbs = () => {
    const pathname = usePathname();

    // Generate breadcrumb items from pathname
    const items = pathname
        .split('/')
        .filter(Boolean)
        .map((segment, index, array) => ({
            label: segment.charAt(0).toUpperCase() + segment.slice(1),
            href: index < array.length - 1
                ? '/' + array.slice(0, index + 1).join('/')
                : undefined,
        }));

    // Add home as first item
    const breadcrumbs = [
        { label: 'Home', href: '/' },
        ...items,
    ];

    return <UiBreadcrumbs items={breadcrumbs} />;
};
```

### Custom Styling

```tsx
<UiBreadcrumbs
    items={[
        { label: 'Home', href: '/' },
        { label: 'About' },
    ]}
    className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg"
/>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `UiBreadcrumbItem[]` | **required** | Array of breadcrumb items |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of text and spacing |
| `separator` | `ReactNode` | `<ChevronDownIcon className="-rotate-90" />` | Custom separator element |
| `maxItems` | `number` | - | Max items before collapsing middle items |
| `className` | `string` | - | Additional CSS classes for container |
| `ariaLabel` | `string` | `'Breadcrumb'` | Accessible label for navigation |

### Types

#### UiBreadcrumbItem

```tsx
interface UiBreadcrumbItem {
    label: string;        // Display text
    href?: string;        // URL (omit for current page)
    icon?: ReactNode;     // Optional icon
}
```

#### UiBreadcrumbSize

```tsx
type UiBreadcrumbSize = 'sm' | 'md' | 'lg';
```

#### UiBreadcrumbsProps

```tsx
interface UiBreadcrumbsProps {
    items: UiBreadcrumbItem[];
    size?: UiBreadcrumbSize;
    separator?: ReactNode;
    maxItems?: number;
    className?: string;
    ariaLabel?: string;
}
```

## Size Variants

Controls text size, spacing, and icon size:

**Text and spacing:**
- `sm`: `text-xs gap-1`
- `md`: `text-sm gap-2`
- `lg`: `text-base gap-3`

**Icon sizes:**
- `sm`: 14px
- `md`: 16px
- `lg`: 20px

**Separator sizes:**
- `sm`: `w-3 h-3`
- `md`: `w-4 h-4`
- `lg`: `w-5 h-5`

## Styling Details

The component uses theme-agnostic neutral colors:

**Links (non-current pages):**
- Color: `neutral-600` (light) / `neutral-400` (dark)
- Hover: `neutral-900` (light) / `neutral-100` (dark)
- Transition: smooth color change

**Current page:**
- Color: `neutral-900` (light) / `neutral-100` (dark)
- Font weight: `medium`
- No hover effect

**Separator:**
- Color: `neutral-400` (light) / `neutral-600` (dark)
- Aria hidden for accessibility

## Collapse Behavior

When `maxItems` is specified and the number of items exceeds it:

1. First item is always shown
2. Middle items are replaced with "..."
3. Last `maxItems - 2` items are shown

Example with `maxItems={4}`:
```
Input:  Home > A > B > C > D > E > Current
Output: Home > ... > D > E > Current
```

## Accessibility

- Uses semantic HTML: `<nav>` with `<ol>` list
- ARIA label on navigation (`aria-label="Breadcrumb"`)
- Current page marked with `aria-current="page"`
- Icons and separators have `aria-hidden="true"`
- Keyboard navigation works through standard link behavior
- Screen reader friendly with proper list structure

## TypeScript

Import types for type-safe usage:

```tsx
import type {
    UiBreadcrumbsProps,
    UiBreadcrumbItem,
    UiBreadcrumbSize,
} from '@/shared/ui/UiBreadcrumbs';

const items: UiBreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'About' },
];

const props: UiBreadcrumbsProps = {
    items,
    size: 'md',
    separator: <span>/</span>,
    maxItems: 5,
};
```

## Best Practices

1. **Last item**: Omit `href` from the last item to indicate current page
2. **Home first**: Always start with Home or root page
3. **Limit depth**: Use `maxItems` for paths deeper than 5 levels
4. **Icon usage**: Use icons sparingly, typically only for Home
5. **Consistent sizing**: Match breadcrumb size to your page typography
6. **Mobile responsive**: Consider hiding breadcrumbs or using smaller size on mobile

## Examples

### E-commerce Product Page

```tsx
<UiBreadcrumbs
    items={[
        { label: 'Home', href: '/' },
        { label: 'Electronics', href: '/electronics' },
        { label: 'Laptops', href: '/electronics/laptops' },
        { label: 'Gaming Laptops', href: '/electronics/laptops/gaming' },
        { label: 'ASUS ROG Strix G15' },
    ]}
    maxItems={4}
/>
```

### Documentation Site

```tsx
import { HomeIcon, BookIcon, FileIcon } from '@/shared/icons';

<UiBreadcrumbs
    items={[
        {
            label: 'Docs',
            href: '/docs',
            icon: <HomeIcon />,
        },
        {
            label: 'Components',
            href: '/docs/components',
            icon: <BookIcon />,
        },
        {
            label: 'UiBreadcrumbs',
            icon: <FileIcon />,
        },
    ]}
    size="sm"
/>
```

### Admin Dashboard

```tsx
<UiBreadcrumbs
    items={[
        { label: 'Dashboard', href: '/admin' },
        { label: 'Users', href: '/admin/users' },
        { label: 'Edit User', href: `/admin/users/${userId}/edit` },
        { label: 'Permissions' },
    ]}
    separator={<span className="text-neutral-300">•</span>}
/>
```

### Blog Post

```tsx
<UiBreadcrumbs
    items={[
        { label: 'Blog', href: '/blog' },
        { label: '2025', href: '/blog/2025' },
        { label: 'January', href: '/blog/2025/01' },
        { label: 'How to Build Universal Components' },
    ]}
/>
```

### Settings Page

```tsx
<UiBreadcrumbs
    items={[
        { label: 'Settings', href: '/settings' },
        { label: 'Account', href: '/settings/account' },
        { label: 'Security' },
    ]}
    size="lg"
/>
```

## Integration with Next.js App Router

### Layout Integration

```tsx
// app/layout.tsx or specific layout
import UiBreadcrumbs from '@/shared/ui/UiBreadcrumbs';

export default function Layout({ children }) {
    return (
        <div>
            <header>
                <UiBreadcrumbs
                    items={[
                        { label: 'Home', href: '/' },
                        // Dynamic items based on route
                    ]}
                />
            </header>
            <main>{children}</main>
        </div>
    );
}
```

### With Route Context

```tsx
'use client';

import { usePathname } from 'next/navigation';
import UiBreadcrumbs from '@/shared/ui/UiBreadcrumbs';

// Map routes to human-readable labels
const routeLabels: Record<string, string> = {
    '/': 'Home',
    '/products': 'Products',
    '/products/electronics': 'Electronics',
    '/about': 'About Us',
    '/contact': 'Contact',
};

export function Breadcrumbs() {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);

    const items = [
        { label: 'Home', href: '/' },
        ...segments.map((segment, index) => {
            const path = '/' + segments.slice(0, index + 1).join('/');
            const isLast = index === segments.length - 1;

            return {
                label: routeLabels[path] || segment,
                href: isLast ? undefined : path,
            };
        }),
    ];

    return <UiBreadcrumbs items={items} />;
}
```

## Troubleshooting

**Breadcrumbs not showing:**
- Ensure `items` array has at least one item
- Check that component is imported correctly

**Links not working:**
- Verify `href` values are valid Next.js routes
- Check that Next.js Link is properly configured in your project

**Icons wrong size:**
- Icons automatically scale based on `size` prop
- Ensure custom icons support width/height props

**Collapse not working:**
- Verify `maxItems` is less than `items.length`
- Check that `maxItems` is at least 3 (to show first, "...", last)

## Related Components

- [UiButton](../UiButton/README.md) - Button component (uses similar Link logic)
- [UiTabs](../UiTabs/README.md) - Tab navigation
- [UiPagination](../UiPagination/README.md) - Page navigation

## File Structure

```
UiBreadcrumbs/
├── UiBreadcrumbs.tsx  # Main component
├── types.ts           # TypeScript types
├── index.ts           # Exports
└── README.md          # Documentation
```
