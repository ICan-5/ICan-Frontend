import { NextRequest, NextResponse } from 'next/server';
import { apiHandler } from '@/services/apiHandler';
import {
  BACKENDURL,
  CODEITURL,
  getConfig,
  postConfig,
} from '@/services/constants';

export const GET = async (
  req: NextRequest,
  { params }: { params: { goalId: string } },
) => {
  const { goalId } = params;
  const { searchParams } = new URL(req.url); // 요청에서 쿼리 파라미터 추출

  const done = searchParams.get('done'); // "true" 또는 "false"

  try {
    // 쿼리 파라미터 설정
    const queryParams = new URLSearchParams({
      goalId,
    });

    // done 값이 존재하면 추가
    if (done !== null) {
      queryParams.append('done', done);
    }

    // 최종 API 요청 URL
    const requestUrl = `${CODEITURL}/todos?${queryParams.toString()}`;

    const codeitResponse = await fetch(requestUrl, await getConfig());
    const codeitData = await codeitResponse.json();

    return NextResponse.json({
      todos: codeitData, // todos 전체 데이터 반환
    });
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    return NextResponse.json(
      { message: 'API 호출 중 오류 발생' },
      { status: 500 },
    );
  }
};

export const POST = apiHandler(async (req: NextRequest) => {
  const title = req.nextUrl.searchParams.get('title');

  const res1 = await fetch(`${CODEITURL}/goals`, await postConfig({ title }));
  if (!res1.ok) return NextResponse.json({ status: 500 });

  const data = await res1.json();
  const { id } = data;

  const res2 = await fetch(
    `${BACKENDURL}/goals`,
    await postConfig({ goalId: id, title }),
  );
  return res2;
});
