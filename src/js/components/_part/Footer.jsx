import React, { Component } from 'react';

class Footer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <footer className='general-footer'>
        <div className='container'>
          <small>
            <i>© {new Date().getFullYear()} Pandoria</i>
          </small>
          <small>Réalisé par <a href={'https://github.com/juldrixx'} target={'_blank'}>Juldrixx</a></small>
        </div>
      </footer>
    )
  }
}

export default Footer;