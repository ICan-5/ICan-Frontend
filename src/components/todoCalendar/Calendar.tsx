'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import '@/styles/calendar.css';
import { useState } from 'react';

const events = [
  { title: 'Mitchell Admin', date: '2025-02-03' },
  { title: 'Modern space', date: '2025-02-05' },
  { title: '8 Chairs', date: '2025-02-08' },
  { title: 'Quote for 12 Tab', date: '2025-02-15' },
  { title: '5 VP Chairs', date: '2025-02-15' },
  { title: 'Ready Mat', date: '2025-02-18' },
  { title: 'Obq Interior', date: '2025-02-25' },
];

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const clickDateHandler = (info: any) => {
    setSelectedDate(new Date(info.date));
  };

  const clickTodoHandler = (info: any) => {
    console.log(info);
    window.alert(info.event.title);
  };
  return (
    <div className="flex">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={clickTodoHandler}
        eventDisplay="block" // Display all events as blocks
        dateClick={clickDateHandler}
        locale="kr"
        headerToolbar={{
          left: 'today',
          center: 'prev title next',
          right: '',
        }}
        height="auto"
        dayCellContent={(info) => {
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
        }}
      />
    </div>
  );
}
