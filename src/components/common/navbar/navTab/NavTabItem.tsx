'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import cn from '@/utils/cn';

type Props = {
  icon: IconProp;
  path: string;
  title: string;
};

export default function NavTabItem({ icon, path, title }: Props) {
  const pathname = usePathname();

  return (
    <Link
      href={path}
      className={cn(
        'flex flex-shrink-0 items-center gap-3 overflow-hidden whitespace-nowrap rounded-md p-2 text-gray-400',
        'hover:bg-gray-100',
        { 'bg-[#E6EFFC] text-[#0052CC] hover:bg-[#E6EFFC]': pathname === path },
      )}
    >
      <div className={cn('flex items-center justify-center')}>
        <FontAwesomeIcon className={cn('h-4 w-4')} icon={icon} size="sm" />
      </div>
      <p className={cn('text-m font-medium')}>{title}</p>
    </Link>
  );
}
