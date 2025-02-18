'use client';

import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { faCalendar } from '@fortawesome/free-solid-svg-icons/faCalendar';
import { usePathname } from 'next/navigation';
import NavTabItem from './NavTabItem';
import NavGoal from './navGoal/NavGoal';
import NavUserSetting from './NavUserSetting';

type Props = {
  isFolded: boolean;
};

const tabs = [
  { icon: faHouse, title: '대시보드', path: '/' },
  { icon: faCalendar, title: '투두캘린더', path: '/todoCalendar' },
];

export default function NavTab({ isFolded }: Props) {
  const pathname = usePathname();

  return (
    <div className="flex w-full flex-1 flex-col gap-2 overflow-y-hidden border-t-[1px] py-4 2xl:gap-3 2xl:py-8">
      <section className="flex flex-none flex-col gap-2 2xl:gap-3">
        {tabs.map((tab) => (
          <NavTabItem
            isFolded={isFolded}
            icon={tab.icon}
            title={tab.title}
            path={tab.path}
            isSelected={pathname === tab.path}
            key={tab.path}
          />
        ))}
      </section>
      <section className="flex-1 overflow-hidden">
        <NavGoal headerFolded={isFolded} />
      </section>
      <section className="flex-none">
        <NavUserSetting isFolded={isFolded} />
      </section>
    </div>
  );
}
