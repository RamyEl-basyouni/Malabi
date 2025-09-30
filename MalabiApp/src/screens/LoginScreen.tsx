import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootState, AppDispatch } from '../store/store';
import { loginUser } from '../store/slices/authSlice';
import MalaabyLogo from '../components/MalaabyLogo';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('demo@malaaby.com');
  const [password, setPassword] = useState('password123');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigation.replace('Tabs');
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid email or password');
    }
  };

  const handleGuestLogin = () => {
    navigation.replace('Tabs');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&q=80' }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        <SafeAreaView style={styles.safeArea}>
          <View style={styles.contentContainer}>
            {/* Top Section - Tab buttons */}
            <View style={styles.tabContainer}>
              <View style={styles.tabButtons}>
                <TouchableOpacity style={styles.activeTab}>
                  <Text style={styles.activeTabText}>Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.inactiveTab}>
                  <Text style={styles.inactiveTabText}>Create Account</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Form Section */}
            <View style={styles.formContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="mo@gmail.com"
              placeholderTextColor="#666666"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••••"
              placeholderTextColor="#666666"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.loginButton, isLoading ? styles.disabledButton : null]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.loginButtonText}>
                {isLoading ? 'Logging In...' : 'Log In'}
              </Text>
            </TouchableOpacity>

            <View style={styles.divider}>
              <Text style={styles.dividerText}>OR</Text>
            </View>

            {/* Social Login Buttons */}
            <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-apple" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-facebook" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-google" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Demo Info */}
            <View style={styles.demoInfo}>
              <Text style={styles.demoTitle}>Demo: demo@malaaby.com / password123</Text>
            </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  tabContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  tabButtons: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    padding: 4,
  },
  activeTab: {
    backgroundColor: '#4F46E5',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
  },
  inactiveTab: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
  },
  activeTabText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  inactiveTabText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
  },
  formContainer: {
    backgroundColor: '#000000',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
    minHeight: height * 0.6,
  },
  inputLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 8,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#F59E0B',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#00FF94',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 24,
  },
  disabledButton: {
    backgroundColor: '#6B7280',
  },
  loginButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
  },
  divider: {
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '500',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  demoInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 12,
    marginTop: 24,
    alignItems: 'center',
  },
  demoTitle: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '400',
  },
});