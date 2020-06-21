import React from 'react';
import {
  HomePage,  
} from '../pages';

const pages = {
  HomePage: (props) => <HomePage {...props} />,
}

export const routes = [
  // Home
  {
    path: '/',
    exact: true,
    component: pages.HomePage,
  },
];
