import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import cn from '@/utils/cn';

type Props = {
  icon: IconProp;
  path: string;
  title: string;
  isSelected: boolean;
};

export default function NavTabItem({ icon, path, title, isSelected }: Props) {
  return (
    <Link
      href={path}
      className={cn(
        'flex flex-shrink-0 items-center gap-3 overflow-hidden whitespace-nowrap rounded-md px-2 py-3 text-gray-400',
        'hover:bg-gray-100',
        { 'bg-slate50 text-gsBk hover:bg-secondary': isSelected },
      )}
    >
      <div className="flex h-7 w-7 items-center justify-center">
        <FontAwesomeIcon className="h-4 w-4" icon={icon} size="sm" />
      </div>
      <p className="text-16M font-medium">{title}</p>
    </Link>
  );
}
