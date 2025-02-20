import { faFileLines, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';

type Props = {
  item: { id: number; task: string; date: string; done: boolean };
  onToggle: (id: number) => void;
};

export default function GoalListItem({ item, onToggle }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useClickOutside<HTMLDivElement>(() => {
    setIsMenuOpen(false);
  });

  return (
    <div
      className="relative mt-1 flex items-center justify-between"
      ref={menuRef}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          defaultChecked={item.done}
          onChange={() => onToggle(item.id)}
          className="mr-2"
        />
        <span className={item.done ? 'text-gs500 line-through' : ''}>
          {item.task}
        </span>
      </div>
      <div className="flex items-center">
        <FontAwesomeIcon icon={faFileLines} className="mr-2 text-slate400" />
        <FontAwesomeIcon
          icon={faEllipsisV}
          className="cursor-pointer text-gs500"
          onClick={() => setIsMenuOpen(true)}
        />
      </div>
      {isMenuOpen && (
        <div className="absolute right-0 z-10 mt-2 rounded bg-gs00 shadow-md">
          <button
            type="button"
            className="block w-full border-b px-4 py-2 text-14R text-gs700 hover:bg-gs200"
          >
            수정하기
          </button>
          <button
            type="button"
            className="block w-full px-4 py-2 text-14R text-gs700 hover:bg-gs200"
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}
