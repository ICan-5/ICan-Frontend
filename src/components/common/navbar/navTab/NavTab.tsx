import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import { faCalendar } from '@fortawesome/free-regular-svg-icons/faCalendar';
import { faFlag } from '@fortawesome/free-regular-svg-icons/faFlag';
import cn from '@/utils/cn';
import NavTabItem from './NavTabItem';

const tabs = [
  { icon: faHouse, title: '대시보드', path: '/' },
  { icon: faCalendar, title: '캘린더', path: '/calendar' },
];

const setting = { icon: faGear, title: '설정', path: '/setting' };

export default function NavTab() {
  return (
    <div className={cn('my-2 flex w-full flex-1 flex-col border-t-[1px] py-2')}>
      <section className={cn('flex flex-none flex-col gap-1')}>
        {tabs.map((tab) => (
          <NavTabItem
            icon={tab.icon}
            title={tab.title}
            path={tab.path}
            key={tab.path}
          />
        ))}
        <NavTabItem icon={faFlag} title="목표" path="/goal" />
      </section>
      <section>hi</section>
      <section className={cn('flex-none')}>
        <NavTabItem
          icon={setting.icon}
          title={setting.title}
          path={setting.path}
        />
      </section>
    </div>
  );
}
