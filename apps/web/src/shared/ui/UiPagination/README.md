# UiPagination

Universal pagination component with ellipsis support, multiple variants, and full accessibility.

## Features

- **Three variants**: Filled, outlined, and ghost styles
- **Three sizes**: Small, medium, large with consistent sizing
- **Smart ellipsis**: Automatically shows ellipsis for large page counts
- **Accessible**: Full ARIA support and keyboard navigation
- **Type-safe**: Complete TypeScript support
- **Customizable icons**: Replace default navigation icons
- **First/Last buttons**: Optional first and last page navigation
- **Configurable range**: Control sibling and boundary page counts

## Installation

```tsx
import UiPagination from '@/shared/ui/UiPagination';
```

## Usage

### Basic Usage

```tsx
const [page, setPage] = useState(1);

<UiPagination
    value={page}
    totalPages={10}
    onChange={setPage}
/>
```

### With Variant and Size

```tsx
<UiPagination
    value={page}
    totalPages={20}
    onChange={setPage}
    variant="outlined"
    size="lg"
/>

<UiPagination
    value={page}
    totalPages={20}
    onChange={setPage}
    variant="ghost"
    size="sm"
/>
```

### With First/Last Buttons

```tsx
<UiPagination
    value={page}
    totalPages={50}
    onChange={setPage}
    showFirstLast
/>
```

### Custom Sibling and Boundary Count

Control how many pages show around the current page and at the edges:

```tsx
// Show 2 pages on each side of current page
<UiPagination
    value={page}
    totalPages={100}
    onChange={setPage}
    siblingCount={2}
/>

// Show 2 pages at start and end
<UiPagination
    value={page}
    totalPages={100}
    onChange={setPage}
    boundaryCount={2}
/>

// Combined
<UiPagination
    value={page}
    totalPages={100}
    onChange={setPage}
    siblingCount={2}
    boundaryCount={2}
/>
```

### Custom Icons

```tsx
import { ArrowLeft, ArrowRight } from '@/icons';

<UiPagination
    value={page}
    totalPages={10}
    onChange={setPage}
    IconPrev={ArrowLeft}
    IconNext={ArrowRight}
/>
```

### Disabled State

```tsx
<UiPagination
    value={page}
    totalPages={10}
    onChange={setPage}
    disabled
/>
```

### Custom Styling

Override default styles with className or classNames:

```tsx
<UiPagination
    value={page}
    totalPages={10}
    onChange={setPage}
    className="justify-center"
    classNames={{
        container: 'bg-neutral-50 p-2 rounded-lg',
        item: 'hover:scale-105',
        activeItem: 'ring-2 ring-blue-500',
        navButton: 'text-blue-600',
        ellipsis: 'text-neutral-400',
    }}
/>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | - | Current active page (1-indexed, required) |
| `totalPages` | `number` | - | Total number of pages (required) |
| `onChange` | `(page: number) => void` | - | Callback when page changes (required) |
| `variant` | `'filled' \| 'outlined' \| 'ghost'` | `'filled'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Component size |
| `siblingCount` | `number` | `1` | Pages to show on each side of current |
| `boundaryCount` | `number` | `1` | Pages to show at start and end |
| `showFirstLast` | `boolean` | `false` | Show first/last page buttons |
| `disabled` | `boolean` | `false` | Disable all controls |
| `IconPrev` | `ComponentType<SVGProps>` | `ChevronDownIcon` (rotated) | Custom previous icon |
| `IconNext` | `ComponentType<SVGProps>` | `ChevronDownIcon` (rotated) | Custom next icon |
| `IconFirst` | `ComponentType<SVGProps>` | `ChevronsRightIcon` (rotated) | Custom first page icon |
| `IconLast` | `ComponentType<SVGProps>` | `ChevronsRightIcon` | Custom last page icon |
| `className` | `string` | - | Additional CSS classes for container |
| `classNames` | `object` | - | Custom class names for parts |

### classNames Object

| Key | Description |
|-----|-------------|
| `container` | Pagination container |
| `item` | Non-active page buttons |
| `activeItem` | Active page button |
| `navButton` | Navigation buttons (prev, next, first, last) |
| `ellipsis` | Ellipsis elements |

## Variants

### Size

Controls dimensions and text size:

- `sm`: `min-w-7 h-7 text-sm` with `gap-1`
- `md`: `min-w-9 h-9 text-base` with `gap-1.5`
- `lg`: `min-w-11 h-11 text-lg` with `gap-2`

### Variant

Controls visual appearance:

- `filled`: Solid background with hover state
- `outlined`: Border with transparent background
- `ghost`: No border or background, only hover state

## Ellipsis Behavior

The pagination automatically manages ellipsis display:

- **Small page count**: Shows all pages without ellipsis
- **Near start**: Shows pages at start, ellipsis, then end pages
- **Near end**: Shows start pages, ellipsis, then pages at end
- **Middle**: Shows start pages, ellipsis, current range, ellipsis, end pages

Example with `totalPages={20}`, `siblingCount={1}`, `boundaryCount={1}`:

```
Page 1:  [1] 2 3 ... 20
Page 5:  1 ... 4 [5] 6 ... 20
Page 10: 1 ... 9 [10] 11 ... 20
Page 18: 1 ... 17 [18] 19 20
Page 20: 1 ... 18 19 [20]
```

## TypeScript

```tsx
import type {
    UiPaginationProps,
    UiPaginationSize,
    UiPaginationVariant,
} from '@/shared/ui/UiPagination';

// Type-safe props
const paginationProps: UiPaginationProps = {
    value: 1,
    totalPages: 10,
    onChange: (page) => console.log(page),
    variant: 'outlined',
    size: 'lg',
};
```

## Accessibility

- Semantic `<nav>` element with `role="navigation"`
- `aria-label` on the container
- `aria-current="page"` on the active page
- `aria-label` on all buttons describing their action
- Keyboard navigation support
- Focus indicators with ring styles
- Disabled state properly communicated

## Best Practices

1. **Page numbering**: Always use 1-indexed page numbers
2. **Loading states**: Disable pagination during data fetching
3. **Total pages**: Calculate from total items and page size
4. **URL sync**: Consider syncing page with URL params for bookmarking
5. **Responsive**: Use smaller size on mobile viewports

## Examples

### Data Table Pagination

```tsx
const [page, setPage] = useState(1);
const pageSize = 10;
const totalItems = 253;
const totalPages = Math.ceil(totalItems / pageSize);

<UiPagination
    value={page}
    totalPages={totalPages}
    onChange={setPage}
    showFirstLast
/>
```

### URL-Synced Pagination

```tsx
import { useSearchParams, useRouter } from 'next/navigation';

const searchParams = useSearchParams();
const router = useRouter();
const page = Number(searchParams.get('page')) || 1;

const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
};

<UiPagination
    value={page}
    totalPages={totalPages}
    onChange={handlePageChange}
/>
```

### Centered Pagination

```tsx
<div className="flex justify-center">
    <UiPagination
        value={page}
        totalPages={10}
        onChange={setPage}
    />
</div>
```

## File Structure

```
UiPagination/
├── UiPagination.tsx   # Main component
├── types.ts           # TypeScript types
├── index.ts           # Exports
└── README.md          # Documentation
```
