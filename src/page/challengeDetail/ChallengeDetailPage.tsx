import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { challengeAPI } from '@/api/challenge/challenge';
import { snapAPI } from '@/api/snap/snap';
import type { ChallengeDetail } from '@/types/challenge';
import type { Snap } from '@/types/snap';
import { Header } from '@/app/layout/header/ui/Header';
import SlideButton from '@/components/ui/SlideButton';
import CalendarIcon from '@/assets/calendar.svg?react';
import PeopleIcon from '@/assets/people.svg?react';
import DotIcon from '@/assets/dot.svg?react';
import { SnapGrid } from './components/SnapGrid';
import { snapGet } from '@/api/snap/snap-get';

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

export interface ChallengeSnapItem {
  imageUrl: string;
}

const ChallengeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState<ChallengeDetail | null>(null);
  const [snaps, setSnaps] = useState<Snap[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChallengeData = async () => {
      if (!id) return;

      setIsLoading(true);
      try {
        const [detailResponse, snapsResponse] = await Promise.all([
          challengeAPI.getDetail(Number(id)),
          snapAPI.getSnapsByChallenge(Number(id)),
        ]);
        setChallenge(detailResponse.data);
        setSnaps(snapsResponse.data);
      } catch (error) {
        console.error('챌린지 정보를 불러오는데 실패했습니다:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallengeData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-neutral-400">로딩 중...</div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-neutral-400">챌린지를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header variant="back" />
      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto pb-28">
        {/* Image */}
        <img src="/example.png" className="w-full h-60 object-cover" alt="challenge" />

        {/* Title */}
        <div className="px-5 py-4 text-center">
          <div className="flex flex-col gap-1">
            <h1 className="heading-18 text-neutral-900">{challenge.title}</h1>
            <div className="flex gap-2 justify-center items-center text-xs text-neutral-300 mt-1">
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                <span className="text-[#B4B5B9]  mr-1">
                  {formatDotDateKorea(challenge.createdAt)} ~ {formatDotDateKorea(challenge.endAt)}
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
            {snaps.length > 0 ? (
              snaps.map((snap) => (
                <div
                  className="bg-neutral-100 border-neutral-100 border rounded-lg h-28 overflow-hidden relative"
                  key={snap.id}
                >
                  <img
                    src={snap.imageUrl}
                    alt={snap.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                    <div className="text-xs font-medium text-white truncate">{snap.title}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-neutral-400 text-sm">
                아직 인증 내용이 없습니다.
              </div>
            ))}
          </SnapGrid>
        </section>
      </main>

      {/* Slide CTA */}
      <div className="fixed bottom-5 left-0 w-full px-5">
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
      </div>
    </div>
  );
};

export default ChallengeDetailPage;
