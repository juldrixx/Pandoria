import React from 'react';
import {
  DummyPage,  
} from '../pages';

const pages = {
  DummyPage: (props) => <DummyPage {...props} />,
}

export const routes = [
  // Dummy
  {
    path: '/',
    exact: true,
    component: pages.DummyPage,
  },
];
