import { useState } from 'react';
import { GlobalNavigationBar } from '@/app/layout/navigation/GlobalNavigationBar';
import { Header } from '@/app/layout/header/ui/Header';
import { JoinList } from './components/JoinList';
import { MadeList } from './components/MadeList';
import { SegmentedToggle } from './components/SegmentedToggle';

const MyPage = () => {
  const [tab, setTab] = useState<'left' | 'right'>('left');

  return (
    <div className="flex flex-col h-screen">
      <Header variant="back-text" title="마이페이지" />
      <div className="border-b-[0.5px] border-[#F3F3F5]" />

      {/* 토글 */}
      <div className="mt-6 flex justify-center flex-shrink-0">
        <SegmentedToggle leftLabel="참여중인" rightLabel="내가 만든" onChange={(v) => setTab(v)} />
      </div>

      {/* 스크롤 가능한 컨텐츠 영역 */}
      <div className="flex-1 overflow-y-auto px-5 mt-5 pb-24">
        {tab === 'left' ? <JoinList /> : <MadeList />}
      </div>

      <GlobalNavigationBar />
    </div>
  );
};

export default MyPage;
