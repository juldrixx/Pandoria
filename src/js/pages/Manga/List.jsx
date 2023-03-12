import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  CircularProgress,
  Icon,
  TablePagination,
  TextField,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { rendererUtil } from '../../utils';
import { mangaListService } from '../../services';

function MangaListPage(props) {
  const [filter, setFilter] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(10);

  const { t } = useTranslation();
  const { user } = props;

  const { isLoading, data } = useQuery({
    queryKey: ['listManga', { filter, page, perPage }],
    queryFn: () =>
      mangaListService.getPaginate(
        user.id,
        perPage,
        page,
        filter ? { filteredBy: 'mangas.name', filteredWith: filter } : null
      ),
    keepPreviousData: true,
  });

  const navigate = useNavigate();
  const mangas = (data?.result || []).map((r) => r.mangas);

  return (
    <>
      {rendererUtil.title(t('manga.my'))}
      <div className="manga-page">
        <div className="header">
          <h1>{t('manga.my')}</h1>
          <Button
            onClick={() => navigate('/mangas/available')}
            variant="outlined"
          >
            {t('manga.management')}
          </Button>
          <Button onClick={() => navigate('/mangas/search')} variant="outlined">
            {t('manga.search')}
          </Button>
        </div>

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
          {isLoading ? (
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
          count={data?.total ?? 0}
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
