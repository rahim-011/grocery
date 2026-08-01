'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export default function AppMain({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');

  return (
    <main
      className={isAuthPage ? 'flex-1 px-0' : 'flex-1 px-4 pt-[110px] sm:px-6 md:px-10'}
    >
      {children}
    </main>
  );
}
