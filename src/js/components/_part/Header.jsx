import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import { userActions } from '../../actions';
import { routes } from '../../constants';
import logo from '../../../assets/images/logo.png';
import logoDark from '../../../assets/images/logo-dark.png';

class Header extends Component {
  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { user, rank, dark } = this.props;

    return (
      <header className='general-header'>
        <nav className='container'>

          <Link to='/' className='home-link'>
            <img src={dark ? logoDark : logo} alt='Pandoria logo' />
          </Link>

          <div className='primary-links'>
            {routes.map((route, index) =>
              (route.allowed.indexOf(rank) !== -1 && route.navbar) &&
              <NavLink key={index} to={route.path}>
                <Icon>{route.icon}</Icon>
                {route.label}
              </NavLink>
            )
            }
          </div>

          <div className='secondary-links'>
            <Link to={'/users/' + user.id} className='user-link'>
              {user.pseudo}
              <small>{user.roleName}</small>
            </Link>

            <a onClick={this.handleLogout} className='logout-button'>
              <Icon>logout</Icon>
            </a>
          </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.info,
    rank: state.user.info.roleId,
    dark: state.theme.dark,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(userActions.logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);