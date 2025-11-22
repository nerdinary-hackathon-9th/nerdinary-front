import { useState } from 'react';

interface SegmentedToggleProps {
  leftLabel: string;
  rightLabel: string;
  onChange?: (value: 'left' | 'right') => void;
}

export const SegmentedToggle = ({ leftLabel, rightLabel, onChange }: SegmentedToggleProps) => {
  const [active, setActive] = useState<'left' | 'right'>('left');

  const handleToggle = (value: 'left' | 'right') => {
    setActive(value);
    onChange?.(value);
  };

  return (
    <div
      className="
        relative w-80 h-12
        bg-white border border-[#EEEEEF]
        rounded-[40px] p-1 flex items-center justify-between
      "
    >
      <div
        className={`
          absolute h-12 w-40 left-0
          rounded-[40px] bg-[#5EBEF8]
          transition-transform duration-300 ease-out
          ${active === 'left' ? 'translate-x-0' : 'translate-x-40'}
        `}
      />

      <button
        onClick={() => handleToggle('left')}
        className={`
          w-1/2 h-full flex items-center justify-center
          body-16 text-[16px] relative z-10
          transition-colors duration-200
          ${active === 'left' ? 'text-white' : 'text-[#9C9EA3]'}
        `}
      >
        {leftLabel}
      </button>

      <button
        onClick={() => handleToggle('right')}
        className={`
          w-1/2 h-full flex items-center justify-center
          font-medium text-[16px] relative z-10
          transition-colors duration-200
          ${active === 'right' ? 'text-white' : 'text-[#9C9EA3]'}
        `}
      >
        {rightLabel}
      </button>
    </div>
  );
};
