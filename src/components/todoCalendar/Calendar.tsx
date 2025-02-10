'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { DayCellContentArg } from '@fullcalendar/core';
import '@/styles/calendar.css';
import { useState, useRef } from 'react';

const events = [
  {
    title: 'Mitchell Admin',
    date: '2025-02-03',
    backgroundColor: 'bg-red-500',
  },
  { title: 'Modern space', date: '2025-02-05', backgroundColor: 'bg-blue-500' },
  { title: 'space', date: '2025-02-05', backgroundColor: 'bg-green-500' },
  { title: '8 Chairs', date: '2025-02-08', backgroundColor: 'bg-green-500' },
  {
    title: 'Quote for 12 Tab',
    date: '2025-02-15',
    backgroundColor: 'bg-purple-500',
  },
  {
    title: '5 VP Chairs',
    date: '2025-02-15',
    backgroundColor: 'bg-yellow-500',
  },
  { title: 'Ready Mat', date: '2025-02-18', backgroundColor: 'bg-indigo-500' },
  { title: 'Obq Interior', date: '2025-02-25', backgroundColor: 'bg-red-500' },
];

const renderDayCellContent = (info: DayCellContentArg, selectedDate: Date) => {
  const isSelectedDate =
    selectedDate.toDateString() === info.date.toDateString();
  const dateText = info.date.getDate().toString();

  return (
    <div className="flex h-full items-center justify-center">
      {isSelectedDate ? (
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-white">
          {dateText}
        </span>
      ) : (
        <span>{dateText}</span>
      )}
    </div>
  );
};

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMonth, setViewMonth] = useState<Date>(new Date());
  const calendarRef = useRef<FullCalendar>(null);

  const updateCurrentView = () => {
    const calendarApi = calendarRef.current?.getApi();
    const currentDate = calendarApi?.getDate();
    if (currentDate) setViewMonth(currentDate);
  };

  const clickTodayHandler = () => {
    const today = new Date();
    setSelectedDate(today);
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.today();
    updateCurrentView();
  };

  const clickPrevMonthHandler = () => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.prev();
    updateCurrentView();
  };

  const clickNextMonthHandler = () => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.next();
    updateCurrentView();
  };

  const clickDateHandler = (info: { date: Date }) => {
    setSelectedDate(new Date(info.date));
  };

  const clickTodoHandler = (info: { event: { title: string } }) => {
    console.log(info);
    window.alert(info.event.title);
  };
  return (
    <div className="flex flex-col items-center">
      {/* custom header */}
      <div className="mb-4 flex w-full max-w-lg items-center justify-between">
        <button
          type="button"
          onClick={clickTodayHandler}
          className="bg-gray-200 p-4"
        >
          Today
        </button>
        <div className="flex items-center">
          <button
            type="button"
            onClick={clickPrevMonthHandler}
            className="mr-2 rounded-lg bg-gray-200 px-3 py-2 text-sm font-medium hover:bg-gray-300"
          >
            ←
          </button>
          <span className="text-lg font-semibold">
            {viewMonth.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
            })}
          </span>
          <button
            type="button"
            onClick={clickNextMonthHandler}
            className="ml-2 rounded-lg bg-gray-200 px-3 py-2 text-sm font-medium hover:bg-gray-300"
          >
            →
          </button>
        </div>
      </div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={events.map((event) => ({
          ...event,
          className: event.backgroundColor, // Tailwind 색상 클래스 추가
        }))}
        eventBorderColor="transparent"
        eventClick={clickTodoHandler}
        eventDisplay="block" // Display all events as blocks
        dateClick={clickDateHandler}
        locale="kr"
        headerToolbar={false}
        height="auto"
        dayCellContent={(info) => renderDayCellContent(info, selectedDate)}
      />
    </div>
  );
}
