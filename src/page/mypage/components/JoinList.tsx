import { useState, useEffect } from 'react';
import { ChallengeCardAtMyPage } from './ChallengeCardAtMyPage';
import { userGet } from '@/api/user/user-get';

export const JoinList = () => {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = Number(localStorage.getItem('userId'));
    if (!userId) return;

    const fetchData = async () => {
      try {
        const res = await userGet.getParticipatingChallenges({ userId });

        const challenges =
          res.data.userChallenges?.participants?.map((p: any) => p.challenge) ?? [];

        setList(challenges);
      } catch (err) {
        console.error('참여중인 챌린지 조회 실패', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="p-5 text-sm text-gray-500">불러오는 중…</p>;

  if (list.length === 0)
    return <p className="p-5 text-sm text-gray-400">참여중인 낭낭이 없습니다!</p>;

  return (
    <div className="flex flex-col gap-4">
      {list.map((item) => (
        <ChallengeCardAtMyPage
          key={item.id}
          title={item.title}
          startDate={item.createdAt}
          endDate={item.endAt}
          image={item.thumbnailUrl}
          content={item.context}
          participant={item._count.participants}
        />
      ))}
    </div>
  );
};
