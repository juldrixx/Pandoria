import React from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { rendererUtil } from '../../utils';
import Image from '../../constants/images';
import actions from '../../actions';
import Footer from '../../components/_part/Footer';

function LoginPage(props) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { dark, error, loginUser } = props;

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(username, password);
  };

  return (
    <>
      {rendererUtil.title(t('auth.title'))}
      <div className="login-page">
        <div className="form-block">
          <form onSubmit={handleLogin}>
            <header>
              <h1>{t('auth.title')}</h1>
            </header>

            <TextField
              type="text"
              id="username"
              label={t('auth.username')}
              autoComplete="username"
              variant="filled"
              onChange={handleUsername}
              value={username}
              required
            />

            <TextField
              type="password"
              id="password"
              label={t('auth.password')}
              autoComplete="current-password"
              variant="filled"
              onChange={handlePassword}
              value={password}
              required
            />

            {error && <b className="error">{t('auth.errorLogin')}</b>}

            <div className="buttons">
              <Button variant="text" onClick={() => navigate('/register')}>
                {t('auth.register')}
              </Button>
              <Button variant="contained" size="large" type="submit">
                {t('auth.login')}
              </Button>
            </div>
            <div className="password-forget">
              <Button
                variant="text"
                size="small"
                onClick={() => navigate('/forget')}
              >
                {t('auth.passwordForget')}
              </Button>
            </div>
          </form>
          <Footer />
        </div>

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
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  error: state.user.loginError,
  dark: state.theme.dark,
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (username, password) =>
    dispatch(actions.userActions.login(username, password)),
});

LoginPage.propTypes = {
  dark: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  loginUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
