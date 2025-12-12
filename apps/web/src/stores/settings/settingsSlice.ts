import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { THEME, Theme } from '@/shared/types/settings';
import { SettingsState } from '@/stores/settings/types';

const initialState: SettingsState = {
    theme: THEME.DARK,
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<Theme>) => {
            state.theme = action.payload;
        },
    },
});

export const { setTheme } = settingsSlice.actions;

export default settingsSlice.reducer;
