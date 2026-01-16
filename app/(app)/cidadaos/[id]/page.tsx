import AppShell from '@/components/app/AppShell';
import Badge from '@/components/app/Badge';
import Table, { TableHead, TableBody, TableRow, TableCell } from '@/components/app/Table';
import { getCidadaoById, getDemandasByGabinete } from '@/lib/mockData';
import { contatoStatus, formatDateBR, isBirthdayToday, statusLabel } from '@/lib/utils';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CidadaoPage({ params }: PageProps) {
  const { id } = await params;
  const cidadao = getCidadaoById(id);

  if (!cidadao) {
    return (
      <AppShell title="Cidadão não encontrado">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <p className="mb-4 text-lg text-white/70">Cidadão não encontrado.</p>
          <Link
            href="/cidadaos"
            className="inline-block rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Voltar para lista
          </Link>
        </div>
      </AppShell>
    );
  }

  // Buscar demandas do cidadão
  const allDemandas = getDemandasByGabinete(cidadao.gabinete_id);
  const demandasCidadao = allDemandas.filter((d) => d.cidadao_id === id);

  const status = contatoStatus(cidadao.ultimo_contato_at);
  const badgeVariant =
    status.label === 'Verde' ? 'green' : status.label === 'Amarelo' ? 'yellow' : 'red';
  const isAniversariante = isBirthdayToday(cidadao.data_nascimento);

  const getStatusBadgeVariant = (status: string): 'blue' | 'yellow' | 'green' => {
    if (status === 'produzida_no_dia') return 'blue';
    if (status === 'em_andamento') return 'yellow';
    return 'green';
  };

  return (
    <AppShell title={cidadao.nome_completo} actionLabel="Criar demanda">
      <div className="space-y-6">
        {/* Botão criar demanda */}
        <div className="flex justify-end">
          <Link
            href={`/demandas?cidadao=${id}`}
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition-opacity hover:opacity-90"
          >
            Criar demanda para este cidadão
          </Link>
        </div>

        {/* Dados do cidadão */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="mb-4 text-lg font-semibold">Dados do cidadão</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs text-white/50">Nome completo</p>
              <p className="mt-1 font-medium text-white">{cidadao.nome_completo}</p>
            </div>
            <div>
              <p className="text-xs text-white/50">CPF</p>
              <p className="mt-1 font-medium text-white">{cidadao.cpf}</p>
            </div>
            <div>
              <p className="text-xs text-white/50">Telefone</p>
              <p className="mt-1 font-medium text-white">{cidadao.telefone}</p>
            </div>
            <div>
              <p className="text-xs text-white/50">Email</p>
              <p className="mt-1 font-medium text-white">{cidadao.email || 'Não informado'}</p>
            </div>
            <div>
              <p className="text-xs text-white/50">Endereço</p>
              <p className="mt-1 font-medium text-white">{cidadao.endereco}</p>
            </div>
            <div>
              <p className="text-xs text-white/50">CEP</p>
              <p className="mt-1 font-medium text-white">{cidadao.cep}</p>
            </div>
            <div>
              <p className="text-xs text-white/50">Bairro</p>
              <p className="mt-1 font-medium text-white">{cidadao.bairro}</p>
            </div>
            <div>
              <p className="text-xs text-white/50">Cidade</p>
              <p className="mt-1 font-medium text-white">{cidadao.cidade}</p>
            </div>
            <div>
              <p className="text-xs text-white/50">Origem</p>
              <p className="mt-1 font-medium text-white capitalize">{cidadao.origem}</p>
            </div>
          </div>
        </div>

        {/* Relacionamento */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="mb-4 text-lg font-semibold">Relacionamento</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs text-white/50">Último contato</p>
              <div className="mt-2 flex items-center gap-2">
                <p className="font-medium text-white">{formatDateBR(cidadao.ultimo_contato_at)}</p>
                <Badge variant={badgeVariant}>{status.label}</Badge>
              </div>
            </div>
            <div>
              <p className="text-xs text-white/50">Data de nascimento</p>
              <div className="mt-2 flex items-center gap-2">
                <p className="font-medium text-white">{formatDateBR(cidadao.data_nascimento)}</p>
                {isAniversariante && (
                  <Badge variant="blue" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    🎂 Aniversariante hoje
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Demandas */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="mb-4 text-lg font-semibold">Demandas desse cidadão</h3>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell header>Protocolo</TableCell>
                <TableCell header>Tipo</TableCell>
                <TableCell header>Status</TableCell>
                <TableCell header>Criada em</TableCell>
                <TableCell header>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {demandasCidadao.length > 0 ? (
                demandasCidadao.map((demanda) => (
                  <TableRow key={demanda.id}>
                    <TableCell>{demanda.protocolo}</TableCell>
                    <TableCell>{demanda.tipo_demanda}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(demanda.status)}>
                        {statusLabel(demanda.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDateBR(demanda.created_at)}</TableCell>
                    <TableCell>
                      <Link
                        href={`/demandas/${demanda.id}`}
                        className="text-sm font-medium text-white/70 transition-colors hover:text-white"
                      >
                        Ver
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-white/60">
                    Nenhuma demanda encontrada para este cidadão.
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
