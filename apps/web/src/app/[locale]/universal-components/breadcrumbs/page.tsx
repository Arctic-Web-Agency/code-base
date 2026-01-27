import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import UiBreadcrumbs from '@/shared/ui/UiBreadcrumbs';
import { fetchMetadata } from '@/shared/seo/metadata';
import { MetaProps } from '@/shared/types/settings';

export async function generateMetadata(props: MetaProps): Promise<Metadata> {
    return await fetchMetadata({
        ...props,
        page: 'breadcrumbs_page',
        href: 'universal-components/breadcrumbs',
    });
}

export default function BreadcrumbsPage() {
    const t = useTranslations('breadcrumbs_page');

    return (
        <main className="container flex min-h-screen flex-col gap-10 py-12">
            <UiBreadcrumbs
                items={[
                    { label: t('breadcrumb.home'), href: '/' },
                    {
                        label: t('breadcrumb.universal_components'),
                        href: '/universal-components',
                    },
                    { label: t('breadcrumb.current') },
                ]}
                responsiveMaxItems={2}
            />

            <header className="max-w-3xl space-y-4">
                <h1 className="text-text-primary text-4xl font-semibold">
                    {t('heading')}
                </h1>
                <p className="text-text-secondary text-lg">{t('intro')}</p>
            </header>

            <div className="space-y-12">
                {/* Size variants */}
                <section className="space-y-4">
                    <h2 className="text-text-primary text-2xl font-semibold">
                        {t('sections.sizes.heading')}
                    </h2>
                    <p className="text-text-secondary">
                        {t('sections.sizes.description')}
                    </p>
                    <div className="border-border/40 bg-surface/40 space-y-6 rounded-xl border p-6">
                        <div className="space-y-2">
                            <p className="text-text-secondary text-sm">
                                {t('sections.sizes.large')}
                            </p>
                            <UiBreadcrumbs
                                size="lg"
                                items={[
                                    { label: 'Dashboard' },
                                    { label: 'Settings' },
                                    { label: 'Profile' },
                                ]}
                            />
                        </div>

                        <div className="space-y-2">
                            <p className="text-text-secondary text-sm">
                                {t('sections.sizes.medium')}
                            </p>
                            <UiBreadcrumbs
                                size="md"
                                items={[
                                    { label: 'Dashboard' },
                                    { label: 'Settings' },
                                    { label: 'Profile' },
                                ]}
                            />
                        </div>

                        <div className="space-y-2">
                            <p className="text-text-secondary text-sm">
                                {t('sections.sizes.small')}
                            </p>
                            <UiBreadcrumbs
                                size="sm"
                                items={[
                                    { label: 'Dashboard' },
                                    { label: 'Settings' },
                                    { label: 'Profile' },
                                ]}
                            />
                        </div>
                    </div>
                </section>

                {/* Custom separator */}
                <section className="space-y-4">
                    <h2 className="text-text-primary text-2xl font-semibold">
                        {t('sections.separator.heading')}
                    </h2>
                    <p className="text-text-secondary">
                        {t('sections.separator.description')}
                    </p>
                    <div className="border-border/40 bg-surface/40 space-y-6 rounded-xl border p-6">
                        <div className="space-y-2">
                            <p className="text-text-secondary text-sm">
                                {t('sections.separator.slash')}
                            </p>
                            <UiBreadcrumbs
                                items={[
                                    { label: 'Home' },
                                    { label: 'Blog' },
                                    { label: 'Article' },
                                ]}
                                separator={
                                    <span className="text-neutral-400">/</span>
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <p className="text-text-secondary text-sm">
                                {t('sections.separator.dot')}
                            </p>
                            <UiBreadcrumbs
                                items={[
                                    { label: 'Home' },
                                    { label: 'Blog' },
                                    { label: 'Article' },
                                ]}
                                separator={
                                    <span className="text-neutral-400">•</span>
                                }
                            />
                        </div>
                    </div>
                </section>

                {/* Label truncation */}
                <section className="space-y-4">
                    <h2 className="text-text-primary text-2xl font-semibold">
                        {t('sections.truncation.heading')}
                    </h2>
                    <p className="text-text-secondary">
                        {t('sections.truncation.description')}
                    </p>
                    <div className="border-border/40 bg-surface/40 space-y-6 rounded-xl border p-6">
                        <div className="space-y-2">
                            <p className="text-text-secondary text-sm">
                                {t('sections.truncation.without')}
                            </p>
                            <UiBreadcrumbs
                                items={[
                                    { label: 'Home', href: '/' },
                                    { label: 'Very Long Category Name', href: '/category' },
                                    { label: 'Another Extremely Long Product Title Here' },
                                ]}
                            />
                        </div>

                        <div className="space-y-2">
                            <p className="text-text-secondary text-sm">
                                {t('sections.truncation.with')}
                            </p>
                            <UiBreadcrumbs
                                maxLabelLength={20}
                                items={[
                                    { label: 'Home', href: '/' },
                                    { label: 'Very Long Category Name', href: '/category' },
                                    { label: 'Another Extremely Long Product Title Here' },
                                ]}
                            />
                        </div>
                    </div>
                </section>

                {/* Long breadcrumb with collapse */}
                <section className="space-y-4">
                    <h2 className="text-text-primary text-2xl font-semibold">
                        {t('sections.collapse.heading')}
                    </h2>
                    <p className="text-text-secondary">
                        {t('sections.collapse.description')}
                    </p>
                    <div className="border-border/40 bg-surface/40 space-y-6 rounded-xl border p-6">
                        <div className="space-y-2">
                            <p className="text-text-secondary text-sm">
                                {t('sections.collapse.without')}
                            </p>
                            <UiBreadcrumbs
                                items={[
                                    { label: 'Home', href: '/' },
                                    { label: 'Products', href: '/products' },
                                    { label: 'Electronics', href: '/products/electronics' },
                                    { label: 'Computers', href: '/products/electronics/computers' },
                                    { label: 'Laptops', href: '/products/electronics/computers/laptops' },
                                    { label: 'Gaming' },
                                ]}
                            />
                        </div>

                        <div className="space-y-2">
                            <p className="text-text-secondary text-sm">
                                {t('sections.collapse.with')}
                            </p>
                            <UiBreadcrumbs
                                maxItems={4}
                                items={[
                                    { label: 'Home', href: '/' },
                                    { label: 'Products', href: '/products' },
                                    { label: 'Electronics', href: '/products/electronics' },
                                    { label: 'Computers', href: '/products/electronics/computers' },
                                    { label: 'Laptops', href: '/products/electronics/computers/laptops' },
                                    { label: 'Gaming' },
                                ]}
                            />
                        </div>
                    </div>
                </section>

                {/* Responsive collapse */}
                <section className="space-y-4">
                    <h2 className="text-text-primary text-2xl font-semibold">
                        {t('sections.responsive.heading')}
                    </h2>
                    <p className="text-text-secondary">
                        {t('sections.responsive.description')}
                    </p>
                    <div className="border-border/40 bg-surface/40 space-y-6 rounded-xl border p-6">
                        <div className="space-y-2">
                            <p className="text-text-secondary text-sm">
                                {t('sections.responsive.example')}
                            </p>
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
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
