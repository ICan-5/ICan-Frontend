import { Suspense } from 'react';
import LoginForm from '@/components/auth/LoginForm';

export default function page() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
