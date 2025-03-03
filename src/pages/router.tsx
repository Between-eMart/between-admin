import { createBrowserRouter, Outlet } from 'react-router-dom';
import { DefaultLayout } from '~/layouts';
import { NotFound } from './not-found';
import { route as authRoute } from './auth/route';
import { route as dashboardRoute } from './dashboard/route';
import { route as myEventsRoute } from './my-events/route';
import { route as connectionsRoute } from './connections/route';
import { route as settingsRoute } from './settings/route';
import { IndexPage } from '.';

export const browserRouter = createBrowserRouter(
  [
    authRoute,
    {
      path: '/',
      element: (
        <DefaultLayout>
          <Outlet/>
        </DefaultLayout>
      ),
      children: [
        {
          index: true,
          element: <IndexPage/>,
        },
        dashboardRoute,
        myEventsRoute,
        connectionsRoute,
        settingsRoute,
      ],
    },
    {
      path: '*',
      element: <NotFound/>,
    },
  ],
);
