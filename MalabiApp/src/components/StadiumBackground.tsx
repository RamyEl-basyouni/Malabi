import React from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  Dimensions,
  ViewStyle,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface StadiumBackgroundProps {
  children: React.ReactNode;
  overlayOpacity?: number;
  style?: ViewStyle;
}

export default function StadiumBackground({
  children,
  overlayOpacity = 0.4,
  style,
}: StadiumBackgroundProps) {
  return (
    <View style={[styles.container, style]}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&q=80' }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={[styles.overlay, { backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }]} />
        {children}
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
    width: width,
    height: height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
});