import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/api";


const ProfilePage: React.FC = () => {
   
  const { data, error, isLoading } = useQuery({
    queryKey: ['getProfile'],
    queryFn: apiClient.getProfile
  });
  
console.log("profile: ",data);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching profile data</div>;
  
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-8">Welcome, {data.firstName}</h1>
        <p> {data.profile?.firstName}</p>
      </div>
    );
  };
  
  export default ProfilePage;