'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { useGoals } from '@/hooks/useGoals';
import { Goal } from '@/types/goals';

interface Props {
  id: string;
}

export default function NoteHeader({ id }: Props) {
  const { data: goals, isLoading } = useGoals();

  const goalTitle = goals?.find(
    (goal: Goal) => goal.goalId === Number(id),
  )?.title;

  return (
    <h1 className="flex items-center gap-2 px-3 text-16R font-semibold">
      <FontAwesomeIcon icon={faFlag} className="text-slate500" />
      {isLoading ? '목표 로딩 중...' : goalTitle}
    </h1>
  );
}
