import React from 'react';
import { GoogleLoginButton } from '../components/auth/GoogleLoginButton';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/api';

export const LandingPage: React.FC = () => {

  const {  error:pingError } = useQuery({ queryKey: ['pingBackend'], queryFn: apiClient.pingBackend });

  // GPT-3.5
  // const message = "Hello, GPT! which model are you based on?";
 
   if (pingError) return <div>Error fetching data</div>; 

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to Chat & Learn </h1>
      <GoogleLoginButton />
    </div>
  );
};