import { NextRequest, NextResponse } from 'next/server';
import { fetchIntance } from '@/services/fetchInstance';

export async function GET(
  req: NextRequest,
  { params }: { params: { goalId: string } },
) {
  const { goalId } = params;
  console.log('GETGETGET goalID', goalId);
  if (!goalId) {
    return NextResponse.json(
      { error: 'goalId를 확인해주세요.' },
      { status: 400 },
    );
  }
  const res = await fetchIntance({
    base: 'BACKEND',
    method: 'GET',
    url: `/goals/${goalId}`,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    return NextResponse.json(
      { error: error.message || '내 목표 조회에 실패했습니다.' },
      { status: res.status },
    );
  }
  const data = await res.json();
  return NextResponse.json({ todo: data });
}
