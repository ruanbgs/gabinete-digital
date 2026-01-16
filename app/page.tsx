import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 font-bold">
              GD
            </div>
            <span className="text-lg font-semibold tracking-tight">Gabinete Digital</span>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            <a className="transition-colors hover:text-white" href="#como-funciona">
              Como funciona
            </a>
            <a className="transition-colors hover:text-white" href="#funcionalidades">
              Funcionalidades
            </a>
            <a className="transition-colors hover:text-white" href="#para-quem">
              Para quem é
            </a>
            <a className="transition-colors hover:text-white" href="#contato">
              Contato
            </a>
          </nav>

          <Link
            href="/dashboard"
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition-opacity hover:opacity-90"
          >
            Ver demo
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            Gabinete Digital
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
            Atendimento via WhatsApp + painel de gestão para demandas e relacionamento com
            cidadãos.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition-opacity hover:opacity-90 md:px-8 md:py-3.5 md:text-base"
            >
              Ver demo
            </Link>
            <a
              href="#contato"
              className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 md:px-8 md:py-3.5 md:text-base"
            >
              Falar com a equipe
            </a>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section id="como-funciona" className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Como funciona
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
              <div className="mb-4 text-3xl">💬</div>
              <h3 className="mb-3 text-xl font-semibold">WhatsApp</h3>
              <p className="text-sm leading-relaxed text-white/70 md:text-base">
                Triagem automática, coleta de dados e abertura de demanda com protocolo.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
              <div className="mb-4 text-3xl">📄</div>
              <h3 className="mb-3 text-xl font-semibold">Ofícios</h3>
              <p className="text-sm leading-relaxed text-white/70 md:text-base">
                Geração de ofício automático com modelos por tipo de demanda.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
              <div className="mb-4 text-3xl">📊</div>
              <h3 className="mb-3 text-xl font-semibold">Dashboard</h3>
              <p className="text-sm leading-relaxed text-white/70 md:text-base">
                Painel com cidadãos, demandas, status, relatórios e exportações.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section id="funcionalidades" className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Funcionalidades
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-2 text-lg font-semibold">Cadastro de cidadãos</h3>
              <p className="text-sm text-white/70">
                Cadastro automático via WhatsApp, com histórico completo e origem identificada.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-2 text-lg font-semibold">Alertas de relacionamento</h3>
              <p className="text-sm text-white/70">
                Sistema de alertas por último contato: verde (≤30 dias), amarelo (≤60 dias),
                vermelho (≥90 dias).
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-2 text-lg font-semibold">Aniversariantes do dia</h3>
              <p className="text-sm text-white/70">
                Lista automática de aniversariantes para fortalecer relacionamento com cidadãos.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-2 text-lg font-semibold">Gestão de demandas</h3>
              <p className="text-sm text-white/70">
                Demandas com status: produzida no dia, em andamento e finalizada, com protocolo
                único.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-2 text-lg font-semibold">Exportação de dados</h3>
              <p className="text-sm text-white/70">
                Exportação em CSV (funcional) e XLSX (em breve) para análise e prestação de
                contas.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-2 text-lg font-semibold">Multi-gabinetes (SaaS)</h3>
              <p className="text-sm text-white/70">
                Plataforma SaaS com múltiplos gabinetes, usuários e níveis de acesso
                (proprietário, coordenador, atendente, leitura).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Para quem é */}
      <section id="para-quem" className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Para quem é
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
              <h3 className="mb-3 text-xl font-semibold">Vereadores e pré-candidatos</h3>
              <p className="text-sm leading-relaxed text-white/70 md:text-base">
                Organize o atendimento desde o início, estruture sua base de cidadãos e construa
                relacionamento contínuo.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
              <h3 className="mb-3 text-xl font-semibold">Assessoria de gabinete</h3>
              <p className="text-sm leading-relaxed text-white/70 md:text-base">
                Padronize processos, evite perder informações, acompanhe prazos e gere relatórios
                do mandato.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
              <h3 className="mb-3 text-xl font-semibold">Lideranças comunitárias</h3>
              <p className="text-sm leading-relaxed text-white/70 md:text-base">
                Gerencie demandas da comunidade, mantenha histórico de atendimentos e fortaleça
                vínculos locais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-8 text-center md:p-12">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Quer ver o Gabinete Digital funcionando?
            </h2>
            <p className="mt-4 text-white/70">
              Acesse a demonstração do painel ou entre em contato com nossa equipe.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition-opacity hover:opacity-90 md:px-8 md:py-3.5 md:text-base"
              >
                Ver demo
              </Link>
              <a
                href="mailto:contato@gabinetedigital.com"
                className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 md:px-8 md:py-3.5 md:text-base"
              >
                Falar com a equipe
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-white/60">
              © {new Date().getFullYear()} Gabinete Digital
            </p>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              Ver demo
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
