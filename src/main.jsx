import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import './index.css';

const redirect = sessionStorage.redirect;
if (redirect) {
  sessionStorage.removeItem('redirect');
  window.history.replaceState(null, null, redirect);
}

const isDev = import.meta.env.DEV;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={isDev ? '/' : '/git-course10/'}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
