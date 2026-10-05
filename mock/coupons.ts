import { Coupon } from '../types/coupon';

export const MOCK_COUPONS: Coupon[] = [
  {
    code: 'BELZOWELCOME',
    title: 'Flat ₹100 OFF',
    description: 'On orders above ₹299 from any diner or cafe.',
    discountAmount: 100,
    minOrderValue: 299,
    expiresText: '3 days left',
    terms: [
      'Applicable on first three orders placed via Belzo.',
      'Cannot be clubbed with restaurant-specific flat discounts.',
      'Maximum cashback will not exceed cart threshold.',
    ],
  },
  {
    code: 'PARTYFEAST',
    title: '25% OFF up to ₹250',
    description: 'Valid on group orders above ₹799.',
    discountPercentage: 25,
    maxDiscount: 250,
    minOrderValue: 799,
    expiresText: 'Expires Sunday',
    terms: [
      'Valid strictly for multi-person orders with 3+ unique menu items.',
      'Maximum discount capped at ₹250 per transaction.',
    ],
  },
  {
    code: 'FREEDEL',
    title: 'Zero Delivery Charge',
    description: 'Free delivery on orders above ₹199 from top-rated spots.',
    isFreeDelivery: true,
    minOrderValue: 199,
    expiresText: '5 uses left',
    terms: [
      'Valid within a 7 km restaurant radius.',
      'Applicable only at restaurants rated 4.0 stars and above.',
    ],
  },
  {
    code: 'CRAZYBURGER',
    title: 'Flat ₹75 OFF',
    description: 'Instant off on Burgers & American fast food joints.',
    discountAmount: 75,
    minOrderValue: 249,
    categoryLimit: 'Burgers',
    expiresText: 'Category Only',
    terms: [
      'Valid only for items listed under the "Burgers" or "Fast Food" categories.',
      'Minimum cart value ₹249 before taxes.',
    ],
  },
  {
    code: 'BELZOFIRST',
    title: 'FLAT 50% OFF',
    description: 'Up to ₹150 • First 3 Orders',
    discountPercentage: 50,
    maxDiscount: 150,
    minOrderValue: 150,
    expiresText: 'First 3 orders',
    terms: [
      'Valid only for brand new users on first 3 successful checkouts.',
    ],
  },
];
