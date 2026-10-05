import { apiClient } from './api';
import { MOCK_USER } from '../mock/user';
import { UserProfile } from '../types/user';

export const authService = {
  sendOtp: async (phone: string): Promise<{ success: boolean; message: string }> => {
    return apiClient.post('/auth/send-otp', { phone }, { success: true, message: 'OTP sent successfully to ' + phone }, 300);
  },

  verifyOtp: async (phone: string, otp: string): Promise<{ success: boolean; token: string; user: UserProfile }> => {
    return apiClient.post('/auth/verify-otp', { phone, otp }, { success: true, token: 'jwt_mock_token_' + Date.now(), user: MOCK_USER }, 400);
  },

  register: async (payload: { name: string; email: string; phone: string; referralCode?: string }): Promise<UserProfile> => {
    const newUser = { ...MOCK_USER, ...payload };
    return apiClient.post('/auth/register', payload, newUser, 400);
  },

  getCurrentUser: async (): Promise<UserProfile> => {
    return apiClient.get('/auth/me', MOCK_USER, 150);
  },
};
