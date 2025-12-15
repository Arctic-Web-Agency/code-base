'use client';

import { useRouter } from 'next/navigation';
import UiButton from '@/shared/ui/UiButton/UiButton';

interface GoBackProps {
    label: string;
    fallbackHref?: string;
    className?: string;
}

export default function GoBack({ label, fallbackHref = '/', className }: GoBackProps) {
    const router = useRouter();

    const handleBack = () => {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.push(fallbackHref);
        }
    };

    return (
        <UiButton
            variant="text"
            size="sm"
            onClick={handleBack}
            className={className}
            aria-label={label}
        >
            ← {label}
        </UiButton>
    );
}
