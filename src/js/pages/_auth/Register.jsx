import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Image from '../../constants/images';
import { userService } from '../../services';
import Footer from '../../components/_part/Footer';
import { rendererUtil } from '../../utils';

function RegisterPage(props) {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');
  const [error, setError] = React.useState(false);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { dark } = props;

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setPassword('');
      setPasswordConfirm('');
      setError(true);

      return;
    }

    userService.register(username, email, password).then(() => {
      navigate('/login');
    });
  };

  return (
    <>
      {rendererUtil.title('Inscription')}
      <div className="login-page register">
        <div className="image-block">
          <img
            src={
              dark
                ? Image.logo.pandoriaWithTextDark
                : Image.logo.pandoriaWithText
            }
            alt="Pandoria Logo"
          />
        </div>
        <div className="form-block">
          <form onSubmit={handleRegister}>
            <header>
              <h1>{t('auth.registration')}</h1>
            </header>

            <TextField
              type="text"
              id="username"
              label={t('auth.username')}
              autoComplete="username"
              variant="filled"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />

            <TextField
              type="email"
              id="email"
              label={t('auth.email')}
              autoComplete="email"
              variant="filled"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />

            <TextField
              type="password"
              id="password"
              label={t('auth.password')}
              autoComplete="new-password"
              variant="filled"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />

            <TextField
              type="password"
              id="password_confirm"
              label={t('auth.passwordConfirm')}
              autoComplete="new-password"
              variant="filled"
              onChange={(e) => setPasswordConfirm(e.target.value)}
              value={passwordConfirm}
              required
            />

            {error && <b className="error">{t('auth.errorRegister')}</b>}

            <div className="buttons">
              <Button variant="text" onClick={() => navigate('/login')}>
                {t('common.cancel')}
              </Button>
              <Button variant="contained" size="large" type="submit">
                {t('auth.register')}
              </Button>
            </div>
          </form>
          <Footer />
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  dark: state.theme.dark,
});

RegisterPage.propTypes = {
  dark: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(RegisterPage);
