import { RouterProvider } from 'react-router-dom';
import { browserRouter } from './pages/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import { SnackbarProvider } from 'notistack';
import axios, { AxiosError } from 'axios';
import { AuthProvider } from '~/context';
import { CustomDialog, useDialog } from '~/components';
import { QueryResponse } from '~/models';

const App = () => {
  //
  const { alert } = useDialog();
  const router = useMemo(() => browserRouter, []);
  const queryClient = useMemo(() => new QueryClient({
    defaultOptions: {
      mutations: {
        onError: (error) => {
          console.error(error);
          const errorMessage =
            (error as AxiosError<QueryResponse<any>, any>)?.response?.data?.failureMessage?.exceptionMessage || 'Error';
          alert(errorMessage);
        },
      },
    },
  }), []);

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
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider>
            <RouterProvider router={router}/>
            <CustomDialog/>
          </SnackbarProvider>
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
};

export default App;
