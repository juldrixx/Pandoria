import { API_URL } from '../constants';

export const userService = {
  login,
  logout,
}

function login(username, password) {
  const postInfo = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      user: {
        username: username,
        password: password
      }
    })
  }

  return new Promise((resolve, reject) => {
    fetch(API_URL + '/login', postInfo)
      .then(result => {
        if (!result.ok) throw result;
        result.json()
          .then(r => {
            const user = { ...r, token };
            localStorage.setItem('user', JSON.stringify(user));
            resolve(user);
          })
          .catch(error => {
            reject(error);
          });
      })
      .catch(error => {
        reject(error);
      });
  });
}

function logout() {
  localStorage.removeItem('user');
  return {};
}