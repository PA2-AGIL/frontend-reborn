import Axios from 'axios';

const base_url = 'http://45.79.253.74:3000';
let accessToken: string;

if (typeof window !== 'undefined') {
  accessToken = localStorage.getItem('accessToken')!;
}

export const public_api = Axios.create({
  baseURL: base_url,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const private_api = Axios.create({
  baseURL: base_url,
  headers: {
    Authorization: `Bearer ${accessToken!}`,
    'Content-Type': 'application/json',
  },
});
