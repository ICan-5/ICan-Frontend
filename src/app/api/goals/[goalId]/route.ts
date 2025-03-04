<<<<<<< HEAD
import { NextRequest, NextResponse } from 'next/server';
import { fetchIntance } from '@/services/fetchInstance';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { goalId: number } },
) {
  const { goalId } = params;
  const body = await req.json();
  const { title } = body;

  if (!title) {
    return NextResponse.json({ message: 'title is required' }, { status: 400 });
  }

  // 목표 이름 수정 요청 (백엔드 API)
  const res1 = await fetchIntance({
    method: 'PATCH',
    base: 'CODEIT',
    url: `/goals/${goalId}`,
    body: { title },
  });

  if (!res1.ok) {
    return res1;
  }

  // 색상 변경 요청 (백엔드 API)
  const res2 = await fetchIntance({
    method: 'PATCH',
    url: `/goals/${goalId}`,
    body: { goalId, title },
  });

  return res2;
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: { goalId: number } },
) {
  const { goalId } = params;

  const res1 = await fetchIntance({
    base: 'CODEIT',
    method: 'DELETE',
    url: `/goals/${goalId}`,
  });

  if (!res1.ok) {
    return res1;
  }

  const res2 = await fetchIntance({
    url: `/goals/${goalId}`,
    method: 'DELETE',
  });

  return res2;
}
=======
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
>>>>>>> 0f78e41815c50280c46e08d10de0798150564ad1
