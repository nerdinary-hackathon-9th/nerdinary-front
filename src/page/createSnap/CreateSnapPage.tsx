import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/app/layout/header/ui/Header';
import { snapAPI } from '@/api/snap/snap';
import { toast } from 'sonner';

const CreateSnapPage = () => {
  const { challengeId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('제목을 입력해주세요.');
      return;
    }

    if (!content.trim()) {
      toast.error('인증샷 설명을 입력해주세요.');
      return;
    }

    if (!imageFile) {
      toast.error('이미지를 선택해주세요.');
      return;
    }

    if (!challengeId) {
      toast.error('챌린지 정보가 없습니다.');
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: 실제 userId는 로그인 정보에서 가져와야 함
      const userId = 1;

      await snapAPI.create(Number(challengeId), userId, {
        title,
        content,
        snap: imageFile,
      });

      toast.success('인증샷이 등록되었습니다!');
      navigate(`/challenge-detail/${challengeId}`);
    } catch (error) {
      console.error('스냅 생성 실패:', error);
      toast.error('인증샷 등록에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header variant="back-text" title="인증하기" />

      <main className="px-5 py-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* 이미지 업로드 */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              인증샷 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              {imagePreview ? (
                <div className="relative w-full h-64 rounded-lg overflow-hidden border border-neutral-200">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview('');
                    }}
                    className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-neutral-300 rounded-lg cursor-pointer hover:border-sihang-primary-400 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-10 h-10 mb-3 text-neutral-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-neutral-500">
                      <span className="font-semibold">클릭하여 업로드</span>
                    </p>
                    <p className="text-xs text-neutral-400">JPG, PNG, GIF</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/jpeg,image/png,image/gif"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
          </div>

          {/* 제목 입력 */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-2">
              스냅 제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="오늘의 운동 완료!"
              className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sihang-primary-400 focus:border-transparent"
            />
          </div>

          {/* 설명 입력 */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-neutral-700 mb-2">
              인증샷 설명 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="30분 러닝 완료했습니다!"
              rows={4}
              className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sihang-primary-400 focus:border-transparent resize-none"
            />
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-sihang-primary-400 text-white rounded-lg font-medium hover:bg-sihang-primary-500 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? '등록 중...' : '인증샷 등록'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateSnapPage;
