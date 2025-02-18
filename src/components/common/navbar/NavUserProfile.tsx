import Image from 'next/image';

export default function NavUserProfile() {
  // TODO:: API연결 되면 밑 데이터 삭제
  // 프로필 데이터 받아오기
  const data = {
    image: '',
    name: 'Jack Martine',
    email: 'sdfweffwefw@gmail.com',
  };

  return (
    <div className="my-6 flex h-16 w-full flex-none items-center gap-3 2xl:my-8">
      <Image
        className="h-12 w-12 2xl:h-16 2xl:w-16"
        src={data.image || '/images/profile.png'}
        width="64"
        height="64"
        alt="profileImage"
        priority
      />
      <div className="flex w-full flex-col gap-1 overflow-hidden">
        <span className="text-overflow w-full text-14SB font-semibold text-gsBk">
          {data.name}
        </span>
        <span className="text-overflow w-full text-12M text-gs400">
          {data.email}
        </span>
      </div>
    </div>
  );
}
