import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Ensure App.jsx exists in the same folder
import './index.css'; // Optional: Import global styles
import { StrictMode } from 'react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
