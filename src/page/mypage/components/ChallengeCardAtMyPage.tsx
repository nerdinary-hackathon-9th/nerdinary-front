import CalendarIcon from '@/assets/grayCalendar.svg?react';
import RightArrow from '@/assets/Arrows-chevron/Icon.svg?react';

interface ChallengeCardAtMyPageProps {
  title: string;
  startDate: string;
  endDate: string;
  image: string;
  content: string;
  participant: number;
  onClick?: () => void;
}

export const ChallengeCardAtMyPage = ({
  title,
  startDate,
  endDate,
  image,
  content,
  participant,
  onClick,
}: ChallengeCardAtMyPageProps) => {
  const isHot = participant >= 100;

  // NEW 기준 (startDate가 오늘과 동일)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);

  const isNew = start.getTime() >= today.getTime();

  return (
    <div
      onClick={onClick}
      className="
        w-full bg-white rounded-3xl border border-[#F3F3F5]
        p-4 mb-4 cursor-pointer
      "
    >
      {/* TOP: Title + Arrow */}
      <div className="flex-1 items-start justify-between mb-2">
        <div className="flex gap-1 mb-1">
          {isHot && <HotBadge />}
          {isNew && <NewBadge />}
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[18px] font-semibold text-neutral-900">{title}</p>
            <RightArrow className="w-4 h-4 " />
          </div>

          {/* date */}
          <div className="flex items-center gap-1 text-[13px] text-[#A0A2A7]">
            <CalendarIcon className="w-4 h-4" />
            <span>
              {startDate} ~ {endDate}
            </span>
          </div>
        </div>
      </div>

      {/* IMAGE */}
      <div className="w-full h-40 rounded-3xl overflow-hidden mb-3">
        <img src={image} className="w-full h-full object-cover" />
      </div>

      {/* CONTENT (말줄임 2줄) */}
      <p className="text-[14px] leading-relaxed text-neutral-600 line-clamp-2">{content}</p>
    </div>
  );
};

export const HotBadge = () => {
  return (
    <div
      className="
        inline-flex rounded-[9px] p-px
        bg-[linear-gradient(to_right,#5EBEF8,#FFA873)]
        mb-1
      "
    >
      <div
        className="
          px-2 py-1 rounded-md
          bg-white 
          text-[10px] leading-[140%] font-normal 
          text-[#5EBEF8] 
        "
      >
        HOT
      </div>
    </div>
  );
};

export const NewBadge = () => {
  return (
    <div
      className="
        inline-flex rounded-[9px] p-px
        bg-[linear-gradient(to_right,#5EBEF8,#FFA873)]
        mb-1
      "
    >
      <div
        className="
          px-2 py-1 rounded-md
          bg-white 
          text-[10px] leading-[140%] font-normal 
          text-[#5EBEF8] 
        "
      >
        HOT
      </div>
    </div>
  );
};
