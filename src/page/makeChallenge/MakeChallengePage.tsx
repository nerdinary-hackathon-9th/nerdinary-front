import { useState } from 'react';
import { Header } from '@/app/layout/header/ui/Header';
import { sanitizeInput } from '@/utils/sanitizeInput';
import { imagePost } from '@/api/image/image-post';
import { challengePost } from '@/api/challenge/challenge-post';
import { toast } from 'sonner';

import { UploadImageSection } from './components/UploadImageSection';
import { CalendarBottomSheet } from './components/CalendarBottomSheet';
import { DateProvider } from './context/DateProvider';
import { useDate } from './context/DateProvider';
import { DateInputBox } from './components/DateInputBox';
import { useNavigate } from 'react-router-dom';

const toSeoulUTCString = (dateStr: string): string => {
  const [year, month, day] = dateStr.split('-').map(Number);

  // 한국 시간의 자정
  const localDate = new Date(year, month - 1, day, 0, 0, 0);

  // 한국(UTC+9) → UTC 변환
  return new Date(localDate.getTime() - 9 * 60 * 60 * 1000).toISOString();
};

const MakeChallengePageInner = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [, setIsUploading] = useState(false);

  const { startDate, endDate, setStartDate, setEndDate } = useDate();

  const [isStartSheetOpen, setStartSheetOpen] = useState(false);
  const [isEndSheeetOpen, setEndSheetOpen] = useState(false);

  const isFilled =
    title.trim().length > 0 &&
    content.trim().length > 0 &&
    imageFile !== null &&
    startDate &&
    endDate;

  const handleImageChange = async (file: File | null) => {
    setImageFile(file);
    if (!file) return;

    try {
      setIsUploading(true);
      const res = await imagePost.uploadImage(file);
      setThumbnailUrl(res.data.imageUrl);
    } catch (err) {
      console.error('이미지 업로드 실패:', err);
      setThumbnailUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!isFilled || !thumbnailUrl) return;

    try {
      // endDate → ISO UTC 변환
      const endAtUTC = toSeoulUTCString(endDate);

      const res = await challengePost.makeChallenge({
        title,
        context: content,
        endAt: endAtUTC,
        thumbnailUrl,
      });

      console.log('챌린지 생성 성공:', res);

      toast.success('챌린지 생성 완료! 🎉');

      setTimeout(() => {
        navigate('/');
      }, 700);
    } catch (err) {
      console.error('챌린지 생성 실패:', err);

      toast.error('생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
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
        <UploadImageSection onChange={handleImageChange} />

        <div>
          <p className="w-full flex-1 text-sihang-neutral-700 body-14 mt-6 mb-3">날짜</p>
          <div className="flex flex-row w-full flex-1 gap-4">
            <DateInputBox label="시작일" value={startDate} placeholder="시작일" />

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
