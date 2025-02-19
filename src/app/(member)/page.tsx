import TodayProgress from '@/components/dashboard/todayGraph/TodayProgress';
import TodayList from '@/components/dashboard/todayList/TodayList';

export default function Page() {
  const todayList = [
    {
      id: 1,
      title: '자바스크립트 공부하기1',
      date: '2024-03-02',
      done: true,
      note: false,
    },
    {
      id: 2,
      title: '자바스크립트 공부하ewfwefwefwfwefwefwfefwefwefwef기',
      date: '2024-03-02',
      done: false,
      note: true,
    },
    {
      id: 3,
      title: '자바스크립트 공부하기2',
      date: '2024-03-02',
      done: true,
      note: false,
    },
    {
      id: 4,
      title: '자바스크립트 공부하기3',
      date: '2024-03-02',
      done: true,
      note: true,
    },
    {
      id: 5,
      title: '자바스크립트 공부하기4',
      date: '2024-03-02',
      done: false,
      note: false,
    },

    {
      id: 6,
      title: '자바스크립트 공부하기5',
      date: '2024-03-02',
      done: false,
      note: false,
    },
    {
      id: 7,
      title: '자바스크립트 공부하기6',
      date: '2024-03-02',
      done: false,
      note: true,
    },
  ];

  const completedCount = todayList.filter((e) => e.done).length;
  const totalCount = todayList.length;
  const progress = Math.floor((completedCount / totalCount) * 100) / 100;

  return (
    <div className="relative left-1/2 flex max-h-[1000px] w-full max-w-6xl -translate-x-1/2 flex-col gap-4 overflow-auto p-4 md:h-screen md:gap-8 md:p-10">
      <section className="flex min-h-48 flex-col gap-4 overflow-hidden md:h-1/3 md:flex-row md:gap-8">
        <TodayList todayList={todayList} />
        <TodayProgress progress={progress} />
      </section>
      <section className="flex h-1/3 gap-8" />
      <section className="flex h-1/3 gap-8" />
    </div>
  );
}
