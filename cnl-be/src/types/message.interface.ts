export interface ChatMessage {
  msgId: string; 
  userId: string;    
  sender: "user" | "bot";   
  message: string;          
  timestamp: Date;          
}

  export interface ChatPartition {
    partitionKey: string;         
    messages: Set<ChatMessage>;   
  }

  // optional for MVP
  export interface RateLimit {
    userId: string;               
    messagesSent: number;         
    windowStartTime: Date;        
  }