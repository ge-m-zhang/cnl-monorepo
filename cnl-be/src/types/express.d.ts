import { User } from './user.interface';  // Import your User type if available

declare global {
  namespace Express {
    interface Request {
      user?: User;  
    }
  }
}