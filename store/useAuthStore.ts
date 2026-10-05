import { create } from 'zustand';
import { UserProfile } from '../types/user';
import { MOCK_USER } from '../mock/user';

interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  token: string | null;
  login: (phone: string, otp: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: true,
  user: MOCK_USER,
  token: 'mock-jwt-token-active',

  login: async (phone: string, otp: string) => {
    set({
      isAuthenticated: true,
      user: { ...MOCK_USER, phone },
      token: 'mock-jwt-' + Date.now(),
    });
    return true;
  },

  logout: () => {
    set({ isAuthenticated: false, user: null, token: null });
  },

  updateProfile: (updates) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    }));
  },
}));
