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
      const accessToken = window.sessionStorage.getItem('access_token') || 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqc29uYm91cm5lIiwiaWF0IjoxNzQyNTQxMDI4LCJleHAiOjE3NDI4NDEwMjh9.6sY0nf9Fv3K3I197uTkdjEyWwTi5izJAyddkgVSGEhU';
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
