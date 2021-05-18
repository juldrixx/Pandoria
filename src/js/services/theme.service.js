export const themeService = {
  changeTheme,
}

function changeTheme(dark) {
  localStorage.setItem('dark', dark);
  return dark;
}