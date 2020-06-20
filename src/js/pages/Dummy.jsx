import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { dummyActions } from '../actions';

class DummyPage extends Component {

  componentDidMount() {
    this.props.dummyGet()
      .then((r) => {
        console.log(r);
      })
      .catch((e) => {
        console.log(e);
      })
  }

  render() {
    const { dummyResult, dummyError } = this.props;
    console.log(dummyResult)
    return (
      <Fragment>
        <div className="content">
          {dummyResult.length > 0 && dummyResult}
          {dummyError.length > 0 && dummyError}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    dummyResult: state.dummy.dummyResult,
    dummyError: state.dummy.dummyError,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dummyGet: () => dispatch(dummyActions.dummyGet()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DummyPage);