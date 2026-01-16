import { getActiveGabinete } from '@/lib/mockData';

interface TopbarProps {
  actionLabel?: string | null;
  onActionClick?: () => void;
}

export default function Topbar({ actionLabel, onActionClick }: TopbarProps) {
  const gabinete = getActiveGabinete();

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-zinc-950/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        {/* Gabinete ativo */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <p className="text-xs text-white/50">Gabinete ativo</p>
            <p className="text-sm font-semibold text-white">{gabinete.nome}</p>
          </div>
        </div>

        {/* Busca e Ação */}
        <div className="flex flex-1 items-center justify-end gap-4">
          {/* Campo de busca */}
          <div className="hidden md:block">
            <input
              type="search"
              placeholder="Buscar..."
              className="w-64 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20"
            />
          </div>

          {/* Botão primário */}
          {actionLabel && (
            <button
              onClick={onActionClick}
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition-opacity hover:opacity-90"
            >
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
