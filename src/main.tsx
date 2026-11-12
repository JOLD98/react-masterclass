import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import { ProgressProvider } from './context/ProgressContext';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContentProvider>
        <AuthProvider>
          <ProgressProvider>
            <App />
          </ProgressProvider>
        </AuthProvider>
      </ContentProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
