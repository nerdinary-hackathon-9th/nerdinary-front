// DateSheet.tsx
import * as Dialog from '@radix-ui/react-dialog';
import { Calendar } from '@/components/ui/calendar';

interface DateSheetProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSelectDate: (date: string) => void;
}

const formatDate = (d: Date) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export function CalendarBottomSheet({ open, onOpenChange, onSelectDate }: DateSheetProps) {
  return (
    <div className="px-5 pt-4">
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40" />
          <Dialog.Content className="fixed bottom-0 left-0 w-full rounded-t-xl bg-white shadow-xl h-113">
            <Dialog.Title className="font-semibold text-lg mb-4"></Dialog.Title>

            <Calendar
              mode="single"
              onSelect={(day) => {
                if (!day) return;
                onSelectDate(formatDate(day));
                onOpenChange(false);
              }}
              className="rounded-md"
            />

            <div className="h-6" />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
