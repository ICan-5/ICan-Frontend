import Image from 'next/image';
import { useSession } from 'next-auth/react';
import cn from '@/utils/cn';
import NonProfile from '../NonProfile';

type Props = {
  isFolded: boolean;
};

export default function NavUserProfile({ isFolded }: Props) {
  const { data, status } = useSession();

  return (
    <div className="my-6 flex h-16 w-full flex-none items-center gap-3 overflow-hidden 2xl:my-8">
      {status === 'authenticated' && data?.user?.image ? (
        <Image
          className={cn(
            'size-12 flex-none rounded-full object-cover transition-all duration-300 2xl:size-16',
            { 'ml-1 opacity-0 2xl:size-10': isFolded },
          )}
          src={data?.user?.image}
          width="64"
          height="64"
          alt="profileImage"
          priority
        />
      ) : (
        <NonProfile
          className={cn(
            'size-12 flex-none rounded-full transition-all duration-300 2xl:size-16',
            { 'ml-1 opacity-0 2xl:size-10': isFolded },
          )}
        />
      )}
      <div className="flex w-full flex-col gap-1 overflow-hidden">
        <span
          className={cn(
            'w-full overflow-hidden whitespace-nowrap break-words text-14SB font-semibold text-gsBk 2xl:text-16SB',
            { 'h-5 animate-pulse rounded-sm bg-gs100': status === 'loading' },
          )}
        >
          {data?.user?.name}
        </span>
        <span
          className={cn(
            'w-full overflow-hidden whitespace-nowrap break-words text-12M text-gs400 2xl:text-14M',
            {
              'h-4 animate-pulse rounded-sm bg-gs100': status === 'loading',
            },
          )}
        >
          {data?.user?.email}
        </span>
      </div>
    </div>
  );
}
