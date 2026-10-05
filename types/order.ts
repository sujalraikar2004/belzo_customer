import { CartItem, CartBill } from './cart';

export type OrderStatus =
  | 'CREATED'
  | 'PAYMENT_PENDING'
  | 'PAYMENT_CONFIRMED'
  | 'RESTAURANT_ACCEPTED'
  | 'PREPARING'
  | 'READY_FOR_PICKUP'
  | 'DELIVERY_PARTNER_ASSIGNED'
  | 'PARTNER_ACCEPTED'
  | 'PARTNER_REACHED_RESTAURANT'
  | 'ORDER_PICKED_UP'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'COMPLETED'
  | 'CANCELLED';

export interface CourierInfo {
  name: string;
  phone: string;
  vehicle: string;
  rating: number;
  deliveryCount: string;
  avatar: string;
  lat: number;
  lng: number;
  isVaccinated: boolean;
  temperature: string;
}

export interface OrderTimelineStep {
  step: number;
  title: string;
  description: string;
  time: string;
  isCompleted: boolean;
  isActive: boolean;
}

export interface Order {
  id: string; // e.g. "#BG-8921", "#BZ-89421"
  restaurantId: string;
  restaurantName: string;
  restaurantImage: string;
  restaurantAddress: string;
  status: OrderStatus;
  statusLabel: string;
  estimatedDeliveryTime: string;
  items: CartItem[];
  itemCount: number;
  bill: CartBill;
  deliveryAddress: {
    label: string;
    street: string;
    city: string;
    phone: string;
  };
  courier?: CourierInfo;
  courierNote?: string;
  timeline: OrderTimelineStep[];
  rating?: {
    foodRating: number;
    courierRating: number;
    review?: string;
    tags: string[];
    courierTip: number;
  };
  createdAt: string;
}
