import { useRef, useState, useEffect } from 'react';
import { ChallengeCardAtMyPage } from './ChallengeCardAtMyPage';
import { userGet } from '@/api/user/user-get';
import { imagePost } from '@/api/image/image-post';
import { compressImage } from '@/utils/compressImage';
import { api } from '@/lib/ky';
import { useNavigate } from 'react-router-dom';

interface SnapInfo {
  id: number;
  content: string;
  imageUrl: string;
  challengeId: number;
}

interface EditState {
  snapId: number;
  content: string;
  imageUrl: string;
}

export const JoinList = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [list, setList] = useState<any[]>([]);
  const [mySnaps, setMySnaps] = useState<SnapInfo[]>([]);
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState<EditState | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const userId = Number(localStorage.getItem('userId'));

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const [participateRes, snapsRes] = await Promise.all([
          userGet.getParticipatingChallenges({ userId }),
          api.get(`api/snap/user/${userId}`).json<any>(),
        ]);

        const challenges =
          participateRes.data.userChallenges?.participants?.map((p: any) => p.challenge) ?? [];
        setList(challenges);
        setMySnaps(snapsRes.data ?? []);
      } catch (err) {
        console.error('참여중인 챌린지 조회 실패', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getMySnap = (challengeId: number) =>
    mySnaps.find((s) => s.challengeId === challengeId);

  const handleLeave = async (challengeId: number) => {
    if (!window.confirm('챌린지 참여를 취소하시겠어요?\n인증샷도 함께 삭제됩니다.')) return;
    try {
      await api.delete(`api/user/${userId}/challenge/${challengeId}`);
      setList((prev) => prev.filter((c) => c.id !== challengeId));
    } catch {
      alert('참여 취소에 실패했습니다.');
    }
  };

  const openEdit = (snap: SnapInfo) => {
    setEditing({ snapId: snap.id, content: snap.content, imageUrl: snap.imageUrl });
    setImagePreview(snap.imageUrl);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const compressed = await compressImage(file);
      setImagePreview(URL.createObjectURL(compressed));
      const res = await imagePost.uploadImage(compressed);
      setEditing((prev) => prev && { ...prev, imageUrl: res.data.imageUrl });
    } catch {
      alert('이미지 업로드에 실패했습니다.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const BASE_URL = import.meta.env.VITE_PUBLIC_API_URL || '';
      const formData = new FormData();
      formData.append('data', JSON.stringify({ content: editing.content, imageUrl: editing.imageUrl }));

      const res = await fetch(
        `${BASE_URL}/api/snap/${editing.snapId}/${userId}`,
        { method: 'PUT', body: formData },
      );
      if (!res.ok) throw new Error();

      const updated = (await res.json()).data;
      setMySnaps((prev) =>
        prev.map((s) => (s.id === editing.snapId ? { ...s, content: updated.content, imageUrl: updated.imageUrl } : s)),
      );
      setEditing(null);
    } catch {
      alert('수정에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-5 text-sm text-gray-500">불러오는 중…</p>;
  if (list.length === 0)
    return <p className="p-5 text-sm text-gray-400">참여중인 낭낭이 없습니다!</p>;

  return (
    <>
      <div className="flex flex-col gap-4">
        {list.map((item) => {
          const snap = getMySnap(item.id);
          return (
            <div key={item.id}>
              <ChallengeCardAtMyPage
                title={item.title}
                startDate={item.createdAt}
                endDate={item.endAt}
                image={item.thumbnailUrl}
                content={item.context}
                participant={item._count.participants}
                onClick={() => navigate(`/challenge-detail/${item.id}`)}
              />
              <div className="flex gap-2 justify-end -mt-3 mb-1 pr-1">
                {snap && (
                  <button
                    onClick={(e) => { e.stopPropagation(); openEdit(snap); }}
                    className="text-xs text-blue-400 border border-blue-200 rounded-full px-3 py-1"
                  >
                    인증샷 수정
                  </button>
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); handleLeave(item.id); }}
                  className="text-xs text-red-400 border border-red-200 rounded-full px-3 py-1"
                >
                  참여 취소
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 인증샷 수정 바텀시트 */}
      {editing && (
        <div
          className="fixed inset-0 z-50 flex items-end bg-black/40"
          onClick={() => setEditing(null)}
        >
          <div
            className="w-full bg-white rounded-t-2xl pb-10 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 pb-0">
              <div className="w-10 h-1 bg-neutral-200 rounded-full mx-auto mb-5" />
              <p className="font-semibold text-base mb-4">인증샷 수정</p>
            </div>

            <div className="overflow-y-auto px-5 flex-1">
              {/* 이미지 */}
              <label className="block text-sm text-neutral-500 mb-2">사진</label>
              <div
                className="relative w-full h-40 rounded-xl overflow-hidden mb-4 cursor-pointer bg-neutral-100"
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview && (
                  <img src={imagePreview} className="w-full h-full object-cover" alt="preview" />
                )}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <span className="text-white text-xs font-medium bg-black/40 px-3 py-1 rounded-full">
                    {uploading ? '업로드 중…' : '사진 변경'}
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

              {/* 내용 */}
              <label className="block text-sm text-neutral-500 mb-1">인증 내용</label>
              <textarea
                className="w-full border rounded-xl px-4 py-3 mb-5 text-sm resize-none focus:outline-none focus:border-blue-300"
                rows={4}
                value={editing.content}
                onChange={(e) => setEditing((prev) => prev && { ...prev, content: e.target.value })}
              />
            </div>

            <div className="px-5 pt-3">
              <button
                disabled={saving || uploading || !editing.content.trim()}
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
