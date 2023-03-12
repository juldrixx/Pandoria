import React from 'react';

function Footer() {
  return (
    <footer>
      <div className="container">
        <small>
          <i>© {new Date().getFullYear()} Pandoria</i>
        </small>
        <small>
          Réalisé par{' '}
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
