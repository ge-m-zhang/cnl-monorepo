import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/api";


const ProfilePage: React.FC = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['getProfile'],
    queryFn: apiClient.getProfile
  });

  console.log("profile: ", data);

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
              src={data?.profile?.picture || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-semibold mb-2">Welcome, {data?.profile?.firstName}</h1>
        </div>

        {/* Divider Line */}
        <div className="w-full h-1 bg-gray-200"></div>

        {/* Chat interface */}
        <div className="flex-grow flex flex-col bg-gray-100 rounded-lg p-4 overflow-y-auto space-y-4">
          {/* Placeholder for conversations */}
          <div className="text-gray-700">
            <p className="bg-blue-100 p-2 rounded-lg text-left">Welcome to the chat!</p>
            
          </div>
        </div>

        {/* Input field for new message */}
        <div className="w-full flex">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-grow p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Send</button>
        </div>
      </div>
    </div>
  );
};
  
  export default ProfilePage;