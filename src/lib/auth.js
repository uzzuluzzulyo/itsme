const AUTH_KEY = 'itsme_logged_in';

export function isLoggedIn() {
  return sessionStorage.getItem(AUTH_KEY) === 'true';
}

export function login() {
  sessionStorage.setItem(AUTH_KEY, 'true');
}

export function logout() {
  sessionStorage.removeItem(AUTH_KEY);
}
