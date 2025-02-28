import { NextRequest, NextResponse } from 'next/server';
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
    method: 'GET',
    params: { year, month },
    url: `/calendar/monthly-todos`,
  });
  return res;
}
