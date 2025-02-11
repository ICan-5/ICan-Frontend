import FullCalendar from '@fullcalendar/react';
import { useState } from 'react';

export default function CalendarHeader({
  calendarRef,
  onDateChange,
}: {
  calendarRef: React.RefObject<FullCalendar>;
  onDateChange: (date: Date) => void;
}) {
  const [viewMonth, setViewMonth] = useState<Date>(new Date());

  const updateCurrentView = () => {
    const calendarApi = calendarRef.current?.getApi();
    const currentDate = calendarApi?.getDate() ?? new Date();
    setViewMonth(currentDate);
  };

  const handleTodayClick = () => {
    const today = new Date();
    onDateChange(today);
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.today();
    updateCurrentView();
  };

  const handlePrevMonthClick = () => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.prev();
    updateCurrentView();
  };

  const handleNextMonthClick = () => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.next();
    updateCurrentView();
  };

  return (
    <div className="mb-4 flex w-full items-center justify-between">
      <div className="w-1/4">
        <button
          type="button"
          onClick={handleTodayClick}
          className="rounded-lg bg-gray-200 p-4"
        >
          Today
        </button>
      </div>
      <div className="flex w-1/2 flex-grow-0 items-center justify-center">
        <button
          type="button"
          onClick={handlePrevMonthClick}
          className="mr-2 rounded-lg bg-gray-200 px-3 py-2 text-sm font-medium hover:bg-gray-300"
        >
          ←
        </button>
        <span className="inline-block min-w-32 flex-shrink-0 text-center text-lg font-semibold">
          {viewMonth.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
          })}
        </span>
        <button
          type="button"
          onClick={handleNextMonthClick}
          className="ml-2 rounded-lg bg-gray-200 px-3 py-2 text-sm font-medium hover:bg-gray-300"
        >
          →
        </button>
      </div>
      <div className="w-1/4" />
    </div>
  );
}
