import React from 'react';
import { Helmet } from 'react-helmet-async';
import { DOCUMENT_TITLE, TITLE_SEPARATOR } from '../constants/app';

function title(pageName) {
  return (
    <Helmet
      titleTemplate={`%s ${TITLE_SEPARATOR} ${DOCUMENT_TITLE}`}
      title={pageName}
    />
  );
}

export default {
  title,
};
