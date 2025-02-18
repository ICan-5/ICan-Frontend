'use client';

import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import { faCalendar } from '@fortawesome/free-solid-svg-icons/faCalendar';
import { usePathname } from 'next/navigation';
import NavTabItem from './NavTabItem';
import NavGoal from './navGoal/NavGoal';

const tabs = [
  { icon: faHouse, title: '대시보드', path: '/' },
  { icon: faCalendar, title: '투두캘린더', path: '/todoCalendar' },
];

export default function NavTab() {
  const pathname = usePathname();

  return (
    <div className="flex w-full flex-1 flex-col gap-2 overflow-y-hidden border-t-[1px] py-4 2xl:gap-3 2xl:py-8">
      <section className="flex flex-none flex-col gap-2 2xl:gap-3">
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
      <section className="flex-1 overflow-hidden">
        <NavGoal />
      </section>
      <section className="flex-none">
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
