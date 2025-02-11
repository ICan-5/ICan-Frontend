import Link from 'next/link';
import cn from '@/utils/cn';

type Props = {
  id: number;
  title: string;
  isSelected: boolean;
};

export default function NavGoalItem({ id, title, isSelected }: Props) {
  return (
    <Link
      href={`/goals/${id}`}
      className={cn(
        'flex flex-none cursor-pointer items-center gap-5 overflow-hidden rounded-md px-3 py-2',
        'text-xs text-gray-400 hover:bg-gray-100',
        {
          'bg-gray-100 text-gray-600': isSelected,
        },
      )}
    >
      <span>•</span>
      <span className={cn('text-overflow')}>{title}</span>
    </Link>
  );
}
