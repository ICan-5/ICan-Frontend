'use client';

import { getCachedDates, grassMonth, grassWeekDay } from '@/utils/date';
import TodoGrassCell from './TodoGrassCell';
import cn from '@/utils/cn';
import { Grass } from '@/types/dashboard';
import { useGrass } from '@/hooks/useDashboard';

interface Props {
  grassData: Grass[];
}

export default function TodoGrass({ grassData }: Props) {
  // 날짜 배열 생성 (올해 날짜만 포함)
  const dates = getCachedDates();
  const { data } = useGrass(grassData);
  data.forEach((date) => {
    dates[date.date] = date.donePercent;
  });

  // 1월 ~ 3월 : 8개 * 19 = 152, 8 * 20
  // 3월 ~ 6개월 : 12개 * 19 = 228

  return (
    <div className="mx-auto flex max-w-full gap-2 overflow-x-auto">
      <p className="mt-11 flex flex-col gap-[19px] text-14M text-gs600 2xl:gap-5">
        {grassWeekDay.map((weekDay) => (
          <span key={weekDay}>{weekDay}</span>
        ))}
      </p>
      <div className="flex flex-col gap-2">
        <p className="flex whitespace-nowrap text-14M text-gs600">
          {grassMonth.map((month, index) => (
            <span
              className={cn({
                'ml-[152px] 2xl:ml-40': index === 1,
                'ml-[228px] 2xl:ml-60': index > 1,
              })}
              key={month}
            >
              {month}
            </span>
          ))}
        </p>
        <ul className="grid grid-flow-col grid-cols-[repeat(53,16px)] grid-rows-7 gap-[3px] 2xl:gap-1">
          {Object.entries(dates).map(([date, donePercent]) => (
            <TodoGrassCell key={date} date={date} progress={donePercent} />
          ))}
        </ul>
      </div>
    </div>
  );
}
