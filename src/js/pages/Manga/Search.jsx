import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { Icon, TextField, TablePagination } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { rendererUtil } from '../../utils';
import { mangaSearchService } from '../../services';

function MangaSearchPage() {
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(10);

  const { t } = useTranslation();

  const { data } = useQuery({
    queryKey: ['searchManga', { search, page, perPage }],
    queryFn: () =>
      search.length > 0 && mangaSearchService.name(search, perPage, page),
    keepPreviousData: true,
  });

  // const navigate = useNavigate();
  const mangas = data?.result ?? [];

  return (
    <>
      {rendererUtil.title(t('manga.search'))}
      <div className="manga-page">
        <div className="header">
          <h1>{t('manga.search')}</h1>
        </div>

        <div className="search">
          <TextField
            type="search"
            placeholder={t('manga.searchByName')}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            variant="standard"
            fullWidth
          />
        </div>

        <div className="list-card">
          {mangas.map((manga) => (
            <div key={manga.id} className="card manga-available">
              <div className="wrapper">
                <img className="cover" src={manga.cover} alt="toto" />
                <span className="follow">
                  {false /* mangaFollowed.includes(manga.id) */ && (
                    <Icon>done</Icon>
                  )}
                </span>
                <div className="information">
                  <span className="title">{manga.name}</span>
                  <span>Dernier chapitre : {manga.lastChapter}</span>
                </div>
              </div>
            </div>
          ))}
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

MangaSearchPage.propTypes = {};

export default MangaSearchPage;
