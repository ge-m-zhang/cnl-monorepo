import { ChatMessage, ChatPartition } from "./message.interface";

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  accessToken: string;
  chatHistory: Set<ChatMessage>;  // Use Set to ensure unique chat messages
  firstLogin: Date;               // Track the first time user logged in
  lastLogin: Date;                // Track the last login time
  activeSessions?: UserSession[]; // Optional: Track active sessions across devices
  chatPartitions: ChatPartition[];  // Sharded chat history
}

export interface UserSession {
  sessionId: string;              // Unique identifier for the session
  sessionStartTime: Date;         // When the session started
  sessionExpiryTime: Date;        // When the session is expected to expire
  deviceInfo?: string;            // Optional: Device details (e.g., browser or mobile info)
  sessionToken: string;           // JWT token or other session-specific identifiers
}