import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '@/app/layout/header/ui/Header';
import { compressImage } from '@/utils/compressImage';
import CalendarIcon from '@/assets/grayCalendar.svg?react';
import InfoIcon from '@/assets/grayInfoIcon.svg?react';
import CameraIcon from '@/assets/grayCameraIcon.svg?react';
import { imagePost } from '@/api/image/image-post';

const formatDotDateKorea = (iso: string) => {
  const date = new Date(iso);
  const korea = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  return korea.toISOString().slice(0, 10).replace(/-/g, '.');
};

const JoinChallengePage = () => {
  const { state } = useLocation();

  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null); // 압축된 File
  const [imageUrl, setImageUrl] = useState<string | null>(null); // 업로드 후 URL
  const [, setIsUploading] = useState(false);

  const title = state?.title;
  const createdAt = state?.createdAt;
  const endAt = state?.endAt;
  const participantsCount = state?.participantsCount;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);

      const compressed = await compressImage(file);
      setImageFile(compressed);

      const res = await imagePost.uploadImage(compressed);

      setImageUrl(res.data.imageUrl);

      console.log('업로드 성공:', res.data.imageUrl);
    } catch (err) {
      console.error('이미지 업로드 실패:', err);
      setImageUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = () => {
    console.log({
      content,
      imageUrl,
    });
    alert('참여 완료!');
  };

  return (
    // page-fade-in 구리면 지우기
    <div className="flex flex-col min-h-screen bg-white page-fade-in">
      <Header variant="back-text" title="참여하기" />
      {/* 참여 독려 배너 */}
      {/* // TODO: 참여인원 넣기 */}
      <div className="w-full px-4 py-3 bg-linear-to-r from-sihang-primary-300 to-sihang-secondary-500 text-white text-sm">
        지금 {participantsCount}명이 챌린지에 참여중이에요!
        <br />
        <span className="text-sihang-primary-900">{participantsCount + 1}번째</span>{' '}
        참여자가 되어주시겠어요?
      </div>
      {/* 메인 컨텐츠 */}
      <div className="px-5 flex flex-col">
        {/* 챌린지 타이틀 */}
        <div className="py-4">
          <h2 className="heading-18 text=[#212223] mb-2">{title}</h2>
          <p className="body-14 text-sihang-neutral-400">
            <div className="flex flex-row items-center gap-1">
              <CalendarIcon /> {formatDotDateKorea(createdAt)} ~ {formatDotDateKorea(endAt)}
            </div>
          </p>
        </div>

        {/* 이미지 업로드 */}
        <div className="flex flex-col mt-2 mb-2">
          <p className="body-14 mb-2 text-[#686B70]">챌린지 내용</p>
          {/* 이미지 업로드 UI — 단일 이미지 */}
          <div className="w-full">
            {!imageFile ? (
              // 업로드 전
              <label
                className="
                    w-full h-[220px] rounded-[12px] border border-dashed border-sihang-neutral-100
                    bg-sihang-neutral-10 flex flex-col items-center justify-center
                    cursor-pointer
                "
              >
                <div className="flex flex-col items-center">
                  <CameraIcon />
                  <p className="label-12 text-[#9C9EA3]">사진을 업로드해주세요.</p>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            ) : (
              // 업로드 후 — 썸네일
              <label className="block w-full rounded-[12px] overflow-hidden cursor-pointer">
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="uploaded"
                  className="w-full h-[220px] object-cover rounded-[12px]"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>
        </div>

        {/* 사진 안내 */}
        <div className="bg-sihang-neutral-10 rounded-xl p-2 mb-3">
          <div className="flex flex-row items-center label-12 text-sihang-neutral-400">
            <InfoIcon className="mr-1" /> 즐긴 순간이 잘 드러나도록 인증샷을 찍어주세요!
          </div>
        </div>

        {/* 텍스트 입력 */}
        <div>
          <textarea
            className="w-full h-30 border focus:outline-none focus:border-sihang-primary-300 rounded-[12px] p-3 label-14 resize-none"
            placeholder="챌린지 내용을 입력해주세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
      {/* 완료 버튼 */}
      <div className="mt-auto mb-4">
        <button
          disabled={!imageUrl || !content}
          onClick={handleSubmit}
          className="fixed bottom-4 inset-x-4 h-14 py-3 rounded-xl bg-blue-400 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
        >
          완료하기
        </button>
      </div>
    </div>
  );
};

export default JoinChallengePage;
