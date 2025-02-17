import { faFileLines, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';

type Props = {
  item: { id: number; task: string; date: string; done: boolean };
  onToggle: (id: number) => void;
};

export default function GoalListItem({ item, onToggle }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
        <FontAwesomeIcon icon={faFileLines} className="text-slate400 mr-2" />
        <FontAwesomeIcon
          icon={faEllipsisV}
          className="text-gs500 cursor-pointer"
          onClick={() => setIsMenuOpen(true)}
        />
      </div>
      {isMenuOpen && (
        <div className="bg-gs00 absolute right-0 z-10 mt-2 rounded shadow-md">
          <button className="text-gs700 hover:bg-gs200 text-14R block w-full px-4 py-2">
            수정하기
          </button>
          <button className="text-gs700 hover:bg-gs200 text-14R block w-full px-4 py-2">
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}
