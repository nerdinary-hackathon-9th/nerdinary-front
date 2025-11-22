const ChallengeCard = () => {
  return (
    <div
      className="w-5/6 h-24 flex p-5 gap-5 shadow-md rounded-md border
                  transition-all duration-200 ease-out cursor-pointer
                  hover:scale-105 active:scale-[1.05]"
    >
      <div>
        {/* <img src="" /> */}
        <div className="w-14 h-14 object-cover bg-neutral-200"></div>
      </div>
      <div className="py-0.5 flex flex-col justify-between">
        <span className="text-sm">챌린지 제목</span>
        <div className="flex gap-2">
          <span className="text-xs text-neutral-400">기간</span>
          <span className="text-xs text-neutral-400">참여자 수</span>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
