import { api } from '@/lib/ky';
import type { ApiResponse } from '@/types/common';

/* ===========================
     Model
=========================== */
export interface Challenge {
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

export interface ParticipatingChallengeResponse {
  userChallenges: {
    participants: Challenge[];
  };
}

export interface CheckNickNameResponse {
  isAvailable: boolean;
}

export type ParticipatingChallengeResponseDTO = ApiResponse<ParticipatingChallengeResponse>;
export type CheckNickNameResponseDTO = ApiResponse<CheckNickNameResponse>;

/* ===========================
     Handlers
=========================== */
export const userGet = {
  // 내가 참여중인 챌린지 get
  getParticipatingChallenges: async ({
    userId,
  }: {
    userId: number;
  }): Promise<ParticipatingChallengeResponseDTO> => {
    const response = await api
      .get(`api/user/${userId}/participate`)
      .json<ParticipatingChallengeResponseDTO>();
    return response;
  },

  //   닉네임 중복확인
  checkNickName: async (nickname: string) => {
    const response = (
      await api.get(`api/user/check`, { searchParams: { nickname } }).json
    )<CheckNickNameResponseDTO>();

    return response;
  },
};
