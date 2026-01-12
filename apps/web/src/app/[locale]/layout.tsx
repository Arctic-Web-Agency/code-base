import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Mulish } from 'next/font/google';
import '@/app/globals.css';
import { PageParams } from '@/shared/types/settings';
import StoreProvider from '@/stores/providers/StoreProvider';
import { Header } from '@/widgets/header';
import { UiAlertProvider } from '@/shared/ui/UiAlert';
import { UiTooltipProvider } from '@/shared/ui/UiTooltip';

const setInitialTheme = `
    (function() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            document.documentElement.classList.add(savedTheme);
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const defaultTheme = prefersDark ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', defaultTheme);
            document.documentElement.classList.add(defaultTheme);
        }
    })();
`;

const mulish = Mulish({
    subsets: ['cyrillic', 'latin'],
    weight: ['300', '400', '700'],
});

interface LocaleLayoutProps extends PageParams {
    children: ReactNode;
}

export default async function LocaleLayout({
    children,
    params,
}: LocaleLayoutProps) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    return (
        <html lang={locale} suppressHydrationWarning>
            <head>
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
            </head>

            <body className={`${mulish.className} bg-background text-text-primary`}>
                <NextIntlClientProvider>
                    <StoreProvider>
                        <UiTooltipProvider>
                            <UiAlertProvider>
                                <Header />
                                {children}
                            </UiAlertProvider>
                        </UiTooltipProvider>
                    </StoreProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
