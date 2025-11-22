import { type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

import Logo from '@/assets/react.svg?react';
import BackButton from '@/assets/backArrow.svg?react';
import CloseButton from '@/assets/closeButton.svg?react';

interface InnerHeaderProps {
  left?: ReactNode;
  right?: ReactNode;
  className?: string;
}

type HeaderVariant = 'logo' | 'back' | 'back-text' | 'text-close';

interface HeaderProps {
  variant: HeaderVariant;
  title?: string;
}

export const HeaderInner = ({ left, right, className }: InnerHeaderProps) => {
  return (
    <header className={cn('flex items-center justify-between h-12 px-4 border-none', className)}>
      <div className="flex-1 ml-3">{left}</div>
      <div className="flex-1 flex justify-end mr-2">{right}</div>
    </header>
  );
};

export const Header = ({ variant, title }: HeaderProps) => {
  const navigate = useNavigate();

  switch (variant) {
    // 로고만 있는 헤더
    case 'logo':
      return <HeaderInner left={<Logo />} />;

    // 백버튼만 있는 헤더
    case 'back':
      return <HeaderInner left={<BackButton onClick={() => navigate(-1)} />} />;

    // 백버튼과 텍스트
    case 'back-text':
      return (
        <HeaderInner
          left={
            <div className="flex items-center gap-4">
              <BackButton onClick={() => navigate(-1)} />
              <span className="heading-20 text-black">{title}</span>
            </div>
          }
        />
      );

    // 텍스트와 X 버튼
    case 'text-close':
      return (
        <HeaderInner
          left={<span className="heading-20 text-black">{title}</span>}
          right={<CloseButton onClick={() => navigate(-1)} />}
        />
      );
  }
};
