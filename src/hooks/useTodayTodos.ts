import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/queryKey';
import { getTodayList } from '@/services/dashboard';

// server action 함수 요청
// query에서 바로 서버 함수 사용할 경우 동작 x
const fetchTodayList = async () => {
  const data = await getTodayList();
  return data;
};

// TODO :: 할 일 생성 모달 query 훅 추가되면,
// 추가할때 날짜가 오늘이면 QUERY_KEY.TODAY에도 추가되도록 수정
export const useTodayTodos = () => {
  return useQuery({
    queryKey: [QUERY_KEY.TODAY],
    queryFn: fetchTodayList,
    initialData: [],
    retry: false,
    throwOnError: false,
  });
};
