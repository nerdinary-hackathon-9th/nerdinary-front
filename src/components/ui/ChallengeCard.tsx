import CalendarIcon from '@/assets/calendar.svg?react';
import PeopleIcon from '@/assets/people.svg?react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

// TODO : 실제 DTO에 따라 변경 해야 함!
interface ChallengeCardProps {
  title: string;
  imgSrc: string;
  startDate: string;
  endDate: string;
  participant: number;
  tags?: string[];
  challengeId: number;
}

const ChallengeCard = ({
  title,
  imgSrc,
  startDate,
  endDate,
  participant = 0,
  tags = [],
  challengeId = 0,
}: ChallengeCardProps) => {
  const navigate = useNavigate();

  const conditionalTags: string[] = [];

  if (participant >= 100) {
    conditionalTags.push('HOT');
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);

  if (start.getTime() >= today.getTime()) {
    conditionalTags.push('NEW');
  }

  const allTags = [...conditionalTags, ...tags];

  const handleClick = () => {
    navigate(`/challenge-detail/${challengeId}`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full flex p-4 gap-4 shadow-xs rounded-[12px] border transition-all duration-200 ease-out cursor-pointer hover:scale-105 active:scale-[1.05]"
    >
      <div>
        <div
          className={clsx('w-24 h-24 object-cover rounded-md', imgSrc || 'bg-sihang-neutral-100')}
        >
          <img src={imgSrc} />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        {allTags.length > 0 && (
          <div className="flex flex-wrap">
            {allTags.map((tag) => (
              <span
                key={tag}
                className="relative p-px rounded-lg bg-linear-to-r from-sihang-primary-400 to-sihang-secondary-500"
              >
                <span className="flex items-center justify-center w-10 h-5.5 text-[10px] font-normal text-sihang-primary-400 bg-white rounded-md">
                  {tag}
                </span>
              </span>
            ))}
          </div>
        )}
        <div className="pl-0.5 flex flex-col gap-2">
          <span className="text-sm font-medium">{title}</span>
          <div className="flex flex-col gap-0.5 text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              <span>
                {startDate} ~ {endDate}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <PeopleIcon className="w-4 h-4" />
              <span>{participant} 명</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
