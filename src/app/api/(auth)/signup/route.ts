import { SignUpSchema } from '@/lib/validation';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const teamId = process.env.NEXT_PUBLIC_TEAM_ID;

async function checkEmailExists(email: string) {
  const response = await fetch(`${apiUrl}/${teamId}/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  return result;
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const formData = await req.json();

    const { name, email, password, confirmPassword } = formData;

    // 필드 재검증
    const validatedFields = SignUpSchema.safeParse({
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    });

    // 검증 실패 시
    if (!validatedFields.success) {
      return NextResponse.json(
        { message: '잘못된 입력값이 있습니다.' },
        { status: 400 },
      );
    }

    // 중복된 이메일 확인
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      return NextResponse.json(
        { message: '중복된 이메일입니다.' },
        { status: 400 },
      );
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(formData.password, 10);

    // 외부 API로 요청
    const response = await fetch(`${apiUrl}/${teamId}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        name: formData.name,
        password: hashedPassword, // 해싱된 비밀번호
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: '회원가입 API 요청 실패', response },
        { status: 500 },
      );
    }
    // 200 OK
    return NextResponse.json({ message: '회원가입 완료!' }, { status: 200 });
  } catch (error) {
    console.error('회원가입 오류:', error);

    return NextResponse.json(
      { message: '서버에서 문제가 발생했습니다. 다시 시도해주세요.' },
      { status: 500 },
    );
  }
}
