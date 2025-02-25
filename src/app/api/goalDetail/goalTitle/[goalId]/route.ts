import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: { goalId: string } },
) {
  // 세션에서 accessToken 가져오기
  const session = await auth();
  if (!session || !session.accessToken) {
    return NextResponse.json({ message: '인증 정보 없음' }, { status: 401 });
  }
  const { accessToken } = session;

  const { goalId } = params;

  try {
    // 첫 번째 API 요청 (https://sp-slidtodo-api.vercel.app)
    const slidResponse = await fetch(
      `https://sp-slidtodo-api.vercel.app/junha/goals/${goalId}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        // 첫 번째 API 요청에는 Authorization 헤더를 사용하지 않음
      },
    );
    const slidData = await slidResponse.json();

    // 두 번째 API 요청 (https://d26ron55a3jsp5.cloudfront.net)
    const cloudfrontResponse = await fetch(
      `https://d26ron55a3jsp5.cloudfront.net/api/v1/goals/${goalId}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          // 두 번째 API 요청에는 세션 쿠키에서 토큰을 가져와 Authorization 헤더에 넣음
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const cloudfrontData = await cloudfrontResponse.json();

    return NextResponse.json({
      title: slidData.title,
      additionalData: cloudfrontData,
    });
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    return NextResponse.json(
      { message: 'API 호출 중 오류 발생' },
      { status: 500 },
    );
  }
}
