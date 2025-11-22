import { useRef, useState } from 'react';
import { compressImage } from '@/utils/compressImage';

import CameraIcon from '@/assets/smallCameraIcon.svg?react';

interface UploadImageSectionProps {
  onChange: (file: File | null) => void;
}

export const UploadImageSection = ({ onChange }: UploadImageSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [, setIsCompressing] = useState(false);

  /** input 클릭 트리거 */
  const handleClick = () => fileInputRef.current?.click();

  /** 파일→압축→상위 콜백 */
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsCompressing(true);
      const compressed = await compressImage(file);

      // 부모 컴포넌트로 압축된 파일 전달
      onChange(compressed);

      // preview
      const previewUrl = URL.createObjectURL(compressed);
      setPreview(previewUrl);
    } catch (err) {
      console.error('이미지 압축 실패:', err);
      onChange(null);
    } finally {
      setIsCompressing(false);
    }
  };

  return (
    <div className="mt-6">
      <p className="body-14 #525458 mb-3">이미지</p>

      <div
        className="w-28 h-28  flex items-center rounded-xl justify-center cursor-pointer bg-[#F3F3F5]"
        onClick={handleClick}
      >
        {preview ? (
          <img src={preview} className="w-full h-full object-cover rounded " />
        ) : (
          <CameraIcon />
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
};
