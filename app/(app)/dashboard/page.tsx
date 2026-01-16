import AppShell from '@/components/app/AppShell';
import KpiCard from '@/components/app/KpiCard';
import Badge from '@/components/app/Badge';
import Table, { TableHead, TableBody, TableRow, TableCell } from '@/components/app/Table';
import {
  getActiveGabinete,
  getCidadaosByGabinete,
  getDemandasByGabinete,
  getCidadaoById,
} from '@/lib/mockData';
import {
  isBirthdayToday,
  contatoStatus,
  formatDateBR,
  formatDateTimeBR,
  statusLabel,
} from '@/lib/utils';
import Link from 'next/link';

export default function DashboardPage() {
  const gabinete = getActiveGabinete();
  const cidadaos = getCidadaosByGabinete(gabinete.id);
  const demandas = getDemandasByGabinete(gabinete.id);

  // Data de hoje para filtrar demandas produzidas no dia
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const hojeISO = hoje.toISOString().split('T')[0];

  // KPIs
  const demandasProduzidasHoje = demandas.filter(
    (d) => d.status === 'produzida_no_dia' && d.created_at.split('T')[0] === hojeISO
  ).length;

  const demandasEmAndamento = demandas.filter((d) => d.status === 'em_andamento').length;
  const demandasFinalizadas = demandas.filter((d) => d.status === 'finalizada').length;
  const totalCidadaos = cidadaos.length;

  // Aniversariantes do dia
  const aniversariantes = cidadaos.filter((c) => isBirthdayToday(c.data_nascimento));

  // Status por último contato
  const cidadaosVerde = cidadaos.filter((c) => {
    const status = contatoStatus(c.ultimo_contato_at);
    return status.label === 'Verde';
  });

  const cidadaosAmarelo = cidadaos.filter((c) => {
    const status = contatoStatus(c.ultimo_contato_at);
    return status.label === 'Amarelo';
  });

  const cidadaosVermelho = cidadaos.filter((c) => {
    const status = contatoStatus(c.ultimo_contato_at);
    return status.label === 'Vermelho';
  });

  // Demandas recentes (últimas 10, ordenadas por updated_at)
  const demandasRecentes = [...demandas]
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 10);

  const getStatusBadgeVariant = (status: string): 'blue' | 'yellow' | 'green' => {
    if (status === 'produzida_no_dia') return 'blue';
    if (status === 'em_andamento') return 'yellow';
    return 'green';
  };

  return (
    <AppShell title="Dashboard" actionLabel="Abrir demanda">
      <div className="space-y-8">
        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KpiCard title="Demandas produzidas no dia" value={demandasProduzidasHoje} />
          <KpiCard title="Demandas em andamento" value={demandasEmAndamento} />
          <KpiCard title="Demandas finalizadas" value={demandasFinalizadas} />
          <KpiCard title="Total de cidadãos" value={totalCidadaos} />
        </div>

        {/* Dashboard de Relacionamento */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold tracking-tight">Dashboard de Relacionamento</h2>

          {/* Aniversariantes do dia */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-4 text-lg font-semibold">Aniversariantes do dia</h3>
            {aniversariantes.length > 0 ? (
              <div className="space-y-3">
                {aniversariantes.map((cidadao) => (
                  <div
                    key={cidadao.id}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-white">{cidadao.nome_completo}</p>
                      <p className="mt-1 text-sm text-white/70">
                        {cidadao.telefone} • {cidadao.bairro}/{cidadao.cidade}
                      </p>
                    </div>
                    <Link
                      href={`/cidadaos/${cidadao.id}`}
                      className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
                    >
                      Ver perfil
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-white/60">Nenhum aniversariante hoje.</p>
            )}
          </div>

          {/* Status por último contato */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-4">
              <h3 className="mb-2 text-lg font-semibold">Status por último contato</h3>
              <p className="text-xs text-white/60">
                Regra baseada na diferença entre a data atual e o último contato.
              </p>
            </div>

            <div className="space-y-6">
              {/* Verde */}
              {cidadaosVerde.length > 0 && (
                <div>
                  <h4 className="mb-3 text-sm font-semibold text-white/80">Verde (até 30 dias)</h4>
                  <div className="space-y-2">
                    {cidadaosVerde.map((cidadao) => {
                      const status = contatoStatus(cidadao.ultimo_contato_at);
                      return (
                        <div
                          key={cidadao.id}
                          className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/5 p-3"
                        >
                          <div className="flex flex-1 flex-wrap items-center gap-4">
                            <p className="font-medium text-white">{cidadao.nome_completo}</p>
                            <p className="text-sm text-white/70">{cidadao.telefone}</p>
                            <p className="text-sm text-white/70">
                              {cidadao.bairro}/{cidadao.cidade}
                            </p>
                            <p className="text-sm text-white/70">
                              {formatDateBR(cidadao.ultimo_contato_at)}
                            </p>
                            <Badge variant="green">{status.label}</Badge>
                          </div>
                          <Link
                            href={`/cidadaos/${cidadao.id}`}
                            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/10"
                          >
                            Ver perfil
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Amarelo */}
              {cidadaosAmarelo.length > 0 && (
                <div>
                  <h4 className="mb-3 text-sm font-semibold text-white/80">Amarelo (até 60 dias)</h4>
                  <div className="space-y-2">
                    {cidadaosAmarelo.map((cidadao) => {
                      const status = contatoStatus(cidadao.ultimo_contato_at);
                      return (
                        <div
                          key={cidadao.id}
                          className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/5 p-3"
                        >
                          <div className="flex flex-1 flex-wrap items-center gap-4">
                            <p className="font-medium text-white">{cidadao.nome_completo}</p>
                            <p className="text-sm text-white/70">{cidadao.telefone}</p>
                            <p className="text-sm text-white/70">
                              {cidadao.bairro}/{cidadao.cidade}
                            </p>
                            <p className="text-sm text-white/70">
                              {formatDateBR(cidadao.ultimo_contato_at)}
                            </p>
                            <Badge variant="yellow">{status.label}</Badge>
                          </div>
                          <Link
                            href={`/cidadaos/${cidadao.id}`}
                            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/10"
                          >
                            Ver perfil
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Vermelho */}
              {cidadaosVermelho.length > 0 && (
                <div>
                  <h4 className="mb-3 text-sm font-semibold text-white/80">Vermelho (90+ dias)</h4>
                  <div className="space-y-2">
                    {cidadaosVermelho.map((cidadao) => {
                      const status = contatoStatus(cidadao.ultimo_contato_at);
                      return (
                        <div
                          key={cidadao.id}
                          className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/5 p-3"
                        >
                          <div className="flex flex-1 flex-wrap items-center gap-4">
                            <p className="font-medium text-white">{cidadao.nome_completo}</p>
                            <p className="text-sm text-white/70">{cidadao.telefone}</p>
                            <p className="text-sm text-white/70">
                              {cidadao.bairro}/{cidadao.cidade}
                            </p>
                            <p className="text-sm text-white/70">
                              {formatDateBR(cidadao.ultimo_contato_at)}
                            </p>
                            <Badge variant="red">{status.label}</Badge>
                          </div>
                          <Link
                            href={`/cidadaos/${cidadao.id}`}
                            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/10"
                          >
                            Ver perfil
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {cidadaosVerde.length === 0 &&
                cidadaosAmarelo.length === 0 &&
                cidadaosVermelho.length === 0 && (
                  <p className="text-sm text-white/60">Nenhum cidadão encontrado.</p>
                )}
            </div>
          </div>
        </div>

        {/* Demandas recentes */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="mb-4 text-lg font-semibold">Demandas recentes</h3>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell header>Protocolo</TableCell>
                <TableCell header>Cidadão</TableCell>
                <TableCell header>Bairro</TableCell>
                <TableCell header>Tipo</TableCell>
                <TableCell header>Status</TableCell>
                <TableCell header>Atualizado</TableCell>
                <TableCell header>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {demandasRecentes.length > 0 ? (
                demandasRecentes.map((demanda) => {
                  const cidadao = getCidadaoById(demanda.cidadao_id);
                  return (
                    <TableRow key={demanda.id}>
                      <TableCell>{demanda.protocolo}</TableCell>
                      <TableCell>{cidadao?.nome_completo || 'N/A'}</TableCell>
                      <TableCell>{demanda.bairro}</TableCell>
                      <TableCell>{demanda.tipo_demanda}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(demanda.status)}>
                          {statusLabel(demanda.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDateTimeBR(demanda.updated_at)}</TableCell>
                      <TableCell>
                        <Link
                          href={`/demandas/${demanda.id}`}
                          className="text-sm font-medium text-white/70 transition-colors hover:text-white"
                        >
                          Ver
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-white/60">
                    Nenhuma demanda encontrada.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppShell>
  );
}
