import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { title } from '../../utils';
import { Can } from '../../constants/abilityContext';
import { connect } from 'react-redux';
import { Button, Input, notification } from 'antd';
import Icon from '@material-ui/core/Icon';
import { mangaSearchService } from '../../services';
import { Pagination } from '../../components';

class MangaSearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pagination: {
        perPage: 8,
        page: 1,
        numberOfPage: 1,
        next: null,
        previous: null
      },
      searchValue: null,
      results: [],
    };

    this.timer = null;

    this.onChange = this.onChange.bind(this);

    this.handleTimer = this.handleTimer.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {

  }

  componentDidUpdate(prevPros, prevState) {
    if (prevState.searchValue !== this.state.searchValue) {
      this.handleTimer()
    }
  }

  onChange(e) {
    const searchValue = e.target.value;
    return this.setState({
      ...this.state,
      searchValue,
    });
  }

  handleTimer() {
    const { pagination } = this.state;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.handleSearch(pagination.perPage, 1);
    }, 500);
  }

  handleSearch(perPage, page) {
    const { pagination, searchValue } = this.state;
    if (searchValue.length === 0) return;
    
    mangaSearchService.name(searchValue, perPage, page).then(result => {
      this.setState({
        ...this.state,
        results: result.result,
        pagination: {
          ...pagination,
          page: page,
          numberOfPage: result.numberOfPage,
          next: result.next,
          previous: result.previous
        }
      });
    })
  }

  handlePageChange(page) {
    this.setState({
      ...this.state,
      pagination: {
        ...this.state.pagination,
        page: page,
      }
    });
  }

  render() {
    const { results, pagination, searchValue } = this.state;

    console.log(results)
    return (
      <Fragment>
        <Helmet>
          {title('Recherher un manga')}
        </Helmet>

        <div className='manga-page'>
          <div className='header'>
            <h1>Recherher un manga</h1>
          </div>

          <div className='search'>
            <Input placeholder='Nom du manga' onChange={this.onChange} value={searchValue} />
          </div>

          <div className='list-card'>
            {results.map(manga =>
              <div key={manga.id} className='card manga-available'>
                <div className='wrapper'>
                  <img className='cover' src={manga.cover} />
                  <span className='follow' onClick={() => console.log('FOLLOW', manga.id)}>{false /*mangaFollowed.includes(manga.id)*/ && <Icon>done</Icon>}</span>
                  <div className='information'>
                    <span className='title'>{manga.name}</span>
                    <span>Dernier chapitre : {manga.lastChapter}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Pagination pagination={pagination} loader={this.handleSearch} onIndexChange={this.handlePageChange} />
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


export default connect(mapStateToProps)(MangaSearchPage);