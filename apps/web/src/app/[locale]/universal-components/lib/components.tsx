import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import UiButton from '@/shared/ui/UiButton/UiButton';
import UiSelectPreview from '../ui/UiSelectPreview';
import UiSwitchPreview from '../ui/UiSwitchPreview';
import UiInputPreview from '../ui/UiInputPreview';
import UiPasswordInputPreview from '../ui/UiPasswordInputPreview';
import UiTextareaPreview from '../ui/UiTextareaPreview';
import UiCheckboxPreview from '../ui/UiCheckboxPreview';
import UiCheckboxGroupPreview from '../ui/UiCheckboxGroupPreview';
import UiRadioGroupPreview from '../ui/UiRadioGroupPreview';
import UiModalPreview from '../ui/UiModalPreview';
import UiAlertPreview from '../ui/UiAlertPreview';
import UiTooltipPreview from '../ui/UiTooltipPreview';
import UiBreadcrumbsPreview from '../ui/UiBreadcrumbsPreview';
import UiDropdownPreview from '../ui/UiDropdownPreview';
import UiBadge from '@/shared/ui/UiBadge';
import UiTabsPreview from './previews/UiTabsPreview';
import UiPaginationPreview from '../ui/UiPaginationPreview';

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
                        {
                            label: t('components.select.options.option1'),
                            value: 'option1',
                        },
                        {
                            label: t('components.select.options.option2'),
                            value: 'option2',
                        },
                        {
                            label: t('components.select.options.option3'),
                            value: 'option3',
                        },
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
        {
            key: 'universal-input',
            name: t('components.input.name'),
            description: t('components.input.description'),
            githubUrl:
                'https://github.com/Arctic-Web-Agency/code-base/tree/feature/ui-components/apps/web/src/shared/ui/UiInput',
            preview: <UiInputPreview />,
        },
        {
            key: 'universal-password-input',
            name: t('components.password_input.name'),
            description: t('components.password_input.description'),
            githubUrl:
                'https://github.com/Arctic-Web-Agency/code-base/tree/feature/ui-components/apps/web/src/shared/ui/UiPasswordInput',
            preview: <UiPasswordInputPreview />,
        },
        {
            key: 'universal-textarea',
            name: t('components.textarea.name'),
            description: t('components.textarea.description'),
            githubUrl:
                'https://github.com/Arctic-Web-Agency/code-base/tree/feature/ui-components/apps/web/src/shared/ui/UiTextarea',
            preview: <UiTextareaPreview />,
        },
        {
            key: 'universal-checkbox',
            name: t('components.checkbox.name'),
            description: t('components.checkbox.description'),
            githubUrl:
                'https://github.com/Arctic-Web-Agency/code-base/tree/feature/ui-components/apps/web/src/shared/ui/UiCheckbox',
            preview: <UiCheckboxPreview />,
        },
        {
            key: 'universal-checkbox-group',
            name: t('components.checkbox_group.name'),
            description: t('components.checkbox_group.description'),
            githubUrl:
                'https://github.com/Arctic-Web-Agency/code-base/tree/feature/ui-components/apps/web/src/shared/ui/UiCheckboxGroup',
            preview: <UiCheckboxGroupPreview />,
        },
        {
            key: 'universal-radio-group',
            name: t('components.radio_group.name'),
            description: t('components.radio_group.description'),
            githubUrl:
                'https://github.com/Arctic-Web-Agency/code-base/tree/feature/ui-components/apps/web/src/shared/ui/UiRadioGroup',
            preview: <UiRadioGroupPreview />,
        },
        {
            key: 'universal-modal',
            name: t('components.modal.name'),
            description: t('components.modal.description'),
            githubUrl:
                'https://github.com/Arctic-Web-Agency/code-base/tree/feature/ui-components/apps/web/src/shared/ui/UiModal',
            preview: <UiModalPreview />,
        },
        {
            key: 'universal-badge',
            name: t('components.badge.name'),
            description: t('components.badge.description'),
            githubUrl:
                'https://github.com/Arctic-Web-Agency/code-base/tree/feature/ui-components/apps/web/src/shared/ui/UiBadge',
            preview: (
                <div className="flex flex-wrap gap-3">
                    <UiBadge status="success" variant="outline">
                        Success
                    </UiBadge>
                    <UiBadge status="error" dot>
                        Error
                    </UiBadge>
                    <UiBadge status="warning" dismissible>
                        Warning
                    </UiBadge>
                </div>
            ),
        },
        {
            key: 'universal-alert',
            name: t('components.alert.name'),
            description: t('components.alert.description'),
            githubUrl:
                'https://github.com/Arctic-Web-Agency/code-base/tree/feature/ui-components/apps/web/src/shared/ui/UiAlert',
            preview: <UiAlertPreview />,
        },
        {
            key: 'universal-tooltip',
            name: t('components.tooltip.name'),
            description: t('components.tooltip.description'),
            githubUrl:
                'https://github.com/Arctic-Web-Agency/code-base/tree/feature/ui-components/apps/web/src/shared/ui/UiTooltip',
            preview: <UiTooltipPreview />,
        },
        {
            key: 'universal-breadcrumbs',
            name: t('components.breadcrumbs.name'),
            description: t('components.breadcrumbs.description'),
            githubUrl:
                'https://github.com/Arctic-Web-Agency/code-base/tree/feature/ui-components/apps/web/src/shared/ui/UiBreadcrumbs',
            preview: <UiBreadcrumbsPreview />,
        },
        {
            key: 'universal-dropdown',
            name: t('components.dropdown.name'),
            description: t('components.dropdown.description'),
            githubUrl:
                'https://github.com/Arctic-Web-Agency/code-base/tree/feature/ui-components/apps/web/src/shared/ui/UiDropdown',
            preview: <UiDropdownPreview />,
        },
        {
            key: 'universal-tabs',
            name: t('components.tabs.name'),
            description: t('components.tabs.description'),
            githubUrl:
                'https://github.com/Arctic-Web-Agency/code-base/tree/feature/ui-components/apps/web/src/shared/ui/UiTabs',
            preview: <UiTabsPreview />,
        },
        {
            key: 'universal-pagination',
            name: t('components.pagination.name'),
            description: t('components.pagination.description'),
            githubUrl:
                'https://github.com/Arctic-Web-Agency/code-base/tree/feature/ui-components/apps/web/src/shared/ui/UiPagination',
            preview: <UiPaginationPreview />,
        },
    ];
}
