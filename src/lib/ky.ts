import ky from 'ky';

export const api = ky.create({
  prefixUrl: import.meta.env.VITE_PUBLIC_API_URL || '',
  timeout: 10000,
  retry: 2,
  headers: {
    'Content-Type': 'application/json',
  },

  // hooks: {
  //   beforeRequest: [
  //     (request) => {
  //       const token = localStorage.getItem('accessToken');
  //       if (token) {
  //         request.headers.set('Authorization', `Bearer ${token}`);
  //       }
  //     },
  //   ],
  // },
});
