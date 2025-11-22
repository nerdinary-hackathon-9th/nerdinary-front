import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/app/layout/header/ui/Header';
import SlideButton from '@/components/ui/SlideButton';
import CalendarIcon from '@/assets/calendar.svg?react';
import PeopleIcon from '@/assets/people.svg?react';
import DotIcon from '@/assets/dot.svg?react';
import { SnapGrid } from './components/SnapGrid';

const ChallengeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
            <h1 className="heading-18 text-neutral-900">갑자기 바다보고 오기</h1>
            <div className="flex gap-2 justify-center items-center text-xs text-neutral-300 mt-1">
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                <span className="text-[#B4B5B9]  mr-1">2025.11.22 ~ 2025.11.23</span>
                <DotIcon />
              </div>

              <div className="flex items-center gap-1">
                <PeopleIcon />
                <span className="text-[#B4B5B9]">100명 참여중</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="px-10 label-12 text-[#686B70] text-center leading-relaxed">
          마음이 턱 막히는 날이 있지 않으셨나요? 그런 날은 갑자기 넓은 바다를 보고 오면 해결될 수도
          있어요! 시간 되는 날, 갑자기 표를 끊고 바다 다녀오는 거 어떠세요? 마음이 턱 막히는 날이
          있지 않으셨나요? 그런 날은 갑자기 넓은 바다를 보고 오면 해결될 수도 있어요! 시간 되는 날,
          갑자기 표를 끊고 바다 다녀오는 거 어떠세요? 마음이 턱 막히는 날이 있지 않으셨나요? 그런
          날은 갑자기 넓은 바다를 보고 오면 해결될 수도 있어요! 시간 되는 날, 갑자기 표를 끊고 바다
          다녀오는 거 어떠세요?
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
        <SlideButton text="참여하기" onComplete={() => navigate(`/challenge-detail/${id}/join`)} />
      </div>
    </div>
  );
};

export default ChallengeDetailPage;
