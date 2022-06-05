var token = 'TOKEN__'
function getToken() {
  return localStorage.getItem(token)
}
function setToken(str) {
  localStorage.setItem(token, str)
}
function clearToken(str) {
  localStorage.setItem(token, '')
}