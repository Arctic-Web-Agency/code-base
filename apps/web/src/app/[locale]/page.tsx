import { useLocale, useTranslations } from 'next-intl';
import { Metadata } from 'next';
import { fetchMetadata } from '@/shared/seo/metadata';
import { IMetaProps } from '@/shared/types/settings';
import UiButton from '@/shared/ui/UiButton/UiButton';

export async function generateMetadata(props: IMetaProps): Promise<Metadata> {
    return await fetchMetadata({ ...props, page: 'welcome', href: 'welcome' });
}

export default function HomePage() {
    const locale = useLocale();
    const welcomeT = useTranslations('welcome_page');

    return (
        <main className="container flex h-full min-h-screen flex-col justify-center gap-6 py-12">
            <p className="text-sm uppercase tracking-[0.25em] text-text-secondary">CodeBase</p>
            <h1 className="text-4xl font-semibold text-text-primary">{welcomeT('heading')}</h1>
            <p className="max-w-2xl text-lg text-text-secondary">{welcomeT('description')}</p>

            <div className="flex flex-wrap items-center gap-4">
                <UiButton as="link" href={`/${locale}/universal-components`} size="lg">
                    {welcomeT('cta')}
                </UiButton>
            </div>
        </main>
    );
}
