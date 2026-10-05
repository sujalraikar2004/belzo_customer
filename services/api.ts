// Clean API abstraction layer for Belzo
export const apiClient = {
  get: async <T>(endpoint: string, mockData: T, delayMs: number = 250): Promise<T> => {
    // Artificial latency for realistic optimistic UI & skeleton testing
    await new Promise((resolve) => setTimeout(resolve, delayMs));
    return mockData;
  },
  post: async <T>(endpoint: string, payload: any, mockResponse: T, delayMs: number = 300): Promise<T> => {
    await new Promise((resolve) => setTimeout(resolve, delayMs));
    return mockResponse;
  },
};
