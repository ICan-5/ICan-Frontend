import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';

export const {
  auth,
  handlers,
  signIn,
  signOut,
  unstable_update: update,
} = NextAuth({
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
          const response = await fetch(
            `${process.env.BACKEND_API_URL}/auth/login`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email,
                password,
              }),
              cache: 'no-store',
            },
          );
          if (!response.ok) {
            throw new Error(`로그인 실패: ${response.status}`);
          }

          const data = await response.json();

          if (!data) {
            throw new Error('사용자를 찾을 수 없습니다.');
          }

          const { user } = data;

          if (user.profile !== null) {
            user.image = user.profile; // profile 값을 image로 변경
            delete user.profile; // profile 필드를 삭제 (선택 사항)
          }

          return {
            ...user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          };
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
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60, // 1시간 후 세션 만료
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    // 사용자 정보를 바탕으로 JWT 토큰을 생성
    async jwt({ token, user, session, trigger }) {
      if (user?.accessToken && user?.refreshToken) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        };
      }

      if (trigger === 'update' && session) {
        return {
          ...token,
          ...session,
        };
      }

      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        return {
          ...session,
          user: {
            ...session.user,
            imaage: token?.picture || null,
          },
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        };
      }
      return session;
    },
  },
});
