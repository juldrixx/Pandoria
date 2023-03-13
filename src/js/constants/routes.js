import React from 'react';
import { Home, MenuBook } from '@mui/icons-material';
import { E404Page, HomePage, MangaListPage, MangaSearchPage } from '../pages';
import { RANK_ADMIN, RANK_USER } from './dbValues';

export default [
  {
    name: 'route.home',
    element: <HomePage />,
    path: '/',
    icon: <Home />,
    allowed: [RANK_USER, RANK_ADMIN],
  },
  {
    name: 'route.error404',
    element: <E404Page />,
    path: '*',
    allowed: [RANK_USER, RANK_ADMIN],
  },

  // Mangas
  {
    name: 'route.mangas',
    element: <MangaListPage />,
    path: '/mangas',
    icon: <MenuBook />,
    navbar: true,
    allowed: [RANK_USER, RANK_ADMIN],
  },
  {
    name: 'route.mangasSearch',
    path: '/mangas/search',
    element: <MangaSearchPage />,
    allowed: [RANK_USER, RANK_ADMIN],
  },
];
