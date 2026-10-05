export interface Restaurant {
  id: string;
  name: string;
  tagline: string;
  cuisines: string[];
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  distanceKm: number;
  deliveryFee: number;
  priceForTwo: number;
  priceRating: string; // "₹₹"
  image: string;
  coverImage?: string;
  isVerified?: boolean;
  isTrending?: boolean;
  isBestseller?: boolean;
  isFavorite?: boolean;
  offerText?: string;
  mustTryDishes?: {
    name: string;
    price: number;
  }[];
  menuCategories: MenuCategory[];
}

export interface MenuCategory {
  id: string;
  name: string;
  items: Dish[];
}

export interface Dish {
  id: string;
  restaurantId: string;
  restaurantName: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  isVeg: boolean;
  isBestseller?: boolean;
  isMustTry?: boolean;
  isCustomisable?: boolean;
  customizationOptions?: CustomizationGroup[];
}

export interface CustomizationGroup {
  id: string;
  title: string;
  required: boolean;
  minSelect?: number;
  maxSelect?: number;
  options: CustomizationOption[];
}

export interface CustomizationOption {
  id: string;
  name: string;
  price: number;
  selectedByDefault?: boolean;
}
