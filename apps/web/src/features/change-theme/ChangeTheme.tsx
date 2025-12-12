'use client';

import { FC, useEffect } from 'react';
import { CTheme, TTheme } from '@/shared/types/settings';
import { SunIcon, MoonIcon } from '@/shared/icons';
import UiSwitch from '@/shared/ui/UiSwitch';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { selectTheme, setTheme } from '@/stores/settings';

const ChangeTheme: FC = () => {
    const dispatch = useAppDispatch();
    const theme = useAppSelector(selectTheme);

    const handleToggleTheme = () => {
        const newTheme = theme === CTheme.LIGHT ? CTheme.DARK : CTheme.LIGHT;
        dispatch(setTheme(newTheme));
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        document.documentElement.classList.remove(theme);
        document.documentElement.classList.add(newTheme);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            dispatch(setTheme(savedTheme as TTheme));
            document.documentElement.setAttribute('data-theme', savedTheme);
            document.documentElement.classList.add(savedTheme);
        } else {
            const prefersDark = window.matchMedia(
                '(prefers-color-scheme: dark)'
            ).matches;
            const defaultTheme = prefersDark ? CTheme.DARK : CTheme.LIGHT;
            dispatch(setTheme(defaultTheme));
            document.documentElement.setAttribute('data-theme', defaultTheme);
            document.documentElement.classList.add(defaultTheme);
        }
    }, [dispatch]);

    return (
        <>
            <UiSwitch
                id="theme-switcher"
                name="theme-switcher"
                checked={theme === CTheme.DARK}
                onChange={handleToggleTheme}
            >
                <SunIcon className="h-5 w-5 text-text-primary transition-all duration-300" />
                <MoonIcon className="h-5 w-5 text-text-primary transition-all duration-300" />
            </UiSwitch>
        </>
    );
};

export default ChangeTheme;
