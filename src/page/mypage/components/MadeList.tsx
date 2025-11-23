import { useNavigate } from 'react-router-dom';
import { ChallengeCardAtMyPage } from './ChallengeCardAtMyPage';

export const MadeList = () => {
  const navigate = useNavigate();

  // TODO: 실제 API에서 내가 만든 챌린지 목록을 가져와야 함
  const myCreatedChallenges = [
    {
      id: 1,
      title: '제목dfdfdf',
      startDate: '2025-10-01',
      endDate: '2025-10-15',
      image: 'https://via.placeholder.com/400x300?text=Challenge+Image',
      content: 'ㅋㅇㄹㅇㄹㄹㅇㄴㄹㅇㄴㅍㅇㄴ',
    },
  ];

  return (
    <div>
      {myCreatedChallenges.map((challenge) => (
        <ChallengeCardAtMyPage
          key={challenge.id}
          title={challenge.title}
          startDate={challenge.startDate}
          endDate={challenge.endDate}
          image={challenge.image}
          content={challenge.content}
          onClick={() => navigate(`/challenge-detail/${challenge.id}`)}
        />
      ))}
    </div>
  );
};
