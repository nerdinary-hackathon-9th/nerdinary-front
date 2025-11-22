import { Header } from '@/app/layout/header/ui/Header';
import { useImageCompression } from '@/hooks/useImageCompression';
import { useRef, useState } from 'react';

const HomePage = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { compress, isCompressing } = useImageCompression({
    maxSizeMB: 0.7,
    maxWidthOrHeight: 1200,
  });

  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onClickSelectFile = () => {
    fileInputRef.current?.click();
  };

  const onSelectImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1) 이미지 압축
    const compressed = await compress(file);
    if (!compressed) {
      console.error('이미지 압축 실패');
      return;
    }

    setCompressedFile(compressed);

    // 2) 미리보기 URL 생성 (선택)
    const url = URL.createObjectURL(compressed);
    setPreviewUrl(url);
  };

  return (
    <>
      <Header variant="text-close" title="dfdfdf" />

      <div className="p-4">
        <button onClick={onClickSelectFile} className="px-4 py-2 bg-blue-500 text-white rounded">
          이미지 선택하기
        </button>

        {/* 숨겨진 파일 input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={onSelectImage}
        />

        {isCompressing && <p>이미지 압축중...</p>}

        {previewUrl && (
          <div className="mt-4">
            <p>압축된 이미지 미리보기</p>
            <img src={previewUrl} alt="preview" className="w-40 rounded" />
            <p className="mt-2 text-sm text-gray-600">
              size: {(compressedFile!.size / 1024).toFixed(1)} KB
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
