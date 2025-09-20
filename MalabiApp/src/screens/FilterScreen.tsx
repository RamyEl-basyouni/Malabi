import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootState, AppDispatch } from '../store/store';
import { fetchClubs, setFilters, Club } from '../store/slices/clubsSlice';

export default function FilterScreen() {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();
  const { clubs, filters, isLoading } = useSelector((state: RootState) => state.clubs);

  const [localFilters, setLocalFilters] = useState(filters);
  const [showFilters, setShowFilters] = useState(false);

  const sportTypes = [
    { key: 'football', label: 'Football', icon: '⚽' },
    { key: 'volleyball', label: 'Volleyball', icon: '🏐' },
    { key: 'tennis', label: 'Tennis', icon: '🎾' },
  ];

  const groundTypes = [
    { key: 'grass', label: 'Grass', icon: '🌱' },
    { key: 'synthetic', label: 'Synthetic', icon: '🔶' },
    { key: 'clay', label: 'Clay', icon: '🟤' },
  ];

  useEffect(() => {
    dispatch(fetchClubs());
  }, [dispatch]);

  const applyFilters = () => {
    dispatch(setFilters(localFilters));
    dispatch(fetchClubs({
      sportType: localFilters.sportType,
      minPrice: localFilters.priceRange?.min,
      maxPrice: localFilters.priceRange?.max,
      groundType: localFilters.groundType,
    }));
    setShowFilters(false);
  };

  const clearFilters = () => {
    const emptyFilters = {};
    setLocalFilters(emptyFilters);
    dispatch(setFilters(emptyFilters));
    dispatch(fetchClubs());
  };

  const renderClubItem = ({ item }: { item: Club }) => (
    <TouchableOpacity
      style={styles.clubCard}
      onPress={() => navigation.navigate('ClubDetails', { clubId: item.id })}
    >
      <Image
        source={{ uri: item.images[0] || 'https://via.placeholder.com/300' }}
        style={styles.clubImage}
      />
      <View style={styles.clubInfo}>
        <Text style={styles.clubName}>{item.name}</Text>
        <Text style={styles.clubAddress}>{item.address}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FCD34D" />
          <Text style={styles.rating}>{item.rating}</Text>
          <Text style={styles.ratingCount}>({item.grounds?.length || 0} grounds)</Text>
        </View>
        <View style={styles.priceRange}>
          <Text style={styles.priceText}>
            From SAR {Math.min(...(item.grounds?.map(g => g.pricePerHour) || [0]))}/hr
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const FilterModal = () => (
    <View style={styles.filterModal}>
      <View style={styles.filterHeader}>
        <Text style={styles.filterTitle}>Filter Grounds</Text>
        <TouchableOpacity onPress={() => setShowFilters(false)}>
          <Ionicons name="close" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterSection}>
        <Text style={styles.sectionTitle}>Sport Type</Text>
        <View style={styles.optionsContainer}>
          {sportTypes.map((sport) => (
            <TouchableOpacity
              key={sport.key}
              style={[
                styles.filterOption,
                localFilters.sportType === sport.key ? styles.selectedOption : null,
              ]}
              onPress={() =>
                setLocalFilters({
                  ...localFilters,
                  sportType: localFilters.sportType === sport.key ? undefined : sport.key as any,
                })
              }
            >
              <Text style={styles.optionEmoji}>{sport.icon}</Text>
              <Text style={styles.optionText}>{sport.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.filterSection}>
        <Text style={styles.sectionTitle}>Ground Type</Text>
        <View style={styles.optionsContainer}>
          {groundTypes.map((ground) => (
            <TouchableOpacity
              key={ground.key}
              style={[
                styles.filterOption,
                localFilters.groundType === ground.key ? styles.selectedOption : null,
              ]}
              onPress={() =>
                setLocalFilters({
                  ...localFilters,
                  groundType: localFilters.groundType === ground.key ? undefined : ground.key as any,
                })
              }
            >
              <Text style={styles.optionEmoji}>{ground.icon}</Text>
              <Text style={styles.optionText}>{ground.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.filterSection}>
        <Text style={styles.sectionTitle}>Price Range (SAR/hr)</Text>
        <View style={styles.priceInputs}>
          <TextInput
            style={styles.priceInput}
            placeholder="Min"
            placeholderTextColor="#6B7280"
            value={localFilters.priceRange?.min?.toString() || ''}
            onChangeText={(text) =>
              setLocalFilters({
                ...localFilters,
                priceRange: {
                  ...localFilters.priceRange,
                  min: parseInt(text) || 0,
                  max: localFilters.priceRange?.max || 1000,
                },
              })
            }
            keyboardType="numeric"
          />
          <Text style={styles.priceSeparator}>-</Text>
          <TextInput
            style={styles.priceInput}
            placeholder="Max"
            placeholderTextColor="#6B7280"
            value={localFilters.priceRange?.max?.toString() || ''}
            onChangeText={(text) =>
              setLocalFilters({
                ...localFilters,
                priceRange: {
                  min: localFilters.priceRange?.min || 0,
                  ...localFilters.priceRange,
                  max: parseInt(text) || 1000,
                },
              })
            }
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.filterActions}>
        <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
          <Text style={styles.applyButtonText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Find Grounds</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Ionicons name="filter" size={20} color="#FFFFFF" />
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {clubs.length > 0 ? (
        <FlatList
          data={clubs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderClubItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.clubsList}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="search-outline" size={80} color="#6B7280" />
          <Text style={styles.emptyTitle}>No Grounds Found</Text>
          <Text style={styles.emptySubtitle}>
            Try adjusting your filters to see more results
          </Text>
        </View>
      )}

      {showFilters && (
        <View style={styles.modalOverlay}>
          <FilterModal />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4F46E5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  clubsList: {
    paddingHorizontal: 20,
  },
  clubCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  clubImage: {
    width: '100%',
    height: 160,
  },
  clubInfo: {
    padding: 16,
  },
  clubName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  clubAddress: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    color: '#FCD34D',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
  },
  ratingCount: {
    color: '#6B7280',
    fontSize: 14,
    marginLeft: 8,
  },
  priceRange: {
    backgroundColor: '#065F46',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  priceText: {
    color: '#10B981',
    fontSize: 14,
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
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterModal: {
    backgroundColor: '#1F2937',
    margin: 20,
    borderRadius: 12,
    padding: 24,
    width: '90%',
    maxHeight: '80%',
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  filterSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: '#4F46E5',
  },
  optionEmoji: {
    fontSize: 16,
    marginRight: 8,
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  priceInputs: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceInput: {
    backgroundColor: '#374151',
    color: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
    textAlign: 'center',
  },
  priceSeparator: {
    color: '#9CA3AF',
    marginHorizontal: 16,
    fontSize: 16,
  },
  filterActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  clearButton: {
    backgroundColor: '#374151',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  clearButtonText: {
    color: '#9CA3AF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  applyButton: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});