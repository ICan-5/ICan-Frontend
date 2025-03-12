'use client';

import { usePathname } from 'next/navigation';
import cn from '@/utils/cn';

/**
 * 캘린더 페이지는 layout 다르게 표시하기 위해 사용
 */
export default function MemberPageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isCalendarPage = pathname.startsWith('/todoCalendar');

  return (
    <div
      className={cn('ml-16 flex-1 overflow-y-auto overscroll-contain md:ml-0', {
        'max-h-[calc(100vh-160px)] md:max-h-[calc(100vh-230px)]':
          isCalendarPage,
      })}
    >
      <div
        className={cn(
          'relative left-1/2 flex w-full max-w-screen-xl -translate-x-1/2 flex-col gap-4 overflow-auto p-4 md:gap-8 md:p-10',
          {
            'md:h-screen md:max-h-[1000px]': !isCalendarPage,
          },
        )}
      >
        {children}
      </div>
    </div>
  );
}
