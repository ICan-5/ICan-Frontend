'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

interface Props {
  id: string;
}
export default function NoteHeader({ id }: Props) {
  const [goalTitle, setGoalTitle] = useState<string>('목표 로딩 중...');
  useEffect(() => {
    // 목표 정보를 가져오는 함수
    const fetchGoalInfo = async () => {
      try {
        const response = await fetch(`/api/goals/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch goal data');
        }
        const data = await response.json();
        setGoalTitle(data.goalTitle || '목표');
      } catch (error) {
        console.error('Error fetching goal title:', error);
        setGoalTitle('목표');
      }
    };

    if (id) {
      fetchGoalInfo();
    }
  }, [id]);
  return (
    <h1 className="flex items-center gap-2 px-3 text-16R font-semibold">
      <FontAwesomeIcon icon={faFlag} className="text-slate500" />
      {goalTitle}
    </h1>
  );
}
