import { RootState } from '@/stores/store';

export const selectTheme = (state: RootState) => state.settings.theme;
