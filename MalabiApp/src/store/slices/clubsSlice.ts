import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../../config/api';

export interface Ground {
  id: number;
  name: string;
  sportType: 'football' | 'volleyball' | 'tennis';
  groundType: 'grass' | 'synthetic' | 'clay';
  pricePerHour: number;
  images: string[];
  capacity: number;
}

export interface Club {
  id: number;
  name: string;
  address: string;
  description: string;
  images: string[];
  latitude: number;
  longitude: number;
  phone: string;
  facilities: string[];
  rating: number;
  grounds: Ground[];
}

interface ClubsState {
  clubs: Club[];
  selectedClub: Club | null;
  filters: {
    sportType?: 'football' | 'volleyball' | 'tennis';
    priceRange?: { min: number; max: number };
    groundType?: 'grass' | 'synthetic' | 'clay';
  };
  isLoading: boolean;
  error: string | null;
}

const initialState: ClubsState = {
  clubs: [],
  selectedClub: null,
  filters: {},
  isLoading: false,
  error: null,
};

export const fetchClubs = createAsyncThunk(
  'clubs/fetchClubs',
  async (filters?: {
    sportType?: string;
    minPrice?: number;
    maxPrice?: number;
    groundType?: string;
  }) => {
    const params = new URLSearchParams();
    if (filters?.sportType) params.append('sportType', filters.sportType);
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters?.groundType) params.append('groundType', filters.groundType);

    const response = await fetch(`${API_BASE_URL}/clubs?${params}`);
    return response.json();
  }
);

export const fetchClubDetails = createAsyncThunk(
  'clubs/fetchClubDetails',
  async (clubId: number) => {
    const response = await fetch(`${API_BASE_URL}/clubs/${clubId}`);
    return response.json();
  }
);

const clubsSlice = createSlice({
  name: 'clubs',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    clearSelectedClub: (state) => {
      state.selectedClub = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClubs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchClubs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.clubs = action.payload;
      })
      .addCase(fetchClubs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch clubs';
      })
      .addCase(fetchClubDetails.fulfilled, (state, action) => {
        state.selectedClub = action.payload;
      });
  },
});

export const { setFilters, clearSelectedClub } = clubsSlice.actions;
export default clubsSlice.reducer;