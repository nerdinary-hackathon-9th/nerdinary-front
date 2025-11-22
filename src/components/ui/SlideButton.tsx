import { useRef, useState } from 'react';

import SlideArrowIcon from '@/assets/slideArrow.svg?react';

interface SlideButtonProps {
  text?: string;
  onComplete?: () => void;
}

const SlideButton = ({ text = '청춘을 낭비하러 출발', onComplete }: SlideButtonProps) => {
  const completedRef = useRef(false);

  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [progressStage, setProgressStage] = useState(0); // 0: 초기, 1: 20%, 2: 50%, 3: 70%
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const handleDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (completed) return;

    setIsDragging(true);
    const startX = e.clientX;

    const handleMove = (ev: PointerEvent) => {
      if (!sliderRef.current) return;
      const handleWidth = sliderRef.current.querySelector('.handle')?.clientWidth ?? 52;
      const max = sliderRef.current.clientWidth - handleWidth - 8;

      let next = ev.clientX - startX;

      if (next < 0) next = 0;

      const progressPercent = (next / max) * 100;
      if (progressPercent >= 70) {
        setProgressStage(3);
      } else if (progressPercent >= 50) {
        setProgressStage(2);
      } else if (progressPercent >= 20) {
        setProgressStage(1);
      } else {
        setProgressStage(0);
      }

      if (next >= max) {
        next = max;
        setCompleted(true);
        completedRef.current = true;

        if (navigator.vibrate) navigator.vibrate(10);
      }

      setProgress(next);
    };

    const handleUp = () => {
      setIsDragging(false);

      if (completedRef.current) {
        onComplete?.();
      } else {
        setProgress(0);
        setProgressStage(0);
      }

      document.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerup', handleUp);
    };

    document.addEventListener('pointermove', handleMove);
    document.addEventListener('pointerup', handleUp);
  };

  return (
    <div
      ref={sliderRef}
      className={`relative h-14 rounded-[12px] flex items-center select-none shadow-sm transition-all duration-300 ease-out ${
        completed
          ? 'bg-sihang-primary-10'
          : progressStage === 3
            ? 'bg-sihang-primary-10'
            : progressStage === 2
              ? 'bg-sihang-primary-100'
              : progressStage === 1
                ? 'bg-sihang-primary-200'
                : 'bg-sihang-primary-400'
      }`}
    >
      {/* Text */}
      <span className="w-full text-base text-center font-semibold relative">
        <span
          className={`absolute inset-0 transition-opacity duration-300 ease-out ${
            progressStage >= 2 ? 'opacity-0' : 'opacity-100'
          } ${
            completed
              ? 'text-sihang-primary-400'
              : progressStage === 3
                ? 'text-sihang-primary-300'
                : progressStage === 2
                  ? 'text-sihang-primary-200'
                  : progressStage === 1
                    ? 'text-sihang-primary-10'
                    : 'text-white'
          }`}
        >
          {text}
        </span>
        <span
          className={`transition-opacity duration-300 ease-out ${
            progressStage >= 2 ? 'opacity-100' : 'opacity-0'
          } ${
            completed
              ? 'text-sihang-primary-400'
              : progressStage === 3
                ? 'text-sihang-primary-400'
                : progressStage === 2
                  ? 'text-sihang-primary-400'
                  : progressStage === 1
                    ? 'text-sihang-primary-400'
                    : 'text-white'
          }`}
        >
          청춘 낭비하러 출발
        </span>
      </span>

      {/* Slider Handle */}
      {!completed && (
        <div
          onPointerDown={handleDown}
          className={`handle absolute top-2 left-3 right-3 w-16 h-10 bg-white rounded-lg shadow flex items-center justify-center text-sihang-primary-400 font-bold text-lg cursor-pointer touch-none ${
            !isDragging ? 'transition-transform duration-300 ease-out' : ''
          }`}
          style={{ transform: `translateX(${progress}px)` }}
        >
          <SlideArrowIcon />
        </div>
      )}
    </div>
  );
};

export default SlideButton;
