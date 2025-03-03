import * as React from 'react';
import { RouteObject } from 'react-router-dom';
import { IndexPage } from '.';
import { LoginPage } from '~/pages/auth/login';

export const route: RouteObject = {
  path: 'auth',
  children: [
    {
      index: true,
      element: <IndexPage/>,
    },
    {
      path: 'login',
      element: <LoginPage/>,
    },
  ],
};
