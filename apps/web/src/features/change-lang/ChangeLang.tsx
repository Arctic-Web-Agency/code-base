'use client';

import { FC } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { UA, US } from 'country-flag-icons/react/3x2';
import { CLang } from '@acw/types';
import { IProps } from './types';
import UiSelect from '@/shared/ui/UiSelect';
import type { UiSelectOption } from '@/shared/ui/UiSelect';

const LANGS: UiSelectOption[] = [
    {
        label: (
            <div className="flex items-center gap-1.5">
                <US title="United States" className="h-5 w-7" />
                <span className="text-sm font-bold">Eng</span>
            </div>
        ),
        value: CLang.EN,
    },
    {
        label: (
            <div className="flex items-center gap-1.5">
                <UA title="Ukraine" className="h-5 w-7" />
                <span className="text-sm font-bold">Укр</span>
            </div>
        ),
        value: CLang.UK,
    },
];

const ChangeLang: FC<IProps> = ({ withoutText, expandTop }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const activeLocale = useLocale();

    const handleChangeLang = (value: string) => {
        const allSearchParams = searchParams.toString();
        const newPath = pathname.replace(`/${activeLocale}`, '');
        const newUrl = `/${value}${newPath}${allSearchParams ? `?${allSearchParams}` : ''}`;
        router.replace(newUrl);
    };

    return (
        <UiSelect
            label="Change language"
            options={LANGS}
            value={activeLocale}
            onChange={handleChangeLang}
            variant="outlined"
            size="sm"
        />
    );
};

export default ChangeLang;
