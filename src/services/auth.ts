import { Props } from '@/components/auth/SignupForm';
/**
 * 회원가입 함수
 * @param {Props} formData - 입력한 사용자 데이터 (이름, 이메일, 비밀번호 등)
 * @returns {Promise<{ success: boolean; message: string }>} - 요청 결과와 메시지
 */
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
  } catch {
    return { success: false, message: '회원가입 요청 중 오류가 발생했습니다.' };
  }
}
