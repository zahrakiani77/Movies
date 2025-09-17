import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from './components/ui/provider.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const client = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
