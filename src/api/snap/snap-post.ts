import { api } from '@/lib/ky';
import type { ApiResponse } from '@/types/common';

/* ===========================
     Model
=========================== */

//  "data": {
//         "id": 6,
//         "createdAt": "2025-11-22T16:58:47.060Z",
//         "imageUrl": "https://sihaeng-bucket.s3.ap-northeast-2.amazonaws.com/sihaeng-bucket/challenge_5/user_1",
//         "title": "첫 인증샷!",
//         "content": "기분 좋아졌어요!",
//         "userId": 1,
//         "challengeId": 5
//     }
export interface MakeSnapResponse {
  id: number;
  createdAt: string;
  imageUrl: string;
  title: string;
  content: string;
  userId: number;
  challengeId: number;
}

export type MakeSnapResponseDTO = ApiResponse<MakeSnapResponse>;
/* ===========================
     Handlers
=========================== */

export const snapPost = {
  makeSnap: async ({ challengeId, userId }: { challengeId: number; userId: number }) => {
    const response = await api
      .post(`/api/snap/${challengeId}/${userId}`)
      .json<MakeSnapResponseDTO>();

    return response;
  },
};
