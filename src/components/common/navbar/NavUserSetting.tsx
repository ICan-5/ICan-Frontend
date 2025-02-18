import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons/faRightFromBracket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import cn from '@/utils/cn';

type Props = {
  isFolded: boolean;
};

export default function NavUserSetting({ isFolded }: Props) {
  return (
    <div className="flex flex-col items-start overflow-hidden rounded-2xl bg-gs50 px-1 text-gs500 2xl:px-2">
      <Link
        href="/setting"
        className={cn(
          'flex w-full items-center gap-1 overflow-hidden whitespace-nowrap rounded-lg py-2 text-gs600',
          'border-b border-gs200 2xl:gap-2 2xl:rounded-xl 2xl:py-3',
        )}
      >
        <div
          className={`flex h-7 w-7 items-center justify-center transition-all duration-300 ${isFolded && 'w-10 p-3 2xl:p-2'}`}
        >
          <FontAwesomeIcon className="h-4 w-4" icon={faGear} size="sm" />
        </div>
        <p className="text-14M font-medium 2xl:text-16M">설정</p>
      </Link>
      <button
        type="button"
        className={cn(
          'flex w-full items-center gap-1 overflow-hidden whitespace-nowrap rounded-lg py-2 text-gs600',
          '2xl:gap-2 2xl:rounded-xl 2xl:py-3',
        )}
      >
        <div
          className={`flex h-7 w-7 items-center justify-center transition-all duration-300 ${isFolded && 'w-10 p-3 2xl:p-2'}`}
        >
          <FontAwesomeIcon
            className="h-4 w-4"
            icon={faRightFromBracket}
            size="sm"
          />
        </div>
        <p className="text-14M font-medium 2xl:text-16M">로그아웃</p>
      </button>
    </div>
  );
}
