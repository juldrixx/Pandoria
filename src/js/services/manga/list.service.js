import { API_URL } from '../../constants/app';
import { headerUtil } from '../../utils';

function add(userId, mangaId) {
  const postInfo = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headerUtil.header(),
    },
    body: JSON.stringify({
      userId,
      mangaId,
      favorite: false,
      current_chapter: 0,
    }),
  };

  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/mangas/list`, postInfo)
      .then((result) => {
        if (!result.ok) throw result;
        return result.json();
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function get(userId) {
  const getInfo = {
    method: 'GET',
    headers: headerUtil.header(),
  };

  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/mangas/list/${userId}`, getInfo)
      .then((result) => {
        if (!result.ok) throw result;
        return result.json();
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function remove(userId, mangaId) {
  const getInfo = {
    method: 'DELETE',
    headers: headerUtil.header(),
  };

  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/mangas/list/${userId}/${mangaId}`, getInfo)
      .then((result) => {
        if (!result.ok) throw result;
        return result.json();
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getPaginate(userId, perPage, page, filterValue = null) {
  const getInfo = {
    method: 'GET',
    headers: headerUtil.header(),
  };

  const filter = filterValue
    ? `&filteredBy=${filterValue.filteredBy}&filteredWith=${filterValue.filteredWith}`
    : '';

  return new Promise((resolve, reject) => {
    fetch(
      `${API_URL}/mangas/list/${userId}?perPage=${perPage}&page=${page}${filter}`,
      getInfo
    )
      .then((result) => {
        if (!result.ok) throw result;
        return result.json();
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default {
  add,
  get,
  remove,
  getPaginate,
};
