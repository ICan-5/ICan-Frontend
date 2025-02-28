import { Suspense } from 'react';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import TodayProgress from '@/components/dashboard/todayProgress/TodayProgress';
import TodayList from '@/components/dashboard/todayList/TodayList';
import TodayProgressSkeleton from '@/components/dashboard/todayProgress/TodayProgressSkeleton';
import TodayProgressError from '@/components/dashboard/todayProgress/TodayProgressError';
import GoalList from '@/components/dashboard/goalList/GoalList';

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <section className="flex flex-col gap-4 overflow-hidden md:flex-row md:gap-8">
        <TodayList />
        <ErrorBoundary errorComponent={TodayProgressError}>
          <Suspense fallback={<TodayProgressSkeleton />}>
            <TodayProgress />
          </Suspense>
        </ErrorBoundary>
      </section>
      <section className="flex flex-col">
        <p className="text-16SB 2xl:text-18SB">목표별 할일</p>
        <GoalList />
      </section>
      <section className="flex gap-8" />
    </div>
  );
}
