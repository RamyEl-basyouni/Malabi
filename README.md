# Malaaby - Sports Ground Booking App (Saudi Arabia)

A complete mobile application prototype for booking and reserving sports facilities in Saudi Arabia, built with React Native and NestJS.

## 🏗️ Architecture

- **Frontend**: React Native with Expo
- **Backend**: NestJS with TypeScript
- **Database**: SQLite (for prototype)
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation v6
- **Design**: Modern dark theme UI inspired by provided mockups

## 🚀 Features

### Frontend (React Native)
- **Home Screen**: Display upcoming bookings with date selector
- **Filter Screen**: Filter clubs by sport type, price range, distance, and ground type
- **Club Details Screen**: Show club details with grounds, facilities, reviews, and "Book Now" button
- **Booking Screen**: Interactive booking flow with date/time selection
- **Login Screen**: Authentication with demo credentials
- **Profile Screen**: User profile and settings

### Backend (NestJS)
- **Auth Module**: JWT-based authentication with login/register
- **Clubs Module**: CRUD operations for clubs and grounds with filtering
- **Bookings Module**: Create and manage bookings
- **Sample Data**: Pre-seeded with demo clubs and grounds

## 📋 API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Clubs
- `GET /clubs` - Get all clubs (with optional filters: sportType, priceRange, groundType)
- `GET /clubs/:id` - Get club details with grounds and reviews

### Bookings
- `POST /bookings` - Create new booking
- `GET /bookings/user/:userId` - Get user bookings
- `GET /bookings` - Get all bookings

## 🛠️ Installation & Setup

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd malaaby-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run start:dev
   ```
   Backend will run on `http://localhost:3000`

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd MalaabyApp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start Expo development server:
   ```bash
   npx expo start
   ```

## 🎯 Demo Flow

1. **User opens app** → Sees login screen with demo credentials
2. **Login/Guest access** → Navigates to home screen with sample bookings
3. **Filter clubs** → Filter by sport type (Football, Volleyball, Tennis) and price range
4. **View club details** → Tap club to see grounds, facilities, and reviews
5. **Book ground** → Select date, time, and confirm booking
6. **View bookings** → Check booking history in home screen

## 🎨 UI/UX

- Modern dark theme design
- Consistent navigation patterns
- Responsive layouts
- Interactive booking flow
- Loading states and error handling

## 🧪 Demo Credentials

For testing purposes:
- **Email**: demo@malaaby.com
- **Password**: password123

Or use "Continue as Guest" option.

## 📱 Sample Data

The app comes pre-loaded with:
- 5 Saudi sports complexes (Al Hilal Sports City, King Abdullah Sports City, etc.)
- 9 different grounds (Football, Tennis, Volleyball)
- Various ground types (Grass, Synthetic, Clay)
- Realistic Saudi pricing (SAR 90-350/hour)

## 🔧 Technology Stack

### Frontend
- React Native with Expo
- TypeScript
- Redux Toolkit (State Management)
- React Navigation (Navigation)
- Expo Vector Icons
- Axios (API calls)

### Backend
- NestJS Framework
- TypeScript
- TypeORM (Database ORM)
- SQLite (Database)
- JWT (Authentication)
- Passport (Authentication Strategy)
- bcryptjs (Password Hashing)

## 📂 Project Structure

```
├── MalaabyApp/                 # React Native Frontend
│   ├── src/
│   │   ├── navigation/         # Navigation setup
│   │   ├── screens/           # App screens
│   │   ├── store/             # Redux store & slices
│   │   └── ...
│   └── App.tsx
├── malaaby-backend/           # NestJS Backend
│   ├── src/
│   │   ├── auth/              # Authentication module
│   │   ├── clubs/             # Clubs module
│   │   ├── bookings/          # Bookings module
│   │   ├── entities/          # Database entities
│   │   └── ...
│   └── main.ts
└── README.md
```

## 🎯 MVP Goals Achieved

✅ Complete booking flow demonstration
✅ Modern UI matching provided mockups
✅ API integration with filtering
✅ Authentication system
✅ State management with Redux
✅ Navigation between screens
✅ Sample data for demonstration
✅ Responsive design

This prototype successfully demonstrates the core booking flow and provides a solid foundation for further development and management presentation.