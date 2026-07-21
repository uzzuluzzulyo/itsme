const AUTH_KEY = 'itsme_logged_in';
const USER_ID_KEY = 'itsme_user_id';

export function isLoggedIn() {
  return sessionStorage.getItem(AUTH_KEY) === 'true';
}

export function getCurrentUserId() {
  return sessionStorage.getItem(USER_ID_KEY);
}

export function login(userId) {
  sessionStorage.setItem(AUTH_KEY, 'true');
  if (userId) sessionStorage.setItem(USER_ID_KEY, String(userId));
}

export function logout() {
  sessionStorage.removeItem(AUTH_KEY);
  sessionStorage.removeItem(USER_ID_KEY);
}
