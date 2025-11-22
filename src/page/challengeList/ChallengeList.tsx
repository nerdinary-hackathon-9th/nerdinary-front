import { useEffect, useMemo, useState } from 'react';
import SearchFilterBar from '@/components/ui/SearchFilterBar';
import ChallengeCard from '@/components/ui/ChallengeCard';
import { GlobalNavigationBar } from '@/app/layout/navigation/GlobalNavigationBar';
import { Header } from '@/app/layout/header/ui/Header';
import { challengeAPI } from '@/api/challenge';
import type { Challenge } from '@/api/challenge';

const mockData = [
  {
    title: '갑자기 바다보고 오기!!!',
    imgSrc: '/public/listexam1.png',
    startDate: '2025.11.22',
    endDate: '2025.11.23',
    participant: 112,
    challengeId: 1,
  },
  {
    title: '비오는 날 비 맞으면서 걷기',
    imgSrc: '/public/listexam2.png',
    startDate: '2025.11.23',
    endDate: '2025.11.24',
    participant: 55,
    challengeId: 2,
  },
  {
    title: '본가에 강아지 보러 다녀오기',
    imgSrc: '/public/listexam3.png',
    startDate: '2025.11.24',
    endDate: '2025.11.25',
    participant: 23,
    challengeId: 3,
  },

  {
    title: '겨울에 아이스크림 먹기!',
    imgSrc: '/public/listexam4.png',
    startDate: '2025.11.25',
    endDate: '2025.11.26',
    participant: 241,
    challengeId: 4,
  },
  {
    title: '잠시 노트북 덮고 쉬자',
    imgSrc: '/public/listexam5.png',
    startDate: '2025.11.26',
    endDate: '2025.11.27',
    participant: 79,
    challengeId: 5,
  },
];

const ChallengeList = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState<'new' | 'popular'>('new');
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // API 호출
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await challengeAPI.getList({
          search: searchValue || undefined,
          sort: filterValue,
        });
        setChallenges(response.challenges || []);
      } catch (err) {
        console.error('챌린지 목록 조회 실패:', err);
        setError('챌린지 목록을 불러오는데 실패했습니다.');
        // 에러 발생 시 mockData 사용
        setChallenges(mockData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallenges();
  }, [searchValue, filterValue]);

  const filteredData = useMemo(() => {
    return challenges;
  }, [challenges]);

  const handleFilterChange = (value: string) => {
    if (value === 'new' || value === 'popular') {
      setFilterValue(value);
    }
  };

  return (
    <>
      <Header variant="back-text" title="낭비 할 일 리스트" />

      <div className="pb-20 w-full flex flex-col gap-3 items-center overflow-y-scroll">
        <SearchFilterBar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          filterValue={filterValue}
          onFilterChange={handleFilterChange}
        />

        {isLoading && (
          <div className="py-10 text-neutral-400 text-sm">로딩 중...</div>
        )}

        {error && (
          <div className="py-10 text-red-500 text-sm">{error}</div>
        )}

        {!isLoading && !error && filteredData.length === 0 && (
          <div className="py-10 text-neutral-400 text-sm">
            검색 결과가 없습니다.
          </div>
        )}

        {!isLoading && filteredData.map((item, idx) => (
          <ChallengeCard key={item.challengeId || idx} {...item} />
        ))}
      </div>
      <GlobalNavigationBar />
    </>
  );
};
export default ChallengeList;
