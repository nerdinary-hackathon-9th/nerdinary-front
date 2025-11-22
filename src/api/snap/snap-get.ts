import { api } from '@/lib/ky';
import type { ApiResponse } from '@/types/common';

/* ===========================
     Model
=========================== */
export interface SnapResponse {
  id: number;
  createdAt: string;
  imageUrl: string;
  title: string;
  content: string;
  userId: number;
  challengeId: number;
  user: {
    nickname: string;
  };
}

export interface ChallengeSnapItem {
  imageUrl: string;
}

export type SnapResponseDTO = ApiResponse<SnapResponse>;
export type AllSnapInChallengeResponseDTO = ApiResponse<ChallengeSnapItem[]>;

/* ===========================
     Handlers
=========================== */
export const snapGet = {
  // 특정 스냅 조회
  getSnapById: async ({ snapId }: { snapId: number }): Promise<ApiResponse<SnapResponseDTO>> => {
    return api.get(`snap/${snapId}`).json<ApiResponse<SnapResponseDTO>>();
  },

  // 특정 챌린지 모든 스냅 조회
  getAllSnapsInChallenge: async ({
    challengeId,
  }: {
    challengeId: number;
  }): Promise<AllSnapInChallengeResponseDTO> => {
    return api.get(`api/snap/challenge/${challengeId}`).json<AllSnapInChallengeResponseDTO>();
  },
};
