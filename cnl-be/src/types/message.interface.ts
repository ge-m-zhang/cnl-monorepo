export interface ChatMessage {
  msgId: string; 
  userId: string;    
  sender: "user" | "bot";   
  message: string;          
  timestamp: Date;          
}

  // optional for MVP

  export interface ChatPartition {
    partitionKey: string;       
    messages: ChatMessage[];   
  }

  export interface RateLimit {
    userId: string;               
    messagesSent: number;         
    windowStartTime: Date;        
  }