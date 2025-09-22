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
  ScrollView,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootState, AppDispatch } from '../store/store';
import { fetchUserBookings, Booking } from '../store/slices/bookingsSlice';
import { fetchClubs, setFilters } from '../store/slices/clubsSlice';

const { width } = Dimensions.get('window');

const popularGrounds = [
  {
    id: 1,
    name: 'Al-Yasmine Sports Club',
    location: 'Al-Yasmine District, Riyadh',
    image: 'https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?w=400',
    sports: ['football', 'volleyball', 'tennis'],
    rating: 4.8,
    price: 'SAR 100/hr',
  },
  {
    id: 2,
    name: 'King Fahd Sports City',
    location: 'King Fahd Road, Riyadh',
    image: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?w=400',
    sports: ['football', 'volleyball', 'basketball'],
    rating: 4.6,
    price: 'SAR 120/hr',
  },
  {
    id: 3,
    name: 'Prince Faisal Stadium',
    location: 'Al-Malaz District, Riyadh',
    image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?w=400',
    sports: ['football', 'tennis'],
    rating: 4.7,
    price: 'SAR 150/hr',
  },
  {
    id: 4,
    name: 'Al-Nasr Sports Club',
    location: 'Al-Nasr District, Riyadh',
    image: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?w=400',
    sports: ['football', 'volleyball', 'tennis'],
    rating: 4.5,
    price: 'SAR 90/hr',
  },
  {
    id: 5,
    name: 'Green Valley Sports Complex',
    location: 'Al-Olaya District, Riyadh',
    image: 'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?w=400',
    sports: ['tennis', 'volleyball'],
    rating: 4.4,
    price: 'SAR 80/hr',
  },
];

const nearbyGrounds = [
  {
    id: 6,
    name: 'Al-Shabab Sports Academy',
    location: 'Al-Olaya District, Riyadh',
    distance: '2.5 km away',
    image: 'https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?w=400',
    rating: 4.3,
    sports: ['football', 'volleyball'],
    price: 'SAR 75/hr',
  },
  {
    id: 7,
    name: 'Victory Sports Complex',
    location: 'King Abdulaziz Road, Riyadh',
    distance: '3.2 km away',
    image: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?w=400',
    rating: 4.6,
    sports: ['tennis', 'basketball'],
    price: 'SAR 95/hr',
  },
  {
    id: 8,
    name: 'Royal Sports Center',
    location: 'Diplomatic Quarter, Riyadh',
    distance: '4.1 km away',
    image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?w=400',
    rating: 4.9,
    sports: ['football', 'tennis', 'volleyball'],
    price: 'SAR 180/hr',
  },
  {
    id: 9,
    name: 'Community Sports Hub',
    location: 'Al-Malaz District, Riyadh',
    distance: '5.7 km away',
    image: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?w=400',
    rating: 4.2,
    sports: ['football', 'volleyball'],
    price: 'SAR 65/hr',
  },
  {
    id: 10,
    name: 'Elite Tennis Courts',
    location: 'Al-Nakheel District, Riyadh',
    distance: '6.8 km away',
    image: 'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?w=400',
    rating: 4.4,
    sports: ['tennis'],
    price: 'SAR 110/hr',
  },
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { bookings, isLoading } = useSelector((state: RootState) => state.bookings);

  const [selectedSport, setSelectedSport] = useState('Football');
  const [searchText, setSearchText] = useState('');
  const [filteredPopularGrounds, setFilteredPopularGrounds] = useState(popularGrounds);
  const [filteredNearbyGrounds, setFilteredNearbyGrounds] = useState(nearbyGrounds);

  const handleSportSelection = (sport: string) => {
    setSelectedSport(sport);
    const sportType = sport.toLowerCase() as 'football' | 'volleyball' | 'tennis';

    // Also update club filters for navigation
    dispatch(setFilters({ sportType }));
    dispatch(fetchClubs({ sportType }));
  };

  useEffect(() => {
    if (user) {
      dispatch(fetchUserBookings(user.id));
    }
  }, [user, dispatch]);

  useEffect(() => {
    filterGroundsBySearch();
  }, [searchText, selectedSport]);

  const filterGroundsBySearch = () => {
    const sportType = selectedSport.toLowerCase() as 'football' | 'volleyball' | 'tennis';

    let filteredPopular = popularGrounds.filter(ground =>
      ground.sports.includes(sportType)
    );

    let filteredNearby = nearbyGrounds.filter(ground =>
      ground.sports.includes(sportType)
    );

    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase();
      filteredPopular = filteredPopular.filter(ground =>
        ground.name.toLowerCase().includes(searchLower) ||
        ground.location.toLowerCase().includes(searchLower)
      );

      filteredNearby = filteredNearby.filter(ground =>
        ground.name.toLowerCase().includes(searchLower) ||
        ground.location.toLowerCase().includes(searchLower)
      );
    }

    setFilteredPopularGrounds(filteredPopular);
    setFilteredNearbyGrounds(filteredNearby);
  };

  // Initialize filters on component mount
  useEffect(() => {
    // Set initial filter to Football
    const initialSport = 'Football';
    setSelectedSport(initialSport);
    const sportType = initialSport.toLowerCase() as 'football' | 'volleyball' | 'tennis';

    dispatch(setFilters({ sportType }));
    dispatch(fetchClubs({ sportType }));
  }, [dispatch]);

  const renderPopularGround = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.popularGroundCard}
      onPress={() => navigation.navigate('ClubDetails', { clubId: item.id })}
    >
      <View style={styles.groundImageContainer}>
        <Image source={{ uri: item.image }} style={styles.popularGroundImage} />
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={12} color="#FCD34D" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
      <Text style={styles.popularGroundName}>{item.name}</Text>
      <View style={styles.locationContainer}>
        <Ionicons name="location-outline" size={14} color="#9CA3AF" />
        <Text style={styles.locationText}>{item.location}</Text>
      </View>
      <View style={styles.sportsAndPriceContainer}>
        <View style={styles.sportsContainer}>
          {item.sports.slice(0, 3).map((sport: any, index: number) => (
            <View key={index} style={styles.sportIcon}>
              <Ionicons
                name={sport === 'football' ? 'football-outline' : sport === 'volleyball' ? 'basketball-outline' : sport === 'basketball' ? 'basketball-outline' : 'tennisball-outline'}
                size={14}
                color="#9CA3AF"
              />
            </View>
          ))}
        </View>
        <Text style={styles.priceText}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderNearbyGround = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.nearbyGroundCard}
      onPress={() => navigation.navigate('ClubDetails', { clubId: item.id })}
    >
      <View style={styles.nearbyImageContainer}>
        <Image source={{ uri: item.image }} style={styles.nearbyGroundImage} />
        <View style={styles.nearbyRatingBadge}>
          <Ionicons name="star" size={14} color="#FCD34D" />
          <Text style={styles.nearbyRatingText}>{item.rating}</Text>
        </View>
      </View>
      <View style={styles.nearbyGroundInfo}>
        <View style={styles.nearbyGroundHeader}>
          <Text style={styles.nearbyGroundName}>{item.name}</Text>
          <Text style={styles.nearbyPriceText}>{item.price}</Text>
        </View>
        <View style={styles.nearbyLocationContainer}>
          <Ionicons name="location-outline" size={14} color="#9CA3AF" />
          <Text style={styles.nearbyLocationText}>{item.location}</Text>
          <Text style={styles.distanceText}>{item.distance}</Text>
        </View>
        <View style={styles.nearbySportsContainer}>
          {item.sports.map((sport: any, index: number) => (
            <View key={index} style={styles.nearbySportTag}>
              <Ionicons
                name={sport === 'football' ? 'football-outline' : sport === 'volleyball' ? 'basketball-outline' : sport === 'basketball' ? 'basketball-outline' : 'tennisball-outline'}
                size={12}
                color="#4F46E5"
              />
              <Text style={styles.nearbySportText}>{sport}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.greetingSection}>
            <Text style={styles.userName}>{user?.name || 'Ahmed'}</Text>
            <Text style={styles.greeting}>Find Your Perfect Ground</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={20} color="#9CA3AF" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search grounds in Riyadh..."
              placeholderTextColor="#9CA3AF"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>

        {/* Sport Categories */}
        <View style={styles.sportCategoriesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {['Football', 'Volleyball', 'Tennis'].map((sport) => (
              <TouchableOpacity
                key={sport}
                style={[
                  styles.sportCategory,
                  selectedSport === sport ? styles.selectedSportCategory : null,
                ]}
                onPress={() => handleSportSelection(sport)}
              >
                <View style={styles.sportIconContainer}>
                  <Ionicons
                    name={sport === 'Football' ? 'football-outline' : sport === 'Volleyball' ? 'basketball-outline' : 'tennisball-outline'}
                    size={20}
                    color={selectedSport === sport ? '#000000' : '#FFFFFF'}
                  />
                </View>
                <Text
                  style={[
                    styles.sportCategoryText,
                    selectedSport === sport ? styles.selectedSportCategoryText : null,
                  ]}
                >
                  {sport}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Popular Grounds */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Grounds</Text>
            <TouchableOpacity onPress={() => navigation.navigate('GroundList')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
{filteredPopularGrounds.length > 0 ? (
            <FlatList
              data={filteredPopularGrounds}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderPopularGround}
              contentContainerStyle={styles.popularGroundsList}
            />
          ) : (
            <View style={styles.emptyFilterState}>
              <Text style={styles.emptyFilterText}>
                No popular {selectedSport.toLowerCase()} grounds available
              </Text>
            </View>
          )}
        </View>

        {/* Nearby You */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Near You</Text>
            <TouchableOpacity onPress={() => navigation.navigate('GroundList')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
{filteredNearbyGrounds.length > 0 ? (
            <FlatList
              data={filteredNearbyGrounds}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderNearbyGround}
              scrollEnabled={false}
            />
          ) : (
            <View style={styles.emptyFilterState}>
              <Text style={styles.emptyFilterText}>
                No nearby {selectedSport.toLowerCase()} grounds available
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  greetingSection: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  greeting: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 12,
  },
  sportCategoriesContainer: {
    paddingLeft: 20,
    marginBottom: 30,
  },
  sportCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
  },
  selectedSportCategory: {
    backgroundColor: '#4F46E5',
  },
  sportIconContainer: {
    marginRight: 8,
  },
  sportCategoryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedSportCategoryText: {
    color: '#FFFFFF',
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
  popularGroundsList: {
    paddingLeft: 20,
  },
  popularGroundCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    width: 180,
  },
  groundImageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  popularGroundImage: {
    width: 148,
    height: 90,
    borderRadius: 8,
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 2,
  },
  popularGroundName: {
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
  sportsAndPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sportsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sportIcon: {
    marginRight: 6,
  },
  priceText: {
    color: '#10B981',
    fontSize: 11,
    fontWeight: '600',
  },
  nearbyGroundCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 16,
    overflow: 'hidden',
  },
  nearbyImageContainer: {
    position: 'relative',
  },
  nearbyGroundImage: {
    width: '100%',
    height: 200,
  },
  nearbyRatingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nearbyRatingText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 3,
  },
  nearbyGroundInfo: {
    padding: 16,
  },
  nearbyGroundHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  nearbyGroundName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    marginRight: 8,
  },
  nearbyPriceText: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '600',
  },
  nearbyLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  nearbyLocationText: {
    color: '#9CA3AF',
    fontSize: 14,
    marginLeft: 4,
    flex: 1,
  },
  distanceText: {
    color: '#4F46E5',
    fontSize: 14,
    fontWeight: '600',
  },
  nearbySportsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  nearbySportTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(79, 70, 229, 0.3)',
  },
  nearbySportText: {
    color: '#4F46E5',
    fontSize: 11,
    fontWeight: '500',
    marginLeft: 4,
    textTransform: 'capitalize',
  },
  emptyFilterState: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  emptyFilterText: {
    color: '#9CA3AF',
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});