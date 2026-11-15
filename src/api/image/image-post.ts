import type { ApiResponse } from '@/types/common';

const BASE_URL = import.meta.env.VITE_PUBLIC_API_URL || '';

export interface UploadImageResponse {
  imageUrl: string;
}

export type UploadImageResponseDTO = ApiResponse<UploadImageResponse>;

export const imagePost = {
  uploadImage: async (file: File): Promise<UploadImageResponseDTO> => {
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(`${BASE_URL}/upload/image`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message ?? `HTTP ${res.status}`);
    }

    return res.json() as Promise<UploadImageResponseDTO>;
  },
};
