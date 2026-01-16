'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Cidadãos', href: '/cidadaos' },
  { name: 'Demandas', href: '/demandas' },
  { name: 'Agenda', href: '/agenda' },
  { name: 'Relatórios', href: '/relatorios' },
  { name: 'Configurações', href: '/configuracoes' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/10 bg-zinc-950/95 backdrop-blur-sm">
      <div className="flex h-full flex-col">
        {/* Logo/Header */}
        <div className="border-b border-white/10 p-6">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 font-bold text-white">
              GD
            </div>
            <span className="text-lg font-semibold tracking-tight text-white">Gabinete Digital</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
