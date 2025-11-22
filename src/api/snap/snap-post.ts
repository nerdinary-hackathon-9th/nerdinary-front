import { apiVer2 } from '@/lib/ky';
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
  makeSnap: async ({
    challengeId,
    userId,
    title,
    content,
    file,
  }: {
    challengeId: number;
    userId: number;
    title: string;
    content: string;
    file?: File | null;
  }): Promise<MakeSnapResponseDTO> => {
    const formData = new FormData();

    // (1) data 객체를 JSON 문자열로 넣기
    const jsonBody = JSON.stringify({
      title,
      content,
    });
    formData.append('data', jsonBody);

    // (2) 파일 form-data 파트
    if (file) {
      formData.append('images', file);
    }

    // (3) multipart 전송 (Content-Type 강제 지정하면 안 됨)
    return apiVer2
      .post(`api/snap/${challengeId}/${userId}`, {
        body: formData,
        headers: {
          'Content-Type': undefined, // ky 기본 application/json 무효화
        },
      })
      .json<MakeSnapResponseDTO>();
  },
};
