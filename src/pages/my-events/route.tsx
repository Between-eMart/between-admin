import { RouteObject } from 'react-router-dom';
import { IndexPage } from '.';

export const route: RouteObject = {
  path: 'my-events',
  children: [
    {
      index: true,
      element: <IndexPage/>,
    },
  ],
};
