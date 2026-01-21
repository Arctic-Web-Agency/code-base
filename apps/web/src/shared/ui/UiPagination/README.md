# UiPagination

Universal pagination component with ellipsis support, multiple sizes, and full accessibility.

## Features

- **Three sizes**: Small, medium, large (inherited from UiButton)
- **Smart ellipsis**: Automatically shows ellipsis for large page counts
- **Accessible**: Full ARIA support and keyboard navigation
- **Type-safe**: Complete TypeScript support
- **Customizable icons**: Replace default navigation icons
- **First/Last buttons**: Optional first and last page navigation
- **Configurable range**: Control sibling and boundary page counts
- **Active state styling**: Built-in visual distinction for current page

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

### Sizes

```tsx
<UiPagination value={page} totalPages={20} onChange={setPage} size="sm" />
<UiPagination value={page} totalPages={20} onChange={setPage} size="md" />
<UiPagination value={page} totalPages={20} onChange={setPage} size="lg" />
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
```

### Custom Icons

```tsx
import { ArrowLeftIcon, ArrowRightIcon } from '@/shared/icons';

<UiPagination
    value={page}
    totalPages={10}
    onChange={setPage}
    IconPrev={ArrowLeftIcon}
    IconNext={ArrowRightIcon}
/>
```

### Custom Styling

Override default styles with `className` or `classNames`:

```tsx
<UiPagination
    value={page}
    totalPages={10}
    onChange={setPage}
    className="justify-center"
    classNames={{
        container: 'gap-2',
        item: 'hover:bg-neutral-100',
        activeItem: 'bg-neutral-200',
        navButton: 'text-blue-600',
        ellipsis: 'text-neutral-400 px-2',
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
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Component size |
| `siblingCount` | `number` | `1` | Pages to show on each side of current |
| `boundaryCount` | `number` | `1` | Pages to show at start and end |
| `showFirstLast` | `boolean` | `false` | Show first/last page buttons |
| `IconPrev` | `ComponentType<SVGProps>` | `ChevronDownIcon` (rotated) | Custom previous icon |
| `IconNext` | `ComponentType<SVGProps>` | `ChevronDownIcon` (rotated) | Custom next icon |
| `IconFirst` | `ComponentType<SVGProps>` | `ChevronsRightIcon` (rotated) | Custom first page icon |
| `IconLast` | `ComponentType<SVGProps>` | `ChevronsRightIcon` | Custom last page icon |
| `className` | `string` | - | Additional CSS classes for container |
| `classNames` | `object` | - | Custom class names for parts |

### classNames Object

| Key | Description |
|-----|-------------|
| `container` | Pagination container (`<nav>` element) |
| `item` | Non-active page buttons |
| `activeItem` | Active page button (added to base active styles) |
| `navButton` | Navigation buttons (prev, next, first, last) |
| `ellipsis` | Ellipsis elements |

## Behavior

### Auto-hide

Component returns `null` when `totalPages <= 1` (no pagination needed).

### Active Page Styling

Active page has built-in styles: `font-semibold text-neutral-900 dark:text-neutral-100`. Use `classNames.activeItem` to add additional styles.

### Navigation Button States

- **Previous/First** buttons are disabled on the first page
- **Next/Last** buttons are disabled on the last page

### Ellipsis Logic

The pagination automatically manages ellipsis display based on `siblingCount` and `boundaryCount`:

```
totalPages=20, siblingCount=1, boundaryCount=1:

Page 1:  [1] 2 3 ... 20
Page 5:  1 ... 4 [5] 6 ... 20
Page 10: 1 ... 9 [10] 11 ... 20
Page 18: 1 ... 17 [18] 19 20
Page 20: 1 ... 18 19 [20]
```

## TypeScript

```tsx
import type { UiPaginationProps, UiPaginationSize } from '@/shared/ui/UiPagination';
```

## Accessibility

- Semantic `<nav>` element with `role="navigation"`
- `aria-label="Pagination"` on container
- `aria-current="page"` on active page
- `aria-label` on all buttons (e.g., "Go to page 5")
- `aria-hidden="true"` on ellipsis elements
- Keyboard navigation via UiButton

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

## File Structure

```
UiPagination/
├── UiPagination.tsx   # Main component
├── types.ts           # TypeScript types
├── index.ts           # Exports
└── README.md          # Documentation
```
