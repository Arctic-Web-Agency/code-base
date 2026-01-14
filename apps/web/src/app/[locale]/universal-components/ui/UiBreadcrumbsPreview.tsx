import UiButton from '@/shared/ui/UiButton/UiButton';
import { useTranslations } from 'next-intl';

export default function UiBreadcrumbsPreview() {
    const t = useTranslations('previews.breadcrumbs');

    return (
        <UiButton
            as="link"
            href="/universal-components/breadcrumbs"
            variant="filled"
            size="md"
        >
            {t('view_examples')}
        </UiButton>
    );
}
