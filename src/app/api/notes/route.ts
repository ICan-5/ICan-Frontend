import { NextResponse } from 'next/server';
import { fetchIntance } from '@/services/fetchInstance';

// 목표별 노트 리스트
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const goalId = searchParams.get('goalId');

  if (!goalId || Number.isNaN(Number(goalId))) {
    return NextResponse.json({ error: 'Invalid goalId' }, { status: 400 });
  }

  const res = await fetchIntance({
    base: 'CODEIT',
    method: 'GET',
    url: `/notes?goalId=${goalId}`,
  });

  const data = await res.json();
  return NextResponse.json(data);
}
