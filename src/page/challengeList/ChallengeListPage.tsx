import { useMemo, useState, useEffect } from 'react';
import SearchFilterBar from '@/components/ui/SearchFilterBar';
import ChallengeCard from '@/components/ui/ChallengeCard';
import { GlobalNavigationBar } from '@/app/layout/navigation/GlobalNavigationBar';
import { Header } from '@/app/layout/header/ui/Header';
import { challengeGet } from '@/api/challenge/challenge-get';

export interface Challenge {
  id: number;
  title: string;
  context: string;
  createdAt: string;
  endAt: string;
  thumbnailUrl: string;
  _count: {
    participants: number;
  };
}

const ChallengeListPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState<'new' | 'old' | 'most' | 'least'>('new');

  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await challengeGet.getAllChallenge();
        setChallenges(res.data); // 배열 그대로 저장
      } catch (err) {
        console.error('전체 챌린지 조회 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    let result = [...challenges];

    // 검색 필터
    if (searchValue) {
      result = result.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }

    // 정렬 (createdAt 기준 최신순)
    if (filterValue === 'new') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    // 인기순 정렬 (참여자 수 기준)
    else if (filterValue === 'most') {
      result.sort((a, b) => b._count.participants - a._count.participants);
    }

    return result;
  }, [searchValue, filterValue, challenges]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>로딩 중...</p>
      </div>
    );
  }

  const handleFilterChange = (value: string) => {
    if (value === 'new' || value === 'old' || value === 'most' || value === 'least') {
      setFilterValue(value);
    }
  };

  return (
    <div>
      <Header variant="back-text" title="낭낭 리스트" />

      <div className="pb-20 px-5 w-full flex flex-col gap-3 items-center overflow-y-scroll">
        <SearchFilterBar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          filterValue={filterValue}
          onFilterChange={handleFilterChange}
        />

        {filteredData.map((item) => (
          <ChallengeCard
            key={item.id}
            challengeId={item.id}
            title={item.title}
            imgSrc={item.thumbnailUrl}
            startDate={item.createdAt.slice(0, 10).replace(/-/g, '.')}
            endDate={item.endAt.slice(0, 10).replace(/-/g, '.')}
            participant={item._count.participants}
          />
        ))}
      </div>
      <GlobalNavigationBar />
    </div>
  );
};
export default ChallengeListPage;
