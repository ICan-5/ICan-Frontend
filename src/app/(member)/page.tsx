import { Suspense } from 'react';
import TodayProgress from '@/components/dashboard/todayProgress/TodayProgress';
import TodayList from '@/components/dashboard/todayList/TodayList';
import TodayProgressSkeleton from '@/components/dashboard/todayProgress/TodayProgressSkeleton';
import TodayListSkeleton from '@/components/dashboard/todayList/TodayListSkeleton';

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <section className="flex flex-col gap-4 overflow-hidden md:flex-row md:gap-8">
        <Suspense fallback={<TodayListSkeleton />}>
          <TodayList />
        </Suspense>
        <Suspense fallback={<TodayProgressSkeleton />}>
          <TodayProgress />
        </Suspense>
      </section>
      <section className="flex flex-col" />
      <section className="flex" />
    </div>
  );
}
