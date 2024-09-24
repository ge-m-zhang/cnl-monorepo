import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,  // Register the API slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),  // Add the API middleware
});

//!
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;