import { useCallback, useState } from 'react';
import imageCompression from 'browser-image-compression';

interface UseImageCompressionOptions {
  maxSizeMB?: number; // 목표 파일 크기(MB)
  maxWidthOrHeight?: number; // 최대 너비/높이
  useWebWorker?: boolean; // 성능 향상 옵션
}

export const useImageCompression = (defaultOptions?: UseImageCompressionOptions) => {
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const compress = useCallback(
    async (file: File, customOptions?: UseImageCompressionOptions) => {
      setIsCompressing(true);
      setError(null);

      const options = {
        maxSizeMB: 1, // 1MB 목표
        maxWidthOrHeight: 1600,
        useWebWorker: true,
        ...defaultOptions,
        ...customOptions,
      };

      try {
        const compressedFile = await imageCompression(file, options);
        return compressedFile; // File 타입 그대로 반환
      } catch (err) {
        console.error(err);
        setError(err as Error);
        return null;
      } finally {
        setIsCompressing(false);
      }
    },
    [defaultOptions],
  );

  return { compress, isCompressing, error };
};
