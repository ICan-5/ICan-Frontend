import { Suspense } from 'react';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import TodayProgress from '@/components/dashboard/todayProgress/TodayProgress';
import TodayList from '@/components/dashboard/todayList/TodayList';
import TodayProgressSkeleton from '@/components/dashboard/todayProgress/TodayProgressSkeleton';
import TodayProgressError from '@/components/dashboard/todayProgress/TodayProgressError';
import GoalList from '@/components/dashboard/goalList/GoalList';
import TodoGrass from '@/components/dashboard/todoGrass/TodoGrass';
import { getTodayProgress, getTodoGrass } from '@/services/dashboard';

export default async function Page() {
  const { total, completed } = await getTodayProgress();
  const progress = Math.floor((completed / total) * 100) / 100 || 0;
  const grassData = await getTodoGrass();

  return (
    <div className="flex flex-col gap-4">
      <section className="flex flex-col gap-4 overflow-hidden md:flex-row md:gap-8">
        <TodayList />
        <ErrorBoundary errorComponent={TodayProgressError}>
          <Suspense fallback={<TodayProgressSkeleton />}>
            <TodayProgress progressData={progress} />
          </Suspense>
        </ErrorBoundary>
      </section>
      <section className="flex flex-col">
        <p className="mb-3 text-16SB 2xl:text-18SB">목표별 할일</p>
        <GoalList />
      </section>
      <section className="flex flex-col">
        <div className="relative flex flex-col gap-4 rounded-2xl bg-gs00 px-6 py-4 2xl:gap-5 2xl:rounded-3xl">
          <p className="text-16SB text-gsBk 2xl:text-18SB">올해 달성률</p>
          <TodoGrass grassData={grassData} />
        </div>
      </section>
    </div>
  );
}
