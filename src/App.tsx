import { RouterProvider } from 'react-router-dom';
import { browserRouter } from './pages/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import { SnackbarProvider } from 'notistack';
import axios from 'axios';

const App = () => {
  //
  const router = useMemo(() => browserRouter, []);
  const queryClient = useMemo(() => new QueryClient(), []);

  axios.interceptors.request.use(
    config => {
      const accessToken = window.sessionStorage.getItem('access_token');
      if (!!accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>
          <RouterProvider router={router}/>
        </SnackbarProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
