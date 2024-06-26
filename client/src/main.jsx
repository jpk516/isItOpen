import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './custom.scss'
import { RouterProvider } from 'react-router-dom';
import { router } from './components/Router';
import ErrorBoundary from './components/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <ErrorBoundary> 
    <RouterProvider router={router} />
  </ErrorBoundary>
  </React.StrictMode>
)
