import { Header } from '@/app/layout/header/ui/Header';
import { compressImage } from '@/utils/compressImage';
import { useRef, useState, type ChangeEvent } from 'react';
import { GlobalNavigationBar } from '@/app/layout/navigation/GlobalNavigationBar';

const HomePage = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onClickSelectFile = () => {
    fileInputRef.current?.click();
  };

  const onSelectImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const compressed = await compressImage(file);

    setCompressedFile(compressed);
    setPreviewUrl(URL.createObjectURL(compressed));
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

        {previewUrl && (
          <div className="mt-4">
            <p>압축된 이미지 미리보기</p>
            <img src={previewUrl} alt="preview" className="w-full rounded" />
            <p className="mt-2 text-sm text-gray-600">
              size: {(compressedFile!.size / 1024).toFixed(1)} KB
            </p>
          </div>
        )}
      </div>
      <GlobalNavigationBar />
    </>
  );
};

export default HomePage;
