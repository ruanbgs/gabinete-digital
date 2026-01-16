export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 font-bold">
              GD
            </div>
            <span className="text-lg font-semibold tracking-tight">Gabinete Digital</span>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            <a className="hover:text-white" href="#como-funciona">
              Como funciona
            </a>
            <a className="hover:text-white" href="#recursos">
              Recursos
            </a>
            <a className="hover:text-white" href="#para-quem">
              Para quem é
            </a>
            <a className="hover:text-white" href="#contato">
              Contato
            </a>
          </nav>

          <a
            href="#contato"
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:opacity-90"
          >
            Quero uma demo
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              Plataforma em desenvolvimento • MVP
            </p>

            <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              Transforme demandas em resultados —{' '}
              <span className="text-white/70">com um Gabinete Online moderno</span>
            </h1>

            <p className="mt-5 text-base leading-relaxed text-white/70">
              Centralize atendimentos, cadastre cidadãos, registre solicitações, acompanhe
              encaminhamentos e gere relatórios do mandato — tudo em um só lugar.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contato"
                className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:opacity-90"
              >
                Quero uma demonstração
              </a>
              <a
                href="#como-funciona"
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Ver como funciona
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 text-center">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-bold">+Organização</p>
                <p className="mt-1 text-xs text-white/60">
                  demandas e atendimentos por status
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-bold">+Controle</p>
                <p className="mt-1 text-xs text-white/60">
                  histórico por cidadão, bairro e tema
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-bold">+Prestação</p>
                <p className="mt-1 text-xs text-white/60">
                  relatórios e indicadores do mandato
                </p>
              </div>
            </div>
          </div>

          {/* Preview Card */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white/80">Painel</p>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                v0.1
              </span>
            </div>

            <div className="mt-6 grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-zinc-950/40 p-4">
                <p className="text-sm font-semibold">Cadastro de Cidadãos</p>
                <p className="mt-1 text-xs text-white/60">
                  Perfil completo, histórico e segmentação por região/tema
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-950/40 p-4">
                <p className="text-sm font-semibold">Demandas e Encaminhamentos</p>
                <p className="mt-1 text-xs text-white/60">
                  Protocolos, responsáveis, prazos e acompanhamento por status
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-950/40 p-4">
                <p className="text-sm font-semibold">Relatórios do Mandato</p>
                <p className="mt-1 text-xs text-white/60">
                  Indicadores por bairro, período, tema e atendimentos concluídos
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs text-white/60">Próximo passo:</p>
              <p className="mt-1 text-sm font-semibold">
                Login + cadastro de demanda + fila de atendimento
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section id="como-funciona" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-bold tracking-tight">Como funciona</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: '1) Cidadão solicita',
                desc: 'A equipe registra a demanda com dados, tema, bairro e prioridade.',
              },
              {
                title: '2) Gabinete encaminha',
                desc: 'Encaminhamento para secretaria/órgão, com responsável e prazos definidos.',
              },
              {
                title: '3) Acompanhamento e histórico',
                desc: 'Status atualizado, comunicação organizada e prestação de contas por período.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="mt-2 text-sm text-white/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recursos */}
      <section id="recursos" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-bold tracking-tight">Recursos principais</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              {
                title: 'Cadastro completo de cidadãos',
                desc: 'Nome, telefone, endereço, bairro, temas, histórico e observações.',
              },
              {
                title: 'Fila de demandas por status',
                desc: 'Aberta, em andamento, encaminhada, concluída, pendente.',
              },
              {
                title: 'Protocolos e encaminhamentos',
                desc: 'Registro de órgãos/secretarias, responsáveis e prazos.',
              },
              {
                title: 'Segmentação inteligente',
                desc: 'Filtro por bairro, tema, prioridade, data, responsável e origem.',
              },
              {
                title: 'Relatórios do mandato',
                desc: 'Atendimentos por período, temas mais recorrentes e performance da equipe.',
              },
              {
                title: 'Agenda e compromissos',
                desc: 'Visitas, reuniões, eventos e lembretes organizados.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="mt-2 text-sm text-white/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Para quem é */}
      <section id="para-quem" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-bold tracking-tight">Para quem é</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: 'Candidatos',
                desc: 'Estruture a base de cidadãos e organize o atendimento desde o início.',
              },
              {
                title: 'Vereadores e Deputados',
                desc: 'Organize gabinete, equipe e demandas com indicadores e relatórios.',
              },
              {
                title: 'Assessoria / Equipe',
                desc: 'Padronize processos, evite perder informações e acompanhe prazos.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="mt-2 text-sm text-white/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-bold tracking-tight">
              Quer ver o Gabinete Digital funcionando?
            </h2>
            <p className="mt-2 text-white/70">
              Solicite uma demonstração do MVP e veja como seria o painel do seu gabinete.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://wa.me/5562000000000?text=Quero%20uma%20demonstracao%20do%20Gabinete%20Digital"
                className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:opacity-90"
              >
                Chamar no WhatsApp
              </a>

              <a
                href="mailto:contato@gabinetedigital.com"
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Enviar e-mail
              </a>
            </div>

            <p className="mt-4 text-xs text-white/50">
              *Dica: depois eu ajusto esse WhatsApp com seu número real.
            </p>
          </div>

          <footer className="mt-10 text-center text-xs text-white/40">
            © {new Date().getFullYear()} Gabinete Digital — MVP em desenvolvimento
          </footer>
        </div>
      </section>
    </main>
  );
}
