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

export const apiVer2 = ky.create({
  prefixUrl: import.meta.env.VITE_PUBLIC_API_URL || '',
  timeout: 10000,
  retry: 0,
  hooks: {
    beforeRequest: [
      (request) => {
        // FormData 전송 시 브라우저가 boundary 포함해서 Content-Type을 자동 설정하도록 제거
        request.headers.delete('Content-Type');
      },
    ],
  },
});
