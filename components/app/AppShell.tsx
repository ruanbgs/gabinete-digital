import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface AppShellProps {
  title: string;
  actionLabel?: string | null;
  onActionClick?: () => void;
  children: React.ReactNode;
}

export default function AppShell({ title, actionLabel, onActionClick, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Sidebar - Desktop */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="lg:pl-64">
        {/* Topbar */}
        <Topbar actionLabel={actionLabel} onActionClick={onActionClick} />

        {/* Page Content */}
        <main className="mx-auto max-w-7xl px-6 py-8">
          {/* Page Title */}
          <h1 className="mb-6 text-2xl font-bold tracking-tight">{title}</h1>

          {/* Children */}
          {children}
        </main>
      </div>

      {/* Mobile Sidebar - Simplified (pode ser expandido depois) */}
      <div className="lg:hidden">
        <div className="border-b border-white/10 bg-zinc-950 p-4">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 font-bold text-white text-sm">
              GD
            </div>
            <span className="text-sm font-semibold text-white">Gabinete Digital</span>
          </div>
        </div>
      </div>
    </div>
  );
}
