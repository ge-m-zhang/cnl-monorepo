import React from 'react';
import { GoogleLoginButton } from '../components/auth/GoogleLoginButton';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/api';


export const LandingPage: React.FC = () => {

  const { data, error, isLoading } = useQuery({ queryKey: ['pingBackend'], queryFn: apiClient.pingBackend });

 

  const message = "Hello, GPT!";
  const {
    mutate: sendToGPT,
    data: gptData,
    error: gptError,
    
  } = useMutation({
    mutationFn: (message: string) => apiClient.sendToGPT(JSON.stringify({ message })),
  });
  
   console.log("gptData ----",gptData);

   const handleSendMessage = () => {
    sendToGPT(message);
  };

   if (error) return <div>Error fetching data</div>; 

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">


      <h1 className="text-4xl font-bold mb-8">Welcome to Chat & Learn </h1>
      <GoogleLoginButton />
      <button onClick={handleSendMessage} className="mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"> Send to GPT</button>  
    </div>
  );
};