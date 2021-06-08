import React from 'react';
import { HomePage, MangaPage, MangaListPage, MangaAvailableListPage, MangaSearchPage } from '../pages';
import { RANK_USER, RANK_ADMIN } from './dbValues';

const pages = {
  HomePage: (props) => <HomePage {...props} />,

  MangaPage: (props) => <MangaPage {...props} />,
  MangaListPage: (props) => <MangaListPage {...props} />,
  MangaAvailableListPage: (props) => <MangaAvailableListPage {...props} />,
  MangaSearchPage: (props) => <MangaSearchPage {...props} />,
}

export const routes = [
  // Home
  {
    path: '/',
    exact: true,
    component: pages.HomePage,
    allowed: [RANK_USER, RANK_ADMIN],
  },

  // Mangas
  {
    path: '/mangas',
    exact: true,
    component: pages.MangaListPage,
    navbar: true,
    icon: 'import_contacts',
    label: 'Mangas',
    allowed: [RANK_USER, RANK_ADMIN],
  },
  {
    path: '/mangas/available',
    exact: true,
    component: pages.MangaAvailableListPage,
    allowed: [RANK_USER, RANK_ADMIN],
  },
  {
    path: '/mangas/search',
    exact: true,
    component: pages.MangaSearchPage,
    allowed: [RANK_USER, RANK_ADMIN],
  },
  {
    path: '/mangas/:id',
    exact: true,
    component: pages.MangaPage,
    allowed: [RANK_USER, RANK_ADMIN],
  },
];
