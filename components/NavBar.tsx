'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/',         label: '홈',   icon: '🏠' },
  { href: '/records',  label: '기록', icon: '📋' },
  { href: '/upload',   label: '업로드', icon: '➕' },
  { href: '/fitness',  label: '피트니스', icon: '👟' },
  { href: '/diet',     label: '식단', icon: '🥗' },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around py-1.5 z-50 max-w-md mx-auto">
      {links.map(({ href, label, icon }) => {
        const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-colors min-w-0 ${
              isActive ? 'text-indigo-600' : 'text-gray-400'
            }`}
          >
            <span className="text-lg">{icon}</span>
            <span className="text-[10px] font-medium">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
