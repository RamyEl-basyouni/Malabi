import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const splashData = [
  {
    title: 'One-step solution to book a ground',
    subtitle: 'Easily view nearby popular grounds and make a booking at your preferred time.',
    isLast: false,
  },
  {
    title: 'Find the perfect ground',
    subtitle: 'Search and filter grounds by location, price, and available time slots.',
    isLast: false,
  },
  {
    title: 'Book and play',
    subtitle: 'Complete your booking with secure payment and enjoy your game.',
    isLast: true,
  },
];

export default function SplashScreen() {
  const navigation = useNavigation<any>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < splashData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.replace('Login');
    }
  };

  const handleSkip = () => {
    navigation.replace('Login');
  };

  const currentSplash = splashData[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#4F46E5', '#7C3AED']}
        style={styles.gradientContainer}
      >
        {/* Illustration Area */}
        <View style={styles.illustrationContainer}>
          <View style={styles.mockPhones}>
            <View style={[styles.phone, styles.phone1]}>
              <View style={styles.phoneScreen}>
                <View style={[styles.phoneCard, { backgroundColor: '#00FF94' }]} />
                <View style={styles.phoneCard} />
                <View style={styles.phoneCard} />
              </View>
            </View>

            <View style={[styles.phone, styles.phone2]}>
              <View style={styles.phoneScreen}>
                <View style={styles.phoneCard} />
                <View style={[styles.phoneCard, { backgroundColor: '#00FF94' }]} />
                <View style={styles.phoneCard} />
              </View>
            </View>

            <View style={[styles.phone, styles.phone3]}>
              <View style={styles.phoneScreen}>
                <View style={styles.phoneCard} />
                <View style={styles.phoneCard} />
                <View style={[styles.phoneCard, { backgroundColor: '#4F46E5' }]} />
              </View>
            </View>
          </View>
        </View>

        {/* Content Area */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{currentSplash.title}</Text>
          <Text style={styles.subtitle}>{currentSplash.subtitle}</Text>

          {/* Pagination Dots */}
          <View style={styles.pagination}>
            {splashData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === currentIndex ? styles.activeDot : styles.inactiveDot,
                ]}
              />
            ))}
          </View>

          {/* Navigation Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.skipText}>SKIP</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <View style={styles.nextButtonInner}>
                <Text style={styles.nextText}>→</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  gradientContainer: {
    flex: 1,
  },
  illustrationContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  mockPhones: {
    position: 'relative',
    width: width * 0.7,
    height: height * 0.4,
  },
  phone: {
    position: 'absolute',
    width: 120,
    height: 200,
    backgroundColor: '#1F2937',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#374151',
  },
  phone1: {
    left: 0,
    top: 20,
    transform: [{ rotate: '-15deg' }],
    zIndex: 1,
  },
  phone2: {
    right: 0,
    top: 0,
    transform: [{ rotate: '15deg' }],
    zIndex: 3,
  },
  phone3: {
    left: '50%',
    marginLeft: -60,
    top: 80,
    transform: [{ rotate: '5deg' }],
    zIndex: 2,
  },
  phoneScreen: {
    flex: 1,
    margin: 8,
    backgroundColor: '#000000',
    borderRadius: 12,
    padding: 8,
  },
  phoneCard: {
    height: 20,
    backgroundColor: '#374151',
    borderRadius: 4,
    marginBottom: 8,
  },
  contentContainer: {
    flex: 0.4,
    backgroundColor: '#000000',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 32,
    paddingTop: 40,
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#00FF94',
    width: 24,
  },
  inactiveDot: {
    backgroundColor: '#374151',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  skipText: {
    color: '#9CA3AF',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#00FF94',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonInner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextText: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',
  },
});