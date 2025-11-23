import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Header } from '@/app/layout/header/ui/Header';
import { GlobalNavigationBar } from '@/app/layout/navigation/GlobalNavigationBar';
import { challengeGet } from '@/api/challenge/challenge-get';

import { HotChallenges } from './components/HotChallenges';
import { ProgressChallenges } from './components/ProgressChallenges';

const HomePage = () => {
  const navigate = useNavigate();

  const [hotItems, setHotItems] = useState<any[]>([]);
  const [todayItems, setTodayItems] = useState<any[]>([]);

  const [, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const hotRes = await challengeGet.getHotChallenge();
        setHotItems(hotRes.data);

        const todayRes = await challengeGet.getTodayChallenge();
        setTodayItems(todayRes.data);
      } catch (err) {
        console.error('홈 데이터 불러오기 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);
  console.log(todayItems)
  return (
    <div className="min-h-screen">
      <Header variant="logo" />
      <div className="border border-b border-[#F3F3F5] " />
      <div className="flex flex-col items-center justify-center px-5">
        {/* <HomePageSvg className="w-full" /> */}
        <img src="/homepage.png" className="relative mt-5" />
        <button
          className="transparant w-48 h-14 absolute top-47 left-8"
          onClick={() => navigate('challenge-list')}
        />

        <div className="w-screen overflow-x-auto">
          <HotChallenges
            items={hotItems}
            onClickItem={(id) => navigate(`/challenge-detail/${id}`)}
          />

          <ProgressChallenges
            items={todayItems}
            onClickItem={(id) => navigate(`/challenge-detail/${id}`)}
          />
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
