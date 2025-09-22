import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

// Mock users data
const mockUsers = [
  {
    id: 1,
    name: 'Mohammed Al-Rashid',
    email: 'demo@malaaby.com',
    phone: '+966501234567',
  },
  {
    id: 2,
    name: 'Ahmed Khalil',
    email: 'test@example.com',
    phone: '+966509876543',
  },
];

// Fake login function that simulates API call
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }) => {
    console.log('🔐 Fake login attempt for:', email);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check credentials
    const user = mockUsers.find(u => u.email === email);

    if (!user || password !== 'password123') {
      throw new Error('Invalid email or password');
    }

    const mockResponse = {
      access_token: 'fake-jwt-token-' + Date.now(),
      user: user,
    };

    console.log('✅ Fake login successful for:', user.name);
    return mockResponse;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.access_token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;