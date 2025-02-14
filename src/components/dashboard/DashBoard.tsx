'use client';

import { useState } from 'react';
import TodayGraph from './todayGraph/TodayGraph';
import TodayList from './todayList/TodayList';

type Props = {
  today: {
    id: number;
    title: string;
    date: string;
    done: boolean;
    note: boolean;
  }[];
};

export default function DashBoard({ today }: Props) {
  const [todayList, setTodayList] = useState(today);

  /**
   * @param id : 할일 id
   * checkbox 클릭 함수
   */
  const toggleTodayItem = (id: number) => {
    setTodayList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    );
  };

  return (
    <div className="relative left-1/2 flex max-h-[1000px] w-full max-w-6xl -translate-x-1/2 flex-col gap-4 p-4 md:h-screen md:gap-8 md:p-10">
      <section className="flex flex-col gap-4 overflow-hidden md:h-1/3 md:flex-row md:gap-8">
        <TodayList todayList={todayList} onToggleItem={toggleTodayItem} />
        <TodayGraph />
      </section>
      <section className="flex h-1/3 gap-8">
        <TodayGraph />
      </section>
      <section className="flex h-1/3 gap-8">
        <TodayGraph />
      </section>
    </div>
  );
}
