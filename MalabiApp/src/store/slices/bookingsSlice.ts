import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../../config/api';
import { Club, Ground } from './clubsSlice';

export interface Booking {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  ground: Ground & { club: Club };
}

interface BookingsState {
  bookings: Booking[];
  isLoading: boolean;
  error: string | null;
}

const initialState: BookingsState = {
  bookings: [],
  isLoading: false,
  error: null,
};

export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (bookingData: {
    userId: number;
    groundId: number;
    date: string;
    startTime: string;
    endTime: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      throw new Error('Failed to create booking');
    }

    return response.json();
  }
);

export const fetchUserBookings = createAsyncThunk(
  'bookings/fetchUserBookings',
  async (userId: number) => {
    const response = await fetch(`${API_BASE_URL}/bookings/user/${userId}`);
    return response.json();
  }
);

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookings.unshift(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to create booking';
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.bookings = action.payload;
      });
  },
});

export const { clearError } = bookingsSlice.actions;
export default bookingsSlice.reducer;