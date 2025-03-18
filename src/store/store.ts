import { configureStore } from "@reduxjs/toolkit";
import { authReducers } from "./features/auth/auth.slice";

export const store = configureStore({
    reducer: {
        auth: authReducers,
    }
});

// Define the RootState type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;