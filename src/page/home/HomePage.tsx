import { useNavigate } from 'react-router-dom';
import { Header } from '@/app/layout/header/ui/Header';
import { GlobalNavigationBar } from '@/app/layout/navigation/GlobalNavigationBar';

import { HotChallenges } from './components/HotChallenges';
import { ProgressChallenges } from './components/ProgressChallenges';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen">
      <Header variant="logo" />
      <div className="border border-b border-[#F3F3F5] " />
      <div className="flex flex-col items-center justify-center px-5">
        {/* <HomePageSvg className="w-full" /> */}
        <img src="/public/homepage.png" className="relative mt-5" />
        <button
          className="transparant w-48 h-14 absolute top-47 left-8"
          onClick={() => navigate('challenge-list')}
        />

        <div className="w-screen overflow-x-auto">
          <HotChallenges
            items={mockHotChallengeData}
            onClickItem={(id) => console.log('clicked', id)}
          />

          <ProgressChallenges items={mockHotChallengeData} />
        </div>
      </div>

      <button
        onClick={() => navigate('/make-new-challenge')}
        className="
          fixed bottom-18 right-5  
          flex items-center justify-center gap-2 py-3
          rounded-full shadow-lg
          bg-sihang-primary-400 text-white
          heading-16 w-[120px] h-[48px]
          active:scale-95 transition
        "
      >
        <span className="text-[20px] font-bold">+</span>
        낭낭 만들기
      </button>

      <GlobalNavigationBar />
    </div>
  );
};

export default HomePage;

export const mockHotChallengeData = [
  {
    id: 1,
    title: '갑자기 바다 보러가기!!',
    imgSrc: '/public/listexam1.png',
    startDate: '2025.11.22',
    endDate: '2025.11.23',
    participant: 128,
  },
  {
    id: 2,
    title: '한겨울에 아이스크림 먹기',
    imgSrc: '/public/listexam2.png',
    startDate: '2025.11.22',
    endDate: '2025.11.23',
    participant: 145,
  },
  {
    id: 3,
    title: '본가에 강아지 보러 다녀오기',
    imgSrc: '/public/listexam3.png',
    startDate: '2025.11.23',
    endDate: '2025.11.24',
    participant: 209,
  },
  {
    id: 4,
    title: '잠시 노트북 덮고 걷기',
    imgSrc: '/public/listexam4.png',
    startDate: '2025.11.24',
    endDate: '2025.11.25',
    participant: 89,
  },
  {
    id: 5,
    title: '수족관에서 힐링하기',
    imgSrc: '/public/listexam5.png',
    startDate: '2025.11.24',
    endDate: '2025.11.25',
    participant: 173,
  },
];
