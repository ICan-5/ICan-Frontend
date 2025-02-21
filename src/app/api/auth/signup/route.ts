import { NextRequest, NextResponse } from 'next/server';
import { SignUpSchema } from '@/lib/validation';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const teamId = process.env.NEXT_PUBLIC_TEAM_ID;

export async function POST(req: NextRequest) {
  try {
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
    const response = await fetch(`${apiUrl}/${teamId}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name,
        password,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: '회원가입 API 요청 실패', response },
        { status: 500 },
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
