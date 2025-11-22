import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { challengeAPI } from '@/api/challenge/challenge';
import type { ChallengeDetail, ChallengeParticipant } from '@/types/challenge';
import { Header } from '@/app/layout/header/ui/Header';
import SlideButton from '@/components/ui/SlideButton';
import CalendarIcon from '@/assets/calendar.svg?react';
import PeopleIcon from '@/assets/people.svg?react';
import DotIcon from '@/assets/dot.svg?react';
import { SnapGrid } from './components/SnapGrid';
import { formatDateKo } from '@/utils/dateFormat';

const ChallengeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState<ChallengeDetail | null>(null);
  const [participants, setParticipants] = useState<ChallengeParticipant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChallengeData = async () => {
      if (!id) return;

      setIsLoading(true);
      try {
        const [detailResponse, participantsResponse] = await Promise.all([
          challengeAPI.getDetail(Number(id)),
          challengeAPI.getParticipants(Number(id)),
        ]);
        setChallenge(detailResponse.data);
        setParticipants(participantsResponse.data);
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

  const [challenge, setChallenge] = useState<ChallengeReseponse | null>(null);
  const [, setLoading] = useState(true);
  const [snaps, setSnaps] = useState<ChallengeSnapItem[]>([]);

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
        <img src={challenge.thumbnailUrl} className="w-full h-60 object-cover" alt="challenge" />

        {/* Title */}
        <div className="px-5 py-4 text-center">
          <div className="flex flex-col gap-1">
            <h1 className="heading-18 text-neutral-900">{challenge.title}</h1>
            <div className="flex gap-2 justify-center items-center text-xs text-neutral-300 mt-1">
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                <span className="text-[#B4B5B9]  mr-1">
                  {formatDateKo(challenge.createdAt)} ~ {formatDateKo(challenge.endAt)}
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
            {participants.length > 0 ? (
              participants.map((participant) => (
                <div
                  className="bg-neutral-100 border-neutral-100 border rounded-lg h-28 flex items-center justify-center"
                  key={participant.id}
                >
                  <div className="text-center">
                    <div className="text-sm font-medium text-neutral-700">
                      {participant.user.nickname}
                    </div>
                    <div className="text-xs text-neutral-400 mt-1">
                      {formatDateKo(participant.createdAt)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-neutral-400 text-sm">
                아직 참가자가 없습니다.
              </div>
            )}
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
