import { API_URL } from '../../constants/app';
import { headerUtil } from '../../utils';

function name(mangaName, perPage, page) {
  const getInfo = {
    method: 'GET',
    headers: headerUtil.header(),
  };

  return new Promise((resolve, reject) => {
    fetch(
      `${API_URL}/mangas/search?name=${mangaName}&perPage=${perPage}&page=${page}`,
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
  name,
};
