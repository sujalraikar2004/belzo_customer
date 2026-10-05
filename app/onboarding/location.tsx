import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../theme/colors';
import { useLocationStore } from '../../store/useLocationStore';

export default function LocationPermissionScreen() {
  const router = useRouter();
  const { setLocation, setPermission } = useLocationStore();
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleUseLocation = () => {
    setPermission(true);
    setFeedback('Locating top kitchens near Williamsburg, Brooklyn...');
    setTimeout(() => {
      setLocation('Flat 402, Sunset Heights, 742 Evergreen Terrace, Brooklyn', 40.7128, -73.955);
      router.replace('/(tabs)');
    }, 1000);
  };

  const handleManual = () => {
    setLocation('742 Evergreen Terrace, Brooklyn, NY', 40.7128, -73.955);
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      {/* Header Bar */}
      <View style={styles.header}>
        <Text style={styles.brandTitle}>Belzo</Text>
        <TouchableOpacity style={styles.skipBtn} onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hero Visual Stage with Map Simulation */}
        <View style={styles.visualStage}>
          <View style={styles.mapUnderlay}>
            {/* Visual Route and Pins */}
            <View style={styles.organicBadge}>
              <Text style={styles.organicText}>🌱 Organic</Text>
            </View>
            <View style={styles.steamingBadge}>
              <Text style={styles.steamingKicker}>STEAMING HOT</Text>
              <Text style={styles.steamingEta}>14–22 min</Text>
            </View>
            <View style={styles.centerBurgerPin}>
              <Text style={{ fontSize: 28 }}>🍔</Text>
            </View>
            <View style={styles.liveKitchensTag}>
              <Text style={styles.liveKitchensText}>🔴 Live Kitchens Near You</Text>
            </View>
          </View>
        </View>

        {/* Carousel Dots */}
        <View style={styles.dotsRow}>
          <View style={[styles.dot, { width: 6 }]} />
          <View style={[styles.dot, styles.dotActive]} />
          <View style={[styles.dot, { width: 6 }]} />
        </View>

        {/* Value Proposition */}
        <View style={styles.valueProp}>
          <View style={styles.kickerPill}>
            <Text style={styles.kickerPillText}>🔥 BROOKLYN ARTISANAL EATS</Text>
          </View>
          <Text style={styles.valueHeading}>Discover & Feast on Local Flavors</Text>
          <Text style={styles.valueSub}>
            Get food from Brooklyn's top artisanal kitchens delivered steaming hot to your doorstep in minutes.
          </Text>
        </View>

        {/* Location Action Surface Card */}
        <View style={styles.actionCard}>
          <View style={styles.pinCircle}>
            <Text style={{ fontSize: 26 }}>📍</Text>
          </View>
          <Text style={styles.cardHeading}>Where should we deliver?</Text>
          <Text style={styles.cardSub}>
            Enable location services to discover nearby kitchens, unlock local deals, and get real-time delivery estimates.
          </Text>

          <TouchableOpacity
            style={styles.primaryLocBtn}
            activeOpacity={0.9}
            onPress={handleUseLocation}
          >
            <Text style={styles.primaryLocBtnText}>🎯 Use Current Location</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.manualBtn} onPress={handleManual}>
            <Text style={styles.manualBtnText}>🔍 Enter Address Manually</Text>
          </TouchableOpacity>

          {feedback && (
            <View style={styles.toastBox}>
              <Text style={styles.toastText}>⚡ {feedback}</Text>
            </View>
          )}
        </View>

        <Text style={styles.trustFooter}>
          🔒 Your precise location is only used to deliver your hot food.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 8,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.primary,
  },
  skipBtn: {
    backgroundColor: Colors.surfaceContainerLow,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  skipText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    alignItems: 'center',
  },
  visualStage: {
    width: '100%',
    height: 220,
    borderRadius: 24,
    backgroundColor: Colors.surfaceContainerLow,
    overflow: 'hidden',
    marginTop: 8,
  },
  mapUnderlay: {
    flex: 1,
    backgroundColor: '#dbe2f9',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  organicBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  organicText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#065F46',
  },
  steamingBadge: {
    position: 'absolute',
    bottom: 20,
    right: 16,
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  steamingKicker: {
    fontSize: 8,
    fontWeight: '800',
    color: Colors.onSurfaceVariant,
  },
  steamingEta: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  centerBurgerPin: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  liveKitchensTag: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: Colors.inverseSurface,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveKitchensText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '700',
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    marginVertical: 14,
  },
  dot: {
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.surfaceContainerHigh,
  },
  dotActive: {
    width: 20,
    backgroundColor: Colors.primary,
  },
  valueProp: {
    alignItems: 'center',
    textAlign: 'center',
  },
  kickerPill: {
    backgroundColor: Colors.secondaryFixed,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    marginBottom: 6,
  },
  kickerPillText: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.onSecondaryFixed,
  },
  valueHeading: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.onSurface,
    textAlign: 'center',
  },
  valueSub: {
    fontSize: 13,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: 4,
    maxWidth: 280,
    lineHeight: 18,
  },
  actionCard: {
    width: '100%',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  pinCircle: {
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: Colors.secondaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  cardHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.onSurface,
  },
  cardSub: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
    lineHeight: 16,
  },
  primaryLocBtn: {
    width: '100%',
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryLocBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  manualBtn: {
    width: '100%',
    backgroundColor: Colors.surfaceContainerLow,
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
  },
  manualBtnText: {
    color: Colors.onSurface,
    fontSize: 13,
    fontWeight: '600',
  },
  toastBox: {
    marginTop: 10,
    backgroundColor: Colors.secondaryFixed,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  toastText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.onSecondaryFixed,
  },
  trustFooter: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: 16,
  },
});
