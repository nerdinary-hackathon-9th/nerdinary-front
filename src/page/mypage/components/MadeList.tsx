import { ChallengeCardAtMyPage } from './ChallengeCardAtMyPage';
import { useNavigate } from 'react-router-dom';
export const MadeList = () => {
  const navigate = useNavigate();
  return (
    <div>
      <ChallengeCardAtMyPage
        title="제목dfdfdf"
        startDate="2025-10-01"
        endDate="2025-10-15"
        image="/example.png"
        content="ㅋㅇㄹㅇㄹㄹㅇㄴㄹㅇㄴㅍㅇㄴ"
        onClick={() => navigate(`/challenge-detail/${item.id}`)}
      />
    </div>
  );
};
