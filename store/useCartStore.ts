import { create } from 'zustand';
import { CartItem, CartBill } from '../types/cart';
import { Dish, CustomizationOption } from '../types/restaurant';

interface CartState {
  restaurantId: string | null;
  restaurantName: string | null;
  items: CartItem[];
  appliedCoupon: string | null;
  tipAmount: number;
  deliveryInstructions: string[];
  
  // Actions
  addItem: (dish: Dish, quantity?: number, cheese?: CustomizationOption, addons?: CustomizationOption[], notes?: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;
  setTip: (amount: number) => void;
  toggleInstruction: (instruction: string) => void;
  
  // Computed
  getBill: () => CartBill;
}

export const useCartStore = create<CartState>((set, get) => ({
  restaurantId: 'rest-urban-grill',
  restaurantName: 'The Urban Grill',
  appliedCoupon: 'BELZOWELCOME',
  tipAmount: 30,
  deliveryInstructions: ['Contactless delivery'],
  items: [
    {
      id: 'cart-1',
      dish: {
        id: 'dish-double-smash',
        restaurantId: 'rest-urban-grill',
        restaurantName: 'The Urban Grill',
        name: 'Double Smash Truffle Burger',
        description: 'Aged Cheddar, Extra Bacon, Less Sauce',
        price: 389,
        rating: 4.9,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCckPtVKT3D56qzCvu6IxoGZFgJCu9mHvHWTJssSSB3sg6Y4WxO1CRGHBSh3JyqzmLbUutmMUJIHCgJu94uc1YGWrNLWPPfT6xgtweHG6-qNcAPhAAgh40dbPOjWwn412IvfUmQGBFR8OWUAJp24C1SK_dGo6FC0D_8CSDWWZTTTuaFcAUCe50OLKv88bepxjajvsMDnOMCo7B0sFRbApoWCIeHdldRmpAD60Pmd0G3kFMs6w8HJ2Vw',
        isVeg: false,
      },
      quantity: 1,
      selectedAddons: [{ id: 'opt-bacon', name: 'Extra Crispy Smoked Bacon', price: 60 }],
      itemTotal: 389,
    },
    {
      id: 'cart-2',
      dish: {
        id: 'dish-peri-peri-fries',
        restaurantId: 'rest-urban-grill',
        restaurantName: 'The Urban Grill',
        name: 'Crispy Peri-Peri Fries',
        description: 'Size: Large',
        price: 149,
        rating: 4.7,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfhJyIGhMh_mAQaIsthlnl2eWBIkV6-maaAub5VxLeogHNjDSF1XpqoTGe7haEd4yog8c4SJ-TkTKzwr3Jprr0PRgvwS2r8LVsBEWPA3qr96C6Jjld7ZZwHHeBohxkhDToP0_kjjnBKem9D2bPv2kFaYYhSwkomdQyyayiw8Jasf_qZTlFpeB-QGHCd2ZUroAcqS3bZWPIJXGrqIi5Edets65laCfni5X-ixr2SW9a_EGDPBMOpOy7',
        isVeg: true,
      },
      quantity: 1,
      selectedAddons: [],
      itemTotal: 149,
    },
    {
      id: 'cart-3',
      dish: {
        id: 'dish-vanilla-shake',
        restaurantId: 'rest-urban-grill',
        restaurantName: 'The Urban Grill',
        name: 'Vanilla Bean Thickshake',
        description: 'Made with real Madagascar bean',
        price: 160,
        rating: 4.9,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHxG3V3kxzXPW3G3h0PJEYwlly-iCjaXZz3FheflB1Loi64UYjQ-MJOfvAyRvx2cR5AzvsXIfltFV4rVK_YJdH8qUB04AYXOyrFQocoYsgYWL6XG20K4Xmu82oKRFImck0P5eau2rXdOLHEy1fxKTHVVxlUz7mlsT_2m5BV_pn1wzYlkibxRxFu4myaqpXyZWt2O2XqXyRf6nm35AQkpPCukgyQKEbjo9KPSXhPQo4tpu8rbL1py_4',
        isVeg: true,
      },
      quantity: 1,
      selectedAddons: [],
      itemTotal: 160,
    },
  ],

  addItem: (dish, quantity = 1, cheese, addons = [], notes) => {
    set((state) => {
      let addonPrice = 0;
      if (cheese) addonPrice += cheese.price;
      addons.forEach((a) => (addonPrice += a.price));
      const unitPrice = dish.price + addonPrice;

      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        dish,
        quantity,
        selectedCheese: cheese,
        selectedAddons: addons,
        specialInstructions: notes,
        itemTotal: unitPrice * quantity,
      };

      return {
        restaurantId: dish.restaurantId,
        restaurantName: dish.restaurantName,
        items: [...state.items, newItem],
      };
    });
  },

  updateQuantity: (cartItemId, delta) => {
    set((state) => {
      const updated = state.items
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            const unitPrice = item.itemTotal / item.quantity;
            return {
              ...item,
              quantity: newQty,
              itemTotal: unitPrice * newQty,
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[];

      return { items: updated };
    });
  },

  removeItem: (cartItemId) => {
    set((state) => ({
      items: state.items.filter((i) => i.id !== cartItemId),
    }));
  },

  clearCart: () => {
    set({ items: [], restaurantId: null, restaurantName: null, appliedCoupon: null });
  },

  applyCoupon: (code) => {
    set({ appliedCoupon: code });
  },

  removeCoupon: () => {
    set({ appliedCoupon: null });
  },

  setTip: (amount) => {
    set({ tipAmount: amount });
  },

  toggleInstruction: (instruction) => {
    set((state) => {
      const exists = state.deliveryInstructions.includes(instruction);
      return {
        deliveryInstructions: exists
          ? state.deliveryInstructions.filter((i) => i !== instruction)
          : [...state.deliveryInstructions, instruction],
      };
    });
  },

  getBill: () => {
    const { items, appliedCoupon, tipAmount } = get();
    const itemTotal = items.reduce((acc, i) => acc + i.itemTotal, 0);

    const originalDeliveryFee = 45.0;
    const deliveryPartnerFee = 25.0;
    const packagingPlatformFee = 15.0;
    const taxesGST = Number((itemTotal * 0.05).toFixed(2));

    let couponDiscount = 0;
    if (appliedCoupon === 'BELZOWELCOME') {
      couponDiscount = 100.0;
    } else if (appliedCoupon === 'BELZOFIRST') {
      couponDiscount = Math.min(150, itemTotal * 0.5);
    } else if (appliedCoupon === 'PARTYFEAST') {
      couponDiscount = Math.min(250, itemTotal * 0.25);
    } else if (appliedCoupon === 'FREEDEL') {
      couponDiscount = 25.0;
    } else if (appliedCoupon === 'CRAZYBURGER') {
      couponDiscount = 75.0;
    }

    const totalSavings = (originalDeliveryFee - deliveryPartnerFee) + couponDiscount;
    const toPay = Number(
      Math.max(0, itemTotal + deliveryPartnerFee + packagingPlatformFee + taxesGST + tipAmount - couponDiscount).toFixed(2)
    );

    return {
      itemTotal,
      deliveryPartnerFee,
      originalDeliveryFee,
      packagingPlatformFee,
      taxesGST,
      couponDiscount,
      appliedCouponCode: appliedCoupon || undefined,
      partnerTip: tipAmount,
      toPay,
      totalSavings,
    };
  },
}));
