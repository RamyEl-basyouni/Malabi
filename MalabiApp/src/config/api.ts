import { Platform } from 'react-native';

// API Configuration
const getBaseUrl = () => {
  if (__DEV__) {
    // In development, use localhost for web and proper IPs for mobile
    if (Platform.OS === 'web') {
      return 'http://localhost:3001'; // Web development
    }
    return Platform.OS === 'android'
      ? 'http://10.0.2.2:3001' // Android emulator
      : 'http://localhost:3001'; // iOS simulator or physical device
  }

  // In production, use your deployed backend URL
  return 'https://your-production-api.com';
};

export const API_BASE_URL = getBaseUrl();

console.log('API Base URL:', API_BASE_URL);