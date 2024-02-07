import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ChatAIPage from './pages/ChatAIPage';
import RequestPage from './pages/RequestPage';
import DashboardPage from './pages/DashboardPage';

import './App.css';
function App() {

  return (
    <Router>

      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/chat-ai" element={<ChatAIPage />} />
          <Route path="/request" element={<RequestPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />

        </Routes>
      </div>

    </Router>
  );
}

export default App;
