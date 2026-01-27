import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from '@/stores/settings';
import authReducer from '@/stores/auth';

export const store = configureStore({
    reducer: {
        settings: settingsReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
