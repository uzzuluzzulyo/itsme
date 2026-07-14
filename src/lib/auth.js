const AUTH_KEY = 'itsme_logged_in';

export function isLoggedIn() {
  return localStorage.getItem(AUTH_KEY) === 'true';
}

export function login() {
  localStorage.setItem(AUTH_KEY, 'true');
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}
