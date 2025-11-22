import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { challengeGet } from '@/api/challenge/challenge-get';
import { Header } from '@/app/layout/header/ui/Header';
import SlideButton from '@/components/ui/SlideButton';
import CalendarIcon from '@/assets/calendar.svg?react';
import PeopleIcon from '@/assets/people.svg?react';
import DotIcon from '@/assets/dot.svg?react';
import { SnapGrid } from './components/SnapGrid';

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

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const res = await challengeGet.getChallengeInfo(Number(id));
        setChallenge(res.data);
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
        <img src="/public/example.png" className="w-full h-60 object-cover" alt="challenge" />

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
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                className="bg-neutral-100 border-neutral-100 border rounded-lg h-28"
                key={i}
              ></div>
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
                participantsCount: challenge.participantsCount
              },
            })
          }
        />
      </div>
    </div>
  );
};

export default ChallengeDetailPage;
