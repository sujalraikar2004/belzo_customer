import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../theme/colors';
import { MOCK_RESTAURANTS } from '../../mock/restaurants';
import { useCartStore } from '../../store/useCartStore';
import { Dish, CustomizationOption } from '../../types/restaurant';

export default function RestaurantScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const restaurant = MOCK_RESTAURANTS.find((r) => r.id === id) || MOCK_RESTAURANTS[0];

  const { addItem, items, getBill } = useCartStore();
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCheese, setSelectedCheese] = useState<CustomizationOption>({
    id: 'opt-cheddar',
    name: 'Aged English Cheddar',
    price: 0,
  });
  const [selectedAddons, setSelectedAddons] = useState<CustomizationOption[]>([
    { id: 'opt-truffle', name: 'Extra Truffle Glaze Dip', price: 40 },
  ]);
  const [notes, setNotes] = useState('');
  const [qty, setQty] = useState(1);

  const openCustomizer = (dish: Dish) => {
    setSelectedDish(dish);
    setQty(1);
    setModalVisible(true);
  };

  const toggleAddon = (addon: CustomizationOption) => {
    const exists = selectedAddons.some((a) => a.id === addon.id);
    if (exists) {
      setSelectedAddons(selectedAddons.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const calculateCustomTotal = () => {
    if (!selectedDish) return 0;
    let extra = selectedCheese?.price || 0;
    selectedAddons.forEach((a) => (extra += a.price));
    return (selectedDish.price + extra) * qty;
  };

  const handleConfirmAdd = () => {
    if (selectedDish) {
      addItem(selectedDish, qty, selectedCheese, selectedAddons, notes);
      setModalVisible(false);
    }
  };

  const bill = getBill();

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={{ fontSize: 20 }}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{restaurant.name}</Text>
        <TouchableOpacity style={styles.shareBtn}>
          <Text style={{ fontSize: 16 }}>🔗</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Restaurant Card Banner */}
        <View style={styles.restBanner}>
          <View style={styles.rowBetween}>
            <View style={{ flex: 1 }}>
              <Text style={styles.bannerTitle}>{restaurant.name} ✓</Text>
              <Text style={styles.bannerSub}>{restaurant.tagline}</Text>
            </View>
            <View style={styles.ratingBox}>
              <Text style={styles.ratingText}>★ {restaurant.rating}</Text>
              <Text style={styles.reviewCountText}>2.4k+ reviews</Text>
            </View>
          </View>

          <View style={styles.metricsPill}>
            <Text style={styles.metricText}>
              ⏱ {restaurant.deliveryTime} • {restaurant.distanceKm} km • ₹{restaurant.deliveryFee} delivery fee
            </Text>
          </View>

          <View style={styles.offerRibbon}>
            <Text style={styles.offerText}>
              🏷️ Offer: Use code <Text style={{ fontWeight: '800' }}>URBANFEAST</Text> for 20% OFF above ₹499
            </Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>Bestsellers ({restaurant.menuCategories[0]?.items.length || 3})</Text>

          {(restaurant.menuCategories[0]?.items || []).map((dish) => (
            <View key={dish.id} style={styles.dishCard}>
              <View style={styles.dishInfo}>
                <View style={styles.vegRow}>
                  <View style={[styles.vegDot, { backgroundColor: dish.isVeg ? '#12B76A' : Colors.primary }]} />
                  {dish.isMustTry && <Text style={styles.mustTryTag}>MUST TRY</Text>}
                  <Text style={styles.dishRating}>★ {dish.rating}</Text>
                </View>
                <Text style={styles.dishName}>{dish.name}</Text>
                <Text style={styles.dishPrice}>₹{dish.price}</Text>
                <Text style={styles.dishDesc} numberOfLines={2}>{dish.description}</Text>
              </View>

              <View style={styles.dishImageWrap}>
                <Image source={{ uri: dish.image }} style={styles.dishThumb} />
                <TouchableOpacity
                  style={styles.addDishBtn}
                  onPress={() => (dish.isCustomisable ? openCustomizer(dish) : addItem(dish))}
                >
                  <Text style={styles.addDishBtnText}>+ ADD</Text>
                  {dish.isCustomisable && <Text style={styles.customBadge}>Custom</Text>}
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Floating Bottom Cart Bar */}
      {items.length > 0 && (
        <TouchableOpacity
          style={styles.floatingCart}
          activeOpacity={0.9}
          onPress={() => router.push('/cart')}
        >
          <View style={styles.cartBarLeft}>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{items.length}</Text>
            </View>
            <Text style={styles.cartTotalText}>₹{bill.toPay}</Text>
          </View>
          <Text style={styles.viewCartAction}>View Cart →</Text>
        </TouchableOpacity>
      )}

      {/* Customization Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalScrim} onPress={() => setModalVisible(false)} />
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <View style={styles.rowBetween}>
              <View>
                <Text style={styles.modalTitle}>Customize {selectedDish?.name}</Text>
                <Text style={styles.modalSub}>Base price: ₹{selectedDish?.price}</Text>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
                <Text style={{ fontSize: 16 }}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 360, marginVertical: 12 }}>
              {/* Cheese Choice */}
              <Text style={styles.groupTitle}>Choose Your Cheese (Choose 1)</Text>
              {[
                { id: 'opt-cheddar', name: 'Aged English Cheddar', price: 0 },
                { id: 'opt-emmental', name: 'Swiss Emmental', price: 0 },
                { id: 'opt-gouda', name: 'Smoked Dutch Gouda', price: 40 },
              ].map((ch) => (
                <TouchableOpacity
                  key={ch.id}
                  style={styles.optionRow}
                  onPress={() => setSelectedCheese(ch)}
                >
                  <Text style={styles.optionName}>{ch.name}</Text>
                  <Text style={styles.optionPrice}>{ch.price === 0 ? 'Free' : `+ ₹${ch.price}`}</Text>
                </TouchableOpacity>
              ))}

              {/* Addons */}
              <Text style={[styles.groupTitle, { marginTop: 14 }]}>Extra Indulgence Add-ons (Optional)</Text>
              {[
                { id: 'opt-bacon', name: 'Extra Crispy Smoked Bacon', price: 60 },
                { id: 'opt-truffle', name: 'Extra Truffle Glaze Dip', price: 40 },
                { id: 'opt-poppers', name: 'Crunchy Jalapeño Poppers (2 pcs)', price: 50 },
              ].map((ad) => {
                const isChecked = selectedAddons.some((a) => a.id === ad.id);
                return (
                  <TouchableOpacity
                    key={ad.id}
                    style={[styles.optionRow, isChecked && styles.optionRowActive]}
                    onPress={() => toggleAddon(ad)}
                  >
                    <Text style={styles.optionName}>{isChecked ? '☑ ' : '☐ '}{ad.name}</Text>
                    <Text style={styles.optionPrice}>+ ₹{ad.price}</Text>
                  </TouchableOpacity>
                );
              })}

              <Text style={[styles.groupTitle, { marginTop: 14 }]}>Special Cooking Instructions</Text>
              <TextInput
                value={notes}
                onChangeText={setNotes}
                placeholder="e.g. Less spicy, dressing on side, extra napkins"
                style={styles.notesInput}
              />
            </ScrollView>

            {/* Modal Bottom Actions */}
            <View style={styles.modalBottomBar}>
              <View style={styles.stepper}>
                <TouchableOpacity onPress={() => setQty(Math.max(1, qty - 1))}>
                  <Text style={styles.stepBtnText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.qtyText}>{qty}</Text>
                <TouchableOpacity onPress={() => setQty(qty + 1)}>
                  <Text style={styles.stepBtnText}>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.addToCartBtn} onPress={handleConfirmAdd}>
                <Text style={styles.addToCartText}>Add to Cart • ₹{calculateCustomTotal()}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onSurface,
    maxWidth: 220,
  },
  shareBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 90,
  },
  restBanner: {
    backgroundColor: Colors.surfaceContainerLowest,
    margin: 16,
    padding: 16,
    borderRadius: 16,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.onSurface,
  },
  bannerSub: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  ratingBox: {
    alignItems: 'flex-end',
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.secondary,
    backgroundColor: Colors.surfaceContainerLow,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  reviewCountText: {
    fontSize: 10,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  metricsPill: {
    backgroundColor: Colors.surfaceContainerLow,
    padding: 10,
    borderRadius: 8,
    marginTop: 12,
  },
  metricText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.onSurface,
  },
  offerRibbon: {
    backgroundColor: Colors.secondaryFixed,
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  offerText: {
    fontSize: 11,
    color: Colors.onSecondaryFixed,
  },
  menuSection: {
    paddingHorizontal: 16,
  },
  menuSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onSurface,
    marginBottom: 10,
  },
  dishCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
  dishInfo: {
    flex: 1,
    paddingRight: 10,
  },
  vegRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  vegDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  mustTryTag: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.onSecondaryFixed,
    backgroundColor: Colors.secondaryFixed,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  dishRating: {
    fontSize: 11,
    color: '#D97706',
    fontWeight: '600',
  },
  dishName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  dishPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    marginVertical: 4,
  },
  dishDesc: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    lineHeight: 15,
  },
  dishImageWrap: {
    alignItems: 'center',
  },
  dishThumb: {
    width: 84,
    height: 84,
    borderRadius: 12,
  },
  addDishBtn: {
    marginTop: -14,
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    alignItems: 'center',
  },
  addDishBtnText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '800',
  },
  customBadge: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 8,
  },
  floatingCart: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: Colors.primary,
    borderRadius: 28,
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: Colors.primary,
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  cartBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  countBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  cartTotalText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  viewCartAction: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalScrim: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '85%',
  },
  modalHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.surfaceContainerHigh,
    alignSelf: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  modalSub: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  closeBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.onSurface,
    marginBottom: 8,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 10,
    marginBottom: 6,
  },
  optionRowActive: {
    backgroundColor: Colors.secondaryFixed,
  },
  optionName: {
    fontSize: 13,
    color: Colors.onSurface,
  },
  optionPrice: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.secondary,
  },
  notesInput: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 10,
    padding: 10,
    fontSize: 12,
    color: Colors.onSurface,
    height: 60,
    textAlignVertical: 'top',
  },
  modalBottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 10,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 12,
  },
  stepBtnText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  qtyText: {
    fontSize: 14,
    fontWeight: '700',
  },
  addToCartBtn: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});
