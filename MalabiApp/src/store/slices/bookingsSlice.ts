import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Club {
  id: number;
  name: string;
  address: string;
  images: string[];
  rating: number;
}

export interface Ground {
  id: number;
  name: string;
  pricePerHour: number;
  images: string[];
  club: Club;
}

export interface Booking {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  ground: Ground;
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

// Mock bookings data
const mockBookings: Booking[] = [
  {
    id: 1,
    date: '2025-09-21',
    startTime: '14:00',
    endTime: '16:00',
    totalPrice: 200,
    status: 'confirmed',
    ground: {
      id: 1,
      name: 'Main Football Ground',
      pricePerHour: 100,
      images: ['https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?w=400'],
      club: {
        id: 1,
        name: 'Al-Yasmine Sports Club',
        address: 'Al-Yasmine District, Riyadh',
        images: ['https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?w=400'],
        rating: 4.5,
      }
    }
  },
  {
    id: 2,
    date: '2025-09-22',
    startTime: '18:00',
    endTime: '20:00',
    totalPrice: 160,
    status: 'pending',
    ground: {
      id: 2,
      name: 'Tennis Court A',
      pricePerHour: 80,
      images: ['https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400'],
      club: {
        id: 2,
        name: 'Abn Alhajib Tennis Center',
        address: 'Al-Yasmine District, Riyadh',
        images: ['https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?w=400'],
        rating: 4.2,
      }
    }
  }
];

export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (bookingData: {
    userId: number;
    groundId: number;
    date: string;
    startTime: string;
    endTime: string;
    ground: {
      id: number;
      name: string;
      pricePerHour: number;
      images: string[];
      sportType?: string;
      groundType?: string;
      capacity?: number;
    };
    club: {
      id: number;
      name: string;
      address: string;
      images: string[];
      rating: number;
    };
    totalPrice: number;
  }) => {
    console.log('🏈 Creating booking:', bookingData);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newBooking: Booking = {
      id: Date.now(),
      date: bookingData.date,
      startTime: bookingData.startTime,
      endTime: bookingData.endTime,
      totalPrice: bookingData.totalPrice,
      status: 'confirmed',
      ground: {
        id: bookingData.ground.id,
        name: bookingData.ground.name,
        pricePerHour: bookingData.ground.pricePerHour,
        images: bookingData.ground.images,
        club: {
          id: bookingData.club.id,
          name: bookingData.club.name,
          address: bookingData.club.address,
          images: bookingData.club.images,
          rating: bookingData.club.rating,
        }
      },
    };

    console.log('✅ Booking created:', newBooking.id);
    return newBooking;
  }
);

export const fetchUserBookings = createAsyncThunk(
  'bookings/fetchUserBookings',
  async (userId: number) => {
    console.log('📅 Fetching fake bookings for user:', userId);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    console.log('✅ Returning', mockBookings.length, 'fake bookings');
    return mockBookings;
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
        // Only replace bookings if we don't have any session bookings yet
        // This preserves bookings created during the current session
        if (state.bookings.length === 0) {
          state.bookings = action.payload;
        }
      });
  },
});

export const { clearError } = bookingsSlice.actions;
export default bookingsSlice.reducer;