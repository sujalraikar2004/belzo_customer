import React from 'react';
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
import { useCartStore } from '../store/useCartStore';

export default function CartScreen() {
  const router = useRouter();
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    tipAmount,
    setTip,
    appliedCoupon,
    removeCoupon,
    deliveryInstructions,
    toggleInstruction,
    getBill,
  } = useCartStore();

  const bill = getBill();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={{ fontSize: 20 }}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cart & Checkout</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Text style={{ fontSize: 16 }}>🔗</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Restaurant Subheader Banner */}
        <View style={styles.restBanner}>
          <View style={styles.rowCenter}>
            <View style={styles.storeIcon}>
              <Text style={{ fontSize: 16 }}>🏪</Text>
            </View>
            <View>
              <View style={styles.rowCenter}>
                <Text style={styles.restName}>The Urban Grill</Text>
                <View style={styles.kmBadge}>
                  <Text style={styles.kmText}>1.4 km</Text>
                </View>
              </View>
              <Text style={styles.restSub}>Artisanal Gourmet Burgers & Shakes</Text>
            </View>
          </View>
          <TouchableOpacity onPress={clearCart}>
            <Text style={styles.clearCartText}>🗑️ Clear Cart</Text>
          </TouchableOpacity>
        </View>

        {/* Deliver to Home & Priority Window Card */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <View style={styles.rowCenter}>
              <Text style={{ fontSize: 20, marginRight: 8 }}>📍</Text>
              <View>
                <View style={styles.rowCenter}>
                  <Text style={styles.addressTitle}>Deliver to: Home</Text>
                  <View style={styles.primaryBadge}>
                    <Text style={styles.primaryBadgeText}>Primary</Text>
                  </View>
                </View>
                <Text style={styles.addressLine}>Flat 402, Sunset Heights, 742 Evergreen Terrace</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.changeBtn}>
              <Text style={styles.changeBtnText}>Change</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.priorityBox}>
            <View style={styles.rowCenter}>
              <Text style={{ fontSize: 18, marginRight: 6 }}>⚡</Text>
              <View>
                <Text style={styles.priorityTitle}>Instant Priority Delivery</Text>
                <Text style={styles.prioritySub}>Estimated time 20–25 mins</Text>
              </View>
            </View>
            <View style={styles.pingDot} />
          </View>
        </View>

        {/* Your Items List */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.cardHeading}>Your Items ({items.length})</Text>
            <Text style={styles.kickerText}>CHEF'S FRESH PREP</Text>
          </View>

          {items.map((item, index) => (
            <View key={item.id}>
              {index > 0 && <View style={styles.divider} />}
              <View style={styles.itemRow}>
                <Image source={{ uri: item.dish.image }} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <View style={styles.rowBetween}>
                    <Text style={styles.itemName} numberOfLines={1}>{item.dish.name}</Text>
                    <TouchableOpacity onPress={() => removeItem(item.id)}>
                      <Text style={{ fontSize: 14 }}>🗑️</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.itemDesc} numberOfLines={1}>
                    {item.selectedAddons.map((a) => a.name).join(', ') || item.dish.description}
                  </Text>
                  <View style={styles.rowBetween}>
                    <Text style={styles.itemPrice}>₹{item.itemTotal}</Text>
                    <View style={styles.stepperMini}>
                      <TouchableOpacity onPress={() => updateQuantity(item.id, -1)}>
                        <Text style={styles.stepperMiniBtn}>−</Text>
                      </TouchableOpacity>
                      <Text style={styles.stepperMiniQty}>{item.quantity}</Text>
                      <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
                        <Text style={styles.stepperMiniBtn}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Delivery Instructions */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.cardHeading}>Delivery Instructions</Text>
            <Text style={styles.tapToApply}>Tap to apply</Text>
          </View>
          <View style={styles.instructionsGrid}>
            {[
              { id: 'Leave at door', icon: '🚪' },
              { id: 'Avoid ringing bell', icon: '🔕' },
              { id: 'Contactless delivery', icon: '🛡️' },
              { id: 'Call before arriving', icon: '📞' },
            ].map((inst) => {
              const active = deliveryInstructions.includes(inst.id);
              return (
                <TouchableOpacity
                  key={inst.id}
                  style={[styles.instButton, active && styles.instButtonActive]}
                  onPress={() => toggleInstruction(inst.id)}
                >
                  <Text style={{ fontSize: 16 }}>{inst.icon}</Text>
                  <Text style={[styles.instText, active && styles.instTextActive]}>
                    {inst.id}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Coupons & Offers */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.cardHeading}>Coupons & Offers</Text>
            <TouchableOpacity onPress={() => router.push('/coupons')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          {appliedCoupon ? (
            <View style={styles.couponAppliedRow}>
              <View style={styles.rowCenter}>
                <View style={styles.checkCircle}>
                  <Text style={{ color: '#fff', fontSize: 12 }}>✓</Text>
                </View>
                <View>
                  <Text style={styles.couponName}>{appliedCoupon} Applied</Text>
                  <Text style={styles.couponSaved}>You saved ₹{bill.couponDiscount} on this order!</Text>
                </View>
              </View>
              <TouchableOpacity onPress={removeCoupon}>
                <Text style={styles.removeCouponText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.applyCouponPlaceholder}
              onPress={() => router.push('/coupons')}
            >
              <Text style={styles.applyCouponPlaceholderText}>Select or enter coupon code ›</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Tip Delivery Partner */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <View style={styles.rowCenter}>
              <Text style={{ fontSize: 18, marginRight: 6 }}>🛵</Text>
              <Text style={styles.cardHeading}>Tip Delivery Partner</Text>
            </View>
            <Text style={styles.directGivenText}>100% directly given</Text>
          </View>
          <Text style={styles.tipNotice}>
            Thank your partner for braving city traffic and delivering your hot meal safely.
          </Text>
          <View style={styles.tipRow}>
            {[20, 30, 50].map((amt) => (
              <TouchableOpacity
                key={amt}
                style={[styles.tipBtn, tipAmount === amt && styles.tipBtnActive]}
                onPress={() => setTip(amt)}
              >
                <Text style={[styles.tipBtnText, tipAmount === amt && styles.tipBtnTextActive]}>
                  ₹{amt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bill Details */}
        <View style={styles.card}>
          <Text style={styles.cardHeading}>Bill Details</Text>
          <View style={styles.billRows}>
            <View style={styles.rowBetween}>
              <Text style={styles.billLabel}>Item Total</Text>
              <Text style={styles.billVal}>₹{bill.itemTotal.toFixed(2)}</Text>
            </View>
            <View style={styles.rowBetween}>
              <Text style={styles.billLabel}>Delivery Partner Fee</Text>
              <View style={styles.rowCenter}>
                <Text style={styles.strikethrough}>₹{bill.originalDeliveryFee.toFixed(2)}</Text>
                <Text style={styles.feeDiscounted}>₹{bill.deliveryPartnerFee.toFixed(2)}</Text>
              </View>
            </View>
            <View style={styles.rowBetween}>
              <Text style={styles.billLabel}>Packaging & Platform Fee</Text>
              <Text style={styles.billVal}>₹{bill.packagingPlatformFee.toFixed(2)}</Text>
            </View>
            <View style={styles.rowBetween}>
              <Text style={styles.billLabel}>Taxes & GST (5%)</Text>
              <Text style={styles.billVal}>₹{bill.taxesGST.toFixed(2)}</Text>
            </View>
            {bill.couponDiscount > 0 && (
              <View style={styles.rowBetween}>
                <Text style={[styles.billLabel, { color: Colors.secondary }]}>
                  Coupon Discount ({bill.appliedCouponCode})
                </Text>
                <Text style={[styles.billVal, { color: Colors.secondary }]}>
                  -₹{bill.couponDiscount.toFixed(2)}
                </Text>
              </View>
            )}
            <View style={styles.rowBetween}>
              <Text style={styles.billLabel}>Delivery Partner Tip</Text>
              <Text style={styles.billVal}>₹{bill.partnerTip.toFixed(2)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.rowBetween}>
              <View>
                <Text style={styles.toPayHeading}>To Pay</Text>
                <Text style={styles.savingsSub}>Total Savings: ₹{bill.totalSavings.toFixed(2)}</Text>
              </View>
              <Text style={styles.totalPayAmount}>₹{bill.toPay.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Payment Method Selector Card */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <View style={styles.rowCenter}>
              <View style={styles.payIcon}>
                <Text style={{ fontSize: 18 }}>💳</Text>
              </View>
              <View>
                <Text style={styles.payKicker}>PAYMENT METHOD</Text>
                <Text style={styles.payMethod}>Google Pay UPI</Text>
                <Text style={styles.payAccount}>***@okaxis</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.changeBtn}>
              <Text style={styles.changeBtnText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Floating Place Order CTA Bar */}
      <View style={styles.fixedBottomBar}>
        <View style={styles.checkoutBar}>
          <View>
            <Text style={styles.barPrice}>₹{bill.toPay.toFixed(2)} • {items.length} items</Text>
            <Text style={styles.barEncrypted}>🔒 ENCRYPTED PAY</Text>
          </View>
          <TouchableOpacity
            style={styles.placeOrderBtn}
            activeOpacity={0.9}
            onPress={() => router.push('/order/success')}
          >
            <Text style={styles.placeOrderText}>Place Order →</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  iconBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 110,
    paddingHorizontal: 16,
  },
  restBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  storeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  restName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  kmBadge: {
    backgroundColor: Colors.secondaryFixed,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 8,
  },
  kmText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.onSecondaryFixed,
  },
  restSub: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
  },
  clearCartText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
  },
  card: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  addressTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  primaryBadge: {
    backgroundColor: Colors.surfaceContainerHigh,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
  },
  primaryBadgeText: {
    fontSize: 9,
    fontWeight: '600',
    color: Colors.onSurface,
  },
  addressLine: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  changeBtn: {
    backgroundColor: Colors.surfaceContainerLow,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  changeBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  priorityBox: {
    backgroundColor: Colors.surfaceContainerLow,
    padding: 10,
    borderRadius: 10,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priorityTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  prioritySub: {
    fontSize: 10,
    color: Colors.onSurfaceVariant,
  },
  pingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.secondary,
  },
  cardHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  kickerText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
    color: Colors.onSurfaceVariant,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.surfaceContainerLow,
    marginVertical: 12,
  },
  itemRow: {
    flexDirection: 'row',
    gap: 12,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    flex: 1,
  },
  itemDesc: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    marginVertical: 2,
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  stepperMini: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 2,
    gap: 8,
  },
  stepperMiniBtn: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  stepperMiniQty: {
    fontSize: 12,
    fontWeight: '700',
  },
  tapToApply: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
  },
  instructionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  instButton: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.surfaceContainerLow,
  },
  instButtonActive: {
    backgroundColor: Colors.secondaryFixed,
  },
  instText: {
    fontSize: 11,
    color: Colors.onSurface,
  },
  instTextActive: {
    color: Colors.onSecondaryFixed,
    fontWeight: '700',
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  couponAppliedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surfaceContainerLow,
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  couponName: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  couponSaved: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
  },
  removeCouponText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.error,
  },
  applyCouponPlaceholder: {
    backgroundColor: Colors.surfaceContainerLow,
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
  },
  applyCouponPlaceholderText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
  },
  directGivenText: {
    fontSize: 10,
    color: Colors.onSurfaceVariant,
  },
  tipNotice: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    marginVertical: 8,
  },
  tipRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tipBtn: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLow,
    paddingVertical: 8,
    borderRadius: 18,
    alignItems: 'center',
  },
  tipBtnActive: {
    backgroundColor: Colors.primary,
  },
  tipBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  tipBtnTextActive: {
    color: '#fff',
  },
  billRows: {
    gap: 8,
    marginTop: 10,
  },
  billLabel: {
    fontSize: 13,
    color: Colors.onSurfaceVariant,
  },
  billVal: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.onSurface,
  },
  strikethrough: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    textDecorationLine: 'line-through',
    marginRight: 6,
  },
  feeDiscounted: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.secondary,
  },
  toPayHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  savingsSub: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.secondary,
  },
  totalPayAmount: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.onSurface,
  },
  payIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payKicker: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.onSurfaceVariant,
  },
  payMethod: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  payAccount: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
  },
  fixedBottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  checkoutBar: {
    backgroundColor: Colors.primary,
    borderRadius: 30,
    paddingHorizontal: 18,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  barPrice: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  barEncrypted: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
  },
  placeOrderBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
  },
  placeOrderText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '800',
  },
});
