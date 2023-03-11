import React from 'react';
import { Home } from '@mui/icons-material';

import { HomePage } from '../pages';
import E404Page from '../pages/E404/E404';

export default [
  {
    name: 'Home',
    element: <HomePage />,
    path: '/',
    icon: <Home />,
  },
  {
    name: 'Error 404',
    element: <E404Page />,
    path: '*',
    icon: <Home />,
  },
];
