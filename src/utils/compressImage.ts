import imageCompression from 'browser-image-compression';

/**
 * 이미지 파일 압축 유틸
 * @param file 원본 File
 * @returns 압축된 File
 */
export async function compressImage(file: File): Promise<File> {
  const options = {
    maxSizeMB: 1, // 목표 용량 (1MB 이하)
    maxWidthOrHeight: 2000, // 최대 픽셀 크기
    useWebWorker: true, // 워커 사용 (UI 렉 방지)
  };

  const compressedBlob = await imageCompression(file, options);

  return new File([compressedBlob], file.name, {
    type: compressedBlob.type,
    lastModified: Date.now(),
  });
}
