import * as React from 'react';
import { RouteObject } from 'react-router-dom';
import { IndexPage } from '.';

export const route: RouteObject = {
  path: 'settings',
  children: [
    {
      index: true,
      element: <IndexPage/>,
    },
  ],
};
