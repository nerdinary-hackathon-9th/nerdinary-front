import SearchFilterBar from '@/components/ui/SearchFilterBar';
import WasteCard from '@/components/ui/WasteCard';

const ChallengeList = () => {
  return (
    <div className="w-full flex flex-col gap-3 items-center overflow-y-scroll">
      <SearchFilterBar />
      <WasteCard />
      <WasteCard />
      <WasteCard />
      <WasteCard />
      <WasteCard />
    </div>
  );
};
export default ChallengeList;
