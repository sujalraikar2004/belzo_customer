import { Dish, CustomizationOption } from './restaurant';

export interface CartItem {
  id: string; // unique cart entry id
  dish: Dish;
  quantity: number;
  selectedCheese?: CustomizationOption;
  selectedAddons: CustomizationOption[];
  specialInstructions?: string;
  itemTotal: number;
}

export interface CartBill {
  itemTotal: number;
  deliveryPartnerFee: number;
  originalDeliveryFee: number;
  packagingPlatformFee: number;
  taxesGST: number;
  couponDiscount: number;
  appliedCouponCode?: string;
  partnerTip: number;
  toPay: number;
  totalSavings: number;
}
