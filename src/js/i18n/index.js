import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import fr from './fr.json';

const resources = {
  fr,
  en,
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'fr',
  keySeparator: '.',
  interpolation: {
    escapeValue: false,
  },
});
