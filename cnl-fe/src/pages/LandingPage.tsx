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

   const getGPTResponse = () => {
    sendToGPT(message);
  };

  const { data:tables, error: dbErr, isLoading: connectingToDB, refetch } = useQuery({ 
    queryKey: ['dynamodbTables'],  
    queryFn: apiClient.getDynamoDBTables, 
    enabled: false,  // Disable automatic fetching on component mount
    });
const getTableData =() =>{
  refetch();
}
console.log("table dbErr Data ----", dbErr);
console.log("table Data ----", tables);

   if (error) return <div>Error fetching data</div>; 

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">


      <h1 className="text-4xl font-bold mb-8">Welcome to Chat & Learn </h1>
      <GoogleLoginButton />
      <button onClick={getGPTResponse} className="mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"> Send to GPT</button>  
    
      <button onClick={getTableData} className="mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"> Get Tables</button>  
    </div>
  );
};