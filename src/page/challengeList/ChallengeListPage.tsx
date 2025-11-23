import { useMemo, useState, useEffect } from 'react';
import SearchFilterBar from '@/components/ui/SearchFilterBar';
import ChallengeCard from '@/components/ui/ChallengeCard';
import { GlobalNavigationBar } from '@/app/layout/navigation/GlobalNavigationBar';
import { Header } from '@/app/layout/header/ui/Header';
import { challengeAPI } from '@/api/challenge/challenge';
import type { Challenge } from '@/types/challenge';

const ChallengeListPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState<'new' | 'old' | 'most' | 'least'>('new');
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 챌린지 목록 가져오기
  useEffect(() => {
    const fetchChallenges = async () => {
      setIsLoading(true);
      try {
        const response = await challengeAPI.getTodayChallenges();
        console.log('API 응답:', response);

        // API 응답 구조 처리
        const responseData = response as unknown as {
          success?: boolean;
          message?: string;
          data?: Array<{
            id: number;
            title: string;
            context: string;
            createdAt: string;
            endAt: string;
            thumbnailUrl: string;
            _count: { participants: number };
          }>;
        };

        let challengesList: Challenge[] = [];

        if (responseData.data && Array.isArray(responseData.data)) {
          // API 응답 데이터를 Challenge 타입으로 변환
          challengesList = responseData.data.map((item) => ({
            challengeId: item.id,
            title: item.title,
            imgSrc: item.thumbnailUrl,
            startDate: item.createdAt,
            endDate: item.endAt,
            participant: item._count.participants,
            createdAt: item.createdAt,
          }));
        }

        console.log('파싱된 챌린지 목록:', challengesList);
        setChallenges(challengesList);
      } catch (error) {
        console.error('챌린지 목록을 불러오는데 실패했습니다:', error);
        setChallenges([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  const filteredData = useMemo(() => {
    let filtered = [...challenges];

    // 검색 필터
    if (searchValue) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }

    // 정렬 (createdAt 기준 최신순)
    if (filterValue === 'new') {
      filtered.sort((a, b) => {
        const dateA = new Date(a.createdAt || a.startDate).getTime();
        const dateB = new Date(b.createdAt || b.startDate).getTime();
        return dateB - dateA;
      });
    }
    // 오래된순
    else if (filterValue === 'old') {
      filtered.sort((a, b) => {
        const dateA = new Date(a.createdAt || a.startDate).getTime();
        const dateB = new Date(b.createdAt || b.startDate).getTime();
        return dateA - dateB;
      });
    }
    // 인기순 정렬 (참여자 수 기준)
    else if (filterValue === 'most') {
      filtered.sort((a, b) => b.participant - a.participant);
    }
    // 참여자 적은순
    else if (filterValue === 'least') {
      filtered.sort((a, b) => a.participant - b.participant);
    }

    return filtered;
  }, [searchValue, filterValue, challenges]);

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

        {isLoading && <div className="py-10 text-neutral-400 text-sm">로딩 중...</div>}

        {!isLoading && filteredData.length === 0 && (
          <div className="py-10 text-neutral-400 text-sm">검색 결과가 없습니다.</div>
        )}

        {!isLoading &&
          filteredData.map((item, idx) => (
            <ChallengeCard key={item.challengeId || idx} {...item} />
          ))}
      </div>
      <GlobalNavigationBar />
    </div>
  );
};
export default ChallengeListPage;
