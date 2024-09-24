import React from 'react';
import { GoogleLoginButton } from '../components/auth/GoogleLoginButton';
import { usePingBackendQuery } from '../redux/apiSlice';

export const LandingPage: React.FC = () => {

  const { data, error, isLoading } = usePingBackendQuery();
 
  if (error) return <div>Error fetching data</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">

<p>Backend response: {data?.message}</p>

      <h1 className="text-4xl font-bold mb-8">Welcome to Chat & Learn </h1>
      <GoogleLoginButton />
    </div>
  );
};