import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
// const teamId = process.env.NEXT_PUBLIC_TEAM_ID;

if (!apiUrl) {
  throw new Error('필수 환경 변수가 설정되지 않았습니다.');
}

export const { handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {
          label: '이메일',
          type: 'text',
        },
        password: { label: '비밀번호', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;
        const { email, password } = credentials;

        try {
          const response = await fetch(`${apiUrl}/api/v1/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            // credentials: 'include',
            body: JSON.stringify({
              email,
              password,
            }),
          });
          if (!response.ok) {
            throw new Error(
              `로그인 실패: ${response.status} ${response.statusText}`,
            );
          }

          const data = await response.json();

          if (!data) {
            throw new Error('사용자를 찾을 수 없습니다.');
          }
          const { user } = data;
          return user;
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : '알 수 없는 오류가 발생했습니다.';
          throw new Error(`인증 실패: ${errorMessage}`);
        }
      },
    }),
  ],
  callbacks: {
    // 사용자 정보를 바탕으로 JWT 토큰을 생성
    async jwt({ token, user }) {
      if (user?.accessToken && user?.refreshToken) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        };
      }
      return token; // user가 없으면 기존 token을 그대로 반환
    },
    async session({ session, token }) {
      // JWT 토큰에서 액세스 토큰과 리프레시 토큰을 세션에 추가
      if (token?.accessToken && token?.refreshToken) {
        return {
          ...session,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        };
      }
      return session;
    },
  },
});

export const { auth } = NextAuth(authConfig);
