import { api } from '@/lib/ky';

export const userPost = {
  signup: async (nickname: string, password: string) => {
    const response = await api.post('api/auth/signup', { json: { nickname, password } }).json();
    return response;
  },

  login: async (nickname: string, password: string) => {
    const response = await api.post('api/auth/login', { json: { nickname, password } }).json();
    return response;
  },
};
