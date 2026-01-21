'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import UiPagination from '@/shared/ui/UiPagination';

export default function UiPaginationPreview() {
    const t = useTranslations('previews.pagination');
    const [page, setPage] = useState(5);
    const [pageSmall, setPageSmall] = useState(1);

    return (
        <div className="space-y-8">
            {/* Basic usage */}
            <section>
                <h3 className="text-lg font-semibold mb-4">{t('basic')}</h3>
                <UiPagination
                    value={page}
                    totalPages={10}
                    onChange={setPage}
                />
            </section>

            {/* Sizes */}
            <section>
                <h3 className="text-lg font-semibold mb-4">{t('sizes')}</h3>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <span className="w-12 text-sm text-neutral-500">sm:</span>
                        <UiPagination
                            value={pageSmall}
                            totalPages={5}
                            onChange={setPageSmall}
                            size="sm"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="w-12 text-sm text-neutral-500">md:</span>
                        <UiPagination
                            value={pageSmall}
                            totalPages={5}
                            onChange={setPageSmall}
                            size="md"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="w-12 text-sm text-neutral-500">lg:</span>
                        <UiPagination
                            value={pageSmall}
                            totalPages={5}
                            onChange={setPageSmall}
                            size="lg"
                        />
                    </div>
                </div>
            </section>

            {/* With first/last buttons */}
            <section>
                <h3 className="text-lg font-semibold mb-4">
                    {t('with_first_last')}
                </h3>
                <UiPagination
                    value={page}
                    totalPages={20}
                    onChange={setPage}
                    showFirstLast
                />
            </section>

            {/* Custom sibling/boundary count */}
            <section>
                <h3 className="text-lg font-semibold mb-4">
                    {t('custom_range')}
                </h3>
                <div className="flex flex-col gap-4">
                    <div>
                        <p className="text-sm text-neutral-500 mb-2">
                            siblingCount=2, boundaryCount=1
                        </p>
                        <UiPagination
                            value={page}
                            totalPages={20}
                            onChange={setPage}
                            siblingCount={2}
                            boundaryCount={1}
                        />
                    </div>
                    <div>
                        <p className="text-sm text-neutral-500 mb-2">
                            siblingCount=1, boundaryCount=2
                        </p>
                        <UiPagination
                            value={page}
                            totalPages={20}
                            onChange={setPage}
                            siblingCount={1}
                            boundaryCount={2}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
