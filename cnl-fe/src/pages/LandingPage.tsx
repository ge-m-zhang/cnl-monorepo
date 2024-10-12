import React, { useCallback } from 'react';
import { GoogleLoginButton } from '../components/auth/GoogleLoginButton';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/api';
import { v4 as uuidv4 } from 'uuid';

export const LandingPage: React.FC = () => {

  const {  error:pingError } = useQuery({ queryKey: ['pingBackend'], queryFn: apiClient.pingBackend });

  // GPT-3.5
  const message = "Hello, GPT!";
  const {
    mutate: sendToGPT,
    data: gptData,
    error: gptError, 
  } = useMutation({
    mutationFn: (message: string) => apiClient.sendMessageToGPT(JSON.stringify({ message })),
  });
  
   console.log("gptData ----",gptData);

   const getGPTResponse = useCallback(() => {
    sendToGPT(message);
  }, [message]);

  // DynamoDB Tables
  const { data:tables, error: dbErr, isLoading: connectingToDB, refetch } = useQuery({ 
    queryKey: ['dynamodbTables'],  
    queryFn: apiClient.getDynamoDBTables, 
    enabled: false,  // Disable automatic fetching on component mount
    staleTime: Infinity,  // Data remains fresh forever (no automatic re-fetch)
    refetchOnWindowFocus: false  // Prevent re-fetching on window focus
    });

    const getTableData = useCallback(() => {
      refetch();
    }, [refetch]);

    const handleAddTestData = async () => {
      const testData = { randomId: uuidv4(), message: 'Hello, DynamoDB!' }; 
  
      try {
        const response = await apiClient.addTestData(testData);
        console.log(response.message); 
      } catch (error) {
        console.error(error);
        alert('Failed to add item');
      }
    };

   if (pingError) return <div>Error fetching data</div>; 

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">


      <h1 className="text-4xl font-bold mb-8">Welcome to Chat & Learn </h1>
      <GoogleLoginButton />
      <button type="button" id='sendToGPTButton' onClick={getGPTResponse} className="mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"> Send to GPT</button>  
    
      <button type="button" id='getTablesButton' onClick={getTableData} className="mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"> Get Tables</button> 

      <button type="button" id='addToTestTableButton' onClick={handleAddTestData} className="mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"> Add to Test Table</button>   
    </div>
  );
};