import { useState } from 'react';
import SearchIcon from '@/assets/search.svg?react';
import LogoIcon from '@/assets/searchBarLogo.svg?react';
import SelectDropdown, { type SelectOption } from './SelectDropdown';

interface SearchFilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  filterValue: string;
  onFilterChange: (value: string) => void;
}

const filterOptions: SelectOption[] = [
  { value: 'new', label: '최신순' },
  { value: 'old', label: '오래된 순' },
  { value: 'most', label: '참여자 많은 순' },
  { value: 'least', label: '참여자 적은 순' },
];

const SearchFilterBar = ({
  searchValue,
  onSearchChange,
  filterValue,
  onFilterChange,
}: SearchFilterBarProps) => {
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
        <LogoIcon className="absolute top-1.5 right-2 " />
      </div>

      {/* 필터 드롭다운 */}
      <SelectDropdown value={filterValue} onChange={onFilterChange} options={filterOptions} />
    </div>
  );
};

export default SearchFilterBar;
