import React from 'react';
import { TextField } from '@mui/material';
import rendererUtil from '../../utils';

function LoginPage() {
  return (
    <>
      {rendererUtil.title('Connexion')}
      <div className="login-page">
        <div className="left-block">
          <form className="login-form">
            <header>
              <h1>Connexion</h1>
            </header>

            <div>
              <p>
                <TextField
                  type="text"
                  id="username"
                  label="Username"
                  autoComplete="username"
                  variant="filled"
                />
              </p>

              <p>
                <TextField
                  type="password"
                  id="password"
                  label="Mot de passe"
                  autoComplete="current-password"
                />
              </p>

              {/* {this.props.error && (
                <b className="error">
                  Nom d'utilisateur ou mot de passe incorrecte
                </b>
              )} */}

              <div className="buttons">
                {/* <a className="button" onClick={() => history.push('/register')}>
                  S'inscrire
                </a>
                <Button onClick={this.handleLogin}>Se connecter</Button> */}
              </div>
              <div className="password-forget">
                {/* <a className="slim" onClick={() => history.push('/register')}>
                  Mot de passe oublié ?
                </a> */}
              </div>
            </div>
          </form>
        </div>

        <div className="right-block">
          {/* <img src={this.props.dark ? logoDark : logo} alt="Pandoria Logo" /> */}
        </div>
      </div>
    </>
  );
}

export default LoginPage;
