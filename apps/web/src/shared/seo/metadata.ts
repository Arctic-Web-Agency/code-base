import { Metadata } from 'next';
import { MetaProps } from '@/shared/types/settings';
import { LANG } from '@acw/types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

if (!BASE_URL) {
    throw new Error('❌ NEXT_PUBLIC_BASE_URL is not defined');
}

export async function fetchMetadata({
    params,
    page,
    href,
    meta,
}: MetaProps): Promise<Metadata> {
    let locale: string;

    try {
        const resolved = await params;
        locale = resolved?.locale;
        if (!locale) throw new Error('Locale is missing in params');
    } catch (error) {
        console.error('❌ Failed to resolve locale from params:', error);
        locale = LANG.UK;
    }

    let title = 'Створення та розробка сайтів під ключ – Arctic Web';
    let description =
        'ArcticWeb є лідером у сфері розробки веб-сайтів та веб-додатків. Ми створюємо індивідуальні, ефективні та надійні рішення, що відповідають усім потребам вашого бізнесу.';

    if (page === null) {
        if (meta) {
            title = meta.title;
            description = meta.description;
        }
    } else {
        const raw = String(locale ?? '').toLowerCase();
        const normalized = /^[a-z]{2}(-[a-z]{2})?$/i.test(raw) ? raw : LANG.UK;

        async function importMessages(loc: string) {
            try {
                const mod = await import(`../../../messages/${loc}.json`);
                return (mod as any).default ?? mod;
            } catch {
                if (loc !== LANG.UK) {
                    const modUk = await import(
                        `../../../messages/${LANG.UK}.json`
                    );
                    return (modUk as any).default ?? modUk;
                }
                return {};
            }
        }

        const messages: any = await importMessages(normalized);
        const metaT = (key: string) => messages?.[key] ?? {};

        title = metaT(`${page}_page`)?.head?.title ?? title;
        description = metaT(`${page}_page`)?.head?.description ?? description;
    }

    const path = href === 'welcome' ? '' : `/${href}`;

    return {
        title,
        description,
        alternates: {
            canonical: `${BASE_URL}/${locale}${path}`,
            languages: {
                'x-default': `${BASE_URL}/uk${path}`,
                'uk-ua': `${BASE_URL}/uk${path}`,
                'en-ua': `${BASE_URL}/en${path}`,
            },
        },
    };
}
