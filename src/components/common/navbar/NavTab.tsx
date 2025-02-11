'use client';

import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import { faCalendar } from '@fortawesome/free-regular-svg-icons/faCalendar';
import { usePathname } from 'next/navigation';
import cn from '@/utils/cn';
import NavTabItem from './NavTabItem';
import NavGoal from './navGoal/NavGoal';

const tabs = [
  { icon: faHouse, title: '대시보드', path: '/' },
  { icon: faCalendar, title: '캘린더', path: '/calendar' },
];

export default function NavTab() {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        'mt-2 flex w-full flex-1 flex-col gap-1 overflow-y-hidden border-t-[1px] py-2',
      )}
    >
      <section className={cn('flex flex-none flex-col gap-1')}>
        {tabs.map((tab) => (
          <NavTabItem
            icon={tab.icon}
            title={tab.title}
            path={tab.path}
            isSelected={pathname === tab.path}
            key={tab.path}
          />
        ))}
      </section>
      <section className={cn('flex-1 overflow-hidden')}>
        <NavGoal />
      </section>
      <section className={cn('flex-none')}>
        <NavTabItem
          icon={faGear}
          title="설정"
          path="/setting"
          isSelected={pathname === '/setting'}
        />
      </section>
    </div>
  );
}
