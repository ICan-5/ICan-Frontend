import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashCan,
  faPenToSquare,
  faFilePen,
  faFontAwesome,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Goal } from '@/types/goals';
import { useGoals, useUpdateGoal, useDeleteGoal } from '@/hooks/useGoals';
import goalColors from '@/presets/goalColors';

interface Props {
  id: string;
  setGoalAvailable: (value: boolean) => void;
}

const colorKeys = Object.keys(goalColors) as (keyof typeof goalColors)[];

export default function GoalHeader({ id, setGoalAvailable }: Props) {
  const { data: goals, isLoading } = useGoals();
  const { mutate: updateGoal } = useUpdateGoal();
  const { mutate: deleteGoal } = useDeleteGoal();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [selectedColor, setSelectedColor] =
    useState<keyof typeof goalColors>('goal01');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const goalItem = goals?.find((goal: Goal) => goal.goalId === Number(id));
  const goalTitle = goalItem?.title;

  useEffect(() => {
    if (!isLoading) {
      setGoalAvailable(goalItem !== undefined);
      setSelectedColor(
        (goalItem?.color as keyof typeof goalColors) || 'goal01',
      );
    }
  }, [goalItem, setGoalAvailable, isLoading]);

  const handleEditClick = () => {
    setIsEditing(true);
    setNewTitle(goalTitle === '목표를 선택 또는 생성해주세요' ? '' : goalTitle);
    setShowMobileMenu(false);
  };

  const handleSave = () => {
    if (newTitle.trim()) {
      updateGoal({
        goalId: Number(id),
        updatedFields: { title: newTitle, color: selectedColor },
      });
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (goalItem?.goalId) {
      deleteGoal(goalItem.goalId);
    }
    setShowMobileMenu(false);
  };

  const handleBlur = () => setIsEditing(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSave();
  };

  useEffect(() => {
    if (isEditing && inputRef.current) inputRef.current.focus();
  }, [isEditing]);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:gap-14 md:px-6 md:py-5">
      <div className="flex items-center justify-between">
        <h1 className="flex max-w-full items-center truncate text-16M md:max-w-2xl md:text-20M">
          <FontAwesomeIcon
            icon={faFontAwesome}
            className="mr-2 text-slate500"
          />
          {isEditing ? (
            <input
              ref={inputRef}
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="w-full border-b border-gs500"
            />
          ) : (
            <span className="truncate">{goalTitle}</span>
          )}
        </h1>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-0">
        {isEditing ? (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-12M text-slate600 md:text-14M">
              목표 컬러 수정
            </span>
            <div className="flex flex-wrap gap-2">
              {colorKeys.map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedColor(key)}
                  aria-label={`색상 변경: ${key}`}
                  className={`size-6 rounded-full md:size-8 ${selectedColor === key ? 'ring-2 ring-slate500' : ''}`}
                  style={{ backgroundColor: goalColors[key].DEFAULT }}
                />
              ))}
            </div>
          </div>
        ) : (
          <Link href={`${id}/note`} className="block">
            <div className="flex h-9 w-32 cursor-pointer items-center justify-center rounded-2xl bg-slate500 px-3 py-2 shadow md:h-10 md:w-36 md:px-5 md:py-3">
              <h2 className="flex items-center text-12M text-gs00 md:text-14M">
                <FontAwesomeIcon icon={faFilePen} className="mr-1 md:mr-2" />
                노트 모아보기
              </h2>
            </div>
          </Link>
        )}

        <div className="ml-auto hidden gap-2 md:flex">
          {!isEditing && (
            <button
              type="button"
              onClick={handleEditClick}
              className="flex h-9 w-32 cursor-pointer items-center justify-center rounded-2xl bg-slate100 px-3 py-2 text-14M text-slate800 shadow md:h-10 md:w-36 md:px-5 md:py-3"
            >
              <FontAwesomeIcon icon={faPenToSquare} /> 수정하기
            </button>
          )}
          <button
            type="button"
            onClick={handleDelete}
            className="flex size-10 items-center justify-center rounded-full border border-warn500 p-2"
          >
            <FontAwesomeIcon
              icon={faTrashCan}
              className="size-4 text-warn500"
            />
          </button>
        </div>

        <div className="relative md:hidden">
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="rounded-full bg-slate100 p-2 shadow"
          >
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
          {showMobileMenu && (
            <div className="absolute right-0 top-10 z-10 w-32 rounded-md bg-white shadow-lg">
              <button
                type="button"
                onClick={handleEditClick}
                className="block w-full px-4 py-2 text-12M text-slate800 hover:bg-slate100"
              >
                수정하기
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="block w-full px-4 py-2 text-12M text-warn500 hover:bg-slate100"
              >
                삭제하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
