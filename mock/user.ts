import { UserProfile } from '../types/user';

export const MOCK_USER: UserProfile = {
  id: 'usr-sophia-bennett',
  name: 'Sophia Bennett',
  email: 'sophia.b@example.com',
  phone: '+1 (555) 234-8901',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDum-ScP0BooVlWTWAYgIxrROG16D2v9gG5QoXBBl48UE40YLlRjqChTvH0Ci0_4hgSvmKAxTkttiux84sMUUCKeVmb9mQHM8rUruZkHB__YobOuDYp4IBy5igEZQ_zsEaT2pidvArcoryZAMu-EhbuuT_3Iz97GFh-oASmrzIk42NUeTv-PsiuiZiJGWXVqSs9MhPQzgDheEKZcUPK7ZfPfe7R7ebZsX9AVIbnInrhsDLIBlT16e2Y',
  isVipGold: true,
  vipBenefitText: 'Free delivery > ₹199 • 5% cashback',
  coinsBalance: 35,
  walletBalance: 450,
  ordersDone: 28,
  savedYearAmount: 1420,
  savedPlacesCount: 4,
  dietaryPreferences: ['Non-veg', 'Halal', 'Nut Allergy'],
  addresses: [
    {
      id: 'addr-home',
      type: 'Home',
      label: 'Home',
      addressLine: 'Flat 402, Sunset Heights, 742 Evergreen Terrace, Brooklyn',
      isPrimary: true,
    },
    {
      id: 'addr-work',
      type: 'Work',
      label: 'Design Studio',
      addressLine: '124 Dumbo Loft, Water St, Brooklyn',
      isPrimary: false,
    },
    {
      id: 'addr-parents',
      type: 'Other',
      label: 'Parents House',
      addressLine: '88 Park Slope Ave, Brooklyn',
      isPrimary: false,
    },
  ],
};
