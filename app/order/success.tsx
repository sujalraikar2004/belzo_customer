import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../theme/colors';
import { useCartStore } from '../../store/useCartStore';

export default function OrderSuccessScreen() {
  const router = useRouter();
  const { items, getBill, clearCart } = useCartStore();
  const bill = getBill();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/(tabs)')} style={styles.closeBtn}>
          <Text style={{ fontSize: 18 }}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Success</Text>
        <TouchableOpacity style={styles.helpBtn}>
          <Text style={{ fontSize: 16 }}>❓</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Animated Celebration Icon */}
        <View style={styles.celebrationCenter}>
          <View style={styles.successIconCircle}>
            <Text style={{ fontSize: 36 }}>✓</Text>
          </View>
          <Text style={styles.successHeading}>Order Placed Successfully!</Text>
          <Text style={styles.successSub}>Delicious bites are on their way to your table</Text>

          {/* Order ID Pill */}
          <TouchableOpacity style={styles.orderIdPill} onPress={handleCopy}>
            <Text style={styles.orderIdLabel}>Order ID: </Text>
            <Text style={styles.orderIdVal}>#BZ-89421</Text>
            <Text style={styles.copyIcon}>{copied ? '✓' : '📋'}</Text>
          </TouchableOpacity>
        </View>

        {/* Kitchen Active Card */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <View style={styles.rowCenter}>
              <View style={styles.kitchenIcon}>
                <Text style={{ fontSize: 18 }}>🍳</Text>
              </View>
              <View>
                <View style={styles.kitchenBadge}>
                  <Text style={styles.kitchenBadgeText}>KITCHEN ACTIVE</Text>
                </View>
                <Text style={styles.kitchenName}>The Urban Grill</Text>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.etaLabel}>Estimated ETA</Text>
              <Text style={styles.etaVal}>22–28 mins</Text>
            </View>
          </View>

          <View style={styles.stepProgressBox}>
            <View style={styles.rowBetween}>
              <Text style={styles.stepTitle}>🟢 Restaurant accepted & prepping</Text>
              <Text style={styles.stepSub}>Step 2 of 4</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '48%' }]} />
            </View>
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.metaInfo}>📍 1.4 km away</Text>
            <Text style={styles.metaInfo}>✓ Freshly grilled prep</Text>
          </View>
        </View>

        {/* Belzo Gold Coins Earned Banner */}
        <View style={styles.goldCoinsCard}>
          <View style={styles.goldStarCircle}>
            <Text style={{ fontSize: 18 }}>⭐</Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.goldBadge}>
              <Text style={styles.goldBadgeText}>BELZO GOLD</Text>
            </View>
            <Text style={styles.coinsTitle}>35 Coins Earned! 🪙</Text>
            <Text style={styles.coinsSub}>Credited instantly to your loyalty wallet</Text>
          </View>
          <Text style={{ fontSize: 16 }}>›</Text>
        </View>

        {/* Order Summary Card */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.cardHeading}>Order Summary</Text>
            <Text style={styles.itemCountText}>3 Items</Text>
          </View>
          <View style={styles.itemsList}>
            <View style={styles.rowBetween}>
              <Text style={styles.itemName}>1x Double Smash Truffle Burger</Text>
              <Text style={styles.itemPrice}>₹389.00</Text>
            </View>
            <View style={styles.rowBetween}>
              <Text style={styles.itemName}>1x Crispy Peri-Peri Fries</Text>
              <Text style={styles.itemPrice}>₹149.00</Text>
            </View>
            <View style={styles.rowBetween}>
              <Text style={styles.itemName}>1x Vanilla Bean Thickshake</Text>
              <Text style={styles.itemPrice}>₹165.65</Text>
            </View>
          </View>

          <View style={styles.paymentCompletedRow}>
            <View style={styles.rowCenter}>
              <Text style={{ fontSize: 16 }}>💳</Text>
              <View>
                <Text style={styles.paidMethod}>Paid via Google Pay UPI</Text>
                <Text style={styles.paidSuccess}>Payment Completed</Text>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalAmount}>₹703.65</Text>
            </View>
          </View>
        </View>

        {/* Delivery Address */}
        <View style={styles.card}>
          <View style={styles.rowCenter}>
            <View style={styles.homeCircle}>
              <Text style={{ fontSize: 16 }}>🏠</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.rowBetween}>
                <Text style={styles.deliverHeading}>Deliver to Home</Text>
                <View style={styles.contactlessTag}>
                  <Text style={styles.contactlessText}>CONTACTLESS</Text>
                </View>
              </View>
              <Text style={styles.deliverAddress}>Flat 402, Sunset Heights, Brooklyn</Text>
              <Text style={styles.deliverPhone}>📞 +1 555 234-8901</Text>
            </View>
          </View>
        </View>

        {/* CTA Buttons */}
        <TouchableOpacity
          style={styles.trackLiveBtn}
          activeOpacity={0.9}
          onPress={() => router.push('/order/track')}
        >
          <Text style={styles.trackLiveBtnText}>🔴 Track Live Order</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.invoiceBtn}
          onPress={() => router.push('/(tabs)/orders')}
        >
          <Text style={styles.invoiceBtnText}>🧾 Download Invoice / View Receipt</Text>
        </TouchableOpacity>
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
  closeBtn: {
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
  celebrationCenter: {
    alignItems: 'center',
    marginVertical: 16,
  },
  successIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#12B76A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  successHeading: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.onSurface,
  },
  successSub: {
    fontSize: 13,
    color: Colors.onSurfaceVariant,
    marginTop: 4,
  },
  orderIdPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerHigh,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
  },
  orderIdLabel: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
  },
  orderIdVal: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.onSurface,
  },
  copyIcon: {
    fontSize: 12,
    marginLeft: 6,
  },
  card: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
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
  kitchenIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.secondaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kitchenBadge: {
    backgroundColor: Colors.primaryFixed,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  kitchenBadgeText: {
    fontSize: 8,
    fontWeight: '800',
    color: Colors.primary,
  },
  kitchenName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.onSurface,
    marginTop: 2,
  },
  etaLabel: {
    fontSize: 10,
    color: Colors.onSurfaceVariant,
  },
  etaVal: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.primary,
  },
  stepProgressBox: {
    backgroundColor: Colors.surfaceContainerLow,
    padding: 10,
    borderRadius: 10,
    marginVertical: 12,
  },
  stepTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#12B76A',
  },
  stepSub: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.surfaceContainerHigh,
    borderRadius: 2,
    marginTop: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: 4,
    backgroundColor: '#12B76A',
  },
  metaInfo: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
  },
  goldCoinsCard: {
    backgroundColor: '#FEF08A',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  goldStarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FDE047',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goldBadge: {
    backgroundColor: '#CA8A04',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  goldBadgeText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#fff',
  },
  coinsTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#713F12',
    marginTop: 2,
  },
  coinsSub: {
    fontSize: 11,
    color: '#854D0E',
  },
  cardHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  itemCountText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  itemsList: {
    gap: 8,
    marginVertical: 12,
  },
  itemName: {
    fontSize: 13,
    color: Colors.onSurface,
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  paymentCompletedRow: {
    backgroundColor: Colors.surfaceContainerLow,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paidMethod: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
  },
  paidSuccess: {
    fontSize: 12,
    fontWeight: '700',
    color: '#12B76A',
  },
  totalLabel: {
    fontSize: 10,
    color: Colors.onSurfaceVariant,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.onSurface,
  },
  homeCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.secondaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deliverHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  contactlessTag: {
    backgroundColor: Colors.surfaceContainerHigh,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
  },
  contactlessText: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
  },
  deliverAddress: {
    fontSize: 12,
    color: Colors.onSurface,
    marginTop: 2,
  },
  deliverPhone: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  trackLiveBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 8,
  },
  trackLiveBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
  },
  invoiceBtn: {
    backgroundColor: Colors.secondaryFixed,
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
  },
  invoiceBtnText: {
    color: Colors.onSecondaryFixed,
    fontSize: 13,
    fontWeight: '700',
  },
});
