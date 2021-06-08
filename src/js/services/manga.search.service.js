import { header } from "../utils/header";
import { API_URL } from "../constants";

export const mangaSearchService = {
  name,
}

function name(mangaName, perPage, page) {
  const getInfo = {
    method: 'GET',
    headers: header()
  };

  return new Promise((resolve, reject) => {
    fetch(API_URL + `/mangas/search?name=${mangaName}&perPage=${perPage}&page=${page}`, getInfo)
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