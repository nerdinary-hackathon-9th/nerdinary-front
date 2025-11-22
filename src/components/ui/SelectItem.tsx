interface SelectItemProps {
  label: string;
}

const SelectItem = ({ label }: SelectItemProps) => {
  return (
    <div className="w-full h-8 px-2 py-2.5 text-sm font-normal text-sihang-neutral-900">
      {label}
    </div>
  );
};

export default SelectItem;
