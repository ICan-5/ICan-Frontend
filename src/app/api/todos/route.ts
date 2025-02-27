import { NextRequest, NextResponse } from 'next/server';
import { getErrorMessage } from '@/constants/errorMessages';
import { fetchIntance } from '@/services/fetchInstance';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const year = searchParams.get('year');
  const month = searchParams.get('month');

  if (!year || !month) {
    return NextResponse.json(
      { message: 'year and month are required' },
      { status: 400 },
    );
  }
  const res = await fetchIntance({
    base: 'BACKEND',
    method: 'GET',
    url: `/calendar/monthly-todos?year=${year}&month=${month}`,
  });

  if (!res.ok) {
    return NextResponse.json(
      { message: getErrorMessage(res.status) },
      { status: res.status },
    );
  }
  const data = await res.json();

  // data가 잘못 와도 200으로 응답하기 때문에 배열 요소 확인 error 처리
  if (!Array.isArray(data)) {
    return NextResponse.json({ message: 'Data is not valid' }, { status: 500 });
  }
  return NextResponse.json(data, { status: 200 });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, goalId, date } = body;

  const res1 = await fetchIntance({
    base: 'CODEIT',
    method: 'POST',
    url: '/todos',
    body: { title, goalId },
  });

  if (!res1.ok) {
    const message = getErrorMessage(res1.status);
    return NextResponse.json({ message }, { status: res1.status });
  }

  const data = await res1.json();
  const { id, createdAt } = data;

  const res2 = await fetchIntance({
    base: 'BACKEND',
    url: '/todos',
    method: 'POST',
    body: {
      todoId: id,
      goalId: goalId ?? null,
      date,
      done: false,
      title,
      createdAt,
    },
  });

  if (!res2.ok) {
    const message = getErrorMessage(res2.status);
    return NextResponse.json({ message }, { status: res2.status });
  }

  const finalData = await res2.json();
  console.log(finalData);
  return NextResponse.json(finalData, { status: 201 });
}
