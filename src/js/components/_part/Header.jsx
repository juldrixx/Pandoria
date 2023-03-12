import { IconButton } from '@mui/material';
import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import actions from '../../actions';
import Image from '../../constants/images';
import routes from '../../constants/routes';

function Header(props) {
  const { t } = useTranslation();

  const { dark, user, logoutUser } = props;

  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser();
  };

  return (
    <header>
      <nav className="container">
        <Link to="/" className="home-link">
          <img
            src={dark ? Image.logo.pandoriaDark : Image.logo.pandoria}
            alt="Pandoria logo"
          />
        </Link>

        <div className="primary-links">
          {routes.map(
            (route) =>
              route.allowed.indexOf(user.roleId) !== -1 &&
              route.navbar && (
                <NavLink key={route.name} to={route.path}>
                  {route.icon}
                  {t(route.name)}
                </NavLink>
              )
          )}
        </div>

        <div className="secondary-links">
          <Link to={`/users/${user.id}`} className="user-link">
            {user.username}
            <small>{user.roleName}</small>
          </Link>

          <IconButton className="logout-button" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </div>
      </nav>
    </header>
  );
}

const mapStateToProps = (state) => ({
  dark: state.theme.dark,
  user: state.user.info,
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(actions.userActions.logout()),
});

Header.propTypes = {
  dark: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    roleId: PropTypes.number.isRequired,
    roleName: PropTypes.string.isRequired,
  }).isRequired,
  logoutUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
