import { useQuery } from '@tanstack/react-query';
import { getErrorMessage } from '@/constants/errorMessages';
import { QUERY_KEY } from '@/constants/queryKey';

const fetchTodoTitle = async ({ queryKey }: { queryKey: [string, string] }) => {
  const todoId = queryKey[1];

  const res = await fetch(`/api/todos/${todoId}`, { method: 'GET' });
  if (!res.ok) throw new Error(getErrorMessage(res.status));
  const data1 = await res.json();
  return data1;
};

const fetchGoalTitle = async ({ queryKey }: { queryKey: [string, string] }) => {
  const goalId = queryKey[1];

  const res = await fetch(`/api/goals/${goalId}`);
  if (!res.ok) throw new Error(getErrorMessage(res.status));
  const data33 = await res.json();
  return data33;
};

export const useTodoWithGoalTitle = (todoId: string) => {
  // 첫 번째 쿼리: todoId를 사용하여 할 일 정보 가져오기
  const {
    data: todoData,
    isLoading: isTodoLoading,
    isError: isTodoError,
  } = useQuery({
    queryKey: [QUERY_KEY.TODO, todoId],
    queryFn: fetchTodoTitle,
  });

  // 두 번째 쿼리: todoData에서 goalId를 추출하여 목표 제목 가져오기
  const goalId = todoData?.goal ? todoData.goal.id : undefined;

  const {
    data: goalData,
    isLoading: isGoalLoading,
    isError: isGoalError,
  } = useQuery({
    queryKey: [QUERY_KEY.GOAL, goalId],
    queryFn: fetchGoalTitle,
    enabled: !!goalId, // goalId가 있을 때만 요청
  });

  return {
    todoQuery: {
      data: todoData,
      isLoading: isTodoLoading,
      isError: isTodoError,
    },
    goalQuery: {
      data: goalData,
      isLoading: isGoalLoading,
      isError: isGoalError,
    },
  };
};
