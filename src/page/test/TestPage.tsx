import ChallengeDetailLayout from '@/components/ui/ChallengeDetailLayout';

const TestPage = () => {
  return (
    <ChallengeDetailLayout
      title="비오는 날 비 맞으면서 걷기"
      dateRange="2025.11.22 ~ 2025.11.23"
      participants={101}
      description={`비오는 날 그냥 걸어보는 챌린지!
당신의 무모함을 보여주세요 ☔️`}
      images={['/placeholder1.png', '/placeholder2.png', '/placeholder3.png']}
      onParticipate={() => alert('참여 완료! 🎉')}
    />
  );
};

export default TestPage;
