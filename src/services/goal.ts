import { getErrorMessage } from '@/constants/errorMessages';
import { Goal } from '@/types/goals';
import colors from '@/presets/colors';

const DEFAULT_COLOR = colors.slate500;

/**
 * 목표 수정
 * @param goalId 목표 id
 * @param updatedFields 수정할 필드
 */
export const updateGoal = async (
  goalId: number,
  updatedFields: Partial<Goal>,
) => {
  try {
    const body = {
      ...updatedFields,
      color: updatedFields.color || DEFAULT_COLOR,
    };

    const response = await fetch(`/api/goals/${goalId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error(getErrorMessage(response.status));
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('목표 수정 중 오류 발생', error);
    throw error;
  }
};

/**
 * 목표 삭제
 * @param goalId 목표 id
 */
export const deleteGoal = async (goalId: number) => {
  try {
    const response = await fetch(`/api/goals/${goalId}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error(getErrorMessage(response.status));
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('목표 삭제 중 오류 발생', error);
    throw error;
  }
};
