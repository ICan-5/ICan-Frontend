import { NextRequest, NextResponse } from 'next/server';
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

  return res;
}
