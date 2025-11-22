const WasteCard = () => {
  return (
    <div className="w-full max-w-xs h-24 flex p-5 gap-5 items-center shadow-md rounded-xs translate-4 border-2">
      <div>
        {/* <img src="" /> */}
        <div className="w-14 h-14 object-cover bg-neutral-200"></div>
      </div>
      <div className="pt-3 pb-2 flex flex-col gap-1 justify-between">
        <span className="text-sm">챌린지 제목</span>
        <div className=" flex gap-2">
          <span className="text-xs text-neutral-400">기간</span>
          <span className="text-xs text-neutral-400">참여자 수</span>
        </div>
      </div>
    </div>
  );
};

export default WasteCard;
