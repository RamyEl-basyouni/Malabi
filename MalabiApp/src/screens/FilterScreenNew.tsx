import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { RootState, AppDispatch } from '../store/store';
import { fetchClubs, setFilters } from '../store/slices/clubsSlice';

export default function FilterScreen() {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();
  const { filters } = useSelector((state: RootState) => state.clubs);

  const [selectedSport, setSelectedSport] = useState('Any');
  const [location, setLocation] = useState('Al-Yasmine, Riyadh');
  const [priceRange, setPriceRange] = useState([80, 150]);
  const [distance, setDistance] = useState(3);
  const [selectedGroundType, setSelectedGroundType] = useState('All');

  const applyFilters = () => {
    const filterParams: any = {};

    // Convert sport selection to filter format
    if (selectedSport !== 'Any') {
      filterParams.sportType = selectedSport.toLowerCase();
    }

    // Apply price range
    filterParams.priceRange = {
      min: priceRange[0],
      max: priceRange[1],
    };

    // Convert ground type to filter format
    if (selectedGroundType !== 'All') {
      // Map UI ground types to actual ground types
      const groundTypeMap = {
        '5+5': 'synthetic',
        '11+11': 'grass',
        'Futsal': 'clay'
      };
      filterParams.groundType = groundTypeMap[selectedGroundType] || 'grass';
    }

    // Dispatch filters and fetch filtered clubs
    dispatch(setFilters(filterParams));
    dispatch(fetchClubs({
      sportType: filterParams.sportType,
      minPrice: filterParams.priceRange?.min,
      maxPrice: filterParams.priceRange?.max,
      groundType: filterParams.groundType,
    }));

    navigation.goBack();
  };

  const sportTypes = ['Any', 'Football', 'Volleyball', 'Tennis'];
  const groundTypes = ['All', '5+5', '11+11', 'Futsal'];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filter</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Sport Type Filter */}
        <View style={styles.filterSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sportContainer}>
            {sportTypes.map((sport) => (
              <TouchableOpacity
                key={sport}
                style={[
                  styles.sportChip,
                  selectedSport === sport ? styles.selectedSportChip : null,
                ]}
                onPress={() => setSelectedSport(sport)}
              >
                <Text
                  style={[
                    styles.sportChipText,
                    selectedSport === sport ? styles.selectedSportChipText : null,
                  ]}
                >
                  {sport}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Location */}
        <View style={styles.filterSection}>
          <View style={styles.locationContainer}>
            <View style={styles.locationIcon}>
              <Ionicons name="location-outline" size={20} color="#9CA3AF" />
            </View>
            <TextInput
              style={styles.locationInput}
              value={location}
              onChangeText={setLocation}
              placeholder="Enter location"
              placeholderTextColor="#9CA3AF"
            />
            <TouchableOpacity style={styles.locationButton}>
              <Ionicons name="locate-outline" size={20} color="#4F46E5" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Price Range */}
        <View style={styles.filterSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Price Range</Text>
            <Text style={styles.rangeValue}>{priceRange[0]}.00 SR - {priceRange[1]}.00 SR</Text>
          </View>
          <View style={styles.sliderContainer}>
            <View style={styles.sliderTrack}>
              <View
                style={[
                  styles.sliderFill,
                  {
                    left: `${(priceRange[0] - 50) / 150 * 100}%`,
                    width: `${(priceRange[1] - priceRange[0]) / 150 * 100}%`
                  }
                ]}
              />
              <View
                style={[
                  styles.sliderHandle,
                  { left: `${(priceRange[0] - 50) / 150 * 100}%` }
                ]}
              />
              <View
                style={[
                  styles.sliderHandle,
                  { left: `${(priceRange[1] - 50) / 150 * 100}%` }
                ]}
              />
            </View>
          </View>
        </View>

        {/* Distance */}
        <View style={styles.filterSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Distance</Text>
            <Text style={styles.rangeValue}>Upto {distance}kms</Text>
          </View>
          <View style={styles.sliderContainer}>
            <View style={styles.sliderTrack}>
              <View
                style={[
                  styles.sliderFill,
                  {
                    left: '0%',
                    width: `${distance / 10 * 100}%`
                  }
                ]}
              />
              <View
                style={[
                  styles.sliderHandle,
                  { left: `${distance / 10 * 100}%` }
                ]}
              />
            </View>
          </View>
        </View>

        {/* Ground Type */}
        <View style={styles.filterSection}>
          <Text style={styles.sectionTitle}>Ground Type</Text>
          <View style={styles.groundTypeContainer}>
            {groundTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.groundTypeOption,
                  selectedGroundType === type ? styles.selectedGroundType : null,
                ]}
                onPress={() => setSelectedGroundType(type)}
              >
                <View style={[
                  styles.radioButton,
                  selectedGroundType === type ? styles.radioButtonSelected : null,
                ]}>
                  {selectedGroundType === type && <View style={styles.radioButtonInner} />}
                </View>
                <Text style={styles.groundTypeText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Confirm Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={applyFilters}
        >
          <Text style={styles.confirmButtonText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  filterSection: {
    marginBottom: 32,
  },
  sportContainer: {
    paddingVertical: 8,
  },
  sportChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedSportChip: {
    backgroundColor: '#00FF94',
    borderColor: '#00FF94',
  },
  sportChipText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedSportChipText: {
    color: '#000000',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  locationIcon: {
    marginRight: 12,
  },
  locationInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  locationButton: {
    padding: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  rangeValue: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  sliderContainer: {
    paddingHorizontal: 8,
  },
  sliderTrack: {
    height: 4,
    backgroundColor: '#374151',
    borderRadius: 2,
    position: 'relative',
  },
  sliderFill: {
    height: 4,
    backgroundColor: '#4F46E5',
    borderRadius: 2,
    position: 'absolute',
    top: 0,
  },
  sliderHandle: {
    width: 20,
    height: 20,
    backgroundColor: '#4F46E5',
    borderRadius: 10,
    position: 'absolute',
    top: -8,
    marginLeft: -10,
  },
  groundTypeContainer: {
    marginTop: 16,
  },
  groundTypeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#6B7280',
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#00FF94',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00FF94',
  },
  groundTypeText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  selectedGroundType: {
    // Optional: add any additional styling for selected ground type
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 40,
  },
  confirmButton: {
    backgroundColor: '#00FF94',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
  },
});