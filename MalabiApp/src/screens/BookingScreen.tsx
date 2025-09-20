import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootState, AppDispatch } from '../store/store';
import { createBooking } from '../store/slices/bookingsSlice';

export default function BookingScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { isLoading } = useSelector((state: RootState) => state.bookings);

  const { ground, club } = route.params;

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('11:00');

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 22; hour++) {
      const time = hour.toString().padStart(2, '0') + ':00';
      slots.push(time);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const calculatePrice = () => {
    const startHour = parseInt(startTime.split(':')[0]);
    const endHour = parseInt(endTime.split(':')[0]);
    const duration = endHour - startHour;
    return duration * ground.pricePerHour;
  };

  const handleBooking = async () => {
    if (!user) {
      Alert.alert('Error', 'Please login to make a booking');
      return;
    }

    if (startTime >= endTime) {
      Alert.alert('Error', 'End time must be after start time');
      return;
    }

    try {
      await dispatch(createBooking({
        userId: user.id,
        groundId: ground.id,
        date: selectedDate,
        startTime,
        endTime,
      })).unwrap();

      Alert.alert(
        'Booking Successful!',
        'Your booking has been created successfully.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to create booking. Please try again.');
    }
  };

  const generateDateOptions = () => {
    const dates = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        }),
      });
    }
    return dates;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Book Ground</Text>
        <Text style={styles.subtitle}>{ground.name} at {club.name}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Date</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
          {generateDateOptions().map((date) => (
            <TouchableOpacity
              key={date.value}
              style={[
                styles.dateOption,
                selectedDate === date.value ? styles.selectedDate : null,
              ]}
              onPress={() => setSelectedDate(date.value)}
            >
              <Text
                style={[
                  styles.dateText,
                  selectedDate === date.value ? styles.selectedDateText : null,
                ]}
              >
                {date.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Start Time</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timeScroll}>
          {timeSlots.map((time) => (
            <TouchableOpacity
              key={time}
              style={[
                styles.timeOption,
                startTime === time ? styles.selectedTime : null,
              ]}
              onPress={() => setStartTime(time)}
            >
              <Text
                style={[
                  styles.timeText,
                  startTime === time ? styles.selectedTimeText : null,
                ]}
              >
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>End Time</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timeScroll}>
          {timeSlots.map((time) => (
            <TouchableOpacity
              key={time}
              style={[
                styles.timeOption,
                endTime === time ? styles.selectedTime : null,
              ]}
              onPress={() => setEndTime(time)}
            >
              <Text
                style={[
                  styles.timeText,
                  endTime === time ? styles.selectedTimeText : null,
                ]}
              >
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.summarySection}>
        <Text style={styles.sectionTitle}>Booking Summary</Text>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Ground:</Text>
            <Text style={styles.summaryValue}>{ground.name}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Date:</Text>
            <Text style={styles.summaryValue}>{selectedDate}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Time:</Text>
            <Text style={styles.summaryValue}>{startTime} - {endTime}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Duration:</Text>
            <Text style={styles.summaryValue}>
              {parseInt(endTime.split(':')[0]) - parseInt(startTime.split(':')[0])} hours
            </Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Price:</Text>
            <Text style={styles.totalValue}>SAR {calculatePrice()}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.bookButton, isLoading ? styles.disabledButton : null]}
        onPress={handleBooking}
        disabled={isLoading}
      >
        <Text style={styles.bookButtonText}>
          {isLoading ? 'Booking...' : 'Confirm Booking'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
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
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  dateScroll: {
    flexDirection: 'row',
  },
  dateOption: {
    backgroundColor: '#374151',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 12,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
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
  timeScroll: {
    flexDirection: 'row',
  },
  timeOption: {
    backgroundColor: '#374151',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 8,
    minWidth: 60,
    alignItems: 'center',
  },
  selectedTime: {
    backgroundColor: '#4F46E5',
  },
  timeText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '600',
  },
  selectedTimeText: {
    color: '#FFFFFF',
  },
  summarySection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  summaryCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    color: '#9CA3AF',
    fontSize: 16,
  },
  summaryValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#374151',
    paddingTop: 12,
    marginTop: 8,
    marginBottom: 0,
  },
  totalLabel: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  totalValue: {
    color: '#10B981',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bookButton: {
    backgroundColor: '#4F46E5',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#6B7280',
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});