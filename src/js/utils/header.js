export function header() {
  var user = JSON.parse(localStorage.getItem('user'))
  return (user && user.token) ? { 'Authorization': user.token } : {};
}