import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import HubIcon from '@mui/icons-material/Hub';
import {AppProvider, Navigation} from '@toolpad/core/AppProvider';
import {DashboardLayout} from '@toolpad/core/DashboardLayout';


const NAVIGATION: Navigation = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon/>,
  },
  {
    segment: 'my-events',
    title: 'My Events',
    icon: <EventIcon/>,
  },
  {
    segment: 'connections',
    title: 'Connections',
    icon: <HubIcon/>,
  },
];


export const DefaultLayout = ({children}: { children: React.ReactNode }) => {
  //
  return (
    <AppProvider
      branding={{
        title: 'Between Business',
        logo: <img src="/logo.svg" alt="logo"/>,
      }}
      navigation={NAVIGATION}
    >
      <DashboardLayout>
        <div style={{padding: 20}}>
          <React.Suspense fallback={<>loading screen</>}>
            {children}
          </React.Suspense>
        </div>
      </DashboardLayout>
    </AppProvider>
  );
}
