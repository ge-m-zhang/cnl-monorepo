import { ChatMessage, ChatPartition } from "./message.interface";

export interface User {
  email: string;                // User's email, acting as the primary key
  firstName?: string;           // Optional: First name of the user
  lastName?: string;            // Optional: Last name of the user
  profilePicture?: string;      // Optional: User's profile picture
  accessToken: string;          // User’s access token for authentication
  chatHistory: ChatMessage[];   // An array of chat messages
  firstLogin: Date;             // Track the first login date
  lastLogin: Date;              // Track the last login date
}

export interface UserSession {
  sessionId: string;           // Unique identifier for the session
  sessionStartTime: Date;      // When the session started
  sessionExpiryTime: Date;     // When the session expires
  deviceInfo?: string;         // Optional: Device details (browser or mobile info)
}