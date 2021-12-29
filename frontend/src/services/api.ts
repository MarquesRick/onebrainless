import axios from 'axios';

export function isLoggedIn(): boolean {
  const userToken = localStorage.getItem('@One:user_token');

  if (userToken == '' || userToken === null || userToken === undefined)
    return false;

  return true;
}

export const apiToken = (token = localStorage.getItem('@One:user_token')) =>
  axios.create({
    baseURL: 'http://localhost:3333',
    headers: { Authorization: `Bearer ${token}` },
  });

export const api = axios.create({
  baseURL: 'http://localhost:3333',
});
