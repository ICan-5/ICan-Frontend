'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { DayCellContentArg } from '@fullcalendar/core';
import '@/styles/calendar.css';
import { useState, useRef } from 'react';

const todos = [
  {
    id: 1,
    title: '할일 1',
    date: '2025-02-03',
    goal: {
      id: 1,
      title: '강의 듣기',
      color: 'bg-red-500',
    },
  },
  {
    id: 2,
    title: '할일 2',
    date: '2025-02-10',
    goal: {
      id: 1,
      title: '강의 듣기',
      color: 'bg-red-500',
    },
  },
  {
    id: 3,
    title: '할일 3',
    date: '2025-02-07',
    goal: {
      id: 2,
      title: '목표 2',
      color: 'bg-indigo-500',
    },
  },
  {
    id: 4,
    title: '할일 4',
    date: '2025-02-20',
    goal: {
      id: 3,
      title: '목표 3',
      color: 'bg-yellow-500',
    },
  },
  {
    id: 5,
    title: '할일 5',
    date: '2025-02-17',
    goal: {
      id: 4,
      title: '목표 4',
      color: 'bg-green-500',
    },
  },
  {
    id: 6,
    title: '할일 6',
    date: '2025-02-25',
    goal: {
      id: 1,
      title: '강의 듣기',
      color: 'bg-red-500',
    },
  },
  {
    id: 7,
    title: '할일 7',
    date: '2025-02-10',
    goal: {
      id: 3,
      title: '목표 3',
      color: 'bg-yellow-500',
    },
  },
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
    <div className="flex flex-col items-center p-4">
      {/* custom header */}
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="w-1/4">
          <button
            type="button"
            onClick={clickTodayHandler}
            className="rounded-lg bg-gray-200 p-4"
          >
            Today
          </button>
        </div>
        <div className="flex w-1/2 flex-grow-0 items-center justify-center">
          <button
            type="button"
            onClick={clickPrevMonthHandler}
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
            onClick={clickNextMonthHandler}
            className="ml-2 rounded-lg bg-gray-200 px-3 py-2 text-sm font-medium hover:bg-gray-300"
          >
            →
          </button>
        </div>
        <div className="w-1/4" />
      </div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={todos.map((event) => ({
          ...event,
          id: event.id.toString(),
          className: event.goal.color,
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
