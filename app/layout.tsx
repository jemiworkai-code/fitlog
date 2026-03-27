import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/lib/store';
import NavBar from '@/components/NavBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FitLog — 운동 기록',
  description: '내 운동 자세를 기록하고 분석하세요',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <StoreProvider>
          <div className="max-w-md mx-auto min-h-screen pb-20 relative">
            {children}
          </div>
          <NavBar />
        </StoreProvider>
      </body>
    </html>
  );
}
