import { RouterProvider } from 'react-router-dom';
import { browserRouter } from './pages/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import { SnackbarProvider } from 'notistack';
import axios, { AxiosError } from 'axios';
import { AuthProvider } from '~/context';
import { CustomDialog, useDialog } from '~/components';
import { FailureResponse } from '~/models';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const App = () => {
  //
  const { alert } = useDialog();
  const router = useMemo(() => browserRouter, []);
  const queryClient = useMemo(() => {
    const client = new QueryClient();
    client.getQueryCache().config.onError = (error) => {
      console.error(error);
      const errorMessage =
        (error as AxiosError<FailureResponse>)?.response?.data?.failureMessage?.exceptionMessage || 'Error';
      alert(errorMessage);
    };
    return client;
  }, []);

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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <RouterProvider router={router}/>
            </LocalizationProvider>
            <CustomDialog/>
          </SnackbarProvider>
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
};

export default App;
