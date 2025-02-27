'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { useGoalTitle } from '@/hooks/useGoalTitle';

interface Props {
  id: string;
}

export default function NoteHeader({ id }: Props) {
  const { data: goalTitle, isLoading } = useGoalTitle(id);

  return (
    <h1 className="flex items-center gap-2 px-3 text-16R font-semibold">
      <FontAwesomeIcon icon={faFlag} className="text-slate500" />
      {isLoading ? '목표 로딩 중...' : goalTitle}
    </h1>
  );
}
