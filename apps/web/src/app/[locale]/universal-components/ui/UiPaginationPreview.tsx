'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import UiPagination from '@/shared/ui/UiPagination';

interface ContentPreviewOptions {
    title: string;
    description?: string;
    page: number;
    perPage: number;
    totalItems: number;
}

function getContentPage({
    page,
    perPage,
    totalItems,
}: {
    page: number;
    perPage: number;
    totalItems: number;
}) {
    const safePage = Math.max(1, page);
    const startIndex = (safePage - 1) * perPage;
    const endIndex = Math.min(startIndex + perPage, totalItems);
    const items = Array.from({ length: totalItems }, (_, i) => i + 1).slice(
        startIndex,
        endIndex
    );

    return {
        items,
        start: totalItems === 0 ? 0 : startIndex + 1,
        end: endIndex,
        total: totalItems,
    };
}

export default function UiPaginationPreview() {
    const t = useTranslations('previews.pagination');
    const [basicPage, setBasicPage] = useState(1);
    const [sizePage, setSizePage] = useState(2);
    const [firstLastPage, setFirstLastPage] = useState(3);
    const [rangePage, setRangePage] = useState(4);

    const renderContentPreview = ({
        title,
        description,
        page: currentPage,
        perPage,
        totalItems,
    }: ContentPreviewOptions) => {
        const { items, start, end, total } = getContentPage({
            page: currentPage,
            perPage,
            totalItems,
        });

        return (
            <div className="my-4 space-y-3 rounded-xl border border-border/40 bg-surface/40 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-text-primary">
                        {title}
                    </p>
                    <span className="text-xs text-text-secondary">
                        {t('showing', { start, end, total })}
                    </span>
                </div>
                {description && (
                    <p className="text-sm text-text-secondary">
                        {description}
                    </p>
                )}
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {items.map((item) => (
                        <div
                            key={item}
                            className="rounded-lg border border-border/40 bg-background/60 px-3 py-2 text-xs font-medium text-text-primary"
                        >
                            {t('item_label', { index: item })}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-8">
            {/* Basic usage */}
            <section className="space-y-4 rounded-2xl border border-border/40 bg-surface/30 p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">{t('basic')}</h3>
                <p className="text-sm text-text-secondary mb-4">
                    {t('basic_description')}
                </p>
                {renderContentPreview({
                    title: t('basic_content_title'),
                    page: basicPage,
                    perPage: 6,
                    totalItems: 60,
                })}
                <UiPagination
                    value={basicPage}
                    totalPages={10}
                    onChange={setBasicPage}
                />
            </section>

            {/* Sizes */}
            <section className="space-y-4 rounded-2xl border border-border/40 bg-surface/30 p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">{t('sizes')}</h3>
                <p className="text-sm text-text-secondary mb-4">
                    {t('sizes_description')}
                </p>
                <div className="flex flex-col gap-6">
                    <div className="space-y-3">
                        {renderContentPreview({
                            title: t('sizes_content_title'),
                            page: sizePage,
                            perPage: 4,
                            totalItems: 20,
                        })}
                        <div className="flex items-center gap-4">
                            <span className="w-12 text-sm text-neutral-500">sm:</span>
                            <UiPagination
                                value={sizePage}
                                totalPages={5}
                                onChange={setSizePage}
                                size="sm"
                            />
                        </div>
                    </div>
                    <div className="space-y-3">
                        {renderContentPreview({
                            title: t('sizes_content_title'),
                            page: sizePage,
                            perPage: 4,
                            totalItems: 20,
                        })}
                        <div className="flex items-center gap-4">
                            <span className="w-12 text-sm text-neutral-500">md:</span>
                            <UiPagination
                                value={sizePage}
                                totalPages={5}
                                onChange={setSizePage}
                                size="md"
                            />
                        </div>
                    </div>
                    <div className="space-y-3">
                        {renderContentPreview({
                            title: t('sizes_content_title'),
                            page: sizePage,
                            perPage: 4,
                            totalItems: 20,
                        })}
                        <div className="flex items-center gap-4">
                            <span className="w-12 text-sm text-neutral-500">lg:</span>
                            <UiPagination
                                value={sizePage}
                                totalPages={5}
                                onChange={setSizePage}
                                size="lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* With first/last buttons */}
            <section className="space-y-4 rounded-2xl border border-border/40 bg-surface/30 p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">
                    {t('with_first_last')}
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                    {t('with_first_last_description')}
                </p>
                {renderContentPreview({
                    title: t('with_first_last_content_title'),
                    page: firstLastPage,
                    perPage: 5,
                    totalItems: 100,
                })}
                <UiPagination
                    value={firstLastPage}
                    totalPages={20}
                    onChange={setFirstLastPage}
                    showFirstLast
                />
            </section>

            {/* Custom sibling/boundary count */}
            <section className="space-y-4 rounded-2xl border border-border/40 bg-surface/30 p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">
                    {t('custom_range')}
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                    {t('custom_range_description')}
                </p>
                <div className="flex flex-col gap-4">
                    <div>
                        <p className="text-sm text-neutral-500 mb-2">
                            siblingCount=2, boundaryCount=1
                        </p>
                        {renderContentPreview({
                            title: t('custom_range_first_title'),
                            description: t('custom_range_first_description'),
                            page: rangePage,
                            perPage: 4,
                            totalItems: 80,
                        })}
                        <UiPagination
                            value={rangePage}
                            totalPages={20}
                            onChange={setRangePage}
                            siblingCount={2}
                            boundaryCount={1}
                            showFirstLast
                            size="sm"
                        />
                    </div>
                    <div>
                        <p className="text-sm text-neutral-500 mb-2">
                            siblingCount=1, boundaryCount=2
                        </p>
                        {renderContentPreview({
                            title: t('custom_range_second_title'),
                            description: t('custom_range_second_description'),
                            page: rangePage,
                            perPage: 4,
                            totalItems: 80,
                        })}
                        <UiPagination
                            value={rangePage}
                            totalPages={20}
                            onChange={setRangePage}
                            siblingCount={1}
                            boundaryCount={2}
                            showFirstLast
                            size="sm"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
