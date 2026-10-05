import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Bell, ChevronDown, MapPin, Mic, Search } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import { MOCK_RESTAURANTS } from '../../mock/restaurants';
import { useCartStore } from '../../store/useCartStore';
import { useFavoritesStore } from '../../store/useFavoritesStore';

const CUISINES = [
  { id: 'c1', name: 'Biryani', icon: '🍲' },
  { id: 'c2', name: 'Burgers', icon: '🍔' },
  { id: 'c3', name: 'Pizza', icon: '🍕' },
  { id: 'c4', name: 'South Indian', icon: '🥞' },
  { id: 'c5', name: 'Asian & Wok', icon: '🍜' },
  { id: 'c6', name: 'Healthy Bowls', icon: '🥗' },
  { id: 'c7', name: 'Desserts', icon: '🍰' },
];

export default function HomeScreen() {
  const router = useRouter();
  const { items, getBill } = useCartStore();
  const { isRestaurantFavorite, toggleRestaurantFavorite } = useFavoritesStore();
  const [activeFilter, setActiveFilter] = useState<string>('fast');
  const bill = getBill();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.brandTitle}>Belzo</Text>
          <TouchableOpacity
            style={styles.locationSelector}
            onPress={() => router.push('/onboarding/location')}
          >
            <MapPin color={Colors.primary} size={14} strokeWidth={2.4} />
            <Text style={styles.locationText}>742 Evergreen Terrace, Brooklyn</Text>
            <ChevronDown color={Colors.onSurfaceVariant} size={14} strokeWidth={2.4} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Bell color={Colors.onSurface} size={19} strokeWidth={2.1} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDum-ScP0BooVlWTWAYgIxrROG16D2v9gG5QoXBBl48UE40YLlRjqChTvH0Ci0_4hgSvmKAxTkttiux84sMUUCKeVmb9mQHM8rUruZkHB__YobOuDYp4IBy5igEZQ_zsEaT2pidvArcoryZAMu-EhbuuT_3Iz97GFh-oASmrzIk42NUeTv-PsiuiZiJGWXVqSs9MhPQzgDheEKZcUPK7ZfPfe7R7ebZsX9AVIbnInrhsDLIBlT16e2Y',
              }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Search Bar */}
        <TouchableOpacity
          style={styles.searchBar}
          activeOpacity={0.9}
          onPress={() => router.push('/(tabs)/search')}
        >
          <Search color={Colors.onSurfaceVariant} size={17} strokeWidth={2.2} />
          <Text style={styles.searchPlaceholder}>Craving Biryani, Gourmet Burgers, Pizza?</Text>
          <Mic color={Colors.primary} size={17} strokeWidth={2.2} />
        </TouchableOpacity>

        {/* Promo Banner Carousel */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.promoScroll}>
          <View style={[styles.promoCard, { backgroundColor: Colors.primary }]}>
            <View style={styles.promoBadge}>
              <Text style={styles.promoBadgeText}>🔥 SPECIAL DEAL</Text>
            </View>
            <Text style={styles.promoTitle}>FLAT 50% OFF</Text>
            <Text style={styles.promoSub}>Use Code: BELZOFIRST</Text>
            <Text style={styles.promoFooter}>Up to ₹150 • First 3 Orders</Text>
          </View>
          <View style={[styles.promoCard, { backgroundColor: Colors.secondary }]}>
            <View style={styles.promoBadge}>
              <Text style={styles.promoBadgeText}>🛵 ZERO DELIVERY FEE</Text>
            </View>
            <Text style={styles.promoTitle}>Free Delivery Day</Text>
            <Text style={styles.promoSub}>Valid on all chef kitchens</Text>
            <Text style={styles.promoFooter}>Orders above ₹199</Text>
          </View>
        </ScrollView>

        {/* Cuisine Bubbles */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Explore Cuisines</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/search')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cuisineScroll}>
          {CUISINES.map((c) => (
            <TouchableOpacity
              key={c.id}
              style={styles.cuisineItem}
              onPress={() => router.push('/(tabs)/search')}
            >
              <View style={styles.cuisineIconBox}>
                <Text style={{ fontSize: 26 }}>{c.icon}</Text>
              </View>
              <Text style={styles.cuisineLabel}>{c.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Filter Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {[
            { id: 'fast', label: '⚡ Fast Delivery (<30m)' },
            { id: 'veg', label: '🟢 Pure Veg' },
            { id: 'rating', label: '⭐ Rating 4.5+' },
            { id: 'offers', label: '🏷️ Offers' },
          ].map((f) => (
            <TouchableOpacity
              key={f.id}
              style={[
                styles.filterPill,
                activeFilter === f.id && styles.filterPillActive,
              ]}
              onPress={() => setActiveFilter(f.id)}
            >
              <Text
                style={[
                  styles.filterPillText,
                  activeFilter === f.id && styles.filterPillTextActive,
                ]}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Recommended For You */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Recommended for You</Text>
            <Text style={styles.sectionSubtitle}>Top-rated spots based on your taste</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.seeAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardScroll}>
          {MOCK_RESTAURANTS.map((rest) => (
            <TouchableOpacity
              key={rest.id}
              style={styles.restaurantCard}
              activeOpacity={0.9}
              onPress={() => router.push(`/restaurant/${rest.id}`)}
            >
              <Image source={{ uri: rest.image }} style={styles.restaurantCardImage} />
              {rest.offerText && (
                <View style={styles.offerTag}>
                  <Text style={styles.offerTagText}>{rest.offerText}</Text>
                </View>
              )}
              <TouchableOpacity
                style={styles.favoriteBtn}
                onPress={() => toggleRestaurantFavorite(rest.id)}
              >
                <Text style={{ fontSize: 16 }}>
                  {isRestaurantFavorite(rest.id) ? '❤️' : '🤍'}
                </Text>
              </TouchableOpacity>
              <View style={styles.etaBadge}>
                <Text style={styles.etaText}>⏱ {rest.deliveryTime}</Text>
              </View>
              <View style={styles.restaurantCardContent}>
                <View style={styles.rowBetween}>
                  <Text style={styles.restaurantName} numberOfLines={1}>
                    {rest.name}
                  </Text>
                  <Text style={styles.ratingBadge}>★ {rest.rating}</Text>
                </View>
                <Text style={styles.restaurantCuisines} numberOfLines={1}>
                  {rest.cuisines.join(' • ')}
                </Text>
                <View style={styles.rowBetween}>
                  <Text style={styles.metaText}>
                    {rest.priceRating} • {rest.distanceKm} km
                  </Text>
                  <Text style={styles.deliveryBadge}>FAST DELIVERY</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Popular Near You */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Popular Near You</Text>
            <Text style={styles.sectionSubtitle}>Locals' go-to cravings delivered fast</Text>
          </View>
        </View>

        {MOCK_RESTAURANTS.map((rest) => (
          <TouchableOpacity
            key={`vertical-${rest.id}`}
            style={styles.verticalCard}
            activeOpacity={0.9}
            onPress={() => router.push(`/restaurant/${rest.id}`)}
          >
            <Image source={{ uri: rest.image }} style={styles.verticalImage} />
            <View style={styles.verticalCardContent}>
              <View style={styles.rowBetween}>
                <Text style={styles.restaurantName}>{rest.name}</Text>
                <Text style={styles.ratingBadge}>★ {rest.rating}</Text>
              </View>
              <Text style={styles.restaurantCuisines}>{rest.cuisines.join(' • ')}</Text>
              <Text style={styles.metaText}>
                ⏱ {rest.deliveryTime} • {rest.distanceKm} km • ₹{rest.priceForTwo} for two
              </Text>
              {rest.mustTryDishes && rest.mustTryDishes.length > 0 && (
                <View style={styles.mustTryRow}>
                  <Text style={styles.mustTryLabel}>MUST TRY:</Text>
                  {rest.mustTryDishes.map((dish, i) => (
                    <View key={i} style={styles.mustTryChip}>
                      <Text style={styles.mustTryChipText}>
                        {dish.name} <Text style={{ color: Colors.primary }}>₹{dish.price}</Text>
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Floating Cart Bar (if items exist) */}
      {items.length > 0 && (
        <TouchableOpacity
          style={styles.floatingCartBar}
          activeOpacity={0.9}
          onPress={() => router.push('/cart')}
        >
          <View style={styles.cartInfo}>
            <View style={styles.cartCountBadge}>
              <Text style={styles.cartCountText}>{items.length}</Text>
            </View>
            <Text style={styles.cartText}>
              {items.length} {items.length === 1 ? 'item' : 'items'} • ₹{bill.toPay}
            </Text>
          </View>
          <Text style={styles.viewCartText}>View Cart →</Text>
        </TouchableOpacity>
      )}
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
    paddingBottom: 12,
    backgroundColor: Colors.surface,
  },
  headerLeft: {
    flex: 1,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.primary,
  },
  locationSelector: {
    marginTop: 2,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.onSurface,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  scrollContent: {
    paddingBottom: 90,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: Colors.surfaceContainerLowest,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  searchPlaceholder: {
    fontSize: 13,
    color: Colors.onSurfaceVariant,
    flex: 1,
  },
  promoScroll: {
    paddingLeft: 16,
    marginVertical: 8,
  },
  promoCard: {
    width: 300,
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
  },
  promoBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  promoBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  promoTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
    marginTop: 6,
  },
  promoSub: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
    marginTop: 2,
  },
  promoFooter: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  seeAll: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
  },
  cuisineScroll: {
    paddingLeft: 16,
    marginBottom: 12,
  },
  cuisineItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  cuisineIconBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cuisineLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.onSurface,
    marginTop: 6,
  },
  filterScroll: {
    paddingLeft: 16,
    marginBottom: 12,
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.surfaceContainerLowest,
    marginRight: 8,
  },
  filterPillActive: {
    backgroundColor: Colors.onSurface,
  },
  filterPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.onSurface,
  },
  filterPillTextActive: {
    color: Colors.surface,
  },
  cardScroll: {
    paddingLeft: 16,
    marginBottom: 16,
  },
  restaurantCard: {
    width: 270,
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    marginRight: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  restaurantCardImage: {
    width: '100%',
    height: 150,
  },
  offerTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  offerTagText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  favoriteBtn: {
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
  etaBadge: {
    position: 'absolute',
    bottom: 95,
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
  restaurantCardContent: {
    padding: 12,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  restaurantName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.onSurface,
    flex: 1,
  },
  ratingBadge: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D97706',
    backgroundColor: '#FEF3F2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  restaurantCuisines: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    marginVertical: 4,
  },
  metaText: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
  },
  deliveryBadge: {
    fontSize: 10,
    fontWeight: '700',
    color: '#12B76A',
  },
  verticalCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  verticalImage: {
    width: '100%',
    height: 160,
  },
  verticalCardContent: {
    padding: 14,
  },
  mustTryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  mustTryLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
  },
  mustTryChip: {
    backgroundColor: Colors.surfaceContainerLow,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  mustTryChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.onSurface,
  },
  floatingCartBar: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: Colors.primary,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 14,
    shadowColor: '#b61715',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  cartInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cartCountBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartCountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  cartText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  viewCartText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});
