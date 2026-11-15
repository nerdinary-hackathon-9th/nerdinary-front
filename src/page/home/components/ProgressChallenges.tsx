import RefreshIcon from '@/assets/refreshIcon.svg?react';

interface ProgressChallengeItem {
  id: number;
  title: string;
  context: string;
  thumbnailUrl: string;
  createdAt: string;
  endAt: string;
  _count: {
    participants: number;
  };
}

interface ProgressChallengesProps {
  items: ProgressChallengeItem[];
  onClickItem?: (id: number) => void;
  onRefresh?: () => void;
}

export const ProgressChallenges = ({ items, onClickItem, onRefresh }: ProgressChallengesProps) => {
  return (
    <div className="w-full px-5 mt-6 pb-20">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="heading-18">진행 중인 낭낭</h2>
        <button onClick={onRefresh} className="active:rotate-180 transition-transform duration-300">
          <RefreshIcon />
        </button>
      </div>

      {/* 2열 그리드 */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-8">
        {items.map((item) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const createdAt = new Date(item.createdAt);
          createdAt.setHours(0, 0, 0, 0);
          const isNew = createdAt.getTime() >= today.getTime();

          return (
            <div key={item.id} onClick={() => onClickItem?.(item.id)} className="cursor-pointer">
              {/* 이미지 영역 */}
              <div className="relative w-full h-32 rounded-[8px] overflow-hidden">
                <img src={item.thumbnailUrl} className="w-full h-full object-cover" alt={item.title} />

                {isNew && (
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
                )}
              </div>

              {/* 제목 */}
              <p className="mt-3 text-[16px] font-semibold text-neutral-900 leading-tight line-clamp-2">
                {item.title}
              </p>

              {/* 날짜 */}
              <div className="flex items-center gap-1 mt-1 label-12 text-[#A0A2A7]">
                <span>
                  {item.createdAt.slice(0, 10).replace(/-/g, '.')} ~ {item.endAt ? item.endAt.slice(0, 10).replace(/-/g, '.') : '미정'}
                </span>
              </div>

              {/* 참여자 */}
              <div className="flex items-center gap-1 label-12 text-[#A0A2A7]">
                <span>{item._count.participants}명 참여 중</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
