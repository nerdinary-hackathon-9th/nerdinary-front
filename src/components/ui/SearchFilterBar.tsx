import SearchIcon from '@/assets/search.svg?react';
import DownArrowIcon from '@/assets/downArrow.svg?react';
import LogoIcon from '@/assets/searchBarLogo.svg?react';

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
  return (
    <div className="w-5/6 flex items-center gap-1 py-3 ">
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
          className="w-full h-10 py-2 pl-10 pr-3 bg-sihang-primary-10 text-sm placeholder:text-sihang-neutral-400 rounded-full shadow-md focus:outline-none focus:border-sihang"
        />
        {/* 메뉴 아이콘 */}
        <LogoIcon className="absolute top-1.5 right-2" />
      </div>

      {/* 필터 드롭다운 */}
      <div className="relative">
        <select
          value={filterValue}
          onChange={(e) => onFilterChange(e.target.value)}
          className="py-2 px-3 pr-8 text-xs cursor-pointer appearance-none text-neutral-400"
        >
          <option value="new">최신순</option>
          <option value="popular">인기순</option>
        </select>
        <DownArrowIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" />
      </div>
    </div>
  );
};

export default SearchFilterBar;
