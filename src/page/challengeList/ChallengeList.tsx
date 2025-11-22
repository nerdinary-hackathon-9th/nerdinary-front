import SearchFilterBar from '@/components/ui/SearchFilterBar';
import ChallengeCard from '@/components/ui/ChallengeCard';

const ChallengeList = () => {
  return (
    <div className="w-full flex flex-col gap-3 items-center overflow-y-scroll">
      <SearchFilterBar />
      <ChallengeCard />
      <ChallengeCard />
      <ChallengeCard />
      <ChallengeCard />
      <ChallengeCard />
    </div>
  );
};
export default ChallengeList;
