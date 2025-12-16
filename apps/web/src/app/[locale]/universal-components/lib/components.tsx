import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import UiButton from '@/shared/ui/UiButton/UiButton';
import UiSelectPreview from '../ui/UiSelectPreview';
import UiSwitchPreview from '../ui/UiSwitchPreview';

export interface ComponentItem {
    key: string;
    name: string;
    description: string;
    githubUrl: string;
    preview: ReactNode;
}

export function getComponents(
    t: ReturnType<typeof useTranslations<'universal_components_page'>>
): ComponentItem[] {
    return [
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
        {
            key: 'universal-switch',
            name: t('components.switch.name'),
            description: t('components.switch.description'),
            githubUrl:
                'https://github.com/Arctic-Web-Agency/code-base/tree/feature/ui-components/apps/web/src/shared/ui/UiSwitch',
            preview: <UiSwitchPreview />,
        },
    ];
}
