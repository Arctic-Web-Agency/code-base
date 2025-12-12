import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';
import UiButton from '@/shared/ui/UiButton/UiButton';
import BackButton from '@/shared/ui/BackButton/BackButton';
import UiSelectPreview from './UiSelectPreview';
import { fetchMetadata } from '@/shared/seo/metadata';
import { MetaProps } from '@/shared/types/settings';

export async function generateMetadata(props: MetaProps): Promise<Metadata> {
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
            githubUrl:
                'https://github.com/Arctic-Web-Agency/code-base/tree/feature/ui-components/apps/web/src/shared/ui/UiButton',
            preview: (
                <UiButton variant="filled" size="md" className="font-semibold">
                    {t('components.button.preview')}
                </UiButton>
            ),
        },
        {
            key: 'universal-select',
            name: t('components.select.name'),
            description: t('components.select.description'),
            githubUrl:
                'https://github.com/Arctic-Web-Agency/code-base/tree/feature/ui-components/apps/web/src/shared/ui/UiSelect',
            preview: (
                <UiSelectPreview
                    options={[
                        { label: t('components.select.options.option1'), value: 'option1' },
                        { label: t('components.select.options.option2'), value: 'option2' },
                        { label: t('components.select.options.option3'), value: 'option3' },
                    ]}
                />
            ),
        },
    ];

    return (
        <main className="container flex min-h-screen flex-col gap-10 py-12">
            <BackButton className="w-fit" label={t('back_button')} />

            <header className="max-w-3xl space-y-4">
                <p className="text-sm uppercase tracking-[0.25em] text-text-secondary">CodeBase</p>
                <h1 className="text-4xl font-semibold text-text-primary">{t('heading')}</h1>
                <p className="text-lg text-text-secondary">{t('intro')}</p>
            </header>

            <section className="grid gap-6 lg:grid-cols-2">
                {components.map((component) => (
                    <article
                        key={component.key}
                        className="flex flex-col gap-6 rounded-2xl border border-border/40 bg-surface/40 p-6 shadow-lg backdrop-blur"
                    >
                        <div className="space-y-3">
                            <h2 className="text-2xl font-semibold text-text-primary">{component.name}</h2>
                            <p className="text-base text-text-secondary">{component.description}</p>
                        </div>

                        <div className="flex flex-col items-start gap-4">
                            {component.preview}

                            <UiButton
                                variant="text"
                                size="sm"
                                as="link"
                                external={true}
                                href={component.githubUrl}
                            >
                                {t('github_label')}
                            </UiButton>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    );
}
