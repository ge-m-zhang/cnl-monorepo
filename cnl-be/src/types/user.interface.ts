import { ChatMessage } from "./message.interface";

export interface User {
  userId: string;                
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