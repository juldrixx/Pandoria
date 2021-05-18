import { header } from "../utils/header";
import { API_URL } from "../constants";

export const mangaService = {
  get,
  getPaginate,
  add,
}

function get() {
  const getInfo = {
    method: 'GET',
    headers: header()
  };

  return new Promise((resolve, reject) => {
    fetch(API_URL + '/mangas', getInfo)
      .then(result => {
        if (!result.ok) throw result;
        return result.json();
      })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function getPaginate(perPage, page, filterValue = null) {
  const getInfo = {
    method: 'GET',
    headers: header()
  };

  const filter = filterValue ? `&filteredBy=${filterValue.filteredBy}&filteredWith=${filterValue.filteredWith}` : '';

  return new Promise((resolve, reject) => {
    fetch(API_URL + `/mangas?perPage=${perPage}&page=${page}${filter}`, getInfo)
      .then(result => {
        if (!result.ok) throw result;
        return result.json();
      })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function add(mangadexId) {
  const postInfo = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...header(),
    },
    body: JSON.stringify({
      mangadexId: mangadexId
    })
  };

  return new Promise((resolve, reject) => {
    fetch(API_URL + '/mangas', postInfo)
      .then(result => {
        if (!result.ok) throw result;
        return result.json();
      })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}