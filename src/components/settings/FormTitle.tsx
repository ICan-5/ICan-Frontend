import { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

export default function FormTitle({ title, children }: Props) {
  return (
    <div className="flex flex-col py-3 md:flex-row 2xl:py-4">
      <p className="w-40 text-16SB text-gs500 2xl:w-60 2xl:text-18SB">
        {title}
      </p>
      {children}
    </div>
  );
}
