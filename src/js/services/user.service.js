import { API_URL } from '../constants';
import { updateUserForAbilities } from '../constants/ability';

export const userService = {
  login,
  logout,
  register,
}

function login(username, password) {
  const postInfo = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      username: username,
      password: password
    })
  }

  return new Promise((resolve, reject) => {
    fetch(API_URL + '/login', postInfo)
      .then(result => {
        if (!result.ok) throw result;
        result.json()
          .then(r => {
            const user = { ...r.user, token: r.token };
            localStorage.setItem('user', JSON.stringify(user));
            updateUserForAbilities(user);
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

function register(username, email, password) {
  const postInfo = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      username: username,
      email: email,
      password: password
    })
  }

  return new Promise((resolve, reject) => {
    fetch(API_URL + '/register', postInfo)
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