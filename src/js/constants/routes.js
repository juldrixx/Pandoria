import React from 'react';
import { Home } from '@mui/icons-material';

import { HomePage } from '../pages';
import E404Page from '../pages/E404/E404';
import { RANK_ADMIN, RANK_USER } from './dbValues';

export default [
  {
    name: 'Home',
    element: <HomePage />,
    path: '/',
    icon: <Home />,
    allowed: [RANK_USER, RANK_ADMIN],
  },
  {
    name: 'Error 404',
    element: <E404Page />,
    path: '*',
    allowed: [RANK_USER, RANK_ADMIN],
  },
];
