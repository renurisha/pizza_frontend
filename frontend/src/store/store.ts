import { configureStore } from "@reduxjs/toolkit";
import appStoreReducer from "store/appSlice";

import { apiSlice } from "store/apiSlice";

export const store = configureStore({
    reducer: {
        appStore: appStoreReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the 'RootState' and 'AppDispatch' types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
