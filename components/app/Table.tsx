interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export default function Table({ children, className = '' }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
      <table className={`w-full ${className}`}>
        {children}
      </table>
    </div>
  );
}

// Componente para o cabeçalho da tabela
export function TableHead({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <thead className={`border-b border-white/10 ${className}`}>
      {children}
    </thead>
  );
}

// Componente para o corpo da tabela
export function TableBody({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <tbody className={className}>{children}</tbody>;
}

// Componente para linha da tabela
export function TableRow({
  children,
  className = '',
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <tr
      className={`border-b border-white/5 transition-colors hover:bg-white/5 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}

// Componente para célula da tabela
export function TableCell({
  children,
  className = '',
  header = false,
  colSpan,
}: {
  children: React.ReactNode;
  className?: string;
  header?: boolean;
  colSpan?: number;
}) {
  const Tag = header ? 'th' : 'td';
  const baseClasses = header
    ? 'px-6 py-3 text-left text-xs font-semibold text-white/70 uppercase tracking-wider'
    : 'px-6 py-4 text-sm text-white/90';

  return (
    <Tag className={`${baseClasses} ${className}`} colSpan={colSpan}>
      {children}
    </Tag>
  );
}
