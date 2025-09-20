# Testing Instructions

## 🚀 Quick Start

### Backend (NestJS)
The backend is running on port 3000 with demo data pre-loaded.

**Demo User Credentials:**
- **Name**: Ahmed Al-Rashid
- **Email**: `demo@malaaby.com`
- **Password**: `password123`
- **Phone**: +966501234567

### Frontend (React Native/Expo)
The frontend is running on port 8082.

## 🧪 Testing the Authentication

### Backend API Test (Direct)
You can test the login endpoint directly:

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@malaaby.com","password":"password123"}'
```

Expected response:
```json
{
  "access_token": "eyJ...",
  "user": {
    "id": 1,
    "name": "Ahmed Al-Rashid",
    "email": "demo@malaaby.com",
    "phone": "+966501234567"
  }
}
```

### Frontend App Test

1. **Open the Expo App:**
   - Install Expo Go on your phone/simulator
   - Scan the QR code from the terminal or go to `http://localhost:8082` in your browser

2. **Login Process:**
   - The app opens with a login screen
   - Use credentials: `demo@malaaby.com` / `password123`
   - Or tap "Continue as Guest"

3. **Troubleshooting Network Issues:**

If you get "Network Error" or "Invalid credentials":

**For iOS Simulator:**
- The API is configured to use your machine's IP: `172.20.10.4:3000`
- Check that your backend is accessible at this IP

**For Android Emulator:**
- The API uses `10.0.2.2:3000` (Android's special IP for host machine)

**For Physical Device:**
- Make sure your phone and computer are on the same WiFi network
- The app will use your computer's IP address

## 🔧 API Configuration

The app automatically detects the platform and uses the appropriate backend URL:

- **Android Emulator**: `http://10.0.2.2:3000`
- **iOS Simulator/Physical Device**: `http://172.20.10.4:3000`

## 📱 Testing Flow

1. **Login Screen** → Enter demo credentials or continue as guest
2. **Home Screen** → View booking list (empty for new user)
3. **Filter Screen** → Browse available clubs and grounds
4. **Club Details** → Tap a club to see details and available grounds
5. **Booking Screen** → Select date/time and confirm booking
6. **Back to Home** → See your new booking in the list

## 🐛 Common Issues

### "Invalid email or password"
- Make sure the backend is running (`npm run start:dev` in malaaby-backend)
- Check that the demo user was created (look for "Demo user created" in backend logs)
- Verify API URL in console logs

### "Network Error"
- Check that both services are running on correct ports
- Verify your machine's IP address matches the config
- Try using "Continue as Guest" to test the UI without authentication

### App won't load
- Make sure Expo is running on port 8082
- Try refreshing the Expo app
- Check for any error messages in the Expo console

## 🎯 Expected Demo Experience

1. User logs in with demo credentials
2. App loads with modern dark theme UI
3. User can filter clubs by sport type (Football, Volleyball, Tennis)
4. User can view club details with grounds and facilities
5. User can book a ground with date/time selection
6. Booking appears in user's booking history
7. All data persists in SQLite database

## 🌐 API Endpoints Available

- `GET /clubs` - List all clubs with optional filters
- `GET /clubs/:id` - Get club details
- `POST /auth/login` - User authentication
- `POST /bookings` - Create booking
- `GET /bookings/user/:userId` - Get user bookings

All endpoints are working and pre-loaded with sample data!