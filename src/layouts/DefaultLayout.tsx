import * as React from 'react';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppTheme from '~/theme/AppTheme';
import { useAuth } from '~/context';
import { AppNavbar, Header, LoginForm, SideMenu } from '~/layouts/components';


export const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  //
  const { user } = useAuth();

  return user ? (
    <>
      <AppTheme>
        <CssBaseline enableColorScheme/>
        <Box sx={{ display: 'flex' }}>
          <SideMenu/>
          <AppNavbar/>
          {/* Main content */}
          <Box
            component="main"
            sx={(theme) => ({
              flexGrow: 1,
              backgroundColor: alpha(theme.palette.background.default, 1),
              overflow: 'auto',
            })}
          >
            <Stack
              spacing={2}
              sx={{
                mx: 3,
                pb: 5,
                mt: { xs: 8, md: 0 },
              }}
            >
              <Header/>
              {children}
            </Stack>
          </Box>
        </Box>
      </AppTheme>
    </>
  ) : (
    <LoginForm/>
  );
};
