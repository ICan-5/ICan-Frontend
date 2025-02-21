import { SignUpFormData } from '@/components/auth/SignupForm';

export default async function signup(formData: SignUpFormData) {
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
