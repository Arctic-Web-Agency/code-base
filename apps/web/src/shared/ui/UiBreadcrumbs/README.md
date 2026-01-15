# UiBreadcrumbs

Universal breadcrumb navigation component with Next.js integration, accessibility support, and flexible customization.

## Features

- **Semantic HTML**: Uses `<nav>` and `<ol>` for proper structure
- **Next.js integration**: Client-side navigation with Next.js Link
- **Three sizes**: Small, medium, large with consistent spacing
- **Custom separators**: Replace default chevron with any ReactNode
- **Smart collapse**: Interactive dropdown for collapsed items
- **Responsive collapse**: Automatic collapse on mobile devices
- **Label truncation**: Truncate long labels with hover tooltip
- **Icon support**: Optional icons for each breadcrumb item
- **Disabled state**: Support for non-clickable items
- **SEO structured data**: JSON-LD schema.org BreadcrumbList
- **Style customization**: Override any element styles via className props
- **Accessible**: Full ARIA support and semantic markup
- **Type-safe**: Strict TypeScript with proper prop typing
- **Theme-agnostic**: Neutral colors that work in light/dark themes

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
// Small
<UiBreadcrumbs
    size="sm"
    items={[
        { label: 'Home', href: '/' },
        { label: 'About' },
    ]}
/>

// Medium (default)
<UiBreadcrumbs
    size="md"
    items={[
        { label: 'Home', href: '/' },
        { label: 'About' },
    ]}
/>

// Large
<UiBreadcrumbs
    size="lg"
    items={[
        { label: 'Home', href: '/' },
        { label: 'About' },
    ]}
/>
```

### Custom Separator

```tsx
// Slash separator
<UiBreadcrumbs
    items={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Laptops' },
    ]}
    separator={<span className="text-neutral-400">/</span>}
/>

// Dot separator
<UiBreadcrumbs
    items={[
        { label: 'Home', href: '/' },
        { label: 'About' },
    ]}
    separator={<span className="text-neutral-400">•</span>}
/>
```

### Smart Collapse with Interactive Dropdown

When breadcrumb trail is too long, use `maxItems` to collapse middle items. Collapsed items are shown in an interactive dropdown:

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
// Click "..." to see hidden items in dropdown
```

### Responsive Collapse

Automatically collapse breadcrumbs on mobile devices (< 640px):

```tsx
<UiBreadcrumbs
    responsiveMaxItems={3}
    items={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Electronics', href: '/products/electronics' },
        { label: 'Computers', href: '/products/electronics/computers' },
        { label: 'Laptops' },
    ]}
/>
// Desktop: shows all items
// Mobile: Home > ... > Laptops
```

### Label Truncation

Truncate long labels while preserving full text in hover tooltip:

```tsx
<UiBreadcrumbs
    maxLabelLength={20}
    items={[
        { label: 'Home', href: '/' },
        { label: 'Very Long Category Name', href: '/category' },
        { label: 'Another Extremely Long Product Title Here' },
    ]}
/>
// Labels longer than 20 characters are truncated with "..."
// Hover to see full label in tooltip
```

### Disabled Items

```tsx
<UiBreadcrumbs
    items={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products', disabled: true },
        { label: 'Laptops' },
    ]}
/>
// "Products" link is not clickable and has reduced opacity
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

### SEO Structured Data

Enable JSON-LD schema.org BreadcrumbList for better SEO:

```tsx
<UiBreadcrumbs
    structuredData
    baseUrl="https://example.com"
    items={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Laptops' },
    ]}
/>
// Generates JSON-LD script tag with BreadcrumbList schema
```

### Style Customization

Override default styles for any element:

```tsx
<UiBreadcrumbs
    items={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Laptops' },
    ]}
    className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg"
    itemClassName="py-1"
    linkClassName="text-blue-600 hover:text-blue-800"
    currentClassName="text-gray-900 font-bold"
    separatorClassName="text-gray-300"
/>
```

Customize collapse dropdown styles:

```tsx
<UiBreadcrumbs
    maxItems={3}
    items={longItems}
    collapseTriggerClassName="bg-blue-100 hover:bg-blue-200"
    collapseMenuClassName="bg-white shadow-xl rounded-lg"
    collapseMenuItemClassName="px-4 py-2 hover:bg-gray-100"
/>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `UiBreadcrumbItem[]` | **required** | Array of breadcrumb items |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of text and spacing |
| `separator` | `ReactNode` | `<ChevronDownIcon className="-rotate-90" />` | Custom separator element |
| `maxItems` | `number` | - | Max items before collapsing (min effective: 3) |
| `responsiveMaxItems` | `number` | - | Max items on mobile (< 640px) |
| `maxLabelLength` | `number` | - | Max characters before label truncation |
| `structuredData` | `boolean` | `false` | Enable JSON-LD structured data |
| `baseUrl` | `string` | - | Base URL for structured data (required if structuredData=true) |
| `className` | `string` | - | CSS classes for container |
| `itemClassName` | `string` | - | CSS classes for each item wrapper |
| `linkClassName` | `string` | - | CSS classes for links (overrides defaults) |
| `currentClassName` | `string` | - | CSS classes for current page item (overrides defaults) |
| `separatorClassName` | `string` | - | CSS classes for separator (overrides defaults) |
| `collapseTriggerClassName` | `string` | - | CSS classes for collapse trigger button |
| `collapseMenuClassName` | `string` | - | CSS classes for collapse dropdown menu |
| `collapseMenuItemClassName` | `string` | - | CSS classes for dropdown menu items |
| `ariaLabel` | `string` | `'Breadcrumb'` | Accessible label for navigation |

### Types

#### UiBreadcrumbItem

```tsx
interface UiBreadcrumbItem {
    /** Display text */
    label: string;
    /** URL (omit for current page) */
    href?: string;
    /** Optional icon */
    icon?: ReactNode;
    /** Disabled state (non-clickable, reduced opacity) */
    disabled?: boolean;
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
    responsiveMaxItems?: number;
    maxLabelLength?: number;
    structuredData?: boolean;
    baseUrl?: string;
    className?: string;
    itemClassName?: string;
    linkClassName?: string;
    currentClassName?: string;
    separatorClassName?: string;
    collapseTriggerClassName?: string;
    collapseMenuClassName?: string;
    collapseMenuItemClassName?: string;
    ariaLabel?: string;
}
```

## Size Variants

Controls text size, spacing, icon size, and separator size:

| Size | Text | Icon | Separator | Spacing |
|------|------|------|-----------|---------|
| `sm` | `text-xs` | 14px | `w-3 h-3` | `px-1` |
| `md` | `text-sm` | 16px | `w-4 h-4` | `px-2` |
| `lg` | `text-base` | 20px | `w-5 h-5` | `px-3` |

## Default Styling

The component uses theme-agnostic neutral colors (can be overridden via className props):

**Links:**
- Color: `neutral-600` / `neutral-400` (dark)
- Hover: `neutral-900` / `neutral-100` (dark)
- Focus: underline

**Current page:**
- Color: `neutral-900` / `neutral-100` (dark)
- Font weight: `medium`

**Separator:**
- Color: `neutral-400` / `neutral-600` (dark)

**Disabled:**
- Opacity: 50%
- Cursor: not-allowed

## Collapse Behavior

When `maxItems` or `responsiveMaxItems` is specified and items exceed the limit:

1. First item is always shown
2. Hidden items are shown as "..." button with dropdown
3. Last `maxItems - 2` items are shown

The "..." button opens an interactive dropdown with all hidden items.

```
Input:  Home > A > B > C > D > E > Current (maxItems=4)
Output: Home > [...] > D > E > Current
                 ↓
            Dropdown:
              - A
              - B
              - C
```

## Accessibility

- Semantic HTML: `<nav>` with `<ol>` list
- ARIA label on navigation (`aria-label="Breadcrumb"`)
- Current page marked with `aria-current="page"`
- Disabled items have `aria-disabled="true"`
- Collapse trigger has `aria-expanded`, `aria-haspopup`
- Dropdown menu has `role="menu"` with `role="menuitem"` for items
- Icons and separators have `aria-hidden="true"`
- Keyboard navigation: Tab through links, Escape closes dropdown
- Screen reader friendly with proper list structure

## File Structure

```
UiBreadcrumbs/
├── UiBreadcrumbs.tsx    # Main component
├── CollapsedDropdown.tsx # Dropdown for collapsed items
├── types.ts              # TypeScript types
├── index.ts              # Exports
└── README.md             # Documentation
```

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
    responsiveMaxItems={3}
    maxLabelLength={25}
/>
```

### Documentation Site with SEO

```tsx
<UiBreadcrumbs
    structuredData
    baseUrl="https://docs.example.com"
    items={[
        { label: 'Docs', href: '/docs' },
        { label: 'Components', href: '/docs/components' },
        { label: 'UiBreadcrumbs' },
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
        { label: 'Archived', href: '/admin/users/archived', disabled: true },
        { label: 'User Details' },
    ]}
    separator={<span className="text-neutral-300">•</span>}
/>
```

## Troubleshooting

**Collapse not working on mobile:**
- Ensure `responsiveMaxItems` is set
- Component uses `useIsMobile()` hook which requires client-side rendering

**Dropdown not closing:**
- Dropdown closes on click outside and Escape key
- Ensure no event propagation issues in parent components

**Truncation not visible:**
- Check that `maxLabelLength` is less than your longest label
- Hover over truncated labels to see full text in tooltip

**Structured data not appearing:**
- Both `structuredData` and `baseUrl` props are required
- Check browser dev tools for the JSON-LD script tag

## Related Components

- [UiButton](../UiButton/README.md) - Used for collapse trigger
- [useIsMobile](../../lib/useMediaQuery.ts) - Hook for responsive behavior
