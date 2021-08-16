import axios from 'axios';

export const getParams = (
  page: number,
  other?: {
    gender: string | null | undefined;
    natio: string | null | undefined;
  }
) => {
  let params = `?page=${page}&results=50`;

  if (other) {
    const { gender, natio } = other;
    if (gender) params += `&gender=${gender}`;
    if (natio) params += `&nat=${natio}`;
  } else {
    params += '&seed=foobar';
  }

  return params;
};

export const api = axios.create({
  baseURL: 'https://randomuser.me/api/',
});
