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
