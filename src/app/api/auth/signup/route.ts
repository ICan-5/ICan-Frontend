import { NextRequest, NextResponse } from 'next/server';
import { SignUpSchema } from '@/lib/validation';

export async function POST(req: NextRequest) {
  try {
    const url = process.env.BACKEND_API_URL;
    if (!url)
      return NextResponse.json(
        { message: 'BACKEND_API_URL 환경변수가 없습니다.' },
        { status: 500 },
      );

    const formData = await req.json();

    const { name, email, password, confirmPassword } = formData;

    // 필드 재검증
    const validatedFields = SignUpSchema.safeParse({
      name,
      email,
      password,
      confirmPassword,
    });

    // 검증 실패 시
    if (!validatedFields.success) {
      return NextResponse.json(
        { message: '잘못된 입력값이 있습니다.' },
        { status: 400 },
      );
    }

    // 외부 API로 요청
    const response = await fetch(`${url}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name,
        password,
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: '회원가입 API 요청 실패', response },
        { status: response.status },
      );
    }
    // 200 OK
    return NextResponse.json({ message: '회원가입 완료!' }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: '서버에서 문제가 발생했습니다. 다시 시도해주세요.' },
      { status: 500 },
    );
  }
}
