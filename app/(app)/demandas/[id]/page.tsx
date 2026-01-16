'use client';

import { useState } from 'react';
import AppShell from '@/components/app/AppShell';
import Badge from '@/components/app/Badge';
import { getDemandaById, getCidadaoById } from '@/lib/mockData';
import { formatDateTimeBR, statusLabel } from '@/lib/utils';
import Link from 'next/link';

interface PageProps {
  params: { id: string };
}

export default function DemandaPage({ params }: PageProps) {
  const { id } = params;

  const [statusState, setStatusState] = useState<string | null>(null);

  const demanda = getDemandaById(id);

  if (!demanda) {
    return (
      <AppShell title="Demanda não encontrada">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <p className="mb-4 text-lg text-white/70">Demanda não encontrada.</p>
          <Link
            href="/demandas"
            className="inline-block rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Voltar para lista
          </Link>
        </div>
      </AppShell>
    );
  }

  const cidadao = getCidadaoById(demanda.cidadao_id);
  const currentStatus = statusState || demanda.status;

  const getStatusBadgeVariant = (status: string): 'blue' | 'yellow' | 'green' => {
    if (status === 'produzida_no_dia') return 'blue';
    if (status === 'em_andamento') return 'yellow';
    return 'green';
  };

  const handleStatusChange = (newStatus: 'em_andamento' | 'finalizada') => {
    setStatusState(newStatus);
    // Futuro: chamada API para persistir
  };

  const handleDownloadOficio = () => {
    if (demanda.documento_url && demanda.documento_url !== '') {
      window.open(demanda.documento_url, '_blank');
    } else {
      alert('Documento ainda não gerado.');
    }
  };

  return (
    <AppShell title={`Demanda ${demanda.protocolo}`}>
      <div className="space-y-6">
        {/* Dados da demanda */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="mb-4 text-lg font-semibold">Dados da demanda</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs text-white/50">Protocolo</p>
              <p className="mt-1 font-medium text-white">{demanda.protocolo}</p>
            </div>

            <div>
              <p className="text-xs text-white/50">Tipo</p>
              <p className="mt-1 font-medium text-white">{demanda.tipo_demanda}</p>
            </div>

            <div>
              <p className="text-xs text-white/50">Status</p>
              <div className="mt-2">
                <Badge variant={getStatusBadgeVariant(currentStatus)}>
                  {statusLabel(currentStatus)}
                </Badge>
              </div>
            </div>

            <div className="md:col-span-2">
              <p className="text-xs text-white/50">Descrição</p>
              <p className="mt-1 font-medium text-white">{demanda.descricao}</p>
            </div>
          </div>
        </div>

        {/* Local */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="mb-4 text-lg font-semibold">Local</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs text-white/50">Endereço</p>
              <p className="mt-1 font-medium text-white">{demanda.endereco}</p>
            </div>

            <div>
              <p className="text-xs text-white/50">CEP</p>
              <p className="mt-1 font-medium text-white">{demanda.cep}</p>
            </div>

            <div>
              <p className="text-xs text-white/50">Bairro</p>
              <p className="mt-1 font-medium text-white">{demanda.bairro}</p>
            </div>
          </div>
        </div>

        {/* Solicitante */}
        {cidadao && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-4 text-lg font-semibold">Solicitante</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs text-white/50">Nome</p>
                <Link
                  href={`/cidadaos/${cidadao.id}`}
                  className="mt-1 block font-medium text-white transition-colors hover:text-white/70"
                >
                  {cidadao.nome_completo} →
                </Link>
              </div>

              <div>
                <p className="text-xs text-white/50">Telefone</p>
                <p className="mt-1 font-medium text-white">{cidadao.telefone}</p>
              </div>

              <div>
                <p className="text-xs text-white/50">CPF</p>
                <p className="mt-1 font-medium text-white">{cidadao.cpf}</p>
              </div>
            </div>
          </div>
        )}

        {/* Datas */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="mb-4 text-lg font-semibold">Datas</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs text-white/50">Criada em</p>
              <p className="mt-1 font-medium text-white">{formatDateTimeBR(demanda.created_at)}</p>
            </div>

            <div>
              <p className="text-xs text-white/50">Atualizada em</p>
              <p className="mt-1 font-medium text-white">{formatDateTimeBR(demanda.updated_at)}</p>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="mb-4 text-lg font-semibold">Ações</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleDownloadOficio}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Baixar ofício
            </button>

            {currentStatus === 'produzida_no_dia' && (
              <>
                <button
                  onClick={() => handleStatusChange('em_andamento')}
                  className="rounded-xl border border-yellow-500/30 bg-yellow-500/20 px-4 py-2 text-sm font-medium text-yellow-400 transition-colors hover:bg-yellow-500/30"
                >
                  Marcar em andamento
                </button>

                <button
                  onClick={() => handleStatusChange('finalizada')}
                  className="rounded-xl border border-green-500/30 bg-green-500/20 px-4 py-2 text-sm font-medium text-green-400 transition-colors hover:bg-green-500/30"
                >
                  Marcar finalizada
                </button>
              </>
            )}

            {currentStatus === 'em_andamento' && (
              <button
                onClick={() => handleStatusChange('finalizada')}
                className="rounded-xl border border-green-500/30 bg-green-500/20 px-4 py-2 text-sm font-medium text-green-400 transition-colors hover:bg-green-500/30"
              >
                Marcar finalizada
              </button>
            )}
          </div>
        </div>

        {/* Histórico */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="mb-4 text-lg font-semibold">Histórico</h3>
          <p className="text-sm text-white/60">Sem histórico por enquanto.</p>
        </div>
      </div>
    </AppShell>
  );
}
