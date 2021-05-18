import React, { Component } from 'react';
import { connect } from 'react-redux';
import { themeActions } from '../actions';
import { Icon } from '@material-ui/core';


class ThemeChanger extends Component {
  constructor(props) {
    super(props);
    this.handleThemeChange = this.handleThemeChange.bind(this);
  }

  handleThemeChange(e) {
    e.preventDefault();
    this.props.changeTheme(!this.props.dark);
  }

  render() {
    const { dark } = this.props;

    return (
      <Icon className='top-right-corner theme-changer' onClick={this.handleThemeChange}>{dark ? 'brightness_5' : 'brightness_2'}</Icon>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dark: state.theme.dark,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    changeTheme: (dark) => dispatch(themeActions.changeTheme(dark)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemeChanger);