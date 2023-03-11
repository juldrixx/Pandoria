import React from 'react';
import { Helmet } from 'react-helmet';
import { DOCUMENT_TITLE, TITLE_SEPARATOR } from '../constants/appInfo';

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
