import { ChallengeCardAtMyPage } from './ChallengeCardAtMyPage';

export const JoinList = () => {
  return (
    <div>
      <ChallengeCardAtMyPage
        title="제목"
        startDate="2025-10-01"
        endDate="2025-10-15"
        image="/public/example.png"
        content="내용내용"
        participant={10}
      />
    </div>
  );
};
