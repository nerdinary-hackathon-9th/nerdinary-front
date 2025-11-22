import { api } from '@/lib/ky';
import type { ApiResponse } from '@/types/common';

/* ===========================
     Model
     =========================== */
export interface SignUpResponse {
  nickname: string;
  password: string;
}

export interface LoginResponse {
  id: number;
}

export interface RegisterChallengeResponse {
  userChallenge: {
    id: number; // << 이게 뭐에 쓰는거지?
    createdAt: string;
    userId: number;
    challengeId: number;
  };
}

export type SignUpResponseDTO = ApiResponse<SignUpResponse>;
export type LoginResponseDTO = ApiResponse<LoginResponse>;
export type RegisterChallengeResponseDTO = ApiResponse<RegisterChallengeResponse>;
/* ===========================
     Handlers
     =========================== */
export const userPost = {
  signup: async (nickname: string, password: string): Promise<SignUpResponseDTO> => {
    const response = await api
      .post('api/auth/signup', { json: { nickname, password } })
      .json<SignUpResponseDTO>();
    return response;
  },

  login: async (nickname: string, password: string): Promise<LoginResponseDTO> => {
    const response = await api
      .post('api/auth/login', { json: { nickname, password } })
      .json<LoginResponseDTO>();
    return response;
  },

  registerChallenge: async (
    userId: number,
    challengeId: number,
  ): Promise<RegisterChallengeResponseDTO> => {
    const response = await api
      .post('api/user/challenge', { json: { userId, challengeId } })
      .json<RegisterChallengeResponseDTO>();
    return response;
  },

  
};
