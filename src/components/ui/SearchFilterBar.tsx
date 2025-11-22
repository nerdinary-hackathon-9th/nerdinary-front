const SearchFilterBar = () => {
  return (
    <div className="w-5/6 flex gap-4 py-3">
      <input type="text" placeholder="검색창" className="flex-1 bg-muted py-2 px-3 rounded-md" />
      <div className="relative">
        <select className="bg-muted py-3 px-3 pr-8 rounded-md text-sm cursor-pointer outline-none appearance-none w-28">
          <option value="" disabled>
            필터
          </option>
          <option value="latest">최신순</option>
          <option value="popular">인기순</option>
        </select>

        {/* Custom 화살표 */}
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs pointer-events-none">
          ▼
        </span>
      </div>
    </div>
  );
};

export default SearchFilterBar;
