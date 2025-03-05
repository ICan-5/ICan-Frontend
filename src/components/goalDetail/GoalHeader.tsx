import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useGoals, useUpdateGoal, useDeleteGoal } from '@/hooks/useGoals';
import GoalProgress from './GoalProgress';
import { Goal } from '@/types/goals';

type Props = {
  doneItems: number;
  todoItems: number;
  id: string;
  setGoalAvailable: (value: boolean) => void;
};

export default function GoalHeader({
  doneItems,
  todoItems,
  id,
  setGoalAvailable,
}: Props) {
  const [menuRef, isMenuOpen, setIsMenuOpen] =
    useClickOutside<HTMLDivElement>();
  const { data: goals, isLoading } = useGoals();
  const { mutate: updateGoal } = useUpdateGoal();
  const { mutate: deleteGoal } = useDeleteGoal();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const goalItem = goals?.find((goal: Goal) => goal.goalId === Number(id));
  const goalTitle = goalItem?.title;

  useEffect(() => {
    setGoalAvailable(goalItem !== undefined);
  }, [goalItem, setGoalAvailable]);

  const handleEditClick = () => {
    setIsEditing(true);
    setIsMenuOpen(false);
    setNewTitle(goalTitle === '목표를 선택 또는 생성해주세요' ? '' : goalTitle);
  };

  const handleSave = () => {
    if (newTitle.trim()) {
      updateGoal({ goalId: Number(id), updatedFields: { title: newTitle } });
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (goalItem?.goalId) {
      deleteGoal(goalItem.goalId, {
        onSuccess: () => {
          setIsMenuOpen(false);
        },
      });
    }
  };
  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  let content;

  if (isLoading) {
    content = '로딩 중...';
  } else if (isEditing) {
    content = (
      <div className="flex items-center space-x-2">
        <input
          ref={inputRef}
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="border-b border-gs500"
        />
        <button
          type="button"
          onClick={handleSave}
          className="rounded bg-blue-500 p-1 text-14R text-white"
        >
          저장
        </button>
      </div>
    );
  } else {
    content = goalTitle;
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h1 className="flex items-center text-18SB">
          <FontAwesomeIcon icon={faFlag} className="mr-2 text-slate500" />
          {content}
        </h1>
        <div className="relative">
          <button
            type="button"
            className="cflex size-8 cursor-pointer items-center justify-center rounded-full bg-gs100"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faEllipsisV} className="text-gs500" />
          </button>
          {isMenuOpen && (
            <div
              className="absolute right-4 mt-2 w-[120px] rounded bg-gs00 shadow-md"
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
                className="block w-full border-b px-4 py-2 text-center text-14R text-gs700 hover:bg-gs200"
                onClick={handleEditClick}
              >
                수정하기
              </button>
              <button
                type="button"
                className="block w-full px-4 py-2 text-center text-14R text-gs700 hover:bg-gs200"
                onClick={handleDelete}
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
