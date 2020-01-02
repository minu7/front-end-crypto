import Cookies from 'js-cookie';

export const setToken = (token) => {
  Cookies.remove('token');
  Cookies.set('token', token);
};

export const getToken = () => Cookies.get('token');

export const logout = () => {
  Cookies.remove('token');
  window.location.reload();
};
