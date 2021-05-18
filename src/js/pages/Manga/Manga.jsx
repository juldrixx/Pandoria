import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { title } from '../../utils';
import { connect } from 'react-redux';

class MangaPage extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          {title('Manga')}
        </Helmet>

        <div className='manga-page'>
          <h1>Manga</h1>
          <div>TODO</div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.info,
    rank: state.user.info.roleId,
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};


export default connect(mapStateToProps, mapDispatchToProps)(MangaPage);