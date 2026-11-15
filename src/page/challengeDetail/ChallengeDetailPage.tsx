import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { challengeGet } from '@/api/challenge/challenge-get';
import { Header } from '@/app/layout/header/ui/Header';
import SlideButton from '@/components/ui/SlideButton';
import CalendarIcon from '@/assets/calendar.svg?react';
import PeopleIcon from '@/assets/people.svg?react';
import DotIcon from '@/assets/dot.svg?react';
import { SnapGrid } from './components/SnapGrid';
import { snapGet, type ChallengeSnapItem } from '@/api/snap/snap-get';

export interface ChallengeReseponse {
  id: number;
  title: string;
  context: string;
  createdAt: string;
  endAt: string;
  thumbnailUrl: string;
  participantsCount: number;
}

const formatDotDateKorea = (iso: string) => {
  const date = new Date(iso);
  const korea = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  return korea.toISOString().slice(0, 10).replace(/-/g, '.');
};

const ChallengeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [challenge, setChallenge] = useState<ChallengeReseponse | null>(null);
  const [, setLoading] = useState(true);
  const [snaps, setSnaps] = useState<ChallengeSnapItem[]>([]);
  const [selectedSnap, setSelectedSnap] = useState<ChallengeSnapItem | null>(null);
  const [alreadyJoined, setAlreadyJoined] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        // 챌린지 정보
        const challengeRes = await challengeGet.getChallengeInfo(Number(id));
        setChallenge(challengeRes.data);

        // 스냅 정보
        const snapRes = await snapGet.getAllSnapsInChallenge({ challengeId: Number(id) });
        setSnaps(snapRes.data);

        const myUserId = Number(localStorage.getItem('userId'));
        if (myUserId) {
          setAlreadyJoined(snapRes.data.some((s) => s.userId === myUserId));
        }
      } catch (err) {
        console.error('챌린지 상세 조회 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (!challenge) return;

  return (
    <div className="min-h-screen">
      <Header variant="back" />
      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto pb-28">
        {/* Image */}
        <img
          src={challenge.thumbnailUrl?.startsWith('/') ? `${import.meta.env.VITE_PUBLIC_API_URL || ''}${challenge.thumbnailUrl}` : challenge.thumbnailUrl}
          className="w-full h-60 object-cover"
          alt="challenge"
        />

        {/* Title */}
        <div className="px-5 py-4 text-center">
          <div className="flex flex-col gap-1">
            <h1 className="heading-18 text-neutral-900">{challenge.title}</h1>
            <div className="flex gap-2 justify-center items-center text-xs text-neutral-300 mt-1">
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                <span className="text-[#B4B5B9]  mr-1">
                  {formatDotDateKorea(challenge.createdAt)} ~ {challenge.endAt ? formatDotDateKorea(challenge.endAt) : '미정'}
                </span>
                <DotIcon />
              </div>

              <div className="flex items-center gap-1">
                <PeopleIcon />
                <span className="text-[#B4B5B9]">{challenge.participantsCount}명 참여중</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="px-10 label-12 text-[#686B70] text-center leading-relaxed">
          {challenge.context}
        </div>

        {/* Gallery */}
        <section className="px-5 mt-6">
          <h2 className="body-14 mb-3 text-[#686B70]">챌린지 인증내용</h2>

          <SnapGrid>
            {snaps.map((snap) => (
              <div
                key={snap.id}
                className="rounded-lg overflow-hidden cursor-pointer"
                onClick={() => setSelectedSnap(snap)}
              >
                <img
                  src={snap.imageUrl?.startsWith('/') ? `${import.meta.env.VITE_PUBLIC_API_URL || ''}${snap.imageUrl}` : snap.imageUrl}
                  className="w-full h-28 object-cover"
                  alt="snap image"
                />
              </div>
            ))}
          </SnapGrid>
        </section>
      </main>

      {/* Snap detail modal */}
      {selectedSnap && (
        <div
          className="fixed inset-0 z-50 flex items-end bg-black/50"
          onClick={() => setSelectedSnap(null)}
        >
          <div
            className="w-full bg-white rounded-t-2xl p-5 pb-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-neutral-200 rounded-full mx-auto mb-4" />
            <img
              src={selectedSnap.imageUrl?.startsWith('/') ? `${import.meta.env.VITE_PUBLIC_API_URL || ''}${selectedSnap.imageUrl}` : selectedSnap.imageUrl}
              className="w-full h-52 object-cover rounded-xl mb-4"
              alt="snap"
            />
            <p className="text-xs text-neutral-400 mb-1">{selectedSnap.user?.nickname ?? '익명'}</p>
            <p className="body-14 text-neutral-800 leading-relaxed">{selectedSnap.content}</p>
          </div>
        </div>
      )}

      {/* Slide CTA */}
      <div className="fixed bottom-5 left-0 w-full px-5">
        {alreadyJoined ? (
          <div className="w-full h-14 rounded-xl bg-neutral-200 flex items-center justify-center text-neutral-500 font-semibold">
            이미 참여한 챌린지예요
          </div>
        ) : (
          <SlideButton
            text="참여하기"
            onComplete={() =>
              navigate(`/challenge-detail/${id}/join`, {
                state: {
                  title: challenge.title,
                  createdAt: challenge.createdAt,
                  endAt: challenge.endAt,
                  participantsCount: challenge.participantsCount,
                },
              })
            }
          />
        )}
      </div>
    </div>
  );
};

export default ChallengeDetailPage;
