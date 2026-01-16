import AppShell from '@/components/app/AppShell';
import { formatDateTimeBR } from '@/lib/utils';

// Mock data para agenda
const compromissos = [
  {
    id: 'agenda_1',
    data: new Date().toISOString(),
    titulo: 'Reunião com Secretaria de Saúde',
    local: 'Prefeitura - Sala 203',
    descricao: 'Apresentação do projeto de ampliação da UBS',
  },
  {
    id: 'agenda_2',
    data: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    titulo: 'Visita ao Bairro Asa Norte',
    local: 'Quadra 205',
    descricao: 'Vistoria de demandas de infraestrutura',
  },
  {
    id: 'agenda_3',
    data: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    titulo: 'Reunião de Gabinete',
    local: 'Gabinete',
    descricao: 'Planejamento semanal e revisão de demandas',
  },
];

export default function AgendaPage() {
  return (
    <AppShell title="Agenda">
      <div className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <p className="mb-4 text-lg font-semibold text-white/70">
            Em breve: agenda de atendimentos e compromissos
          </p>
          <p className="text-sm text-white/60">
            Em desenvolvimento: sistema completo de gestão de agenda e compromissos.
          </p>
        </div>

        {/* Compromissos fictícios */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Próximos compromissos</h3>
          {compromissos.map((compromisso) => (
            <div
              key={compromisso.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm text-white/50">{formatDateTimeBR(compromisso.data)}</p>
                  <p className="mt-2 text-lg font-semibold text-white">{compromisso.titulo}</p>
                  <p className="mt-1 text-sm text-white/70">
                    <span className="font-medium">Local:</span> {compromisso.local}
                  </p>
                  <p className="mt-2 text-sm text-white/60">{compromisso.descricao}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
