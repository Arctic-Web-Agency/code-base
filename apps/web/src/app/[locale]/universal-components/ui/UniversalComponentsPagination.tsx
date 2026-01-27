'use client';

import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import UiPagination from '@/shared/ui/UiPagination';

interface UniversalComponentsPaginationProps {
    currentPage: number;
    totalPages: number;
}

export default function UniversalComponentsPagination({
    currentPage,
    totalPages,
}: UniversalComponentsPaginationProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleChange = useCallback(
        (nextPage: number) => {
            const params = new URLSearchParams(searchParams?.toString());

            if (nextPage <= 1) {
                params.delete('page');
            } else {
                params.set('page', String(nextPage));
            }

            const query = params.toString();
            const href = query ? `${pathname}?${query}` : pathname;

            router.push(href, { scroll: true });
        },
        [pathname, router, searchParams]
    );

    return (
        <div className="flex justify-center">
            <UiPagination
                value={currentPage}
                totalPages={totalPages}
                onChange={handleChange}
                size="md"
                showFirstLast
            />
        </div>
    );
}
