/**
 * Formata data ISO para formato brasileiro (dd/mm/aaaa)
 */
export function formatDateBR(dateISO: string): string {
  const date = new Date(dateISO);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Formata data e hora ISO para formato brasileiro (dd/mm/aaaa hh:mm)
 */
export function formatDateTimeBR(dateISO: string): string {
  const date = new Date(dateISO);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

/**
 * Calcula quantos dias se passaram desde a data fornecida até hoje
 */
export function daysSince(dateISO: string): number {
  const date = new Date(dateISO);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  const diffTime = today.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Verifica se a data de nascimento corresponde ao dia de hoje (ignora o ano)
 */
export function isBirthdayToday(data_nascimento: string): boolean {
  const birthDate = new Date(data_nascimento);
  const today = new Date();
  return birthDate.getDate() === today.getDate() && birthDate.getMonth() === today.getMonth();
}

/**
 * Retorna o status de contato baseado no último contato
 * Regras exatas do documento:
 * - até 30 dias: Verde
 * - até 60 dias: Amarelo
 * - 90+ dias: Vermelho
 */
export function contatoStatus(ultimo_contato_at: string): {
  label: 'Verde' | 'Amarelo' | 'Vermelho';
  className: string;
} {
  const days = daysSince(ultimo_contato_at);

  if (days <= 30) {
    return {
      label: 'Verde',
      className: 'bg-green-500/20 text-green-400 border-green-500/30',
    };
  } else if (days <= 60) {
    return {
      label: 'Amarelo',
      className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    };
  } else {
    // 90+ dias
    return {
      label: 'Vermelho',
      className: 'bg-red-500/20 text-red-400 border-red-500/30',
    };
  }
}

/**
 * Mapeia status de demanda para label legível
 */
export function statusLabel(statusDemanda: string): string {
  const labels: Record<string, string> = {
    produzida_no_dia: 'Produzida no dia',
    em_andamento: 'Em andamento',
    finalizada: 'Finalizada',
  };
  return labels[statusDemanda] || statusDemanda;
}
