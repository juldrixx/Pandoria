function changeTheme(dark) {
  localStorage.setItem('dark', dark);
  return dark;
}

export default {
  changeTheme,
};
