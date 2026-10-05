import { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../theme/colors';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Default route to tabs or onboarding
      router.replace('/(tabs)');
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoBadge}>
        <Text style={styles.logoIcon}>🍔</Text>
      </View>
      <Text style={styles.brandTitle}>
        Bel<Text style={styles.brandAccent}>zo</Text>
      </Text>
      <Text style={styles.brandTagline}>GOOD FOOD. DELIVERED.</Text>
      <ActivityIndicator size="small" color={Colors.primary} style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.secondaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoIcon: {
    fontSize: 40,
  },
  brandTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: -1,
  },
  brandAccent: {
    color: Colors.onSurface,
  },
  brandTagline: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    color: Colors.secondary,
    marginTop: 6,
  },
  loader: {
    marginTop: 32,
  },
});
