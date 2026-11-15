import { useRef, useState, useEffect } from 'react';
import { ChallengeCardAtMyPage } from './ChallengeCardAtMyPage';
import { userGet } from '@/api/user/user-get';
import { challengePost } from '@/api/challenge/challenge-post';
import { imagePost } from '@/api/image/image-post';
import { compressImage } from '@/utils/compressImage';
import { useNavigate } from 'react-router-dom';

interface EditForm {
  title: string;
  context: string;
  thumbnailUrl: string;
}

export const MadeList = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<EditForm>({ title: '', context: '', thumbnailUrl: '' });
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const userId = Number(localStorage.getItem('userId'));
    if (!userId) return;

    const fetchData = async () => {
      try {
        const res = await userGet.getCreatedChallenges({ userId });
        setList(res.data.challenges ?? []);
      } catch (err) {
        console.error('내가 만든 챌린지 조회 실패', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (challengeId: number) => {
    if (!window.confirm('챌린지를 삭제하시겠어요?')) return;
    try {
      await challengePost.deleteChallenge(challengeId);
      setList((prev) => prev.filter((c) => c.id !== challengeId));
    } catch {
      alert('삭제에 실패했습니다.');
    }
  };

  const openEdit = (item: any) => {
    setEditingId(item.id);
    setEditForm({
      title: item.title ?? '',
      context: item.context ?? '',
      thumbnailUrl: item.thumbnailUrl ?? '',
    });
    setImagePreview(item.thumbnailUrl ?? '');
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const compressed = await compressImage(file);
      setImagePreview(URL.createObjectURL(compressed));
      const res = await imagePost.uploadImage(compressed);
      setEditForm((f) => ({ ...f, thumbnailUrl: res.data.imageUrl }));
    } catch {
      alert('이미지 업로드에 실패했습니다.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!editingId) return;
    setSaving(true);
    try {
      await challengePost.updateChallenge(editingId, {
        title: editForm.title,
        context: editForm.context,
        thumbnailUrl: editForm.thumbnailUrl,
      });
      setList((prev) =>
        prev.map((c) =>
          c.id === editingId
            ? { ...c, title: editForm.title, context: editForm.context, thumbnailUrl: editForm.thumbnailUrl }
            : c,
        ),
      );
      setEditingId(null);
    } catch {
      alert('수정에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-5 text-sm text-gray-500">불러오는 중…</p>;
  if (list.length === 0) return <p className="p-5 text-sm text-gray-400">만든 낭낭이 없습니다!</p>;

  return (
    <>
      <div className="flex flex-col gap-4">
        {list.map((item) => (
          <div key={item.id} className="relative">
            <ChallengeCardAtMyPage
              title={item.title}
              startDate={item.createdAt}
              endDate={item.endAt}
              image={item.thumbnailUrl}
              content={item.context}
              participant={item._count?.participants}
              onClick={() => navigate(`/challenge-detail/${item.id}`)}
            />
            <div className="flex gap-2 justify-end -mt-3 mb-1 pr-1">
              <button
                onClick={(e) => { e.stopPropagation(); openEdit(item); }}
                className="text-xs text-blue-400 border border-blue-200 rounded-full px-3 py-1"
              >
                수정
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                className="text-xs text-red-400 border border-red-200 rounded-full px-3 py-1"
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 수정 바텀시트 */}
      {editingId !== null && (
        <div
          className="fixed inset-0 z-50 flex items-end bg-black/40"
          onClick={() => setEditingId(null)}
        >
          <div
            className="w-full bg-white rounded-t-2xl pb-10 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 pb-0">
              <div className="w-10 h-1 bg-neutral-200 rounded-full mx-auto mb-5" />
              <p className="font-semibold text-base mb-4">챌린지 수정</p>
            </div>

            {/* 스크롤 영역 */}
            <div className="overflow-y-auto px-5 flex-1">
              {/* 이미지 */}
              <label className="block text-sm text-neutral-500 mb-2">배너 이미지</label>
              <div
                className="relative w-full h-36 rounded-xl overflow-hidden mb-4 cursor-pointer bg-neutral-100"
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview ? (
                  <img src={imagePreview} className="w-full h-full object-cover" alt="preview" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-400 text-sm">
                    이미지 선택
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <span className="text-white text-xs font-medium bg-black/40 px-3 py-1 rounded-full">
                    {uploading ? '업로드 중…' : '이미지 변경'}
                  </span>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />

              {/* 제목 */}
              <label className="block text-sm text-neutral-500 mb-1">제목</label>
              <input
                className="w-full border rounded-xl px-4 py-3 mb-4 text-sm focus:outline-none focus:border-blue-300"
                value={editForm.title}
                onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))}
              />

              {/* 내용 */}
              <label className="block text-sm text-neutral-500 mb-1">내용</label>
              <textarea
                className="w-full border rounded-xl px-4 py-3 mb-5 text-sm resize-none focus:outline-none focus:border-blue-300"
                rows={4}
                value={editForm.context}
                onChange={(e) => setEditForm((f) => ({ ...f, context: e.target.value }))}
              />
            </div>

            <div className="px-5 pt-3">
              <button
                disabled={saving || uploading || !editForm.title.trim()}
                onClick={handleSave}
                className="w-full h-12 rounded-xl bg-blue-400 text-white font-semibold disabled:opacity-40"
              >
                {saving ? '저장 중…' : '저장'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
