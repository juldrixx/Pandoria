import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import {
  Button,
  CircularProgress,
  Icon,
  TablePagination,
  TextField,
  Dialog,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  DialogTitle,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { rendererUtil } from '../../utils';
import { mangaFollowService, mangaSearchService } from '../../services';

function MangaListPage(props) {
  const [filter, setFilter] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(10);
  const [openSearch, setOpenSearch] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [searchDc] = useDebounce(search, 1000);

  const { t } = useTranslation();
  const { user } = props;

  const mangaFollow = useQuery({
    queryKey: ['mangaFollow', { filter, page, perPage }],
    queryFn: () =>
      mangaFollowService.getPaginate(
        user.id,
        perPage,
        page,
        filter ? { filteredBy: 'manga.name', filteredWith: filter } : null
      ),
    keepPreviousData: true,
  });

  const mangaSearch = useQuery({
    queryKey: ['mangaSearch', { searchDc, page, perPage }],
    queryFn: () => mangaSearchService.name(searchDc, 100, page),
    keepPreviousData: true,
    enabled: !!searchDc,
  });

  const navigate = useNavigate();
  const mangas = (mangaFollow.data?.result || []).map((r) => r.mangas);
  const searchResult = mangaSearch.data?.result ?? [];

  return (
    <>
      {rendererUtil.title(t('manga.my'))}
      <div className="manga-page">
        <div className="header">
          <h1>{t('manga.my')}</h1>
          <Button onClick={() => setOpenSearch(true)} variant="outlined">
            {t('manga.management')}
          </Button>
          <Button onClick={() => navigate('/mangas/search')} variant="outlined">
            {t('manga.search')}
          </Button>
        </div>

        <Dialog
          open={openSearch}
          onClose={() => setOpenSearch(false)}
          scroll="paper"
          fullWidth
        >
          <DialogTitle>
            <TextField
              label="Manga à ajouter"
              type="text"
              variant="standard"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              autoFocus
              fullWidth
            />
          </DialogTitle>
          <DialogContent dividers>
            <List>
              {searchResult.map((r) => (
                <ListItem key={r.id}>
                  <ListItemAvatar>
                    <Avatar src={r.cover} alt="toto" variant="rounded" />
                  </ListItemAvatar>
                  <ListItemText primary={r.title} secondary={r.lastChapter} />
                </ListItem>
              ))}
            </List>
          </DialogContent>
        </Dialog>

        <div className="search">
          <TextField
            type="search"
            placeholder={t('manga.searchByName')}
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
            variant="standard"
            fullWidth
          />
        </div>

        <div className="list-card">
          {mangaFollow.isLoading ? (
            <CircularProgress className="load-spinner" size="80px" />
          ) : (
            mangas.map((manga) => (
              <div key={manga.id} className="card manga-available">
                <div className="wrapper">
                  <img className="cover" src={manga.cover} alt="lol" />
                  <span className="favorite">
                    <Icon className={`${manga.favorite ? 'active' : ''}`}>
                      star
                    </Icon>
                  </span>
                  <div className="information">
                    <span className="title">{manga.name}</span>
                    <span>Nombre de chapitres : {manga.last_chapter}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <TablePagination
          component="div"
          count={mangaFollow.data?.total ?? 0}
          page={page - 1}
          rowsPerPage={perPage ?? 0}
          onPageChange={(_, v) => setPage(v + 1)}
          onRowsPerPageChange={(e) => setPerPage(e.target.value)}
          labelRowsPerPage={t('manga.pagination.perPage')}
          getItemAriaLabel={(type) =>
            t(`component.pagination.itemAria.${type}`)
          }
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} ${t('component.pagination.displayedRow.of')} ${
              count !== -1
                ? count
                : `${t('component.pagination.displayedRow.moreThan')} ${to}`
            }`
          }
          showFirstButton
          showLastButton
        />
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.user.info,
});

MangaListPage.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    roleId: PropTypes.number.isRequired,
    roleName: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(MangaListPage);
