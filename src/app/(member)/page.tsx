import { Suspense } from 'react';
import TodayProgress from '@/components/dashboard/todayProgress/TodayProgress';
import TodayList from '@/components/dashboard/todayList/TodayList';
import TodayProgressSkeleton from '@/components/dashboard/todayProgress/TodayProgressSkeleton';
import TodayListSkeleton from '@/components/dashboard/todayList/TodayListSkeleton';

export default function Page() {
  return (
    <>
      <section className="flex min-h-48 flex-col gap-4 overflow-hidden md:h-1/3 md:flex-row md:gap-8">
        <Suspense fallback={<TodayListSkeleton />}>
          <TodayList />
        </Suspense>
        <Suspense fallback={<TodayProgressSkeleton />}>
          <TodayProgress />
        </Suspense>
      </section>
      <section className="flex h-1/3 gap-8" />
      <section className="flex h-1/3 gap-8" />
    </>
  );
}
