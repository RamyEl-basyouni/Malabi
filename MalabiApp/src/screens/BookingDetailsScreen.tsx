import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Booking } from '../store/slices/bookingsSlice';

export default function BookingDetailsScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { booking }: { booking: Booking } = route.params;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: '2-digit',
      month: 'short'
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour.toString().padStart(2, '0')} ${ampm}`;
  };

  // Mock users for notification section
  const notifyUsers = [
    { id: 1, name: 'Abdulaziz', avatar: '👤' },
    { id: 2, name: 'Mohammed', avatar: '👤' },
    { id: 3, name: 'Saleh', avatar: '👤' },
    { id: 4, name: 'Khalid', avatar: '👤' },
  ];

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: booking.ground.images?.[0] || 'https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?w=400' }}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay} />

        {/* Header */}
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Booking Details</Text>
            <TouchableOpacity style={styles.moreButton}>
              <Ionicons name="ellipsis-vertical" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Club Logo */}
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Ionicons name="football" size={32} color="#FFFFFF" />
              </View>
            </View>

            {/* Club Name and Location */}
            <View style={styles.clubInfoSection}>
              <Text style={styles.clubName}>{booking.ground.club.name}</Text>
              <View style={styles.locationContainer}>
                <Ionicons name="walk-outline" size={16} color="#9CA3AF" />
                <Text style={styles.locationText}>5 Mins | {booking.ground.club.address}</Text>
              </View>
            </View>

            {/* Booking Details Card */}
            <View style={styles.bookingCard}>
              <View style={styles.bookingRow}>
                <View style={styles.bookingLeft}>
                  <Text style={styles.bookingLabel}>Ground</Text>
                  <Text style={styles.bookingValue}>{booking.ground.name}</Text>
                </View>
                <View style={styles.bookingRight}>
                  <Text style={styles.bookingLabel}>Booking Code</Text>
                  <Text style={styles.bookingValue}>GR{booking.id.toString().padStart(4, '0')}</Text>
                </View>
              </View>

              <View style={styles.bookingRow}>
                <View style={styles.bookingLeft}>
                  <Text style={styles.bookingLabel}>Date</Text>
                  <Text style={styles.bookingValue}>{formatDate(booking.date)}</Text>
                </View>
                <View style={styles.bookingRight}>
                  <Text style={styles.bookingLabel}>Time</Text>
                  <Text style={styles.bookingValue}>
                    {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                  </Text>
                </View>
              </View>
            </View>

            {/* Facilities Section */}
            <View style={styles.facilitiesSection}>
              <Text style={styles.sectionTitle}>Facilities</Text>
              <View style={styles.facilitiesGrid}>
                <View style={styles.facilityItem}>
                  <Ionicons name="car-outline" size={24} color="#9CA3AF" />
                  <Text style={styles.facilityText}>Parking Sport</Text>
                </View>
                <View style={styles.facilityItem}>
                  <Ionicons name="camera-outline" size={24} color="#9CA3AF" />
                  <Text style={styles.facilityText}>Camera</Text>
                </View>
                <View style={styles.facilityItem}>
                  <Ionicons name="cafe-outline" size={24} color="#9CA3AF" />
                  <Text style={styles.facilityText}>Waiting room</Text>
                </View>
                <View style={styles.facilityItem}>
                  <Ionicons name="shirt-outline" size={24} color="#9CA3AF" />
                  <Text style={styles.facilityText}>Changing rooms</Text>
                </View>
              </View>
            </View>

            {/* Notify To Section */}
            <View style={styles.notifySection}>
              <Text style={styles.sectionTitle}>Notify to</Text>
              <View style={styles.usersGrid}>
                {notifyUsers.map((user) => (
                  <View key={user.id} style={styles.userItem}>
                    <View style={styles.userAvatar}>
                      <Text style={styles.avatarText}>{user.avatar}</Text>
                    </View>
                    <Text style={styles.userName}>{user.name}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Cancel Button */}
            <TouchableOpacity style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel Booking</Text>
            </TouchableOpacity>

            <View style={styles.bottomPadding} />
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#00FF94',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clubInfoSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  clubName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: '#9CA3AF',
    fontSize: 14,
    marginLeft: 8,
  },
  bookingCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  bookingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  bookingLeft: {
    flex: 1,
  },
  bookingRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  bookingLabel: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 4,
  },
  bookingValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  facilitiesSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  facilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  facilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 16,
  },
  facilityText: {
    color: '#9CA3AF',
    fontSize: 14,
    marginLeft: 12,
  },
  notifySection: {
    marginBottom: 40,
  },
  usersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  userItem: {
    alignItems: 'center',
    width: '23%',
    marginBottom: 16,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarText: {
    fontSize: 20,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#00FF94',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 0,
  },
  cancelButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 40,
  },
});