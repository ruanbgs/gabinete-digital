'use client';

import { useState } from 'react';
import AppShell from '@/components/app/AppShell';
import KpiCard from '@/components/app/KpiCard';
import Badge from '@/components/app/Badge';
import Table, { TableHead, TableBody, TableRow, TableCell } from '@/components/app/Table';
import {
  getActiveGabinete,
  getDemandasByGabinete,
  getCidadaosByGabinete,
  getCidadaoById,
} from '@/lib/mockData';
import { formatDateTimeBR, statusLabel } from '@/lib/utils';
import Link from 'next/link';

const TIPOS_DEMANDA = [
  'Todos',
  'Saúde',
  'Infraestrutura',
  'Limpeza urbana',
  'Iluminação pública',
  'Projeto de lei',
  'Requerimento',
] as const;

const STATUS_FILTROS = ['Todos', 'Produzida no dia', 'Em andamento', 'Finalizada'] as const;

export default function DemandasPage() {
  const gabinete = getActiveGabinete();
  const allDemandas = getDemandasByGabinete(gabinete.id);
  const cidadaos = getCidadaosByGabinete(gabinete.id);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<(typeof STATUS_FILTROS)[number]>('Todos');
  const [tipoFilter, setTipoFilter] = useState<(typeof TIPOS_DEMANDA)[number]>('Todos');

  // Data de hoje para KPIs
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const hojeISO = hoje.toISOString().split('T')[0];

  // KPIs
  const demandasProduzidasHoje = allDemandas.filter(
    (d) => d.status === 'produzida_no_dia' && d.created_at.split('T')[0] === hojeISO
  ).length;
  const demandasEmAndamento = allDemandas.filter((d) => d.status === 'em_andamento').length;
  const demandasFinalizadas = allDemandas.filter((d) => d.status === 'finalizada').length;

  // Filtrar demandas
  const demandas = allDemandas.filter((demanda) => {
    // Filtro de busca
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const cidadao = getCidadaoById(demanda.cidadao_id);
      const matchProtocolo = demanda.protocolo.toLowerCase().includes(term);
      const matchNome = cidadao?.nome_completo.toLowerCase().includes(term) || false;
      const matchBairro = demanda.bairro.toLowerCase().includes(term);
      const matchTipo = demanda.tipo_demanda.toLowerCase().includes(term);
      if (!matchProtocolo && !matchNome && !matchBairro && !matchTipo) return false;
    }

    // Filtro de status
    if (statusFilter !== 'Todos') {
      const statusMap: Record<string, string> = {
        'Produzida no dia': 'produzida_no_dia',
        'Em andamento': 'em_andamento',
        Finalizada: 'finalizada',
      };
      if (demanda.status !== statusMap[statusFilter]) return false;
    }

    // Filtro de tipo
    if (tipoFilter !== 'Todos' && demanda.tipo_demanda !== tipoFilter) return false;

    return true;
  });

  const getStatusBadgeVariant = (status: string): 'blue' | 'yellow' | 'green' => {
    if (status === 'produzida_no_dia') return 'blue';
    if (status === 'em_andamento') return 'yellow';
    return 'green';
  };

  // Função para exportar CSV
  const exportarCSV = () => {
    const headers = [
      'Protocolo',
      'Cidadão',
      'Tipo',
      'Bairro',
      'Status',
      'Criada em',
      'Atualizada em',
    ];
    const rows = demandas.map((demanda) => {
      const cidadao = getCidadaoById(demanda.cidadao_id);
      return [
        demanda.protocolo,
        cidadao?.nome_completo || 'N/A',
        demanda.tipo_demanda,
        demanda.bairro,
        statusLabel(demanda.status),
        formatDateTimeBR(demanda.created_at),
        formatDateTimeBR(demanda.updated_at),
      ];
    });

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `demandas_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AppShell title="Demandas" actionLabel="Nova demanda">
      <div className="space-y-6">
        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-3">
          <KpiCard title="Produzidas no dia" value={demandasProduzidasHoje} />
          <KpiCard title="Em andamento" value={demandasEmAndamento} />
          <KpiCard title="Finalizadas" value={demandasFinalizadas} />
        </div>

        {/* Filtros */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="mb-4 text-lg font-semibold">Filtros</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-xs text-white/70">Busca</label>
              <input
                type="search"
                placeholder="Protocolo, nome, bairro, tipo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs text-white/70">Status</label>
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as (typeof STATUS_FILTROS)[number])
                }
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20"
              >
                {STATUS_FILTROS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-xs text-white/70">Tipo de demanda</label>
              <select
                value={tipoFilter}
                onChange={(e) =>
                  setTipoFilter(e.target.value as (typeof TIPOS_DEMANDA)[number])
                }
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20"
              >
                {TIPOS_DEMANDA.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tabela */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="mb-4 text-lg font-semibold">Lista de demandas</h3>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell header>Protocolo</TableCell>
                <TableCell header>Cidadão</TableCell>
                <TableCell header>Tipo</TableCell>
                <TableCell header>Bairro</TableCell>
                <TableCell header>Status</TableCell>
                <TableCell header>Criada em</TableCell>
                <TableCell header>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {demandas.length > 0 ? (
                demandas.map((demanda) => {
                  const cidadao = getCidadaoById(demanda.cidadao_id);
                  return (
                    <TableRow key={demanda.id}>
                      <TableCell className="font-medium">{demanda.protocolo}</TableCell>
                      <TableCell>{cidadao?.nome_completo || 'N/A'}</TableCell>
                      <TableCell>{demanda.tipo_demanda}</TableCell>
                      <TableCell>{demanda.bairro}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(demanda.status)}>
                          {statusLabel(demanda.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDateTimeBR(demanda.created_at)}</TableCell>
                      <TableCell>
                        <Link
                          href={`/demandas/${demanda.id}`}
                          className="text-sm font-medium text-white/70 transition-colors hover:text-white"
                        >
                          Abrir
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

        {/* Exportação */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="mb-4 text-lg font-semibold">Exportação</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={exportarCSV}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Exportar CSV
            </button>
            <button
              disabled
              title="Em breve"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/50 transition-colors cursor-not-allowed"
            >
              Exportar XLSX
              <span className="ml-2 text-xs">(Em breve)</span>
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
