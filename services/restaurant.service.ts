import { apiClient } from './api';
import { MOCK_RESTAURANTS } from '../mock/restaurants';
import { Restaurant, Dish } from '../types/restaurant';

export const restaurantService = {
  getAll: async (): Promise<Restaurant[]> => {
    return apiClient.get('/restaurants', MOCK_RESTAURANTS, 200);
  },

  getById: async (id: string): Promise<Restaurant | undefined> => {
    const found = MOCK_RESTAURANTS.find((r) => r.id === id);
    return apiClient.get(`/restaurants/${id}`, found, 150);
  },

  search: async (query: string, filter?: string): Promise<{ restaurants: Restaurant[]; dishes: Dish[] }> => {
    const q = query.toLowerCase().trim();
    let allDishes: Dish[] = [];
    MOCK_RESTAURANTS.forEach((r) => {
      r.menuCategories.forEach((cat) => {
        allDishes.push(...cat.items);
      });
    });

    const filteredRestaurants = MOCK_RESTAURANTS.filter((r) => {
      const matchName = r.name.toLowerCase().includes(q);
      const matchCuisine = r.cuisines.some((c) => c.toLowerCase().includes(q));
      return matchName || matchCuisine;
    });

    const filteredDishes = allDishes.filter((d) => {
      const matchName = d.name.toLowerCase().includes(q);
      const matchDesc = d.description.toLowerCase().includes(q);
      return matchName || matchDesc;
    });

    return apiClient.get(`/search?q=${query}`, { restaurants: filteredRestaurants, dishes: filteredDishes }, 200);
  },
};
