import React from 'react';
import googleIcon from '../../assets/icons/google-icon.png';  


export const GoogleLoginButton: React.FC = () => {
  const handleLogin = () => {
    // This will redirect to your backend's Google login route
    window.location.href = 'http://localhost:4000/auth/google';  
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-6 rounded flex items-center space-x-2">
      <img src={googleIcon} alt="Google Icon" className="h-5 w-5" />
      <span>Sign in with Google</span>
    </button>
  );
};
