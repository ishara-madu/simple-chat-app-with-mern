import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Added Navigate
import Auth from './pages/Auth.jsx';
import Cookies from 'js-cookie'; // Added for cookie checking

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route 
        path="/" 
        element={Cookies.get('username') ? <App /> : <Navigate to="/auth" replace />} 
      />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  </BrowserRouter>
);