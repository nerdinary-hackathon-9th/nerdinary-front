import { useState } from 'react';
import SearchIcon from '@/assets/search.svg?react';
import DownArrowIcon from '@/assets/downArrow.svg?react';

interface SearchFilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  filterValue: string;
  onFilterChange: (value: string) => void;
}

const SearchFilterBar = ({
  searchValue,
  onSearchChange,
  filterValue,
  onFilterChange,
}: SearchFilterBarProps) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);
  const selectItem = (value: string) => {
    onFilterChange(value);
    setOpen(false);
  };

  return (
    <div className="w-full flex items-center gap-4 py-3 ">
      {/* 검색 창 */}
      <div className="flex-1 relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 ">
          <SearchIcon className="w-5 h-5" />
        </div>
        <input
          type="text"
          placeholder="검색어를 입력해 주세요"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-10 py-2 pl-10 pr-3 bg-sihang-primary-10 text-sm placeholder:text-sihang-neutral-400 rounded-full shadow-md focus:outline-none"
        />
        {/* 메뉴 아이콘 */}
        <button className="absolute top-1.5 right-2 w-6 rounded-full bg-black text-white">
          별
        </button>
      </div>

      {/* 필터 드롭다운 */}
      <div className="relative">
        <button
          onClick={toggle}
          className="
            flex items-center gap-1 py-2 px-3
            text-xs text-neutral-600 rounded-lg bg-white
          "
        >
          {filterValue === 'new' ? '최신순' : '인기순'}
          <DownArrowIcon className="w-4 h-4" />
        </button>

        {open && (
          <div
            className="
              absolute right-0 mt-2 w-28 bg-white 
              rounded-xl shadow-lg border p-1
              flex flex-col z-50
            "
          >
            {/* 최신순 */}
            <button
              onClick={() => selectItem('new')}
              className="
                flex items-center justify-between
                w-full px-3 py-2 text-xs rounded-lg hover:bg-gray-100
              "
            >
              <span>최신순</span>
              {filterValue === 'new' && (
                <span className="text-blue-500 font-semibold text-[10px]">✔</span>
              )}
            </button>

            {/* 인기순 */}
            <button
              onClick={() => selectItem('popular')}
              className="
                flex items-center justify-between
                w-full px-3 py-2 text-xs rounded-lg hover:bg-gray-100
              "
            >
              <span>인기순</span>
              {filterValue === 'popular' && (
                <span className="text-blue-500 font-semibold text-[10px]">✔</span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilterBar;
