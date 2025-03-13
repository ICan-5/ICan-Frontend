import Link from 'next/link';
import cn from '@/utils/cn';
import { GOAL_BG_COLORS } from '@/constants/goalColors';
import { Goal } from '@/types/goals';

type Props = {
  goal: Goal;
  isSelected: boolean;
};

export default function NavGoalItem({ goal, isSelected }: Props) {
  // TODO :: 나중에 목표 색 정해지면 수정
  return (
    <Link
      href={`/goals/${goal.goalId}`}
      className={cn(
        'flex flex-none cursor-pointer items-center gap-4 overflow-hidden rounded-md p-2',
        'text-gray-400 hover:bg-gs50',
        {
          'bg-gs50 text-gray-600': isSelected,
        },
      )}
    >
      <span
        className={`ml-2 size-2 flex-none rounded-md ${GOAL_BG_COLORS[goal.color]}`}
      />
      <span className="text-overflow h-4 text-12R 2xl:h-5 2xl:text-14R">
        {goal.title}
      </span>
    </Link>
  );
}
