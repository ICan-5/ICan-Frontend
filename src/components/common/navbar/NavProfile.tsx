import Image from 'next/image';
import cn from '@/utils/cn';

export default function NavProfile() {
  // TODO:: API연결 되면 밑 데이터 삭제
  // 프로필 데이터 받아오기
  const data = {
    image: '',
    name: 'Jack Martine',
    email: 'sdfweffwefw@gmail.com',
  };

  return (
    <div className={cn('flex h-16 w-full flex-none items-center gap-3')}>
      <Image
        className={cn('h-8 w-8')}
        src={data.image || '/images/profile.png'}
        width="36"
        height="36"
        alt="profileImage"
        priority
      />
      <div className={cn('flex w-full flex-col overflow-hidden')}>
        <span className={cn('text-m text-overflow w-full font-semibold')}>
          {data.name}
        </span>
        <span className={cn('text-overflow w-full text-sm')}>{data.email}</span>
      </div>
    </div>
  );
}
