import { NextRequest, NextResponse } from 'next/server';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
// const teamId = process.env.NEXT_PUBLIC_TEAM_ID;

if (!apiUrl) {
  throw new Error('필수 환경 변수가 설정되지 않았습니다.');
}

export async function GET(req: NextRequest) {
  const authorization = req.headers.get('authorization');

  try {
    // API로 요청
    const response = await fetch(`${apiUrl}/api/v1/user`, {
      method: 'GET',
      // headers: req.headers,
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization || '',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: '회원정보 조회 API 요청 실패', status: response.status },
        { status: 500 },
      );
    }

    const user = await response.json();
    if (!user) {
      // 유저가 없을 경우 처리
      return NextResponse.json(
        { message: '유저 정보가 없습니다.' },
        { status: 404 },
      );
    }
    // 200 OK
    return NextResponse.json(
      { user, message: '회원정보 조회 완료!' },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { message: '서버에서 문제가 발생했습니다. 다시 시도해주세요.' },
      { status: 500 },
    );
  }
}
