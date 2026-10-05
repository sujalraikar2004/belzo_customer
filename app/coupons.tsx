import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../theme/colors';
import { MOCK_COUPONS } from '../mock/coupons';
import { useCartStore } from '../store/useCartStore';

export default function CouponsScreen() {
  const router = useRouter();
  const [couponInput, setCouponInput] = useState('');
  const { applyCoupon, appliedCoupon } = useCartStore();

  const handleApply = (code: string) => {
    applyCoupon(code);
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={{ fontSize: 20 }}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Coupons</Text>
        <TouchableOpacity style={styles.helpBtn}>
          <Text style={{ fontSize: 16 }}>❓</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Manual Coupon Code Input */}
        <View style={styles.inputCard}>
          <TextInput
            value={couponInput}
            onChangeText={setCouponInput}
            placeholder="Enter coupon code"
            style={styles.couponInput}
            placeholderTextColor={Colors.onSurfaceVariant}
            autoCapitalize="characters"
          />
          <TouchableOpacity
            style={styles.applyBtn}
            onPress={() => couponInput && handleApply(couponInput)}
          >
            <Text style={styles.applyBtnText}>Apply</Text>
          </TouchableOpacity>
        </View>

        {/* Belzo Gold VIP Exclusive Banner */}
        <View style={styles.goldVipBanner}>
          <View style={styles.goldBadge}>
            <Text style={styles.goldBadgeText}>BELZO GOLD VIP</Text>
          </View>
          <Text style={styles.goldTitle}>50% OFF up to ₹150 + Free Delivery</Text>
          <Text style={styles.goldSub}>
            Unlocked with your Gold tier membership on all partner restaurants
          </Text>
          <View style={styles.rowBetween}>
            <Text style={styles.goldStatus}>🟢 Auto-applies at checkout</Text>
            <Text style={styles.goldTierLabel}>Active Tier</Text>
          </View>
        </View>

        {/* Best Offers */}
        <View style={styles.rowBetween}>
          <Text style={styles.sectionHeading}>Best Offers For You</Text>
          <Text style={styles.availableCount}>{MOCK_COUPONS.length} Available</Text>
        </View>

        {MOCK_COUPONS.map((c) => (
          <View key={c.code} style={styles.couponCard}>
            <View style={styles.rowBetween}>
              <View style={styles.couponCodePill}>
                <Text style={styles.couponCodeText}>✂ {c.code}</Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.cardApplyBtn,
                  appliedCoupon === c.code && { backgroundColor: Colors.surfaceContainerLow },
                ]}
                onPress={() => handleApply(c.code)}
              >
                <Text
                  style={[
                    styles.cardApplyText,
                    appliedCoupon === c.code && { color: Colors.onSurface },
                  ]}
                >
                  {appliedCoupon === c.code ? 'APPLIED' : 'APPLY'}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.couponTitle}>{c.title}</Text>
            <Text style={styles.couponDesc}>{c.description}</Text>

            <View style={styles.divider} />

            <View style={styles.rowBetween}>
              <Text style={styles.termsText}>View Terms & Conditions ▾</Text>
              <View style={styles.expiresPill}>
                <Text style={styles.expiresText}>⏱ {c.expiresText}</Text>
              </View>
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
  inputCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLowest,
    padding: 8,
    borderRadius: 16,
    marginVertical: 12,
  },
  couponInput: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 14,
    color: Colors.onSurface,
    fontWeight: '700',
  },
  applyBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
  },
  applyBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  goldVipBanner: {
    backgroundColor: '#1E1B18',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  goldBadge: {
    backgroundColor: '#FDE047',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  goldBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#000',
  },
  goldTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFF3DC',
    marginTop: 6,
  },
  goldSub: {
    fontSize: 11,
    color: '#D7C4B7',
    marginTop: 2,
    marginBottom: 12,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goldStatus: {
    fontSize: 11,
    color: '#E7D6CE',
  },
  goldTierLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FDE047',
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.onSurface,
    marginVertical: 8,
  },
  availableCount: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
  },
  couponCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  couponCodePill: {
    backgroundColor: Colors.surfaceContainerLow,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  couponCodeText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 1,
  },
  cardApplyBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  cardApplyText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '800',
  },
  couponTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.onSurface,
    marginTop: 8,
  },
  couponDesc: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.surfaceContainerLow,
    marginVertical: 10,
  },
  termsText: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
  },
  expiresPill: {
    backgroundColor: Colors.secondaryFixed,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  expiresText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.onSecondaryFixed,
  },
});
