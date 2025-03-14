import MemberPageWrapper from '@/components/common/MemberPageWrapper';
import Navbar from '@/components/common/navbar/Navbar';
import { NavbarProvider } from '@/components/common/NavbarContext';

export default function Layout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <NavbarProvider>
      <div className="flex h-dvh w-screen overflow-hidden bg-gs100 will-change-scroll">
        <Navbar />
        <MemberPageWrapper>{children}</MemberPageWrapper>
        {modal}
      </div>
    </NavbarProvider>
  );
}
