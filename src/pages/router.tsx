import { createBrowserRouter, Outlet } from 'react-router-dom';
import { DefaultLayout } from '~/layouts';
import { NotFound } from './not-found';
import { route as authRoute } from './auth/route';
import { route as dashboardRoute } from './dashboard/route';
import { route as influencersRoute } from './influencers/route';
import { route as organizationsRoute } from './organizations/route';
import { route as eventsRoute } from './events/route';
import { route as supportRoute } from './support/route';
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
        influencersRoute,
        organizationsRoute,
        eventsRoute,
        supportRoute,
        settingsRoute,
      ],
    },
    {
      path: '*',
      element: <NotFound/>,
    },
  ],
);
