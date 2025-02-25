import { auth } from '@/auth';
import { Props } from '@/components/auth/SignupForm';

export default async function signup(formData: Props) {
  try {
    const response = await fetch('api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    return { success: response.ok, message: data.message };
  } catch (e) {
    console.error('회원가입 요청 중 오류가 발생했습니다.', e);
    return { success: false, message: '회원가입 요청 중 오류가 발생했습니다.' };
  }
}
export async function getUser() {
  const session = await auth();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_TEST_URL}/api/auth/settings`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
      },
    );

    const data = await response.json();

    return { user: data.user, success: response.ok, message: data.message };
  } catch (e) {
    console.error('회원정보 조회 요청 중 오류가 발생했습니다.', e);
    return {
      success: false,
      message: '회원정보 조회 요청 중 오류가 발생했습니다.',
    };
  }
}
