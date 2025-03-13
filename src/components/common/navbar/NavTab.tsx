'use client';

import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { faCalendar } from '@fortawesome/free-solid-svg-icons/faCalendar';
import { usePathname } from 'next/navigation';
import NavTabItem from './NavTabItem';
import NavGoal from './navGoal/NavGoal';
import NavUserSetting from './NavUserSetting';
import { useNavbar } from '../NavbarContext';

const tabs = [
  { icon: faHouse, title: '대시보드', path: '/' },
  { icon: faCalendar, title: '투두캘린더', path: '/todoCalendar' },
];

export default function NavTab() {
  const pathname = usePathname();
  const { isFolded, closeNavbar } = useNavbar();

  /**
   * 모바일에서 클릭 시 navbar닫히게
   */
  const foldHeaderOnMobile = () => {
    if (window.innerWidth <= 768) closeNavbar();
  };

  return (
    <div className="flex w-full flex-1 flex-col gap-2 overflow-y-hidden border-t border-gs200 py-4 2xl:gap-3 2xl:py-8">
      <section
        className="flex flex-none flex-col gap-2 2xl:gap-3"
        onClick={foldHeaderOnMobile}
      >
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
        <NavGoal />
      </section>
      <section className="flex-none" onClick={foldHeaderOnMobile}>
        <NavUserSetting isFolded={isFolded} />
      </section>
    </div>
  );
}
