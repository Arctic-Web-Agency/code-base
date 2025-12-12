import { defineRouting } from 'next-intl/routing';
import { LANG } from '@acw/types';

export const routing = defineRouting({
    locales: Object.values(LANG),

    defaultLocale: LANG.UK,
});
