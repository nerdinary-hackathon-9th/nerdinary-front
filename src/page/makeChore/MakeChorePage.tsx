import { useState } from 'react';
import { Header } from '@/app/layout/header/ui/Header';

import { UploadImageSection } from './components/UploadImageSection';

const MakeNewChorePage = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = () => {
    if (!title || !date || !content) {
      alert('모든 내용을 입력해 주세요.');
      return;
    }

    console.log('제목:', title);
    console.log('날짜:', date);
    console.log('내용:', content);
    console.log('압축된 이미지 파일:', imageFile);

    alert('제출됨! (콘솔 확인)');
  };

  return (
    <div className="min-h-screen bg-[#e0e0e0]">
      <Header variant="text-close" title="낭비할 일 생성" />

      <div className="px-4 py-6">
        {/* 1. 제목 */}
        <div className="mb-6">
          <p className="font-semibold mb-2">1. 제목</p>
          <input
            type="text"
            value={title}
            placeholder="제목을 입력하세요"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded bg-white"
          />
        </div>

        {/* 2. 이미지 */}
        <UploadImageSection onChange={setImageFile} />

        {/* 3. 날짜 */}
        <div className="mb-6">
          <p className="font-semibold mb-2">3. 날짜</p>
          <input
            type="date"
            value={date}
            className="w-full px-3 py-2 border rounded bg-white"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* 4. 내용 */}
        <div className="mb-6">
          <p className="font-semibold mb-2">4. 내용</p>
          <textarea
            value={content}
            rows={5}
            placeholder="내용을 입력하세요"
            className="w-full px-3 py-2 border rounded bg-white resize-none"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button
          className="w-full py-3 bg-gray-600 text-white font-semibold rounded"
          onClick={handleSubmit}
        >
          생성하기
        </button>
      </div>
    </div>
  );
};

export default MakeNewChorePage;
