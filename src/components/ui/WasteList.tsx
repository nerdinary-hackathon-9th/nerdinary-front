import SearchFilterBar from './SearchFilterBar';
import WasteCard from './WasteCard';

const WasteList = () => {
  return (
    <div className="w-full flex flex-col gap-3 items-center overflow-y-scroll">
      <SearchFilterBar />
      <WasteCard />
      <WasteCard />
      <WasteCard />
      <WasteCard />
      <WasteCard />
      <WasteCard />
      <WasteCard />
    </div>
  );
};
export default WasteList;
