import Cookies from 'js-cookie';

export const setTokenCookie = (token: string, expirationInMinutes: number) => {
  const expirationDate = new Date(
    new Date().getTime() + expirationInMinutes * 60 * 1000
  );
  Cookies.set('token', token, { expires: expirationDate, secure: true, sameSite: 'strict' });
};

export const getTokenCookie = () => {
  return Cookies.get('token');
};

export const removeTokenCookie = () => {
  Cookies.remove('token', { secure: true, sameSite: 'strict' });
};
