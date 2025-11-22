import { api } from '@/lib/ky';
import type { ApiResponse } from '@/types/common';

/* ===========================
     Model
=========================== */

export interface MakeChallengeReseponse {
  id: number;
  title: string;
  context: string;
  createdAt: string;
  endAt: string;
  thumbnailUrl: string;
}

export type MakeChallengeReseponseDTO = ApiResponse<MakeChallengeReseponse>;
/* ===========================
     Handlers
=========================== */

export const challengePost = {
  makeChallenge: async ({
    title,
    context,
    endAt,
    thumbnailUrl,
  }: {
    title: string;
    context: string;
    endAt: string;
    thumbnailUrl: string;
  }) => {
    const response = await api.post('api/challenge/create', {
      json: {
        title,
        context,
        endAt,
        thumbnailUrl,
      },
    });

    return response;
  },
};
