import { api } from '@/lib/ky';
import type { ApiResponse } from '@/types/common';

export interface MakeChallengeReseponse {
  id: number;
  title: string;
  context: string;
  createdAt: string;
  endAt: string;
  thumbnailUrl: string;
}

export type MakeChallengeReseponseDTO = ApiResponse<MakeChallengeReseponse>;

export const challengePost = {
  makeChallenge: async ({
    title,
    context,
    endAt,
    thumbnailUrl,
    creatorId,
  }: {
    title: string;
    context: string;
    endAt: string;
    thumbnailUrl: string;
    creatorId: number | null;
  }): Promise<MakeChallengeReseponseDTO> => {
    return api
      .post('api/challenge/create', { json: { title, context, endAt, thumbnailUrl, creatorId } })
      .json<MakeChallengeReseponseDTO>();
  },

  updateChallenge: async (
    challengeId: number,
    data: { title?: string; context?: string; endAt?: string; thumbnailUrl?: string },
  ): Promise<MakeChallengeReseponseDTO> => {
    return api
      .put(`api/challenge/${challengeId}`, { json: data })
      .json<MakeChallengeReseponseDTO>();
  },

  deleteChallenge: async (challengeId: number): Promise<void> => {
    await api.delete(`api/challenge/${challengeId}`);
  },
};
