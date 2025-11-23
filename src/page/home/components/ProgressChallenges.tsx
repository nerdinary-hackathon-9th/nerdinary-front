import RefreshIcon from '@/assets/refreshIcon.svg?react';

interface ProgressChallengeItem {
  id: number;
  title: string;
  context: string;
  thumbnailUrl: string;
  createdAt: string;
  endAt: string;
  _count: {
    participant: number;
  };
}

interface ProgressChallengesProps {
  items: ProgressChallengeItem[];
  onClickItem?: (id: number) => void;
}

export const ProgressChallenges = ({ items, onClickItem }: ProgressChallengesProps) => {
  return (
    <div className="w-full px-5 mt-6 pb-20">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="heading-18">진행 중인 낭낭</h2>
        <RefreshIcon />
        {/* 새로고침 아이콘 같은 거 추가하고 싶으면 여기에 */}
        {/* <RefreshIcon /> */}
      </div>

      {/* 2열 그리드 */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-8">
        {items.map((item) => {
          return (
            <div key={item.id} onClick={() => onClickItem?.(item.id)} className="cursor-pointer">
              {/* 이미지 영역 */}
              <div className="relative w-full h-32 rounded-[8px] overflow-hidden">
                <img src={item.thumbnailUrl} className="w-full h-full object-cover" alt={item.title} />

                {/* NEW / HOT 태그 */}

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
                  NEW
                </div>
              </div>

              {/* 제목 */}
              <p className="mt-3 text-[16px] font-semibold text-neutral-900 leading-tight line-clamp-2">
                {item.title}
              </p>

              {/* 날짜 */}
              <div className="flex items-center gap-1 mt-1 label-12 text-[#A0A2A7]">
                <span>
                  {item.createdAt} ~ {item.endAt}
                </span>
              </div>

              {/* 참여자 */}
              <div className="flex items-center gap-1 label-12 text-[#A0A2A7]">
                <span>{item._count.participant}명 참여 중</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
