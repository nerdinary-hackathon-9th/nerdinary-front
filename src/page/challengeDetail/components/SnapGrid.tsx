import type { ReactNode } from 'react';

interface SnapGridProps {
  children: ReactNode;
  className?: string;
}

export const SnapGrid = ({ children, className }: SnapGridProps) => {
  return <div className={`grid grid-cols-3 gap-1 ${className ?? ''}`}>{children}</div>;
};
