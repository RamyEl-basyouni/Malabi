import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import clubsSlice from './slices/clubsSlice';
import bookingsSlice from './slices/bookingsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    clubs: clubsSlice,
    bookings: bookingsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;