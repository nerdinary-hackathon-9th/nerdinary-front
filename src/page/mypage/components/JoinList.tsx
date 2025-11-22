import { JoinChallengeCard } from './JoinChallengeCard';

export const JoinList = () => {
  return (
    <div>
      <JoinChallengeCard
        title="제목"
        startDate="2025-10-01"
        endDate="2025-10-15"
        image="/public/example.png"
        content="내용내용"
      />
    </div>
  );
};
