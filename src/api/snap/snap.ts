import { api } from '@/lib/ky';
import type { CreateSnapRequest, CreateSnapResponse, SnapListResponse } from '@/types/snap';

export const snapAPI = {
  // 스냅 생성
  create: async (
    challengeId: number,
    userId: number,
    data: CreateSnapRequest,
  ): Promise<CreateSnapResponse> => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('snap', data.snap);

    const response = await api
      .post(`api/snap/${challengeId}/${userId}`, {
        body: formData,
      })
      .json<CreateSnapResponse>();
    return response;
  },

  // 챌린지의 스냅 목록 조회
  getSnapsByChallenge: async (challengeId: number): Promise<SnapListResponse> => {
    const response = await api
      .get(`api/snap/challenge/${challengeId}`)
      .json<SnapListResponse>();
    return response;
  },
};
