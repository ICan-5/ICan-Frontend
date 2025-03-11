import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMemo, useState, useRef, useEffect } from 'react';
import {
  faTrashCan,
  faPenToSquare,
  faFilePen,
  faFontAwesome,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { Goal } from '@/types/goals';
import { useGoals, useUpdateGoal, useDeleteGoal } from '@/hooks/useGoals';
import goalColors from '@/presets/goalColors';
import colors from '@/presets/colors';
import ConfirmModal from '../common/ConfirmModal';
import { useClickOutside } from '@/hooks/useClickOutside';

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
  const [selectedDeleteGoal, setSelectedDeleteGoal] = useState<number | null>(
    null,
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const [menuRef] = useClickOutside<HTMLDivElement>(() =>
    setShowMobileMenu(false),
  );

  const goalItem = goals?.find((goal: Goal) => goal.goalId === Number(id));
  const goalTitle = goalItem?.title;

  useEffect(() => {
    if (!isLoading) {
      setGoalAvailable(goalItem !== undefined);
      const goalColor =
        (goalItem?.color as keyof typeof goalColors) || 'goal01';
      setSelectedColor(goalColor);
    }
  }, [goalItem, setGoalAvailable, isLoading]);

  const handleEditClick = () => {
    setIsEditing(true);
    setNewTitle(goalTitle === '목표를 선택 또는 생성해주세요' ? '' : goalTitle);
    setShowMobileMenu(false);
  };

  const handleSave = () => {
    const trimmedTitle = newTitle.trim();
    const isTitleChanged = trimmedTitle && trimmedTitle !== goalItem?.title;
    const isColorChanged = selectedColor !== goalItem?.color;

    if (isTitleChanged || isColorChanged) {
      updateGoal({
        goalId: Number(id),
        updatedFields: {
          title: isTitleChanged ? trimmedTitle : goalItem?.title,
          color: isColorChanged ? selectedColor : goalItem?.color,
        },
      });
    }
    setIsEditing(false);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.relatedTarget || !e.relatedTarget.closest('.save-button')) {
      handleSave();
    }
  };

  const handleColorSelect = (key: keyof typeof goalColors) => {
    setSelectedColor(key);
  };

  const handleDeleteClick = () => {
    if (goalItem?.goalId) {
      setSelectedDeleteGoal(goalItem.goalId);
    }
    setShowMobileMenu(false);
  };

  const handleConfirmDelete = () => {
    if (selectedDeleteGoal) {
      deleteGoal(selectedDeleteGoal);
      setSelectedDeleteGoal(null);
    }
  };

  const handleCancelDelete = () => {
    setSelectedDeleteGoal(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSave();
  };

  useEffect(() => {
    if (isEditing && inputRef.current) inputRef.current.focus();
  }, [isEditing]);

  const toggleMobileMenu = () => {
    setShowMobileMenu((prev) => !prev);
  };

  const defaultColorStyle: React.CSSProperties = useMemo(() => {
    const goalColor = goalColors[goalItem?.color as keyof typeof goalColors];
    const validColor =
      goalColor?.DEFAULT ??
      colors[goalItem?.color as keyof typeof colors] ??
      colors.slate500;

    return { backgroundColor: validColor as string };
  }, [goalItem?.color]);

  const colorStyle: React.CSSProperties = useMemo(() => {
    const goalColor = goalColors[goalItem?.color as keyof typeof goalColors];
    const validColor =
      goalColor?.['100'] ??
      colors[goalItem?.color as keyof typeof colors] ??
      colors.slate100;

    return { backgroundColor: validColor as string };
  }, [goalItem?.color]);

  return (
    <div className="flex h-[160px] flex-col gap-3 p-6 md:px-6 md:py-5">
      <div className="flex min-h-[56px] items-start justify-between">
        <h1 className="flex max-w-full items-center text-16M md:max-w-2xl md:text-20M">
          <FontAwesomeIcon
            icon={faFontAwesome}
            className="mr-2"
            style={{ color: defaultColorStyle.backgroundColor }}
          />
          {isEditing ? (
            <div className="flex w-full items-center">
              <input
                ref={inputRef}
                value={newTitle}
                onBlur={handleBlur}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full border-b border-gs500"
              />
            </div>
          ) : (
            <span className="max-h-[48px] w-full overflow-y-auto whitespace-pre-wrap break-words">
              {goalTitle}
            </span>
          )}
        </h1>

        {isEditing && (
          <button
            type="button"
            onClick={handleSave}
            className="save-button ml-2 flex items-center justify-center rounded-2xl p-2 text-gs00"
            style={defaultColorStyle}
            title="수정완료"
          >
            수정 완료
          </button>
        )}
      </div>

      <div className="flex-1" />

      <div className="mb-[20px] mt-auto flex flex-row items-center justify-between gap-3">
        {isEditing ? (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-12M text-gs600 md:text-14M">목표 색상</span>
            <div className="flex flex-wrap gap-2">
              {colorKeys.map((key) => (
                <button
                  key={key}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleColorSelect(key)}
                  aria-label={`색상 변경: ${key}`}
                  className={`size-6 rounded-full border-2 transition-all md:size-8 ${
                    selectedColor === key
                      ? 'border-gray-700 ring-2 ring-gray-700'
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: goalColors[key].DEFAULT }}
                />
              ))}
            </div>
          </div>
        ) : (
          <Link href={`${id}/note`} className="block">
            <div
              className="flex h-9 w-32 cursor-pointer items-center justify-center rounded-2xl px-3 py-2 shadow md:h-10 md:w-36 md:px-5 md:py-3"
              style={defaultColorStyle}
            >
              <h2 className="flex items-center text-14M text-gs00">
                <FontAwesomeIcon icon={faFilePen} className="mr-1 md:mr-2" />
                노트 모아보기
              </h2>
            </div>
          </Link>
        )}

        <div className="ml-auto hidden gap-2 lg:flex">
          {!isEditing && (
            <button
              type="button"
              onClick={handleEditClick}
              className="flex h-9 w-32 cursor-pointer items-center justify-center gap-2 rounded-2xl px-3 py-2 text-14M text-gsBk shadow md:h-10 md:w-36"
              style={colorStyle}
            >
              <FontAwesomeIcon icon={faPenToSquare} /> 목표 수정
            </button>
          )}
          <button
            type="button"
            onClick={handleDeleteClick}
            className="flex size-10 items-center justify-center rounded-full border border-warn500 p-2"
          >
            <FontAwesomeIcon
              icon={faTrashCan}
              className="size-4 text-warn500"
            />
          </button>
        </div>

        <div ref={menuRef} className="relative lg:hidden">
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="relative flex items-center justify-center rounded-full bg-slate100 p-1 shadow"
          >
            <span className="flex size-8 items-center justify-center rounded-full">
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </span>
          </button>
          {showMobileMenu && (
            <div className="absolute right-0 top-10 z-50 w-32 rounded-md bg-gs00 shadow-lg">
              <button
                type="button"
                onClick={handleEditClick}
                className="block w-full px-4 py-2 text-12M text-slate800 hover:bg-slate100"
              >
                목표 수정
              </button>
              <button
                type="button"
                onClick={handleDeleteClick}
                className="block w-full px-4 py-2 text-12M text-warn500 hover:bg-slate100"
              >
                삭제하기
              </button>
            </div>
          )}
        </div>
      </div>
      {selectedDeleteGoal !== null && (
        <ConfirmModal
          title="해당 목표를 삭제 하시겠어요?"
          description="목표가 모두 사라지고 복구할 수 없습니다."
          confirmText="지우기"
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
