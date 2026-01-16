'use client';

import { useState } from 'react';
import AppShell from '@/components/app/AppShell';
import KpiCard from '@/components/app/KpiCard';
import Badge from '@/components/app/Badge';
import Table, { TableHead, TableBody, TableRow, TableCell } from '@/components/app/Table';
import { getActiveGabinete, getCidadaosByGabinete } from '@/lib/mockData';
import { contatoStatus, formatDateBR } from '@/lib/utils';
import Link from 'next/link';

export default function CidadaosPage() {
  const gabinete = getActiveGabinete();
  const allCidadaos = getCidadaosByGabinete(gabinete.id);
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar cidadãos por busca
  const cidadaos = allCidadaos.filter((cidadao) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      cidadao.nome_completo.toLowerCase().includes(term) ||
      cidadao.telefone.includes(term) ||
      cidadao.bairro.toLowerCase().includes(term) ||
      cidadao.cidade.toLowerCase().includes(term)
    );
  });

  // Classificar por status de contato
  const cidadaosVerde = cidadaos.filter((c) => contatoStatus(c.ultimo_contato_at).label === 'Verde');
  const cidadaosAmarelo = cidadaos.filter(
    (c) => contatoStatus(c.ultimo_contato_at).label === 'Amarelo'
  );
  const cidadaosVermelho = cidadaos.filter(
    (c) => contatoStatus(c.ultimo_contato_at).label === 'Vermelho'
  );

  return (
    <AppShell title="Cidadãos" actionLabel="Novo cidadão">
      <div className="space-y-6">
        {/* Cards de resumo */}
        <div className="grid gap-4 md:grid-cols-4">
          <KpiCard title="Total cidadãos" value={cidadaos.length} />
          <KpiCard title="Verdes" value={cidadaosVerde.length} />
          <KpiCard title="Amarelos" value={cidadaosAmarelo.length} />
          <KpiCard title="Vermelhos" value={cidadaosVermelho.length} />
        </div>

        {/* Campo de busca */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <input
            type="search"
            placeholder="Buscar por nome, telefone, bairro ou cidade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20"
          />
        </div>

        {/* Tabela de cidadãos */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="mb-4 text-lg font-semibold">Lista de cidadãos</h3>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell header>Nome</TableCell>
                <TableCell header>Telefone</TableCell>
                <TableCell header>Bairro/Cidade</TableCell>
                <TableCell header>Último contato</TableCell>
                <TableCell header>Status</TableCell>
                <TableCell header>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cidadaos.length > 0 ? (
                cidadaos.map((cidadao) => {
                  const status = contatoStatus(cidadao.ultimo_contato_at);
                  const badgeVariant =
                    status.label === 'Verde'
                      ? 'green'
                      : status.label === 'Amarelo'
                        ? 'yellow'
                        : 'red';
                  return (
                    <TableRow key={cidadao.id}>
                      <TableCell className="font-medium">{cidadao.nome_completo}</TableCell>
                      <TableCell>{cidadao.telefone}</TableCell>
                      <TableCell>
                        {cidadao.bairro}/{cidadao.cidade}
                      </TableCell>
                      <TableCell>{formatDateBR(cidadao.ultimo_contato_at)}</TableCell>
                      <TableCell>
                        <Badge variant={badgeVariant}>{status.label}</Badge>
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/cidadaos/${cidadao.id}`}
                          className="text-sm font-medium text-white/70 transition-colors hover:text-white"
                        >
                          Ver perfil
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-white/60">
                    {searchTerm ? 'Nenhum cidadão encontrado.' : 'Nenhum cidadão cadastrado.'}
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
