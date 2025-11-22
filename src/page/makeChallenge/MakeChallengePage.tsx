import { useState } from 'react';
import { Header } from '@/app/layout/header/ui/Header';
import { sanitizeInput } from '@/utils/sanitizeInput';

import { UploadImageSection } from './components/UploadImageSection';
import { CalendarBottomSheet } from './components/CalendarBottomSheet';
import { DateProvider } from './context/DateProvider';
import { useDate } from './context/DateProvider';

const MakeChallengePageInner = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { startDate, endDate, setStartDate, setEndDate } = useDate();

  const [isStartSheetOpen, setStartSheetOpen] = useState(false);
  const [isEndSheeetOpen, setEndSheetOpen] = useState(false);

  const handleSubmit = () => {
    console.log('제목:', title);

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
            onChange={(e) => setTitle(sanitizeInput(e.target.value))}
            className="w-full px-3 py-2 border rounded bg-white"
          />
        </div>

        {/* 2. 이미지 */}
        <UploadImageSection onChange={setImageFile} />

        <div
          className="w-full px-3 py-2 border rounded bg-white mt-6 cursor-pointer"
          onClick={() => setStartSheetOpen(true)}
        >
          {startDate || '시작일'}
        </div>

        <div
          className="w-full px-3 py-2 border rounded bg-white mt-6 cursor-pointer"
          onClick={() => setEndSheetOpen(true)}
        >
          {endDate || '종료일'}
        </div>

        {/* 4. 내용 */}
        <div className="mb-6">
          <p className="font-semibold mb-2">4. 내용</p>
          <textarea
            value={content}
            rows={5}
            placeholder="내용을 입력하세요"
            className="w-full px-3 py-2 border rounded bg-white resize-none"
            onChange={(e) => setContent(sanitizeInput(e.target.value))}
          />
        </div>

        <button
          className="w-full py-3 bg-gray-600 text-white font-semibold rounded"
          onClick={handleSubmit}
        >
          생성하기
        </button>
      </div>

      <CalendarBottomSheet
        open={isStartSheetOpen}
        onOpenChange={setStartSheetOpen}
        onSelectDate={(d) => setStartDate(d)}
      />

      <CalendarBottomSheet

        open={isEndSheeetOpen}
        onOpenChange={setEndSheetOpen}
        onSelectDate={(d) => setEndDate(d)}
      />
    </div>
  );
};

const MakeChallengePage = () => {
  return (
    <DateProvider>
      <MakeChallengePageInner />
    </DateProvider>
  );
};

export default MakeChallengePage;
