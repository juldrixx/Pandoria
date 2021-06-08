import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { title, history } from '../../utils';
import { connect } from 'react-redux';
import { Button, Input } from 'antd';
import { mangaListService } from '../../services';
import { Pagination } from '../../components';
import { Icon } from '@material-ui/core';

class MangaListPage extends Component {
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
      filterValue: null,
      mangas: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);

    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);

    this.loadManga = this.loadManga.bind(this);
  }

  componentDidMount() {
    const { pagination } = this.state;
    this.loadManga(pagination.perPage, pagination.page);
  }

  onChange(e) {
    if (e.target.value.length === 0 || (parseInt(e.target.value) > 0 && !isNaN(parseInt(e.target.value)))) {
      this.setState({
        ...this.state,
        newMangaId: e.target.value.length > 0 ? parseInt(e.target.value) : null,
      });
    }
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

  loadManga(perPage, page, filterValue = this.state.filterValue) {
    if (perPage && page) {
      const { pagination } = this.state;
      const filterByName = filterValue ? { filteredBy: 'mangas.name', filteredWith: filterValue } : null;

      mangaListService.getPaginate(this.props.user.id, perPage, page, filterByName)
        .then(result => {
          this.setState({
            ...this.state,
            mangas: result.result.map(r => r.mangas),
            pagination: {
              ...pagination,
              page: page,
              numberOfPage: result.numberOfPage,
              next: result.next,
              previous: result.previous
            }
          });
        });
    }
  }

  onFilterChange(e) {    
    this.setState({
      ...this.state,
      filterValue: e.target.value,
    });
    
    this.loadManga(this.state.pagination.perPage, 1, e.target.value);
  }

  handleFavorite(mangaId) {
    console.log(this.props.user.id, mangaId);
  }

  render() {
    const { mangas, pagination, filterValue } = this.state;
    console.log(pagination)
    return (
      <Fragment>
        <Helmet>
          {title('Mes mangas')}
        </Helmet>

        <div className='manga-page'>
          <div className='header'>
            <h1>Mes mangas</h1>
            <Button className='round top-right-corner' onClick={() => history.push('/mangas/available')}>Gestion des mangas</Button>
            <Button className='round top-right-corner' onClick={() => history.push('/mangas/search')}>Rechercher un manga</Button>
          </div>

          <div className='search'>
            <Input placeholder='Recherche par nom de manga' onChange={this.onFilterChange} value={filterValue} />
          </div>

          <div className='list-card'>
            {mangas.map(manga =>
              <div key={manga.id} className='card manga-available'>
                <div className='wrapper'>
                  <img className='cover' src={manga.cover} />
                  <span className='favorite' onClick={() => this.handleFavorite(manga.id)}>{<Icon className={`${manga.favorite ? 'active' : ''}`}>star</Icon>}</span>
                  <div className='information'>
                    <span className='title'>{manga.name}</span>
                    <span>Nombre de chapitres : {manga.last_chapter}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Pagination pagination={pagination} loader={this.loadManga} onIndexChange={this.handlePageChange} />
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


export default connect(mapStateToProps)(MangaListPage);