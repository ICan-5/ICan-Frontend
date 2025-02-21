import { Suspense } from 'react';
import { SessionProvider } from 'next-auth/react';
import LoginForm from '@/components/auth/LoginForm';

export default function page() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <SessionProvider>
        <Suspense>
          <LoginForm />
        </Suspense>
      </SessionProvider>
    </main>
  );
}
