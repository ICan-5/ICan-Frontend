import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import GoalProgress from './GoalProgress';
import { useClickOutside } from '@/hooks/useClickOutside';

type Props = {
  doneItems: number;
  todoItems: number;
  id: string;
};

export default function GoalHeader({ doneItems, todoItems, id }: Props) {
  const [title, setTitle] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [menuRef, isMenuOpen, setIsMenuOpen] =
    useClickOutside<HTMLDivElement>();
  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const response = await fetch(`/api/goalDetail/goalTitle/${id}`);
        const data = await response.json();
        setTitle(data.title);
      } catch (error) {
        console.error('Error fetching goal:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGoal();
  }, [id]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="flex items-center text-18SB">
          <FontAwesomeIcon icon={faFlag} className="mr-2 text-slate500" />
          {loading ? '로딩 중...' : title || '제목 없음'}
        </h1>
        <div className="relative">
          <button
            type="button"
            className="cursor-pointer bg-transparent p-0"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faEllipsisV} className="text-gs500" />
          </button>
          {isMenuOpen && (
            <div
              className="absolute right-5 mt-2 w-[120px] rounded bg-gs00 shadow-md"
              ref={menuRef}
            >
              <button
                type="button"
                className="block w-full border-b px-4 py-2 text-center text-14R text-gs700 hover:bg-gs200"
              >
                목표 색상 변경
              </button>
              <button
                type="button"
                className="block w-full border-b px-4 py-2 text-left text-14R text-gs700 hover:bg-gs200"
              >
                수정하기
              </button>
              <button
                type="button"
                className="block w-full px-4 py-2 text-left text-14R text-gs700 hover:bg-gs200"
              >
                삭제하기
              </button>
            </div>
          )}
        </div>
      </div>
      <GoalProgress doneItems={doneItems} todoItems={todoItems} />
    </div>
  );
}
