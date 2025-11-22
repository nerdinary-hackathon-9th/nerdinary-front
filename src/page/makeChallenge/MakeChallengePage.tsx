import { useState } from 'react';
import { Header } from '@/app/layout/header/ui/Header';
import { sanitizeInput } from '@/utils/sanitizeInput';

import { UploadImageSection } from './components/UploadImageSection';
import { CalendarBottomSheet } from './components/CalendarBottomSheet';
import { DateProvider } from './context/DateProvider';
import { useDate } from './context/DateProvider';
import { DateInputBox } from './components/DateInputBox';

const MakeChallengePageInner = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { startDate, endDate, setStartDate, setEndDate } = useDate();

  const [isStartSheetOpen, setStartSheetOpen] = useState(false);
  const [isEndSheeetOpen, setEndSheetOpen] = useState(false);

  const isFilled =
    title.trim().length > 0 &&
    content.trim().length > 0 &&
    imageFile !== null &&
    startDate &&
    endDate;

  const handleSubmit = () => {
    console.log('제목:', title);

    console.log('내용:', content);
    console.log('압축된 이미지 파일:', imageFile);

    alert('제출됨! (콘솔 확인)');
  };

  return (
    <div className="min-h-screen">
      <Header variant="text-close" title="챌린지 생성하기" />
      <div className="border border-b border-[#F3F3F5] " />

      <div className="px-5 pt-5">
        {/* 1. 제목 */}
        <div className="body-14 text-sihang-neutral-700">
          <p className="font-semibold mb-2">제목</p>
          <input
            type="text"
            value={title}
            placeholder="시간을 낭비하고 싶은 일은 무엇인가요?"
            onChange={(e) => setTitle(sanitizeInput(e.target.value))}
            className="w-full px-4 py-4 border rounded-[12px] bg-white border-neutral-100 focus:outline-none focus:border-sihang-primary-300"
          />
        </div>

        {/* 2. 이미지 */}
        <UploadImageSection onChange={setImageFile} />

        <div>
          <p className="w-full flex-1 text-sihang-neutral-700 body-14 mt-6 mb-3">날짜</p>
          <div className="flex flex-row w-full flex-1 gap-4">
            <DateInputBox
              label="시작일"
              value={startDate}
              placeholder="시작일"
              onClick={() => setStartSheetOpen(true)}
            />

            <DateInputBox
              label="종료일"
              value={endDate}
              placeholder="종료일"
              onClick={() => setEndSheetOpen(true)}
            />
          </div>

          {/* 4. 내용 */}
          <div className="mt-6 mb-6">
            <p className="text-sihang-neutral-700 body-14 mb-3">내용</p>
            <textarea
              value={content}
              rows={5}
              placeholder="시간낭비를 잘 이해할 수 있는 설명을 작성해주세요!"
              className="w-full px-3.5 pt-4 border rounded-[12px] focus:outline-none focus:border-sihang-primary-300 bg-white resize-none"
              onChange={(e) => setContent(sanitizeInput(e.target.value))}
            />
          </div>

          <button
            disabled={!isFilled}
            className="fixed bottom-4 inset-x-4 h-14 py-3 rounded-xl bg-blue-400 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
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
