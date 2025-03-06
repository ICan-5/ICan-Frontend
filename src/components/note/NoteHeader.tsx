'use client';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { Goal } from '@/types/goals';
import { useGoals } from '@/hooks/useGoals';

interface Props {
  id: string;
}

export default function NoteHeader({ id }: Props) {
  const { data: goals, isLoading } = useGoals();

  const goalTitle = goals?.find(
    (goal: Goal) => goal.goalId === Number(id),
  )?.title;

  return (
    <h1 className="flex items-center gap-2 px-6 text-20M">
      <Link href={`/goals/${id}`}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </Link>
      {isLoading ? '목표 로딩 중...' : goalTitle}
    </h1>
  );
}
