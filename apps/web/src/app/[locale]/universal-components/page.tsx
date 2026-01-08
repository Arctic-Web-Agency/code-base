import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import UiButton from '@/shared/ui/UiButton/UiButton';
import { GoBack } from '@/features/go-back';
import { fetchMetadata } from '@/shared/seo/metadata';
import { MetaProps } from '@/shared/types/settings';
import { getComponents } from './lib/components';

export async function generateMetadata(props: MetaProps): Promise<Metadata> {
    return await fetchMetadata({ ...props, page: 'universal_components', href: 'universal-components' });
}

export default function UniversalComponentsPage() {
    const t = useTranslations('universal_components_page');
    const components = getComponents(t);

    return (
        <main className="container flex min-h-screen flex-col gap-10 py-12">
            <GoBack className="w-fit" label={t('back_button')} />

            <header className="max-w-3xl space-y-4">
                <p className="text-text-secondary text-sm tracking-[0.25em] uppercase">
                    CodeBase
                </p>
                <h1 className="text-text-primary text-4xl font-semibold">
                    {t('heading')}
                </h1>
                <p className="text-text-secondary text-lg">{t('intro')}</p>
            </header>

            <section className="grid gap-6 lg:grid-cols-2">
                {components.map((component) => (
                    <article
                        key={component.key}
                        className="border-border/40 bg-surface/40 flex flex-col gap-6 rounded-2xl border p-6 shadow-lg"
                    >
                        <div className="space-y-3">
                            <h2 className="text-text-primary text-2xl font-semibold">
                                {component.name}
                            </h2>
                            <p className="text-text-secondary text-base">
                                {component.description}
                            </p>
                        </div>

                        <div className="w-fit">{component.preview}</div>

                        <UiButton
                            variant="text"
                            size="sm"
                            as="link"
                            external={true}
                            href={component.githubUrl}
                            className="mt-auto w-fit"
                        >
                            {t('github_label')}
                        </UiButton>
                    </article>
                ))}
            </section>
        </main>
    );
}
