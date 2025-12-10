import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';
import UiButton from '@/shared/ui/UiButton/UiButton';
import { fetchMetadata } from '@/shared/seo/metadata';
import { IMetaProps } from '@/shared/types/settings';

export async function generateMetadata(props: IMetaProps): Promise<Metadata> {
    return await fetchMetadata({ ...props, page: 'universal_components', href: 'universal-components' });
}

interface ComponentItem {
    key: string;
    name: string;
    description: string;
    githubUrl: string;
    preview: ReactNode;
}

export default function UniversalComponentsPage() {
    const t = useTranslations('universal_components_page');

    const components: ComponentItem[] = [
        {
            key: 'universal-button',
            name: t('components.button.name'),
            description: t('components.button.description'),
            githubUrl: 'https://github.com/KhOlAn/code-base/tree/main/apps/web/src/shared/ui/UiButton',
            preview: (
                <UiButton variant="primary" size="md">
                    {t('components.button.preview')}
                </UiButton>
            ),
        },
    ];

    return (
        <main className="container flex min-h-screen flex-col gap-10 py-12">
            <header className="max-w-3xl space-y-4">
                <p className="text-sm uppercase tracking-[0.25em] text-graphite">CodeBase</p>
                <h1 className="text-4xl font-semibold text-snow">{t('heading')}</h1>
                <p className="text-lg text-graphite">{t('intro')}</p>
            </header>

            <section className="grid gap-6 lg:grid-cols-2">
                {components.map((component) => (
                    <article
                        key={component.key}
                        className="flex flex-col gap-6 rounded-2xl border border-graphite/40 bg-ash/40 p-6 shadow-lg backdrop-blur"
                    >
                        <div className="space-y-3">
                            <h2 className="text-2xl font-semibold text-snow">{component.name}</h2>
                            <p className="text-base text-graphite">{component.description}</p>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="rounded-xl border border-graphite/40 bg-onyx p-4 shadow-inner">
                                {component.preview}
                            </div>

                            <a
                                className="text-sm font-semibold text-ocean transition-colors duration-200 hover:text-ocean/80"
                                href={component.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {t('github_label')}
                            </a>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    );
}
