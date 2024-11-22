import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/api";
import { useRecoilState } from "recoil";
import { userProfileState } from "../recoil/Object.recoil";
import { useEffect } from "react";
import { User } from "../types/types";

// util functions for user management
// call getUserByEmail to get user data, 
// if exists, set userProfileState, if not, add current time as firstLogin 
export const useUserState = () => {

    const { data, error, isLoading } = useQuery({
        queryKey: ['getProfile'],
        queryFn: apiClient.getProfile
      });
   
      const  [userProfile, setUserProfile] = useRecoilState(userProfileState);
 
      useEffect(() => {
        const setProfileAndCheckUser = async () => {
          if (data?.profile?.email) {
            // Check if the user exists in the backend
            const thisUser = await getUserByEmail(data?.profile?.email);
    
            // If the user exists, use the existing firstLogin, and update lastLogin to current time
            if (thisUser) {
              const existingUserProfile: User = {
                userId: data.profile.email,
                firstName: data.profile.firstName,
                lastName: data.profile.lastName,
                profilePicture: data.profile.picture,
                accessToken: data.profile.accessToken,
                firstLogin: thisUser.firstLogin, // Existing firstLogin from the backend
                lastLogin: new Date().toISOString(),  // Update lastLogin to current time
              };
              setUserProfile(existingUserProfile);  // Update the state with the existing user info
            } else {
              // For a new user, set both firstLogin and lastLogin to the current time
              const newUserProfile: User = {
                userId: data.profile.email,
                firstName: data.profile.firstName,
                lastName: data.profile.lastName,
                profilePicture: data.profile.picture,
                accessToken: data.profile.accessToken,
                firstLogin: new Date().toISOString(), 
                lastLogin: new Date().toISOString(),  
              };
              setUserProfile(newUserProfile);  
            }
          }
        };
    
        setProfileAndCheckUser();
      }, [data, setUserProfile]);
    
      return { error, isLoading };
    }

  export  const getUserByEmail = async (email: string) => {
        try {
          const response = await apiClient.getUserByEmail(email);  
          return response;
        } catch (error) {
          console.error("Error fetching user:", error);
          return null;
        }
      };