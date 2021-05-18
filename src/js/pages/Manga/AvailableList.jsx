import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { title } from '../../utils';
import { Can } from '../../constants/abilityContext';
import { connect } from 'react-redux';
import { Button, Input, notification } from 'antd';
import Icon from '@material-ui/core/Icon';
import { mangaService, mangaListService } from '../../services';
import { Pagination } from '../../components';

class MangaAvailableListPage extends Component {
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
      newMangaId: null,
      mangaAvailable: [],
      mangaFollowed: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);

    this.handleFollow = this.handleFollow.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);

    this.loadManga = this.loadManga.bind(this);
  }

  componentDidMount() {
    const { pagination } = this.state;
    this.loadManga(pagination.perPage, pagination.page);

    mangaListService.get(this.props.user.id)
      .then(result => {
        this.setState({
          ...this.state,
          mangaFollowed: result.map(r => r.mangas.id),
        });
      })
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
      const filterByName = filterValue ? { filteredBy: 'name', filteredWith: filterValue } : null;

      mangaService.getPaginate(perPage, page, filterByName)
        .then(result => {
          this.setState({
            ...this.state,
            mangaAvailable: result.result,
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

  handleFollow(mangaId) {
    const { mangaFollowed } = this.state;

    if (!mangaFollowed.includes(mangaId)) {
      mangaListService.add(this.props.user.id, mangaId)
        .then(result => {
          this.setState({
            ...this.state,
            mangaFollowed: [...mangaFollowed, result.mangas.id]
          });
        })
        .catch(() => {
          notification['error']({
            message: 'Une erreur s\'est produite',
            description: 'Veuillez contacter un administrateur',
            placement: 'bottomRight',
          });
        });
    }
    else {
      mangaListService.remove(this.props.user.id, mangaId)
        .then(() => {
          this.setState({
            ...this.state,
            mangaFollowed: mangaFollowed.filter(r => r.mangas.id !== mangaId),
          });
        })
        .catch(() => {
          notification['error']({
            message: 'Une erreur s\'est produite',
            description: 'Veuillez contacter un administrateur',
            placement: 'bottomRight',
          });
        });
    }
  }

  handleAdd() {
    const { newMangaId, mangaAvailable } = this.state;

    mangaService.add(newMangaId)
      .then(newManga => {
        this.setState({
          ...this.state,
          mangaAvailable: [...mangaAvailable, newManga],
        });
        notification['success']({
          message: 'Manga ajouté',
          description: `Le manga ${newMangaId} a été ajouté.`,
          placement: 'bottomRight',
        });
      })
      .catch((err) => {
        notification['error']({
          message: 'Une erreur s\'est produite',
          description: 'Veuillez contacter un administrateur',
          placement: 'bottomRight',
        });
      });
  }

  render() {
    const { newMangaId, mangaAvailable, mangaFollowed, pagination, filterValue } = this.state;

    return (
      <Fragment>
        <Helmet>
          {title('Manga(s) disponible(s)')}
        </Helmet>

        <div className='manga-page'>
          <div className='header'>
            <h1>Manga(s) disponible(s)</h1>
            <Can do='create' on='Manga'>
              <div className='add_form'>
                <Input placeholder='ID Mangadex' onChange={this.onChange} value={newMangaId} />
                <Button className='round' onClick={this.handleAdd} disabled={!newMangaId}>Ajouter</Button>
              </div>
            </Can>
          </div>

          <div className='search'>
            <Input placeholder='Recherche par nom de manga' onChange={this.onFilterChange} value={filterValue} />
          </div>

          <div className='list-card'>
            {mangaAvailable.map(manga =>
              <div key={manga.id} className='card manga-available'>
                <div className='wrapper'>
                  <img className='cover' src={manga.cover} />
                  <span className='follow' onClick={() => this.handleFollow(manga.id)}>{mangaFollowed.includes(manga.id) && <Icon>done</Icon>}</span>
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


export default connect(mapStateToProps)(MangaAvailableListPage);