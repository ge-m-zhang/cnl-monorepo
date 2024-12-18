import React from 'react';
import { Route,Routes } from 'react-router-dom';

import { LandingPage } from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';


function App() {
  return (
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      </React.StrictMode>
  );
}

export default App;