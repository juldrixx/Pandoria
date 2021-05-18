import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { title } from '../utils';

class HomePage extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          {title('Accueil')}
        </Helmet>

        <div className='home-page'>
          <h1>Accueil</h1>
          <div>TODO</div>
        </div>
      </Fragment>
    );
  }
}

export default HomePage;