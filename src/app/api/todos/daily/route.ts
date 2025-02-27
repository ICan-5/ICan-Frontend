import { NextRequest, NextResponse } from 'next/server';
import { getErrorMessage } from '@/constants/errorMessages';
import { fetchIntance } from '@/services/fetchInstance';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const date = searchParams.get('date');

  if (!date) {
    return NextResponse.json(
      { message: 'year and month and day are required' },
      { status: 400 },
    );
  }

  const res = await fetchIntance({
    base: 'BACKEND',
    method: 'GET',
    url: `/calendar/daily-todos?date=${date}`,
  });

  if (!res.ok) {
    return NextResponse.json(
      { message: getErrorMessage(res.status) },
      { status: res.status },
    );
  }

  const data = await res.json();

  if (!Array.isArray(data)) {
    return NextResponse.json({ message: 'Data is not valid' }, { status: 500 });
  }
  return NextResponse.json(data, { status: 200 });
}
