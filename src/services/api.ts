import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://randomuser.me/api/?results=50&seed=foobar',
});
