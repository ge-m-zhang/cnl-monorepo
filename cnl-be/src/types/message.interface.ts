export interface ChatMessage {
    messageId: string;         // Unique ID for each message
    sender: "user" | "bot";    // Identify the sender (user or chatbot)
    message: string;           // The message content
    timestamp: Date;           // When the message was sent
    partitionKey: string;      // A key that helps partition the data for efficient querying (e.g., month or userId)
  }


  export interface ChatPartition {
    partitionKey: string;         // Could be "2023-09" for September 2023
    messages: Set<ChatMessage>;   // Store a set of chat messages for that period
  }

  export interface RateLimit {
    userId: string;               // User being rate limited
    messagesSent: number;         // Number of messages sent within the rate-limited window
    windowStartTime: Date;        // Start time of the rate-limiting window (e.g., last 1 minute)
  }