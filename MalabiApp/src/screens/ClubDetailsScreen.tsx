import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootState, AppDispatch } from '../store/store';
import { fetchClubDetails, Ground } from '../store/slices/clubsSlice';

export default function ClubDetailsScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedClub } = useSelector((state: RootState) => state.clubs);

  const { clubId } = route.params;

  useEffect(() => {
    dispatch(fetchClubDetails(clubId));
  }, [clubId, dispatch]);

  if (!selectedClub) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const renderGroundItem = ({ item }: { item: Ground }) => (
    <TouchableOpacity
      style={styles.groundCard}
      onPress={() => navigation.navigate('Booking', { ground: item, club: selectedClub })}
    >
      <Image
        source={{ uri: item.images[0] || 'https://via.placeholder.com/300' }}
        style={styles.groundImage}
      />
      <View style={styles.groundInfo}>
        <Text style={styles.groundName}>{item.name}</Text>
        <View style={styles.groundDetails}>
          <View style={styles.sportTypeContainer}>
            <Text style={styles.sportTypeText}>{item.sportType.toUpperCase()}</Text>
          </View>
          <View style={styles.groundTypeContainer}>
            <Text style={styles.groundTypeText}>{item.groundType}</Text>
          </View>
        </View>
        <View style={styles.groundBottomRow}>
          <View style={styles.capacityContainer}>
            <Ionicons name="people-outline" size={16} color="#9CA3AF" />
            <Text style={styles.capacityText}>{item.capacity} players</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>SAR {item.pricePerHour}/hr</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: selectedClub.images[0] || 'https://via.placeholder.com/400' }}
        style={styles.clubImage}
      />

      <View style={styles.clubInfo}>
        <Text style={styles.clubName}>{selectedClub.name}</Text>

        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={20} color="#FCD34D" />
          <Text style={styles.rating}>{selectedClub.rating}</Text>
          <Text style={styles.reviewCount}>
            ({selectedClub.grounds?.length || 0} grounds available)
          </Text>
        </View>

        <View style={styles.addressContainer}>
          <Ionicons name="location-outline" size={20} color="#9CA3AF" />
          <Text style={styles.address}>{selectedClub.address}</Text>
        </View>

        <View style={styles.phoneContainer}>
          <Ionicons name="call-outline" size={20} color="#9CA3AF" />
          <Text style={styles.phone}>{selectedClub.phone}</Text>
        </View>

        <Text style={styles.description}>{selectedClub.description}</Text>

        <View style={styles.facilitiesContainer}>
          <Text style={styles.sectionTitle}>Facilities</Text>
          <View style={styles.facilitiesList}>
            {selectedClub.facilities.map((facility, index) => (
              <View key={index} style={styles.facilityItem}>
                <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                <Text style={styles.facilityText}>{facility}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.groundsSection}>
          <Text style={styles.sectionTitle}>Available Grounds</Text>
          <FlatList
            data={selectedClub.grounds || []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderGroundItem}
            scrollEnabled={false}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111827',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  clubImage: {
    width: '100%',
    height: 250,
  },
  clubInfo: {
    padding: 20,
  },
  clubName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rating: {
    color: '#FCD34D',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 4,
  },
  reviewCount: {
    color: '#6B7280',
    fontSize: 16,
    marginLeft: 8,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  address: {
    color: '#9CA3AF',
    fontSize: 16,
    marginLeft: 8,
    flex: 1,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  phone: {
    color: '#9CA3AF',
    fontSize: 16,
    marginLeft: 8,
  },
  description: {
    color: '#D1D5DB',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  facilitiesContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  facilitiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  facilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  facilityText: {
    color: '#D1D5DB',
    fontSize: 14,
    marginLeft: 4,
  },
  groundsSection: {
    marginBottom: 24,
  },
  groundCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  groundImage: {
    width: '100%',
    height: 160,
  },
  groundInfo: {
    padding: 16,
  },
  groundName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  groundDetails: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  sportTypeContainer: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  sportTypeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  groundTypeContainer: {
    backgroundColor: '#065F46',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  groundTypeText: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: '600',
  },
  groundBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  capacityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  capacityText: {
    color: '#9CA3AF',
    fontSize: 14,
    marginLeft: 4,
  },
  priceContainer: {
    backgroundColor: '#92400E',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  priceText: {
    color: '#FCD34D',
    fontSize: 16,
    fontWeight: '600',
  },
});