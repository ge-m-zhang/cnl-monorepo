import { ChatMessage, GoogleProfile, User } from "../types/types";

// api.ts
const BASE_URL = 'http://localhost:4000/api';

// todo: refactor to smaller functions
export const apiClient = {
  // test
  pingBackend: async (): Promise<{ message: string }> => {
    const response = await fetch(`${BASE_URL}/ping`, {
      credentials: 'include', // Include cookies for session handling
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return response.json();
  },

  getDynamoDBTables: async (): Promise<string[]> => {
    const response = await fetch(`${BASE_URL}/aws/dynamodb/tables`, {
      credentials: 'include', 
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return response.json();
  },

  addTestData: async (testData: { randomId: string; message: string }): Promise<{ message: string }> => {
    const response = await fetch(`${BASE_URL}/test/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return response.json();
  },
  //---------------------------------------------

  /**
   * get user profile from auth service
   * 
   * @returns usrProfile
   */
  getProfile: async (): Promise<GoogleProfile> => {
    const response = await fetch(`${BASE_URL}/auth/profile`, {
      credentials: 'include', // Include cookies for session handling
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return response.json();
  },

/**
 * Message to GPT and back
 * @param message 
 * @returns 
 */
  sendMessageToGPT: async (message: string): Promise<{ response: string }> => {
    const response = await fetch(`${BASE_URL}/openai/send-to-gpt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return response.json();
  },

  /**
   * Get user by email - dynamodb
   * @param email 
   * @returns 
   */
  getUserByEmail: async (email: string): Promise<User | null> => {
    const response = await fetch(`${BASE_URL}/user/get-by-email?email=${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies for session handling
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;  // Return null if the user is not found
      } 
        throw new Error(`Error: ${response.statusText}`);
      
    }

    return response.json();
  },

  /**
   * Update user profile - dynamodb
   * @param profile 
   */
  updateUserProfile: async (profile: User): Promise<void> => {
    const response = await fetch(`${BASE_URL}/user/update-profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profile),
      credentials: 'include', // Include cookies for session handling
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
  },
  
/**
 * Get messages by userId from DynamoDB
 * @param userId - The user's ID
 * @returns An array of ChatMessage objects
 */
getMessagesByUserId: async (userId: string): Promise<ChatMessage[]> => {
  const response = await fetch(`${BASE_URL}/messages/get-by-user?userId=${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching messages: ${response.statusText}`);
  }

  return response.json();
},

  /**
   * Save a message to DynamoDB
   * @param message - The chat message object to save
   */
  saveMessage: async (message: ChatMessage): Promise<void> => {
    const response = await fetch(`${BASE_URL}/messages/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error(`Error saving message: ${response.statusText}`);
    }
  },
};
