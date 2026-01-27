'use client';

import { useState } from 'react';
import UiModal from '@/shared/ui/UiModal';
import UiButton from '@/shared/ui/UiButton';
import { useTranslations } from 'next-intl';

export default function UiModalPreview() {
    const t = useTranslations('previews.modal');
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <UiButton onClick={() => setIsOpen(true)}>
                {t('open_button')}
            </UiButton>

            <UiModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={t('title')}
                size="md"
                footer={
                    <div className="flex justify-end gap-3">
                        <UiButton
                            variant="text"
                            onClick={() => setIsOpen(false)}
                        >
                            {t('cancel_button')}
                        </UiButton>
                        <UiButton
                            variant="filled"
                            onClick={() => setIsOpen(false)}
                        >
                            {t('confirm_button')}
                        </UiButton>
                    </div>
                }
            >
                <p className="text-neutral-700 dark:text-neutral-300">
                    {t('content')}
                </p>
            </UiModal>
        </>
    );
}
