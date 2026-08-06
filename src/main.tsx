import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider } from './providers/AppProvider.tsx';
import { RootProvider } from './providers/RouterProvider.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <RootProvider />
    </AppProvider>
  </React.StrictMode>,
);
