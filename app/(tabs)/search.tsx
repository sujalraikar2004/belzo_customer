import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Link2, Mic, Search, TrendingUp, X } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import { MOCK_RESTAURANTS } from '../../mock/restaurants';
import { useCartStore } from '../../store/useCartStore';

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('Biryani');
  const [activeTab, setActiveTab] = useState<'all' | 'dishes' | 'places'>('all');
  const { addItem } = useCartStore();

  const allDishes = MOCK_RESTAURANTS.flatMap((r) =>
    r.menuCategories.flatMap((c) => c.items)
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color={Colors.onSurface} size={20} strokeWidth={2.2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search & Filters</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Link2 color={Colors.onSurface} size={18} strokeWidth={2.1} />
        </TouchableOpacity>
      </View>

      {/* Search Input Bar */}
      <View style={styles.searchBar}>
        <Search color={Colors.onSurfaceVariant} size={17} strokeWidth={2.2} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search restaurants, dishes, cuisines..."
          style={styles.searchInput}
          placeholderTextColor={Colors.onSurfaceVariant}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')} style={styles.clearBtn}>
            <X color={Colors.onSurfaceVariant} size={14} strokeWidth={2.2} />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={{ marginLeft: 6 }}>
          <Mic color={Colors.primary} size={17} strokeWidth={2.2} />
        </TouchableOpacity>
      </View>

      {/* Trending Row */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.trendingScroll}>
        <View style={styles.trendingLabelRow}>
          <TrendingUp color={Colors.primary} size={15} strokeWidth={2.2} />
          <Text style={styles.trendingLabel}>Trending:</Text>
        </View>
        {['Butter Chicken', 'Smash Burger', 'Cold Brew', 'Thin Crust Pizza'].map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.trendingChip}
            onPress={() => setQuery(item)}
          >
            <Text style={styles.trendingChipText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Filter Tabs */}
      <View style={styles.tabContainer}>
        {(['all', 'dishes', 'places'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab === 'all' ? 'All (18)' : tab === 'dishes' ? 'Dishes (12)' : 'Places (6)'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Top Dish Matches */}
        {(activeTab === 'all' || activeTab === 'dishes') && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>🍔 Top Dish Matches</Text>
              <Text style={styles.seeAll}>See all 12 ›</Text>
            </View>

            {allDishes.slice(0, 3).map((dish) => (
              <View key={dish.id} style={styles.dishCard}>
                <View style={styles.dishDetails}>
                  <View style={styles.vegIndicatorRow}>
                    <View style={[styles.vegDot, { backgroundColor: dish.isVeg ? '#12B76A' : Colors.primary }]} />
                    {dish.isBestseller && (
                      <Text style={styles.bestsellerTag}>BESTSELLER</Text>
                    )}
                  </View>
                  <Text style={styles.dishName}>{dish.name}</Text>
                  <Text style={styles.dishRestaurant}>by {dish.restaurantName}</Text>
                  <Text style={styles.dishDescription} numberOfLines={2}>
                    {dish.description}
                  </Text>
                  <View style={styles.priceRow}>
                    <Text style={styles.dishPrice}>₹{dish.price}</Text>
                    <Text style={styles.dishRating}>★ {dish.rating}</Text>
                  </View>
                </View>
                <View style={styles.dishImageContainer}>
                  <Image source={{ uri: dish.image }} style={styles.dishImage} />
                  <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => addItem(dish)}
                  >
                    <Text style={styles.addBtnText}>ADD</Text>
                  </TouchableOpacity>
                  {dish.isCustomisable && (
                    <Text style={styles.customisableText}>Customisable</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Places Matches */}
        {(activeTab === 'all' || activeTab === 'places') && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>🏪 Restaurants Serving {query || 'Food'}</Text>
              <Text style={styles.seeAll}>See all 6 ›</Text>
            </View>

            {MOCK_RESTAURANTS.map((rest) => (
              <TouchableOpacity
                key={`search-rest-${rest.id}`}
                style={styles.placeCard}
                activeOpacity={0.9}
                onPress={() => router.push(`/restaurant/${rest.id}`)}
              >
                <Image source={{ uri: rest.image }} style={styles.placeImage} />
                <View style={styles.placeDetails}>
                  <View style={styles.rowBetween}>
                    <Text style={styles.placeName}>{rest.name}</Text>
                    <Text style={styles.placeRating}>★ {rest.rating} ({rest.reviewCount})</Text>
                  </View>
                  <Text style={styles.placeCuisines}>{rest.cuisines.join(' • ')}</Text>
                  <Text style={styles.placeMeta}>
                    📍 {rest.distanceKm} km away • {rest.priceRating} • ₹{rest.priceForTwo} for two
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
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
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  iconButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: Colors.surfaceContainerLow,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.onSurface,
  },
  clearBtn: {
    padding: 4,
  },
  trendingScroll: {
    paddingLeft: 16,
    marginVertical: 6,
  },
  trendingLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginRight: 8,
  },
  trendingLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.secondary,
    marginRight: 8,
    alignSelf: 'center',
  },
  trendingChip: {
    backgroundColor: Colors.surfaceContainerLowest,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  trendingChipText: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 12,
    padding: 3,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabButtonActive: {
    backgroundColor: Colors.surfaceContainerLowest,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.onSurfaceVariant,
  },
  tabTextActive: {
    color: Colors.onSurface,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  seeAll: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
  },
  dishCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainerLowest,
    padding: 14,
    borderRadius: 16,
    marginBottom: 12,
  },
  dishDetails: {
    flex: 1,
    paddingRight: 10,
  },
  vegIndicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 6,
  },
  vegDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  bestsellerTag: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.primary,
    backgroundColor: Colors.primaryFixed,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  dishName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  dishRestaurant: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    marginBottom: 4,
  },
  dishDescription: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    lineHeight: 16,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  dishPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  dishRating: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D97706',
    backgroundColor: '#FEF3F2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  dishImageContainer: {
    alignItems: 'center',
  },
  dishImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
  },
  addBtn: {
    marginTop: -14,
    backgroundColor: Colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  addBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
  },
  customisableText: {
    fontSize: 9,
    color: Colors.onSurfaceVariant,
    marginTop: 4,
  },
  placeCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 14,
  },
  placeImage: {
    width: '100%',
    height: 140,
  },
  placeDetails: {
    padding: 12,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.onSurface,
    flex: 1,
  },
  placeRating: {
    fontSize: 12,
    fontWeight: '600',
    color: '#D97706',
  },
  placeCuisines: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  placeMeta: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    marginTop: 4,
  },
});
