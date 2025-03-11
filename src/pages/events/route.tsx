import { RouteObject } from 'react-router-dom';
import { IndexPage } from '.';
import { EventDetailPage } from './detail';

export const route: RouteObject = {
  path: 'events',
  children: [
    {
      index: true,
      element: <IndexPage/>,
    },
    {
      path: ':eventId',
      element: <EventDetailPage/>,
    },
  ],
};
