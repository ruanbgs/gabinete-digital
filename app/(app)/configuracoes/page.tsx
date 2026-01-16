import AppShell from '@/components/app/AppShell';
import Badge from '@/components/app/Badge';
import { getActiveGabinete, usuarios } from '@/lib/mockData';

export default function ConfiguracoesPage() {
  const gabinete = getActiveGabinete();
  const usuariosGabinete = usuarios.filter((u) => u.gabinete_id === gabinete.id);

  const getRoleBadgeVariant = (role: string): 'blue' | 'yellow' | 'green' | 'gray' => {
    if (role === 'owner') return 'blue';
    if (role === 'coord') return 'green';
    if (role === 'atendente') return 'yellow';
    return 'gray';
  };

  const getRoleLabel = (role: string): string => {
    const labels: Record<string, string> = {
      owner: 'Proprietário',
      coord: 'Coordenador',
      atendente: 'Atendente',
      leitura: 'Somente Leitura',
    };
    return labels[role] || role;
  };

  return (
    <AppShell title="Configurações">
      <div className="space-y-6">
        {/* Gabinete */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="mb-4 text-lg font-semibold">Gabinete</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs text-white/50">Nome do gabinete</p>
              <p className="mt-1 font-medium text-white">{gabinete.nome}</p>
            </div>
            <div>
              <p className="text-xs text-white/50">Nome do político</p>
              <p className="mt-1 font-medium text-white">{gabinete.nome_politico}</p>
            </div>
            <div>
              <p className="text-xs text-white/50">Cidade</p>
              <p className="mt-1 font-medium text-white">{gabinete.cidade}</p>
            </div>
            <div>
              <p className="text-xs text-white/50">Estado</p>
              <p className="mt-1 font-medium text-white">{gabinete.estado}</p>
            </div>
            <div>
              <p className="text-xs text-white/50">WhatsApp</p>
              <p className="mt-1 font-medium text-white">{gabinete.whatsapp_numero}</p>
            </div>
          </div>
        </div>

        {/* Usuários e Acessos */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="mb-4 text-lg font-semibold">Usuários e Acessos</h3>
          <div className="mb-6 rounded-lg border border-white/10 bg-white/5 p-4">
            <p className="mb-2 text-sm font-semibold text-white">Hierarquia de Acessos (MVP)</p>
            <ul className="space-y-1 text-sm text-white/70">
              <li>
                <strong>Proprietário (owner):</strong> Acesso total ao gabinete, configurações e
                usuários.
              </li>
              <li>
                <strong>Coordenador (coord):</strong> Gerencia demandas, cidadãos e equipe. Sem
                acesso a configurações de gabinete.
              </li>
              <li>
                <strong>Atendente:</strong> Cria e edita demandas, cadastra cidadãos. Acesso
                limitado a relatórios.
              </li>
              <li>
                <strong>Somente Leitura:</strong> Visualiza dados e relatórios, sem permissão de
                edição.
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            {usuariosGabinete.map((usuario) => (
              <div
                key={usuario.id}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4"
              >
                <div className="flex-1">
                  <p className="font-medium text-white">{usuario.nome}</p>
                  <p className="mt-1 text-sm text-white/60">{usuario.email}</p>
                </div>
                <Badge variant={getRoleBadgeVariant(usuario.role)}>
                  {getRoleLabel(usuario.role)}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Modelos de ofício (placeholder) */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="mb-4 text-lg font-semibold">Modelos de ofício</h3>
          <p className="mb-4 text-sm text-white/60">
            Em breve: editor de modelos personalizados por tipo de demanda.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {['Saúde', 'Infraestrutura', 'Limpeza urbana', 'Iluminação pública'].map((tipo) => (
              <div
                key={tipo}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3"
              >
                <span className="text-sm font-medium text-white">{tipo}</span>
                <button
                  disabled
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/50 cursor-not-allowed"
                >
                  Editar modelo
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
