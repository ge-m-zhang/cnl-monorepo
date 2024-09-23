import React from 'react';
import { GoogleLoginButton } from '../components/auth/GoogleLoginButton';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to Chat & Learn </h1>
      <GoogleLoginButton />
    </div>
  );
};