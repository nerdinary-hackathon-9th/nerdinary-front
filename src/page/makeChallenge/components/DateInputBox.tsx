import { cn } from '@/lib/utils';
import CalendarIcon from '@/assets/smallCalendarIcon.svg?react';

export const DateInputBox = ({
  label,
  value,
  placeholder,
  onClick,
}: {
  label: string;
  value: string;
  placeholder: string;
  onClick: () => void;
}) => {
  const isSelected = Boolean(value);

  return (
    <div className="w-full flex-1">
      <span className="label-14 text-sihang-neutral-600">{label}</span>

      <div
        className={cn(
          'mt-2 flex flex-row items-center gap-2 px-3.5 py-3.5 rounded-2xl cursor-pointer transition-all',
          isSelected
            ? 'bg-[#EEEEEF] text-[#B4B5B9]'
            : 'border border-[#EEEEEF] text-white bg-white',
        )}
        onClick={onClick}
      >
        <CalendarIcon className="w-5 h-5" />

        <span className={cn('label-14', isSelected ? 'text-[#B4B5B9]' : 'text-white')}>
          {isSelected ? value.replace(/-/g, '.') : placeholder}
        </span>
      </div>
    </div>
  );
};
