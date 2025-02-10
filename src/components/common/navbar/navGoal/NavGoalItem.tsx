import Link from 'next/link';
import cn from '@/utils/cn';

type Props = {
  id: number;
  title: string;
};

export default function NavGoalItem({ id, title }: Props) {
  return (
    <li
      className={cn(
        'flex flex-none cursor-pointer items-center gap-5 rounded-md py-1 pl-3 text-xs text-gray-400',
        'hover:bg-gray-100',
      )}
    >
      <span>•</span>
      <Link href={`/goals/${id}`} className={cn('text-overflow p-1')}>
        {title}
      </Link>
    </li>
  );
}
