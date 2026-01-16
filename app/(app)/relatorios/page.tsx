'use client';

import { useState } from 'react';
import AppShell from '@/components/app/AppShell';
import KpiCard from '@/components/app/KpiCard';
import { getActiveGabinete, getDemandasByGabinete } from '@/lib/mockData';
import { formatDateTimeBR } from '@/lib/utils';

export default function RelatoriosPage() {
  const gabinete = getActiveGabinete();
  const allDemandas = getDemandasByGabinete(gabinete.id);

  // Calcular períodos
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const inicioSemana = new Date(hoje);
  inicioSemana.setDate(hoje.getDate() - hoje.getDay());
  const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);

  const demandasHoje = allDemandas.filter((d) => {
    const data = new Date(d.created_at);
    return data.toDateString() === hoje.toDateString();
  });

  const demandasSemana = allDemandas.filter((d) => {
    const data = new Date(d.created_at);
    return data >= inicioSemana;
  });

  const demandasMes = allDemandas.filter((d) => {
    const data = new Date(d.created_at);
    return data >= inicioMes;
  });

  const exportarCSV = (demandas: typeof allDemandas, nomeArquivo: string) => {
    const headers = [
      'Protocolo',
      'Tipo',
      'Status',
      'Bairro',
      'Criada em',
      'Atualizada em',
    ];
    const rows = demandas.map((demanda) => [
      demanda.protocolo,
      demanda.tipo_demanda,
      demanda.status,
      demanda.bairro,
      formatDateTimeBR(demanda.created_at),
      formatDateTimeBR(demanda.updated_at),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${nomeArquivo}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AppShell title="Relatórios">
      <div className="space-y-6">
        {/* Cards de exportação */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-2 text-lg font-semibold">Exportar demandas do dia</h3>
            <p className="mb-4 text-sm text-white/60">{demandasHoje.length} demandas</p>
            <button
              onClick={() => exportarCSV(demandasHoje, 'demandas_dia')}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Exportar CSV
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-2 text-lg font-semibold">Exportar demandas da semana</h3>
            <p className="mb-4 text-sm text-white/60">{demandasSemana.length} demandas</p>
            <button
              onClick={() => exportarCSV(demandasSemana, 'demandas_semana')}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Exportar CSV
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-2 text-lg font-semibold">Exportar demandas do mês</h3>
            <p className="mb-4 text-sm text-white/60">{demandasMes.length} demandas</p>
            <button
              onClick={() => exportarCSV(demandasMes, 'demandas_mes')}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Exportar CSV
            </button>
          </div>
        </div>

        {/* Filtros sugeridos (UI only) */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="mb-4 text-lg font-semibold">Filtros sugeridos</h3>
          <p className="mb-4 text-sm text-white/60">
            Em breve: filtros avançados por tipo, status, bairro e intervalo de datas.
          </p>
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <label className="mb-2 block text-xs text-white/70">Tipo de demanda</label>
              <select
                disabled
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/50 cursor-not-allowed"
              >
                <option>Todos</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-xs text-white/70">Status</label>
              <select
                disabled
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/50 cursor-not-allowed"
              >
                <option>Todos</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-xs text-white/70">Bairro</label>
              <select
                disabled
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/50 cursor-not-allowed"
              >
                <option>Todos</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-xs text-white/70">Intervalo</label>
              <select
                disabled
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/50 cursor-not-allowed"
              >
                <option>Personalizado</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
