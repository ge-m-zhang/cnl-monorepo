import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/api";
import { userProfileState } from "../recoil/Object.recoil";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import ChatInterface from "./ChatInterface";
import {  useUserState } from "../utils/userHelpers";


const ProfilePage: React.FC = () => {


  const { error, isLoading } = useUserState();

  const [user] = useRecoilState(userProfileState);

 useEffect(() => {
  if (user?.userId) {
    apiClient.updateUserProfile(user);
  }

 }, [user]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching profile data</div>;
   
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    {/* Main container */}
    <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg flex flex-col h-[90vh] p-8 space-y-6">
      {/* Profile image and name */}
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <img
            src={user?.profilePicture || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-3xl font-semibold mb-2">Welcome, {user?.firstName}</h1>
      </div>

      {/* Divider Line */}
      <div className="w-full h-1 bg-gray-200"></div>

      {/* Chat interface */}
      <ChatInterface />
    </div>
  </div>
);
};
  
  export default ProfilePage;