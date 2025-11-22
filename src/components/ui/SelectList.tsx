import SelectItem from './SelectItem';

const selectListItem = ['최신순', '오래된 순', '참여자 많은 순', '참여자 적은 순'];

const SelectList = () => {
  return (
    <div className="w-32 h-fit rounded-xl">
      {selectListItem.map((item, idx) => (
        <SelectItem key={idx} label={item} />
      ))}
    </div>
  );
};

export default SelectList;
