import { apiClient } from './api';

export interface PaymentProcessResult {
  success: boolean;
  transactionId: string;
  paymentMethod: string;
  error?: string;
}

export const paymentService = {
  processPayment: async (
    amount: number,
    method: 'upi' | 'card' | 'cod' | 'apple_pay' | 'wallet'
  ): Promise<PaymentProcessResult> => {
    // Development mock implementation allowing seamless integration of Razorpay/Stripe SDKs
    return apiClient.post(
      '/payments/charge',
      { amount, method },
      {
        success: true,
        transactionId: `TXN_${Date.now()}`,
        paymentMethod: method === 'upi' ? 'Google Pay UPI (***@okaxis)' : method,
      },
      600
    );
  },
};
