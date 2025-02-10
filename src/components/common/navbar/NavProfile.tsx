import Image from 'next/image';
import cn from '@/utils/cn';

export default function NavProfile() {
  const data = {
    image: '',
    name: 'Jack Martine',
    email: 'sdfweffwefw@gmail.com',
  };

  return (
    <div className={cn('flex h-16 w-full items-center gap-3 overflow-hidden')}>
      <Image
        className={cn('h-8 w-8')}
        src={data.image || '/images/profile.png'}
        width="36"
        height="36"
        alt="profileImage"
        priority
      />
      <div className={cn('flex w-full flex-col overflow-hidden')}>
        <span
          className={cn(
            'text-m w-full font-semibold',
            'overflow-hidden text-ellipsis whitespace-nowrap break-words',
          )}
        >
          {data.name}
        </span>
        <span
          className={cn(
            'w-full text-sm',
            'overflow-hidden text-ellipsis whitespace-nowrap break-words',
          )}
        >
          {`${data.email}`}
        </span>
      </div>
    </div>
  );
}
