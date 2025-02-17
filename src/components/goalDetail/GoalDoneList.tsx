import React from 'react';
import GoalListItem from './GoalListItem';

// Done 타입 정의
type Done = { id: number; task: string; date: string; done: boolean };

type Props = {
  type: 'done';
  list: Done[];
  onToggle: (id: number) => void;
};

export default function GoalDoneList({ list, onToggle }: Props) {
  // 오래된 날짜 순으로 정렬
  const sortedList = [...list].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  return (
    <div className="bg-gs200 rounded-2xl p-6 shadow">
      <h3 className="text-18R mb-4 font-bold">Done</h3>
      {sortedList.map((done) => (
        <GoalListItem key={done.id} item={done} onToggle={onToggle} />
      ))}
    </div>
  );
}
