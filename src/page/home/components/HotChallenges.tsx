import PeopleIcon from '@/assets/people.svg?react';

interface HotChallengeItem {
  id: number;
  title: string;
  imgSrc: string;
  startDate: string;
  endDate: string;
  participant: number;
}

interface HotChallengesScrollProps {
  items: HotChallengeItem[];
  onClickItem?: (id: number) => void;
}

export const HotChallenges = ({ items, onClickItem }: HotChallengesScrollProps) => {
  return (
    <div className="w-full h-full mt-6 px-5">
      <h2 className="heading-18 mb-3">지금 핫한 낭낭</h2>

      {/* 가로 스크롤 컨테이너 */}
      <div className="flex gap-4 h-46.5 overflow-x-auto scrollbar-hide pb-2">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onClickItem?.(item.id)}
            className="w-35 h-41.5 flex-shrink-0 cursor-pointer"
          >
            {/* 이미지 */}
            <div className="relative w-35 h-25">
              <img
                src={item.imgSrc}
                className="w-35 h-25 object-cover rounded-[8px]"
                alt={item.title}
              />

              {/* HOT 뱃지 */}
              {item.participant >= 100 && (
                <div
                  className="
                      absolute top-0 left-0
                      inline-flex items-center justify-center
                      h-5.5 w-9
                      bg-[linear-gradient(to_right,#70CAFA,#FFA873)]
                      px-3 py-1 
                      rounded-tl-[8px] rounded-br-[8px]
                      text-white text-[10px] font-medium
                    "
                >
                  HOT
                </div>
              )}
            </div>

            {/* 제목 */}
            <p className="body-18 text-neutral-900 mt-3 line-clamp-1">{item.title}</p>

            {/* 날짜 */}
            <div className="flex items-center gap-1 label-12 text-[#A0A2A7] mt-1">
              <span>
                {item.startDate} ~ {item.endDate}
              </span>
            </div>

            {/* 참여자 */}
            <div className="flex items-center gap-1 label-12 text-[#A0A2A7] mt-1">
              <PeopleIcon className="w-4 h-4" />
              <span>{item.participant}명 참여 중</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
