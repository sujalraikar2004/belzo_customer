export interface UserAddress {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  label: string;
  addressLine: string;
  isPrimary: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  isVipGold: boolean;
  vipBenefitText: string;
  coinsBalance: number;
  walletBalance: number;
  ordersDone: number;
  savedYearAmount: number;
  savedPlacesCount: number;
  dietaryPreferences: string[];
  addresses: UserAddress[];
}
