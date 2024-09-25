// api.ts
const BASE_URL = 'http://localhost:4000/api';

export const apiClient = {
  pingBackend: async (): Promise<{ message: string }> => {
    const response = await fetch(`${BASE_URL}/ping`, {
      credentials: 'include', // Include cookies for session handling
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return response.json();
  },

  getProfile: async (): Promise<any> => {
    const response = await fetch(`${BASE_URL}/auth/profile`, {
      credentials: 'include', // Include cookies for session handling
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return response.json();
  },

  // Add other API functions 
};
