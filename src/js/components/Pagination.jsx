import React, { Component } from 'react';
import { Input, Button } from 'antd';

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.handleIndexChange = this.handleIndexChange.bind(this);
  }

  handleIndexChange(e) {
    const { onIndexChange } = this.props;

    if (e.target.value.length === 0 || (parseInt(e.target.value) > 0 && !isNaN(parseInt(e.target.value)))) {
      onIndexChange(e.target.value.length > 0 ? parseInt(e.target.value) : null);
    }
  }

  render() {
    const { pagination, loader } = this.props;

    return (
      <div className='pagination'>
        <div className='previous'>{pagination.previous && <Button onClick={() => loader(pagination.perPage, pagination.previous.page)}>Page précédente</Button>}</div>
        <div className='index'><Input value={pagination.page} onChange={this.handleIndexChange} onPressEnter={() => loader(pagination.perPage, pagination.page)} /><span> sur {pagination.numberOfPage}</span></div>
        <div className='next'>{pagination.next && <Button onClick={() => loader(pagination.perPage, pagination.next.page)}>Page suivante</Button>}</div>
      </div>
    );
  }
}

export default Pagination;