import CalendarIcon from '@/assets/calendar.svg?react';
import PeopleIcon from '@/assets/people.svg?react';

const ChallengeCard = () => {
  return (
    <div className="w-5/6 h-fit flex p-5 gap-4 shadow-xs rounded-[12px] border transition-all duration-200 ease-out cursor-pointer hover:scale-105 active:scale-[1.05]">
      <div>
        {/* <img src="" /> */}
        <div className="w-22 h-22 object-cover rounded-md bg-neutral-200 "></div>
      </div>
      <div className="py-1 flex flex-col gap-2">
        <span className="text-sm font-medium">챌린지 제목</span>
        <div className="flex flex-col gap-1 text-xs text-neutral-400">
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-4 h-4" />
            {/* TODO : api response body 받으면 변경  */}
            <span>2025.11.22 ~ 2025.11.23</span>
          </div>
          <div className="flex items-center gap-1">
            <PeopleIcon className="w-4 h-4" />
            {/* TODO : api response body 받으면 변경  */}
            <span>100 명</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
