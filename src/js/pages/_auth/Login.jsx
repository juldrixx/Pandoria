import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import { title, history } from '../../utils';
import { connect } from 'react-redux';
import logo from '../../../assets/images/logo_with_text.png';
import { Input, Button } from 'antd';
import { userActions } from '../../actions';

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = { username: '', password: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleLogin(e) {
    e.preventDefault();
    this.props.loginUser(this.state.username, this.state.password);
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          {title('Connexion')}
        </Helmet>

        <div className='login-page'>
          <div className='left-block'>
            <form className='login-form'>
              <header>
                <h1>Connexion</h1>
              </header>

              <div>
                <p>
                  <label htmlFor='username'>Nom d'utilisateur :</label>
                  <Input type='text'
                    name='username'
                    id='username'
                    value={this.state.username}
                    onChange={this.handleChange}
                    autoComplete='username' />
                </p>

                <p>
                  <label htmlFor='password'>Mot de passe :</label>
                  <Input type='password'
                    name='password'
                    id='password'
                    value={this.state.password}
                    onChange={this.handleChange}
                    autoComplete='current-password' />
                </p>

                {(this.props.error) && <b className='error'>Nom d'utilisateur ou mot de passe incorrecte</b>}

                <div className='buttons'>
                  <a className='button' onClick={() => history.push('/register')}>S'inscrire</a>
                  <Button onClick={this.handleLogin}>Se connecter</Button>
                </div>
                <div className='password-forget'>
                  <a className='slim' onClick={() => history.push('/register')}>Mot de passe oublié ?</a>
                </div>
              </div>

            </form>
          </div>

          <div className='right-block'>
            <img src={logo} alt='Pandoria Logo' />
          </div>
        </div>

      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.user.loginError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (username, password) => dispatch(userActions.login(username, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);