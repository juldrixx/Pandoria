import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DarkMode, LightMode } from '@mui/icons-material';
import PropTypes from 'prop-types';
import actions from '../../actions';

class ThemeChanger extends Component {
  handleThemeChange = (e) => {
    e.preventDefault();
    const { dark, changeTheme } = this.props;
    changeTheme(!dark);
  };

  render() {
    const { dark } = this.props;

    return (
      <span id="theme-changer">
        {dark ? (
          <LightMode onClick={this.handleThemeChange} />
        ) : (
          <DarkMode onClick={this.handleThemeChange} />
        )}
      </span>
    );
  }
}

const mapStateToProps = (state) => ({
  dark: state.theme.dark,
});

const mapDispatchToProps = (dispatch) => ({
  changeTheme: (dark) => dispatch(actions.themeActions.changeTheme(dark)),
});

ThemeChanger.propTypes = {
  dark: PropTypes.bool.isRequired,
  changeTheme: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemeChanger);
