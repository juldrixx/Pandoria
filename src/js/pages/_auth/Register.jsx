import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import { title, history } from '../../utils';
import { connect } from 'react-redux';
import logo from '../../../assets/images/logo_with_text.png';
import logoDark from '../../../assets/images/logo_with_text-dark.png';
import { Input, Button } from 'antd';
import { userService } from '../../services';

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', email: '', password: '', password_confirm: '', error: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value, error: false });
  }

  handleRegister(e) {
    e.preventDefault();
    if (this.state.password !== this.state.password_confirm) {
      this.setState({
        ...this.state,
        password: '',
        password_confirm: '',
        error: true,
      });
    }
    else {
      userService.register(this.state.username, this.state.email, this.state.password)
        .then(() => {
          history.push('/login');
        });
    }
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          {title('Inscription')}
        </Helmet>

        <div className='login-page register'>
          <div className='left-block'>
            <form className='login-form' onSubmit={this.handleRegister}>
              <header>
                <h1>Inscription</h1>
              </header>

              <div>
                <p>
                  <label htmlFor='username'>Nom d'utilisateur :</label>
                  <Input type='text'
                    name='username'
                    id='username'
                    value={this.state.username}
                    onChange={this.handleChange}
                    autoComplete='username'
                    required />
                </p>

                <p>
                  <label htmlFor='email'>Adresse email :</label>
                  <Input type='email'
                    name='email'
                    id='email'
                    value={this.state.email}
                    onChange={this.handleChange}
                    autoComplete='email'
                    required />
                </p>

                <p>
                  <label htmlFor='password'>Mot de passe :</label>
                  <Input type='password'
                    name='password'
                    id='password'
                    value={this.state.password}
                    onChange={this.handleChange}
                    autoComplete='new-password'
                    required />
                </p>

                <p>
                  <label htmlFor='password_confirm'>Confirmation du mot de passe :</label>
                  <Input type='password'
                    name='password_confirm'
                    id='password_confirm'
                    value={this.state.password_confirm}
                    onChange={this.handleChange}
                    autoComplete='new-password'
                    required />
                </p>

                {(this.state.error) && <b className='error'>Les mots de passe doivent être identique</b>}

                <div className='buttons'>
                  <a className='button' onClick={() => history.goBack()}>Annuler</a>
                  <Button htmlType='submit'>S'inscrire</Button>
                </div>
              </div>

            </form>
          </div>

          <div className='right-block'>
            <img src={this.props.dark ? logoDark : logo} alt='Pandoria Logo' />
          </div>
        </div>

      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dark: state.theme.dark,
  };
}

export default connect(mapStateToProps)(RegisterPage);