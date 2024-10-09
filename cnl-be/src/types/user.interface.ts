import { ChatMessage, ChatPartition } from "./message.interface";

export interface User {
  email: string;                
  firstName?: string;           
  lastName?: string;            
  profilePicture?: string;      
  accessToken: string;          
  chatHistory: ChatMessage[];   
  firstLogin: Date;             
  lastLogin: Date;              
}

export interface UserSession {
  sessionId: string;           
  sessionStartTime: Date;      
  sessionExpiryTime: Date;    
}