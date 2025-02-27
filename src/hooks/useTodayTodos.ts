import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/queryKey';
import { getTodayList } from '@/services/dashboard';

// server action 함수 요청
// query에서 바로 서버 함수 사용할 경우 동작 x
const fetchTodayList = async () => {
  const data = await getTodayList();
  return data;
};

export const useTodayTodos = () => {
  return useQuery({
    queryKey: [QUERY_KEY.TODAY],
    queryFn: fetchTodayList,
    initialData: [],
    retry: false,
    throwOnError: false,
  });
};
