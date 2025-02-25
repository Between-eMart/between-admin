import * as React from 'react';
import {createBrowserRouter, Outlet} from 'react-router-dom';
import {DefaultLayout} from '../layouts';
import {NotFound} from "./not-found.tsx";
import {route as dashboardRoute} from './dashboard/route';
import {route as myEventsRoute} from './my-events/route';
import {route as connectionsRoute} from './connections/route';
import {IndexPage} from ".";

export const browserRouter: any = createBrowserRouter(
  [
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
      ],
    },
    {
      path: '*',
      element: <NotFound/>,
    },
  ],
);
