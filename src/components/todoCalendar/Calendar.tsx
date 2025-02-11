'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { DayCellContentArg } from '@fullcalendar/core';
import '@/styles/calendar.css';
import { useState, useRef, useCallback } from 'react';
import CalendarHeader from './CalendarHeader';

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

/**
 * 각 날짜 칸을 커스텀한 UI
 *
 * @param info 각 날짜 정보
 * @param selectedDate 선택된 날짜
 */
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

/**
 * 달력 컴포넌트
 */
export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const calendarRef = useRef<FullCalendar>(null);

  /**
   * 각 날짜 칸을 클릭을 처리하는 핸들러
   *
   * Todo: 해당 날짜의 할 일 보여주기
   */
  const handleDateClick = useCallback((info: { date: Date }) => {
    setSelectedDate(new Date(info.date));
  }, []);

  /**
   * 각 날짜 칸에 있는 할 일 클릭을 처리하는 핸들러
   */
  const handleTodoClick = useCallback((info: { event: { title: string } }) => {
    console.log(info);
    window.alert(info.event.title);
  }, []);

  return (
    <div className="flex flex-col items-center p-4">
      <CalendarHeader
        calendarRef={calendarRef}
        onDateChange={setSelectedDate}
      />
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
        eventClick={handleTodoClick}
        eventDisplay="block" // Display all events as blocks
        dateClick={handleDateClick}
        locale="kr"
        headerToolbar={false}
        height="auto"
        dayCellContent={(info) => renderDayCellContent(info, selectedDate)}
      />
    </div>
  );
}
