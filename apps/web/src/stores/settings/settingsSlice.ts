import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CTheme, TTheme } from '@/shared/types/settings';
import { SettingsState } from '@/stores/settings/types';

const initialState: SettingsState = {
    theme: CTheme.DARK,
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<TTheme>) => {
            state.theme = action.payload;
        },
    },
});

export const { setTheme } = settingsSlice.actions;

export default settingsSlice.reducer;
