export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-white/10 grid place-items-center font-bold">
              GD
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Gabinete Digital
            </span>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            <a className="hover:text-white" href="#como-funciona">
              Como funciona
            </a>
            <a className="hover:text-white" href="#vantagens">
              Vantagens
            </a>
            <a className="hover:text-white" href="#contato">
              Contato
            </a>
          </nav>

          <a
            href="#contato"
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:opacity-90"
          >
            Quero testar
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
              Seu gabinete, seus serviços e seus processos —{' '}
              <span className="text-white/70">organizados no digital</span>
            </h1>

            <p className="mt-5 text-base leading-relaxed text-white/70">
              O Gabinete Digital é um painel moderno para organizar atendimentos,
              ordens, fluxo e comunicação — com foco em rapidez, clareza e escala.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contato"
                className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:opacity-90"
              >
                Solicitar acesso
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
                <p className="text-2xl font-bold">+Rápido</p>
                <p className="mt-1 text-xs text-white/60">fluxo de atendimento</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-bold">+Controle</p>
                <p className="mt-1 text-xs text-white/60">dados e serviços</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-bold">+Escala</p>
                <p className="mt-1 text-xs text-white/60">processos padronizados</p>
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
                <p className="text-sm font-semibold">Ordens de Serviço</p>
                <p className="mt-1 text-xs text-white/60">
                  Cadastro, status e histórico de serviços
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-950/40 p-4">
                <p className="text-sm font-semibold">Clientes e Lojas</p>
                <p className="mt-1 text-xs text-white/60">
                  Organização por parceiros, lojistas e tickets
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-950/40 p-4">
                <p className="text-sm font-semibold">Automação</p>
                <p className="mt-1 text-xs text-white/60">
                  Notificações e atalhos para WhatsApp e cobrança
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs text-white/60">
                Próximo passo:
              </p>
              <p className="mt-1 text-sm font-semibold">
                Login + criação de ordem no painel
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section id="como-funciona" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-bold tracking-tight">
            Como funciona
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: '1) Cliente solicita',
                desc: 'Um parceiro abre uma solicitação com dados do aparelho.',
              },
              {
                title: '2) Você processa',
                desc: 'Você executa o serviço, atualiza o status e registra tudo.',
              },
              {
                title: '3) Fica documentado',
                desc: 'Histórico completo, relatórios e organização por períodos.',
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

      {/* Vantagens */}
      <section id="vantagens" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-bold tracking-tight">
            Vantagens
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              'Menos perda de informação no WhatsApp',
              'Processo padronizado para escalar',
              'Histórico por cliente/loja',
              'Visão financeira por período',
              'Fila de serviço e status em tempo real',
              'Painel para mostrar profissionalismo',
            ].map((text) => (
              <div
                key={text}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/80"
              >
                ✅ {text}
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
              Quer testar o Gabinete Digital?
            </h2>
            <p className="mt-2 text-white/70">
              Me chama e eu libero acesso para você ver o painel (MVP).
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://wa.me/55"
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
          </div>

          <footer className="mt-10 text-center text-xs text-white/40">
            © {new Date().getFullYear()} Gabinete Digital — MVP em desenvolvimento
          </footer>
        </div>
      </section>
    </main>
  );
}
