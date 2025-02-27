import { NextRequest, NextResponse } from 'next/server';
import { fetchIntance } from '@/services/fetchInstance';

export async function GET(
  req: NextRequest,
  { params }: { params: { goalId: string } },
) {
  const { goalId } = params;

  if (!goalId) {
    return NextResponse.json(
      { message: 'goalId is required' },
      { status: 400 },
    );
  }

  // CODEIT에서 goalId로 목표 조회
  const res1 = await fetchIntance({
    base: 'CODEIT',
    method: 'GET',
    url: `/goals/${goalId}`,
  });

  if (!res1.ok) {
    return NextResponse.json(
      { message: 'Failed to fetch goal from CODEIT' },
      { status: res1.status },
    );
  }

  // CODEIT 응답에서 목표 데이터 추출
  const goalData = await res1.json();

  // BACKEND에서 goalId를 사용하여 목표 조회
  const res2 = await fetchIntance({
    base: 'BACKEND',
    method: 'GET',
    url: `/goals/${goalId}`,
  });

  if (!res2.ok) {
    return NextResponse.json(
      { message: 'Failed to fetch goal from BACKEND' },
      { status: res2.status },
    );
  }

  // BACKEND 응답에서 데이터 추출
  const backendData = await res2.json();

  // 두 응답을 합쳐서 반환 (필요한 경우)
  return NextResponse.json({
    ...backendData,
    goalTitle: goalData.title || '목표', // goalData에서 title 가져오기
  });
}
