import { useState } from 'react';
import { GlobalNavigationBar } from '@/app/layout/navigation/GlobalNavigationBar';
import { Header } from '@/app/layout/header/ui/Header';
import { JoinList } from './components/JoinList';
import { MadeList } from './components/MadeList';
import { SegmentedToggle } from './components/SegmentedToggle';

const MyPage = () => {
  const [tab, setTab] = useState<'left' | 'right'>('left');

  return (
    <div className="min-h-screen">
      <Header variant="back-text" title="마이페이지" />
      <div className="border-b-[0.5px] border-[#F3F3F5]" />

      {/* 토글 */}
      <div className="mt-6 flex justify-center">
        <SegmentedToggle leftLabel="참여중인" rightLabel="내가 만든" onChange={(v) => setTab(v)} />
      </div>

      {/* 래핑: 페이지 컨텐츠 */}
      <div className="px-5 mt-5 mb-24">{tab === 'left' ? <JoinList /> : <MadeList />}</div>

      <GlobalNavigationBar />
    </div>
  );
};

export default MyPage;
