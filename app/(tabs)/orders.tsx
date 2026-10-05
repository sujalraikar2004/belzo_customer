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
import { Colors } from '../../theme/colors';
import { MOCK_ORDERS } from '../../mock/orders';

export default function OrdersScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'active' | 'past' | 'cancelled'>('active');
  const activeOrder = MOCK_ORDERS[0];
  const pastOrders = MOCK_ORDERS.slice(1);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Order History & Details</Text>
      </View>

      {/* Segmented Filter */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'active' && styles.tabButtonActive]}
          onPress={() => setActiveTab('active')}
        >
          <View style={styles.pulseDot} />
          <Text style={[styles.tabText, activeTab === 'active' && styles.tabTextActive]}>
            Active (1)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'past' && styles.tabButtonActive]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.tabTextActive]}>
            Past ({pastOrders.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'cancelled' && styles.tabButtonActive]}
          onPress={() => setActiveTab('cancelled')}
        >
          <Text style={[styles.tabText, activeTab === 'cancelled' && styles.tabTextActive]}>
            Cancelled (0)
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Active Order Spotlight */}
        {(activeTab === 'active' || activeTab === 'past') && (
          <View style={styles.spotlightSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Ongoing Feast</Text>
              <View style={styles.liveTrackerBadge}>
                <Text style={styles.liveTrackerText}>LIVE TRACKER</Text>
              </View>
            </View>

            <View style={styles.spotlightCard}>
              <View style={styles.rowBetween}>
                <View style={styles.restInfo}>
                  <Image source={{ uri: activeOrder.restaurantImage }} style={styles.restAvatar} />
                  <View>
                    <Text style={styles.restName}>{activeOrder.restaurantName}</Text>
                    <Text style={styles.orderRef}>
                      Order {activeOrder.id} • Delivery by {activeOrder.courier?.name}
                    </Text>
                  </View>
                </View>
                <Text style={{ fontSize: 24 }}>🛵</Text>
              </View>

              {/* Status Progress Bar */}
              <View style={styles.progressBox}>
                <View style={styles.rowBetween}>
                  <View style={styles.rowCenter}>
                    <View style={styles.statusPulse} />
                    <Text style={styles.statusText}>{activeOrder.statusLabel}</Text>
                  </View>
                  <Text style={styles.arrivingText}>Arriving in ~18 mins</Text>
                </View>
                <View style={styles.progressBarTrack}>
                  <View style={[styles.progressBarFill, { width: '72%' }]} />
                </View>
              </View>

              <View style={styles.itemsSummaryRow}>
                <Text style={styles.itemsSummaryText} numberOfLines={1}>
                  Double Smash Truffle Burger + Peri-Peri Fries
                </Text>
                <Text style={styles.orderAmount}>₹{activeOrder.bill.toPay}</Text>
              </View>

              <View style={styles.spotlightActions}>
                <TouchableOpacity
                  style={styles.trackButton}
                  onPress={() => router.push('/order/track')}
                >
                  <Text style={styles.trackButtonText}>📍 Track Live Order</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.callButton}
                  onPress={() => router.push('/chat/driver')}
                >
                  <Text style={styles.callButtonText}>📞 Call Partner</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Past Orders */}
        <View style={styles.pastSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Experiences</Text>
            <Text style={styles.seeAll}>View all ›</Text>
          </View>

          {pastOrders.map((ord) => (
            <View key={ord.id} style={styles.pastCard}>
              <View style={styles.rowBetween}>
                <View style={styles.restInfo}>
                  <Image source={{ uri: ord.restaurantImage }} style={styles.restAvatarSmall} />
                  <View>
                    <Text style={styles.restName}>{ord.restaurantName}</Text>
                    <Text style={styles.orderRef}>{ord.statusLabel}</Text>
                  </View>
                </View>
                <View style={styles.deliveredTag}>
                  <Text style={styles.deliveredText}>✓ Delivered</Text>
                </View>
              </View>

              <View style={styles.pastSummaryRow}>
                <Text style={styles.pastSummaryText}>
                  Dum Mutton Biryani (x1), Garlic Naan (x2)
                </Text>
                <Text style={styles.pastAmount}>₹{ord.bill.toPay}</Text>
              </View>

              <View style={styles.ratingRow}>
                <Text style={styles.ratingLabel}>Rate food experience:</Text>
                <TouchableOpacity
                  onPress={() => router.push(`/rating/${ord.id}`)}
                  style={styles.starsTouch}
                >
                  <Text style={{ fontSize: 16 }}>⭐⭐⭐⭐⭐</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.pastCardActions}>
                <TouchableOpacity style={styles.reorderBtn}>
                  <Text style={styles.reorderBtnText}>↺ Reorder</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.invoiceBtn}>
                  <Text style={styles.invoiceBtnText}>🧾 Invoice</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
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
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 24,
    padding: 3,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  tabButtonActive: {
    backgroundColor: Colors.surfaceContainerLowest,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.onSurfaceVariant,
  },
  tabTextActive: {
    color: Colors.onSurface,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  spotlightSection: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  liveTrackerBadge: {
    backgroundColor: Colors.errorContainer,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  liveTrackerText: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: '700',
  },
  spotlightCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  restInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  restAvatar: {
    width: 44,
    height: 44,
    borderRadius: 8,
  },
  restAvatarSmall: {
    width: 38,
    height: 38,
    borderRadius: 8,
  },
  restName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  orderRef: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
  },
  progressBox: {
    backgroundColor: Colors.secondaryFixed,
    padding: 10,
    borderRadius: 10,
    marginVertical: 12,
  },
  statusPulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.onSecondaryFixed,
  },
  arrivingText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.secondary,
  },
  progressBarTrack: {
    height: 4,
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 2,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 4,
    backgroundColor: Colors.primary,
  },
  itemsSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  itemsSummaryText: {
    fontSize: 13,
    color: Colors.onSurface,
    flex: 1,
    paddingRight: 8,
  },
  orderAmount: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  spotlightActions: {
    flexDirection: 'row',
    gap: 10,
  },
  trackButton: {
    flex: 3,
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
  },
  trackButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  callButton: {
    flex: 2,
    backgroundColor: Colors.surfaceContainerLow,
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
  },
  callButtonText: {
    color: Colors.onSurface,
    fontSize: 13,
    fontWeight: '600',
  },
  pastSection: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  seeAll: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
  },
  pastCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
  deliveredTag: {
    backgroundColor: Colors.surfaceContainerLow,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  deliveredText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.onSurface,
  },
  pastSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.surfaceContainerLow,
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  pastSummaryText: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    flex: 1,
  },
  pastAmount: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingLabel: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
  },
  starsTouch: {
    padding: 4,
  },
  pastCardActions: {
    flexDirection: 'row',
    gap: 8,
  },
  reorderBtn: {
    flex: 1,
    backgroundColor: Colors.secondaryFixed,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  reorderBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.onSecondaryFixed,
  },
  invoiceBtn: {
    paddingHorizontal: 14,
    backgroundColor: Colors.surfaceContainerLow,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  invoiceBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.onSurface,
  },
});
