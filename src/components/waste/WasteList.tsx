import WasteCard from '../ui/WasteCard';

const WasteList = () => {
  return (
    <section className="w-full h-full flex flex-col justify-center items-center border-2">
      <h1 className="text-xl font-bold">인기 낭비리스트 보여주기</h1>
      <div className="w-full h-full flex flex-col border-2">
        <WasteCard />
        <WasteCard />
        <WasteCard />
        <WasteCard />
      </div>
    </section>
  );
};

export default WasteList;
