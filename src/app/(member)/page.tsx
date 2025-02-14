import DashBoard from '@/components/dashboard/DashBoard';

export default function Page() {
  const todayList = [
    {
      id: 1,
      title: '자바스크립트 공부하기',
      date: '2024-03-02',
      done: false,
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
      title: '자바스크립트 공부하기',
      date: '2024-03-02',
      done: true,
      note: false,
    },
    {
      id: 4,
      title: '자바스크립트 공부하기',
      date: '2024-03-02',
      done: false,
      note: true,
    },
    {
      id: 5,
      title: '자바스크립트 공부하기',
      date: '2024-03-02',
      done: false,
      note: false,
    },

    {
      id: 6,
      title: '자바스크립트 공부하기',
      date: '2024-03-02',
      done: false,
      note: false,
    },
    {
      id: 7,
      title: '자바스크립트 공부하기',
      date: '2024-03-02',
      done: false,
      note: true,
    },
  ];

  return <DashBoard today={todayList} />;
}
