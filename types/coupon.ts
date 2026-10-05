export interface Coupon {
  code: string;
  title: string;
  description: string;
  discountAmount?: number;
  discountPercentage?: number;
  maxDiscount?: number;
  minOrderValue: number;
  isFreeDelivery?: boolean;
  expiresText: string;
  terms: string[];
  categoryLimit?: string;
}
