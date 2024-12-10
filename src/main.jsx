import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Import QueryClient and QueryClientProvider
import './index.css';
import App from './App.jsx';

// Create a QueryClient instance
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Wrap your App component with QueryClientProvider */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
