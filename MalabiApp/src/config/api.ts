import { Platform } from 'react-native';

// API Configuration
const getBaseUrl = () => {
  if (__DEV__) {
    // In development, use your machine's IP address
    // Replace this with your actual IP address
    return Platform.OS === 'android'
      ? 'http://10.0.2.2:3000' // Android emulator
      : 'http://172.20.10.4:3000'; // iOS simulator or physical device
  }

  // In production, use your deployed backend URL
  return 'https://your-production-api.com';
};

export const API_BASE_URL = getBaseUrl();

console.log('API Base URL:', API_BASE_URL);