import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootState, AppDispatch } from '../store/store';
import { fetchUserBookings, Booking } from '../store/slices/bookingsSlice';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { bookings, isLoading } = useSelector((state: RootState) => state.bookings);

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserBookings(user.id));
    }
  }, [user, dispatch]);

  const renderBookingItem = ({ item }: { item: Booking }) => (
    <TouchableOpacity
      style={styles.bookingCard}
      onPress={() => navigation.navigate('ClubDetails', { clubId: item.ground.club.id })}
    >
      <Image
        source={{ uri: item.ground.images[0] || 'https://via.placeholder.com/300' }}
        style={styles.groundImage}
      />
      <View style={styles.bookingInfo}>
        <Text style={styles.clubName}>{item.ground.club.name}</Text>
        <Text style={styles.groundName}>{item.ground.name}</Text>
        <View style={styles.bookingDetails}>
          <View style={styles.timeContainer}>
            <Ionicons name="time-outline" size={16} color="#9CA3AF" />
            <Text style={styles.timeText}>
              {item.startTime} - {item.endTime}
            </Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>SAR {item.totalPrice}</Text>
          </View>
        </View>
        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge,
            item.status === 'confirmed' ? styles.confirmedBadge : styles.pendingBadge
          ]}>
            <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const generateDateOptions = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push({
        date: date.toISOString().split('T')[0],
        display: date.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        }),
      });
    }
    return dates;
  };

  const dateOptions = generateDateOptions();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Bookings</Text>
        <Text style={styles.subtitle}>Welcome back, {user?.name || 'User'}</Text>
      </View>

      <View style={styles.dateSelector}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={dateOptions}
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.dateOption,
                selectedDate === item.date ? styles.selectedDate : null,
              ]}
              onPress={() => setSelectedDate(item.date)}
            >
              <Text
                style={[
                  styles.dateText,
                  selectedDate === item.date ? styles.selectedDateText : null,
                ]}
              >
                {item.display}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {bookings.length > 0 ? (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderBookingItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.bookingsList}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="calendar-outline" size={80} color="#6B7280" />
          <Text style={styles.emptyTitle}>No Bookings Yet</Text>
          <Text style={styles.emptySubtitle}>
            Start exploring and book your first ground!
          </Text>
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => navigation.navigate('Filter')}
          >
            <Text style={styles.exploreButtonText}>Explore Grounds</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  dateSelector: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  dateOption: {
    backgroundColor: '#374151',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 12,
    borderRadius: 20,
  },
  selectedDate: {
    backgroundColor: '#4F46E5',
  },
  dateText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '600',
  },
  selectedDateText: {
    color: '#FFFFFF',
  },
  bookingsList: {
    paddingHorizontal: 20,
  },
  bookingCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  groundImage: {
    width: 100,
    height: 120,
  },
  bookingInfo: {
    flex: 1,
    padding: 16,
  },
  clubName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  groundName: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  bookingDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    color: '#9CA3AF',
    fontSize: 14,
    marginLeft: 4,
  },
  priceContainer: {
    backgroundColor: '#065F46',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  priceText: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '600',
  },
  statusContainer: {
    alignItems: 'flex-start',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  confirmedBadge: {
    backgroundColor: '#065F46',
  },
  pendingBadge: {
    backgroundColor: '#92400E',
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 32,
  },
  exploreButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  exploreButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});