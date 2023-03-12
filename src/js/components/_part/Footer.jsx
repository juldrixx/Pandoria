import React from 'react';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer>
      <div className="container">
        <small>
          <i>© {new Date().getFullYear()} Pandoria</i>
        </small>
        <small>
          {t('footer.madeBy')}{' '}
          <a
            href="https://github.com/juldrixx"
            target="_blank"
            rel="noreferrer"
          >
            Juldrixx
          </a>
        </small>
      </div>
    </footer>
  );
}

export default Footer;
