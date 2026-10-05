import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../theme/colors';
import { MOCK_RESTAURANTS } from '../mock/restaurants';
import { useCartStore } from '../store/useCartStore';

export default function FavoritesScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'places' | 'bites'>('places');
  const { addItem } = useCartStore();

  const favoriteRestaurants = MOCK_RESTAURANTS.slice(0, 3);
  const repeatBites = [
    {
      dish: MOCK_RESTAURANTS[0].menuCategories[0].items[0],
      restName: 'The Urban Grill',
      count: 'Ordered 5 times',
    },
    {
      dish: MOCK_RESTAURANTS[3].menuCategories[0].items[0],
      restName: 'Dawat-e-Khaas Royal Kitchen',
      count: 'Ordered 3 times',
    },
    {
      dish: MOCK_RESTAURANTS[1].menuCategories[0].items[0],
      restName: 'Bella Napoli Woodfired Pizza',
      count: 'Ordered 2 times',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={{ fontSize: 20 }}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favorites</Text>
        <TouchableOpacity style={styles.helpBtn}>
          <Text style={{ fontSize: 16 }}>❓</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Love Story Header */}
        <View style={styles.banner}>
          <View style={styles.rowBetween}>
            <Text style={styles.bannerHeading}>Your Food Love Story ❤️</Text>
            <View style={styles.readyBadge}>
              <Text style={styles.readyBadgeText}>READY TO ORDER</Text>
            </View>
          </View>
          <Text style={styles.bannerSub}>20 handpicked spots & cravings on speed dial</Text>
        </View>

        {/* Tab Switcher */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'places' && styles.tabBtnActive]}
            onPress={() => setActiveTab('places')}
          >
            <Text style={[styles.tabText, activeTab === 'places' && styles.tabTextActive]}>
              🏪 Saved Places (6)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'bites' && styles.tabBtnActive]}
            onPress={() => setActiveTab('bites')}
          >
            <Text style={[styles.tabText, activeTab === 'bites' && styles.tabTextActive]}>
              🍔 Favorite Bites (14)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Saved Restaurants List */}
        {activeTab === 'places' && (
          <View style={styles.section}>
            {favoriteRestaurants.map((rest) => (
              <TouchableOpacity
                key={rest.id}
                style={styles.card}
                activeOpacity={0.9}
                onPress={() => router.push(`/restaurant/${rest.id}`)}
              >
                <Image source={{ uri: rest.image }} style={styles.cardImage} />
                <View style={styles.favoriteHeart}>
                  <Text style={{ fontSize: 14 }}>❤️</Text>
                </View>
                {rest.offerText && (
                  <View style={styles.offerTag}>
                    <Text style={styles.offerTagText}>{rest.offerText}</Text>
                  </View>
                )}
                <View style={styles.etaTag}>
                  <Text style={styles.etaText}>⏱ {rest.deliveryTime} • {rest.distanceKm} km</Text>
                </View>
                <View style={styles.cardBody}>
                  <View style={styles.rowBetween}>
                    <Text style={styles.restName}>{rest.name}</Text>
                    <Text style={styles.ratingText}>★ {rest.rating}</Text>
                  </View>
                  <Text style={styles.cuisinesText}>{rest.cuisines.join(' • ')}</Text>
                  {rest.mustTryDishes && rest.mustTryDishes[0] && (
                    <View style={styles.mustTryRow}>
                      <Text style={styles.mustTryText}>👍 {rest.mustTryDishes[0].name}</Text>
                      <Text style={styles.mustTryPrice}>₹{rest.mustTryDishes[0].price}</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Repeat Cravings */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Speedy Repeat Cravings</Text>
          <Text style={styles.instantOrderTag}>INSTANT ORDER</Text>
        </View>

        {repeatBites.map((bite, idx) => (
          <View key={idx} style={styles.biteCard}>
            <View style={styles.biteInfo}>
              <Text style={styles.biteRest}>{bite.restName}</Text>
              <Text style={styles.biteName}>{bite.dish.name}</Text>
              <Text style={styles.biteDesc} numberOfLines={2}>{bite.dish.description}</Text>
              <View style={styles.rowCenter}>
                <Text style={styles.bitePrice}>₹{bite.dish.price}</Text>
                <Text style={styles.biteCount}>↺ {bite.count}</Text>
              </View>
            </View>
            <View style={styles.biteActionCol}>
              <Image source={{ uri: bite.dish.image }} style={styles.biteImage} />
              <TouchableOpacity
                style={styles.reorderBtn}
                onPress={() => addItem(bite.dish)}
              >
                <Text style={styles.reorderBtnText}>+ REORDER</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  helpBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  banner: {
    marginVertical: 10,
  },
  bannerHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.onSurface,
  },
  bannerSub: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  readyBadge: {
    backgroundColor: Colors.secondaryFixed,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  readyBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.onSecondaryFixed,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 20,
    padding: 3,
    marginVertical: 10,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 18,
  },
  tabBtnActive: {
    backgroundColor: Colors.surfaceContainerLowest,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.onSurfaceVariant,
  },
  tabTextActive: {
    color: Colors.onSurface,
  },
  section: {
    marginTop: 8,
  },
  card: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 14,
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  favoriteHeart: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  offerTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  offerTagText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '700',
  },
  etaTag: {
    position: 'absolute',
    bottom: 80,
    left: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  etaText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  cardBody: {
    padding: 12,
  },
  restName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D97706',
  },
  cuisinesText: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  mustTryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.surfaceContainerLow,
    padding: 6,
    borderRadius: 6,
    marginTop: 8,
  },
  mustTryText: {
    fontSize: 11,
    color: Colors.onSurface,
  },
  mustTryPrice: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  instantOrderTag: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.primary,
  },
  biteCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
  },
  biteInfo: {
    flex: 1,
    paddingRight: 10,
  },
  biteRest: {
    fontSize: 10,
    color: Colors.onSurfaceVariant,
    fontWeight: '600',
  },
  biteName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    marginTop: 1,
  },
  biteDesc: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    marginVertical: 4,
  },
  bitePrice: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  biteCount: {
    fontSize: 10,
    color: Colors.onSurfaceVariant,
  },
  biteActionCol: {
    alignItems: 'center',
  },
  biteImage: {
    width: 64,
    height: 64,
    borderRadius: 10,
  },
  reorderBtn: {
    marginTop: 6,
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  reorderBtnText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '800',
  },
});
