import { useState } from 'react';

interface ChallengeDetailLayoutProps {
  title: string;
  dateRange: string;
  participants: number;
  description: string;
  images?: string[];
  onParticipate?: () => void;
}

export default function ChallengeDetailLayout({
  title,
  dateRange,
  participants,
  description,
  images = [],
  onParticipate,
}: ChallengeDetailLayoutProps) {
  const [progress, setProgress] = useState(0);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="h-14 flex items-center px-4 bg-gray-100 font-semibold text-lg">
        <button onClick={() => window.history.back()} className="mr-2">
          ←
        </button>
        {title}
      </header>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto bg-gray-100">
        {/* Top Image Banner */}
        <div className="w-full h-48 bg-gray-300"></div>

        {/* Info Section */}
        <div className="p-5 text-center space-y-2">
          <h2 className="font-bold text-xl">{title}</h2>
          <p className="text-sm text-gray-500">
            {dateRange} · {participants}명 참여중
          </p>

          <p className="mt-2 text-gray-700 whitespace-pre-line">{description}</p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-3 gap-2 p-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-full aspect-square bg-white border rounded-md"></div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="p-4 bg-gray-200 flex items-center gap-3">
        <button
          className="bg-black text-white rounded-full px-5 py-3 text-sm"
          onClick={onParticipate}
        >
          참여하기
        </button>

        {/* Slide to participate button */}
        <div
          className="relative flex-1 h-12 bg-white rounded-full overflow-hidden select-none"
          onMouseUp={() => {
            if (progress > 80 && onParticipate) onParticipate();
          }}
        >
          {/* Track Background */}
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm pointer-events-none">
            {progress > 80 ? 'Release to Confirm' : '→ 슬라이드하여 참여하기'}
          </div>

          {/* Slider Handle */}
          <div
            className="absolute top-1 left-1 h-10 w-10 rounded-full bg-black text-white flex items-center justify-center cursor-pointer touch-none"
            style={{
              transform: `translateX(${progress}px)`,
              transition: progress > 80 ? '0.2s' : 'none',
            }}
            onPointerDown={(e) => {
              const startX = e.clientX;
              const track = e.currentTarget.parentElement!;
              const handle = e.currentTarget;
              const max = track.offsetWidth - handle.offsetWidth;

              const handleMove = (moveEvent: PointerEvent) => {
                const deltaX = moveEvent.clientX - startX;
                const newValue = Math.min(Math.max(deltaX, 0), max);

                setProgress(() => newValue);
              };

              const handleUp = () => {
                document.removeEventListener('pointermove', handleMove);
                document.removeEventListener('pointerup', handleUp);

                if (progress >= max * 0.8 && onParticipate) {
                  if (navigator.vibrate) navigator.vibrate(20);
                  onParticipate();
                }

                setProgress(0);
              };

              document.addEventListener('pointermove', handleMove);
              document.addEventListener('pointerup', handleUp);
            }}
          >
            ⇢
          </div>
        </div>
      </div>
    </div>
  );
}
