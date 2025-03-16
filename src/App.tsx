import { RouterProvider } from 'react-router-dom';
import { browserRouter } from './pages/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import { SnackbarProvider } from 'notistack';
import axios from 'axios';
import { AuthProvider } from '~/context';

const App = () => {
  //
  const router = useMemo(() => browserRouter, []);
  const queryClient = useMemo(() => new QueryClient(), []);

  axios.interceptors.request.use(
    config => {
      const accessToken = window.sessionStorage.getItem('access_token') || 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqc29uYm91cm5lIiwiaWF0IjoxNzQxNzcyMzg3LCJleHAiOjE3NDIwNzIzODd9.KL2NRFnxwg6lI-GeMTB0fCrCLSai_1YFKxlDs_5dVDg';
      if (!!accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
  );

  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider>
            <RouterProvider router={router}/>
          </SnackbarProvider>
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
};

export default App;
