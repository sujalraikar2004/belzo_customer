import { create } from 'zustand';

interface FavoritesState {
  savedRestaurantIds: string[];
  savedDishIds: string[];
  toggleRestaurantFavorite: (id: string) => void;
  toggleDishFavorite: (id: string) => void;
  isRestaurantFavorite: (id: string) => boolean;
  isDishFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  savedRestaurantIds: ['rest-urban-grill', 'rest-bella-napoli', 'rest-dawat-khaas'],
  savedDishIds: ['dish-double-smash', 'dish-bufalina-margherita', 'dish-mutton-dum-biryani'],

  toggleRestaurantFavorite: (id: string) => {
    set((state) => {
      const exists = state.savedRestaurantIds.includes(id);
      return {
        savedRestaurantIds: exists
          ? state.savedRestaurantIds.filter((item) => item !== id)
          : [...state.savedRestaurantIds, id],
      };
    });
  },

  toggleDishFavorite: (id: string) => {
    set((state) => {
      const exists = state.savedDishIds.includes(id);
      return {
        savedDishIds: exists
          ? state.savedDishIds.filter((item) => item !== id)
          : [...state.savedDishIds, id],
      };
    });
  },

  isRestaurantFavorite: (id: string) => get().savedRestaurantIds.includes(id),
  isDishFavorite: (id: string) => get().savedDishIds.includes(id),
}));
