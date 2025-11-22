import { createContext, useContext, useState } from 'react';

interface DateContextType {
  startDate: string;
  endDate: string;
  setStartDate: (d: string) => void;
  setEndDate: (d: string) => void;
}

const DateContext = createContext<DateContextType | null>(null);

export const DateProvider = ({ children }: { children: React.ReactNode }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <DateContext.Provider value={{ startDate, endDate, setStartDate, setEndDate }}>
      {children}
    </DateContext.Provider>
  );
};

export const useDate = () => {
  const ctx = useContext(DateContext);
  if (!ctx) throw new Error('useDateStore must be used inside <DateProvider>');
  return ctx;
};
