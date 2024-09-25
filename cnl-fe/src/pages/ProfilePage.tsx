import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/api";


const ProfilePage: React.FC = () => {
   
  const { data: profile, error, isLoading } = useQuery({
    queryKey: ['getProfile'],
    queryFn: apiClient.getProfile
  });
  
console.log("profile: ",profile);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching profile data</div>;
  
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-8">Welcome, {profile.firstName}</h1>
        <p>Email: {profile.email}</p>
        <img src={profile.picture} alt="Profile" className="rounded-full" />
      </div>
    );
  };
  
  export default ProfilePage;