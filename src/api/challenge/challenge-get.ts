import { api } from '@/lib/ky';
import type { ApiResponse } from '@/types/common';

/* ===========================
     Model
=========================== */

export interface HotChallenge {
  id: number;
  title: string;
  context: string;
  createdAt: string;
  endAt: string;
  thumbnailUrl: string;
  _count: {
    participants: number;
  };
}

export interface ChallengeReseponse {
  id: number;
  title: string;
  context: string;
  createdAt: string;
  endAt: string;
  thumbnailUrl: string;
}

export type HotChallengeResponseDTO = ApiResponse<HotChallenge[]>;
export type ChallengeReseponseDTO = ApiResponse<ChallengeReseponse>;
/* ===========================
     Handlers
=========================== */

export const challengeGet = {
  getHotChallenge: async (): Promise<HotChallengeResponseDTO> => {
    const response = await api.get('api/challenge/hot').json<HotChallengeResponseDTO>();
    return response;
  },

  getChallengeInfo: async (challengeId: number): Promise<ChallengeReseponseDTO> => {
    const response = await api.get(`challenge/${challengeId}`).json<ChallengeReseponseDTO>();
    return response;
  },
};
