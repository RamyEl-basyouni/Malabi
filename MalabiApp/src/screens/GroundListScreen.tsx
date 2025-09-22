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
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { RootState, AppDispatch } from '../store/store';
import { fetchClubs, Club } from '../store/slices/clubsSlice';

const groundsData = [
  {
    id: 1,
    name: 'Al-Yasmine',
    location: 'Al-Yasmine Riyadh',
    image: 'https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?w=300',
    sports: ['football', 'volleyball', 'tennis'],
  },
  {
    id: 2,
    name: 'Abn Alhajib',
    location: 'Al-Yasmine Riyadh',
    image: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?w=300',
    sports: ['football', 'volleyball', 'basketball'],
  },
  {
    id: 3,
    name: 'Al-Yasmine',
    location: 'Al-Yasmine Riyadh',
    image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?w=300',
    sports: ['football', 'volleyball', 'tennis'],
  },
  {
    id: 4,
    name: 'Abn Alhajib',
    location: 'Al-Yasmine Riyadh',
    image: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?w=300',
    sports: ['football', 'volleyball', 'basketball'],
  },
];

const schoolStadiums = [
  {
    id: 5,
    name: 'Abn Alhajib High School',
    location: 'Al-Yasmine, Riyadh',
    distance: '6 km away',
    image: 'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?w=400',
  },
];

export default function GroundListScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const dispatch = useDispatch<AppDispatch>();
  const { clubs, isLoading } = useSelector((state: RootState) => state.clubs);
  const [searchText, setSearchText] = useState('');
  const [filteredClubs, setFilteredClubs] = useState<Club[]>([]);
  const [filteredSchoolStadiums, setFilteredSchoolStadiums] = useState(schoolStadiums);

  useEffect(() => {
    dispatch(fetchClubs());
  }, [dispatch]);

  useEffect(() => {
    setFilteredClubs(clubs);
  }, [clubs]);

  useEffect(() => {
    filterBySearch();
  }, [searchText, clubs]);

  const filterBySearch = () => {
    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase();

      const filteredClubsResult = clubs.filter(club =>
        club.name.toLowerCase().includes(searchLower) ||
        club.address.toLowerCase().includes(searchLower)
      );

      const filteredStadiumsResult = schoolStadiums.filter(stadium =>
        stadium.name.toLowerCase().includes(searchLower) ||
        stadium.location.toLowerCase().includes(searchLower)
      );

      setFilteredClubs(filteredClubsResult);
      setFilteredSchoolStadiums(filteredStadiumsResult);
    } else {
      setFilteredClubs(clubs);
      setFilteredSchoolStadiums(schoolStadiums);
    }
  };

  const renderGroundCard = ({ item }: { item: Club }) => (
    <TouchableOpacity
      style={styles.groundCard}
      onPress={() => navigation.navigate('ClubDetails', { clubId: item.id })}
    >
      <View style={styles.groundImageContainer}>
        <Image source={{ uri: item.images[0] || 'https://via.placeholder.com/300' }} style={styles.groundImage} />
      </View>
      <Text style={styles.groundName}>{item.name}</Text>
      <View style={styles.locationContainer}>
        <Ionicons name="location-outline" size={14} color="#9CA3AF" />
        <Text style={styles.locationText}>{item.address}</Text>
      </View>
      <View style={styles.sportsContainer}>
        {item.grounds?.map((ground, index) => (
          <View key={index} style={styles.sportIcon}>
            <Ionicons
              name={ground.sportType === 'football' ? 'football-outline' : ground.sportType === 'volleyball' ? 'basketball-outline' : 'tennisball-outline'}
              size={16}
              color="#9CA3AF"
            />
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  const renderSchoolStadium = ({ item }) => (
    <TouchableOpacity
      style={styles.stadiumCard}
      onPress={() => navigation.navigate('ClubDetails', { clubId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.stadiumImage} />
      <View style={styles.stadiumInfo}>
        <Text style={styles.stadiumName}>{item.name}</Text>
        <View style={styles.stadiumLocationContainer}>
          <Ionicons name="location-outline" size={14} color="#9CA3AF" />
          <Text style={styles.stadiumLocationText}>{item.location}</Text>
          <Text style={styles.distanceText}>{item.distance}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

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
        <Text style={styles.headerTitle}>Football Ground</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#9CA3AF"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => navigation.navigate('Filter')}
        >
          <Ionicons name="options-outline" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View>
            {/* Popular Ground Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Popular Ground</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAllText}>See All</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.popularGroundsGrid}>
                {filteredClubs.map((item, index) => (
                  <View key={item.id} style={styles.gridItemContainer}>
                    {renderGroundCard({ item })}
                  </View>
                ))}
              </View>
            </View>

            {/* School Stadium Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>School Stadium</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAllText}>See All</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        data={filteredSchoolStadiums}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderSchoolStadium}
        contentContainerStyle={styles.contentContainer}
      />
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 12,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  seeAllText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '500',
  },
  popularGroundsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  gridItemContainer: {
    width: '48%',
    marginBottom: 16,
  },
  groundCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
  },
  groundImageContainer: {
    marginBottom: 12,
  },
  groundImage: {
    width: '100%',
    height: 80,
    borderRadius: 8,
  },
  groundName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    color: '#9CA3AF',
    fontSize: 12,
    marginLeft: 4,
  },
  sportsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sportIcon: {
    marginRight: 8,
  },
  stadiumCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 16,
    overflow: 'hidden',
  },
  stadiumImage: {
    width: '100%',
    height: 200,
  },
  stadiumInfo: {
    padding: 16,
  },
  stadiumName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  stadiumLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stadiumLocationText: {
    color: '#9CA3AF',
    fontSize: 14,
    marginLeft: 4,
    flex: 1,
  },
  distanceText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '500',
  },
});