import { api } from '@/lib/ky';
import type { ApiResponse } from '@/types/common';

export interface UploadImageResponse {
  imageUrl: string;
}

export type UploadImageResponseDTO = ApiResponse<UploadImageResponse>;

export const imagePost = {
  uploadImage: async (file: File): Promise<UploadImageResponseDTO> => {
    const formData = new FormData();
    formData.append('image', file);

    return api
      .post('upload/image', {
        body: formData,
        headers: {
          'Content-Type': undefined,
        },
      })
      .json<UploadImageResponseDTO>();
  },
};
