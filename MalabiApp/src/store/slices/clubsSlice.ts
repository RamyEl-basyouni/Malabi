import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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

// Mock clubs data
const mockClubs: Club[] = [
  {
    id: 1,
    name: 'Al-Yasmine Sports Club',
    address: 'Al-Yasmine District, Riyadh',
    description: 'Premium sports facility with modern equipment and professional grounds',
    images: ['https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?w=400'],
    latitude: 24.7136,
    longitude: 46.6753,
    phone: '+966501234567',
    facilities: ['Parking', 'Changing Rooms', 'Cafeteria', 'Equipment Rental', 'Medical Room', 'VIP Lounge'],
    rating: 4.8,
    grounds: [
      {
        id: 1,
        name: 'Main Football Ground',
        sportType: 'football',
        groundType: 'grass',
        pricePerHour: 100,
        images: ['https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?w=400'],
        capacity: 22
      },
      {
        id: 2,
        name: 'Secondary Football Field',
        sportType: 'football',
        groundType: 'synthetic',
        pricePerHour: 80,
        images: ['https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?w=400'],
        capacity: 14
      },
      {
        id: 3,
        name: 'Volleyball Court 1',
        sportType: 'volleyball',
        groundType: 'synthetic',
        pricePerHour: 60,
        images: ['https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?w=400'],
        capacity: 12
      },
      {
        id: 4,
        name: 'Tennis Court Premium',
        sportType: 'tennis',
        groundType: 'clay',
        pricePerHour: 120,
        images: ['https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?w=400'],
        capacity: 4
      }
    ]
  },
  {
    id: 2,
    name: 'King Fahd Sports City',
    address: 'King Fahd Road, Riyadh',
    description: 'World-class sports complex with international standard facilities',
    images: ['https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400'],
    latitude: 24.7234,
    longitude: 46.6834,
    phone: '+966509876543',
    facilities: ['Olympic Pool', 'Running Track', 'Gym', 'Parking', 'Restaurants', 'Medical Center'],
    rating: 4.6,
    grounds: [
      {
        id: 5,
        name: 'Stadium Football Pitch',
        sportType: 'football',
        groundType: 'grass',
        pricePerHour: 150,
        images: ['https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?w=400'],
        capacity: 22
      },
      {
        id: 6,
        name: 'Practice Football Field',
        sportType: 'football',
        groundType: 'synthetic',
        pricePerHour: 100,
        images: ['https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?w=400'],
        capacity: 18
      },
      {
        id: 7,
        name: 'Volleyball Arena',
        sportType: 'volleyball',
        groundType: 'synthetic',
        pricePerHour: 90,
        images: ['https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?w=400'],
        capacity: 12
      }
    ]
  },
  {
    id: 3,
    name: 'Prince Faisal Stadium',
    address: 'Al-Malaz District, Riyadh',
    description: 'Historic stadium with modern renovations and excellent facilities',
    images: ['https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=400'],
    latitude: 24.6877,
    longitude: 46.7219,
    phone: '+966512345678',
    facilities: ['VIP Boxes', 'Press Room', 'Player Lounges', 'Parking', 'Security', 'Food Courts'],
    rating: 4.7,
    grounds: [
      {
        id: 8,
        name: 'Main Stadium Pitch',
        sportType: 'football',
        groundType: 'grass',
        pricePerHour: 200,
        images: ['https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?w=400'],
        capacity: 22
      },
      {
        id: 9,
        name: 'Training Ground Alpha',
        sportType: 'football',
        groundType: 'synthetic',
        pricePerHour: 120,
        images: ['https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?w=400'],
        capacity: 16
      },
      {
        id: 10,
        name: 'Professional Tennis Court',
        sportType: 'tennis',
        groundType: 'clay',
        pricePerHour: 100,
        images: ['https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?w=400'],
        capacity: 4
      }
    ]
  },
  {
    id: 4,
    name: 'Al-Nasr Sports Club',
    address: 'Al-Nasr District, Riyadh',
    description: 'Community-focused sports club with affordable rates and quality facilities',
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'],
    latitude: 24.7456,
    longitude: 46.6789,
    phone: '+966523456789',
    facilities: ['Cafeteria', 'Changing Rooms', 'Equipment Storage', 'Parking', 'First Aid'],
    rating: 4.5,
    grounds: [
      {
        id: 11,
        name: 'Community Football Field',
        sportType: 'football',
        groundType: 'synthetic',
        pricePerHour: 70,
        images: ['https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?w=400'],
        capacity: 18
      },
      {
        id: 12,
        name: 'Youth Football Pitch',
        sportType: 'football',
        groundType: 'grass',
        pricePerHour: 90,
        images: ['https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?w=400'],
        capacity: 14
      },
      {
        id: 13,
        name: 'Volleyball Court Central',
        sportType: 'volleyball',
        groundType: 'synthetic',
        pricePerHour: 50,
        images: ['https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?w=400'],
        capacity: 10
      },
      {
        id: 14,
        name: 'Tennis Court Basic',
        sportType: 'tennis',
        groundType: 'synthetic',
        pricePerHour: 60,
        images: ['https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?w=400'],
        capacity: 4
      }
    ]
  },
  {
    id: 5,
    name: 'Green Valley Sports Complex',
    address: 'Al-Olaya District, Riyadh',
    description: 'Modern sports complex with eco-friendly design and premium amenities',
    images: ['https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400'],
    latitude: 24.6945,
    longitude: 46.6857,
    phone: '+966534567890',
    facilities: ['Solar Power', 'Eco-Friendly Materials', 'Spa', 'Juice Bar', 'Parking', 'Yoga Studio'],
    rating: 4.4,
    grounds: [
      {
        id: 15,
        name: 'Eco Tennis Court 1',
        sportType: 'tennis',
        groundType: 'clay',
        pricePerHour: 85,
        images: ['https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?w=400'],
        capacity: 4
      },
      {
        id: 16,
        name: 'Eco Tennis Court 2',
        sportType: 'tennis',
        groundType: 'synthetic',
        pricePerHour: 75,
        images: ['https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?w=400'],
        capacity: 4
      },
      {
        id: 17,
        name: 'Green Volleyball Arena',
        sportType: 'volleyball',
        groundType: 'synthetic',
        pricePerHour: 65,
        images: ['https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?w=400'],
        capacity: 12
      }
    ]
  }
];

export const fetchClubs = createAsyncThunk(
  'clubs/fetchClubs',
  async (filters?: {
    sportType?: string;
    minPrice?: number;
    maxPrice?: number;
    groundType?: string;
  }) => {
    console.log('🏢 Fetching fake clubs with filters:', filters);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    let filteredClubs = [...mockClubs];

    // Apply filters
    if (filters?.sportType) {
      filteredClubs = filteredClubs.filter(club =>
        club.grounds.some(ground => ground.sportType === filters.sportType)
      );
    }

    if (filters?.minPrice || filters?.maxPrice) {
      filteredClubs = filteredClubs.filter(club =>
        club.grounds.some(ground => {
          const price = ground.pricePerHour;
          return (!filters.minPrice || price >= filters.minPrice) &&
                 (!filters.maxPrice || price <= filters.maxPrice);
        })
      );
    }

    console.log('✅ Returning', filteredClubs.length, 'fake clubs');
    return filteredClubs;
  }
);

export const fetchClubDetails = createAsyncThunk(
  'clubs/fetchClubDetails',
  async (clubId: number) => {
    console.log('🏢 Fetching fake club details for:', clubId);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const club = mockClubs.find(c => c.id === clubId);
    if (!club) {
      throw new Error('Club not found');
    }

    console.log('✅ Returning fake club:', club.name);
    return club;
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