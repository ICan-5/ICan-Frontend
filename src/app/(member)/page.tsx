import { Suspense } from 'react';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import TodayProgress from '@/components/dashboard/todayProgress/TodayProgress';
import TodayList from '@/components/dashboard/todayList/TodayList';
import TodayProgressSkeleton from '@/components/dashboard/todayProgress/TodayProgressSkeleton';
import TodayProgressError from '@/components/dashboard/todayProgress/TodayProgressError';
import GoalList from '@/components/dashboard/goalList/GoalList';
import TodoGrass from '@/components/dashboard/todoGrass/TodoGrass';
import { getTodayProgress, getTodoGrass } from '@/services/dashboard';

// 각 섹션을 별도의 컴포넌트로 분리
async function TodaySection() {
  const { total, completed } = await getTodayProgress();
  const progress = Math.floor((completed / total) * 100) / 100 || 0;
  return (
    <section className="flex flex-col gap-4 overflow-hidden md:flex-row md:gap-8">
      <TodayList />
      <ErrorBoundary errorComponent={TodayProgressError}>
        <Suspense fallback={<TodayProgressSkeleton />}>
          <TodayProgress progressData={progress} />
        </Suspense>
      </ErrorBoundary>
    </section>
  );
}

function GoalSection() {
  return (
    <section className="flex flex-col">
      <p className="mb-3 text-16SB text-gsBk 2xl:text-18SB">목표별 할일</p>
      <GoalList />
    </section>
  );
}

async function GrassSection() {
  const grassData = await getTodoGrass();
  return (
    <section className="flex flex-col">
      <div className="relative flex flex-col gap-4 rounded-2xl bg-gs00 px-6 py-4 2xl:gap-5 2xl:rounded-3xl">
        <p className="text-16SB text-gsBk 2xl:text-18SB">올해 달성률</p>
        <TodoGrass grassData={grassData} />
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <TodaySection />
      <GoalSection />
      <GrassSection />
    </div>
  );
}
