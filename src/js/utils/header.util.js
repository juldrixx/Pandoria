function header() {
  const user = JSON.parse(localStorage.getItem('user'));
  return user && user.token ? { Authorization: user.token } : {};
}

export default {
  header,
};
