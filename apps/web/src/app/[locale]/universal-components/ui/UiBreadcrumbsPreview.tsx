'use client';

import UiBreadcrumbs from '@/shared/ui/UiBreadcrumbs';

export default function UiBreadcrumbsPreview() {
    return (
        <div className="space-y-6">
            {/* Basic breadcrumbs */}
            <UiBreadcrumbs
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Products', href: '/products' },
                    { label: 'Laptops' },
                ]}
            />

            {/* Small size */}
            <UiBreadcrumbs
                size="sm"
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Documentation', href: '/docs' },
                    { label: 'Components' },
                ]}
            />
        </div>
    );
}
