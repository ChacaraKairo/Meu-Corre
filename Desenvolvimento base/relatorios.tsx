import React, { useState } from 'react';
import {
  ArrowLeft,
  FileText,
  BookOpen,
  ShieldCheck,
  Send,
  ChevronRight,
  PieChart,
  BarChart3,
  History,
  Download,
  Share2,
  AlertCircle,
  Briefcase,
  Smartphone,
  Info,
  Clock,
  MapPin,
  ClipboardCheck,
  Zap,
  Building2,
} from 'lucide-react';

/**
 * TELA DE SELEÇÃO DE RELATÓRIOS - PROTÓTIPO V3
 * Identidade Visual: Verde e Preto (#00C853 / #0A0A0A)
 * Alterações:
 * - Expansão da lista de relatórios necessários para o "corre" profissional.
 * - Adição de métricas de horas, rodagem e suporte ao MEI.
 * - Navegação limpa com ChevronRight.
 */
export default function App() {
  const [modalEnvio, setModalEnvio] = useState(false);

  // Relatórios Focados no Dia a Dia e Performance
  const relatoriosOperacionais = [
    {
      id: 'plataformas',
      titulo: 'Ganhos por Plataforma',
      desc: 'Qual app rende mais no final do mês?',
      icon: (
        <Smartphone size={22} className="text-[#00C853]" />
      ),
    },
    {
      id: 'horas_trabalhadas',
      titulo: 'Ganhos por Hora',
      desc: 'Descobre o valor real da tua hora no asfalto.',
      icon: <Clock size={22} className="text-[#00C853]" />,
    },
    {
      id: 'eficiencia',
      titulo: 'Eficiência por KM',
      desc: 'Lucro líquido vs desgaste real do veículo.',
      icon: <Zap size={22} className="text-[#00C853]" />,
    },
    {
      id: 'despesas',
      titulo: 'Gastos por Categoria',
      desc: 'Onde estás a gastar mais: comida ou combustível?',
      icon: (
        <PieChart size={22} className="text-[#00C853]" />
      ),
    },
  ];

  // Relatórios de Manutenção e Património
  const relatoriosVeiculo = [
    {
      id: 'historico_manutencao',
      titulo: 'Histórico de Peças',
      desc: 'Tudo o que já trocaste e quanto custou.',
      icon: (
        <ClipboardCheck
          size={22}
          className="text-orange-500"
        />
      ),
    },
    {
      id: 'consumo_medio',
      titulo: 'Consumo Médio',
      desc: 'Média de KM/L por período e combustível.',
      icon: (
        <MapPin size={22} className="text-orange-500" />
      ),
    },
  ];

  // Relatórios para Impostos e Contabilidade
  const relatoriosContabeis = [
    {
      id: 'livro_caixa',
      titulo: 'Livro Caixa Mensal',
      desc: 'Essencial para deduzir despesas no imposto.',
      icon: (
        <BookOpen size={22} className="text-[#2196F3]" />
      ),
    },
    {
      id: 'mei_das',
      titulo: 'Relatório MEI / DAS',
      desc: 'Faturamento bruto para declaração anual.',
      icon: (
        <Building2 size={22} className="text-[#2196F3]" />
      ),
    },
    {
      id: 'rendimentos',
      titulo: 'Informe de Rendimentos',
      desc: 'Documento base para o IRPF.',
      icon: (
        <FileText size={22} className="text-[#2196F3]" />
      ),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-white font-sans overflow-hidden text-left">
      {/* MODAL DE ENVIO AO CONTADOR */}
      {modalEnvio && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-[#161616] w-full max-w-sm rounded-[32px] border border-[#222] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#00C853]/10 p-4 rounded-full mb-4">
                <Send
                  size={32}
                  className="text-[#00C853]"
                />
              </div>
              <h2 className="text-xl font-black mb-2 uppercase tracking-tighter">
                Enviar Dados?
              </h2>
              <p className="text-[#666] text-xs mb-6 leading-relaxed">
                Iremos exportar o{' '}
                <span className="text-white font-bold">
                  Livro Caixa
                </span>{' '}
                e os registos fiscais para o teu contador.
              </p>

              <div className="flex flex-col gap-3 w-full">
                <button
                  onClick={() => {
                    alert('Dados enviados com sucesso!');
                    setModalEnvio(false);
                  }}
                  className="w-full py-4 bg-[#00C853] rounded-2xl text-[#0A0A0A] text-xs font-black uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-green-900/20"
                >
                  Confirmar Envio
                </button>
                <button
                  onClick={() => setModalEnvio(false)}
                  className="w-full py-4 bg-[#202020] rounded-2xl text-xs font-black uppercase tracking-widest text-[#666] active:scale-95 transition-all"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="pt-14 px-6 pb-6 border-b border-[#161616] bg-[#0A0A0A] z-10">
        <div className="flex items-center gap-4">
          <button
            className="p-2 bg-[#161616] rounded-xl border border-[#222] text-[#666] active:scale-95"
            onClick={() => alert('Voltar')}
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-lg font-black uppercase tracking-tight leading-none">
              Central de Relatórios
            </h1>
            <p className="text-[#444] text-[10px] font-black uppercase tracking-widest mt-1">
              Dados para crescimento
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-6 pb-32 no-scrollbar space-y-8">
        {/* BOTÃO DESTAQUE: CARNÊ LEÃO (Sempre visível no topo) */}
        <section>
          <button
            onClick={() =>
              alert('Abrir Tela Dedicada: Carnê-Leão')
            }
            className="w-full bg-[#2196F3]/10 border border-[#2196F3]/30 rounded-[32px] p-6 flex items-center justify-between group active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="bg-[#2196F3] p-3 rounded-2xl shadow-lg shadow-blue-900/20">
                <ShieldCheck
                  size={28}
                  className="text-white"
                />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-black uppercase tracking-tight text-white">
                  Carnê-Leão
                </h3>
                <p className="text-[10px] font-bold text-[#2196F3] uppercase tracking-widest">
                  Controle Mensal de Impostos
                </p>
              </div>
            </div>
            <ChevronRight
              size={20}
              className="text-[#2196F3]"
            />
          </button>
        </section>

        {/* SECÇÃO: OPERAÇÃO E PERFORMANCE */}
        <section className="space-y-4">
          <h2 className="text-[#666] text-[10px] font-black uppercase tracking-[3px] ml-2">
            Performance Profissional
          </h2>
          <div className="space-y-3">
            {relatoriosOperacionais.map((rel) => (
              <button
                key={rel.id}
                onClick={() =>
                  alert(`Visualizar: ${rel.titulo}`)
                }
                className="w-full bg-[#161616] border border-[#222] rounded-3xl p-5 flex items-center justify-between group active:bg-[#1a1a1a] transition-all"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="bg-[#0A0A0A] p-3 rounded-xl border border-[#222]">
                    {rel.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white uppercase tracking-tight">
                      {rel.titulo}
                    </h4>
                    <p className="text-[10px] text-[#444] font-medium leading-tight mt-0.5">
                      {rel.desc}
                    </p>
                  </div>
                </div>
                <ChevronRight
                  size={18}
                  className="text-[#222] group-hover:text-[#00C853] transition-colors"
                />
              </button>
            ))}
          </div>
        </section>

        {/* SECÇÃO: GESTÃO DO VEÍCULO */}
        <section className="space-y-4">
          <h2 className="text-[#666] text-[10px] font-black uppercase tracking-[3px] ml-2">
            Frota e Manutenção
          </h2>
          <div className="space-y-3">
            {relatoriosVeiculo.map((rel) => (
              <button
                key={rel.id}
                onClick={() =>
                  alert(`Visualizar: ${rel.titulo}`)
                }
                className="w-full bg-[#161616] border border-[#222] rounded-3xl p-5 flex items-center justify-between group active:bg-[#1a1a1a] transition-all"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="bg-[#0A0A0A] p-3 rounded-xl border border-[#222]">
                    {rel.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white uppercase tracking-tight">
                      {rel.titulo}
                    </h4>
                    <p className="text-[10px] text-[#444] font-medium leading-tight mt-0.5">
                      {rel.desc}
                    </p>
                  </div>
                </div>
                <ChevronRight
                  size={18}
                  className="text-[#222] group-hover:text-orange-500 transition-colors"
                />
              </button>
            ))}
          </div>
        </section>

        {/* SECÇÃO: FISCO E CONTABILIDADE */}
        <section className="space-y-4">
          <h2 className="text-[#666] text-[10px] font-black uppercase tracking-[3px] ml-2">
            Fisco e Obrigações
          </h2>
          <div className="space-y-3">
            {relatoriosContabeis.map((rel) => (
              <button
                key={rel.id}
                onClick={() =>
                  alert(`Visualizar: ${rel.titulo}`)
                }
                className="w-full bg-[#161616] border border-[#222] rounded-3xl p-5 flex items-center justify-between group active:bg-[#1a1a1a] transition-all"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="bg-[#0A0A0A] p-3 rounded-xl border border-[#222]">
                    {rel.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white uppercase tracking-tight">
                      {rel.titulo}
                    </h4>
                    <p className="text-[10px] text-[#444] font-medium leading-tight mt-0.5">
                      {rel.desc}
                    </p>
                  </div>
                </div>
                <ChevronRight
                  size={18}
                  className="text-[#222] group-hover:text-[#2196F3] transition-colors"
                />
              </button>
            ))}
          </div>
        </section>

        {/* INFO CARD */}
        <div className="p-6 bg-[#161616] rounded-[24px] border border-[#222] flex gap-4 text-left mb-10">
          <AlertCircle
            size={24}
            className="text-orange-500 shrink-0"
          />
          <p className="text-[11px] text-[#555] leading-relaxed">
            Dica Pro: Relatórios de{' '}
            <strong className="text-white">
              Eficiência por KM
            </strong>{' '}
            ajudam-te a decidir se compensa aceitar corridas
            longas ou focar em entregas curtas no bairro.
          </p>
        </div>
      </main>

      {/* FOOTER FIXO: ENVIAR AO CONTADOR */}
      <footer className="fixed bottom-0 left-0 right-0 p-5 bg-[#0A0A0A]/95 backdrop-blur-md border-t border-[#161616] z-50">
        <button
          onClick={() => setModalEnvio(true)}
          className="w-full flex items-center justify-center h-[65px] bg-[#00C853] rounded-2xl gap-3 shadow-lg shadow-green-900/20 active:scale-[0.98] transition-all group"
        >
          <Send
            size={20}
            className="text-[#0A0A0A] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
          />
          <span className="text-[#0A0A0A] text-lg font-[900] tracking-tight uppercase">
            Enviar ao Contador
          </span>
        </button>
      </footer>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `,
        }}
      />
    </div>
  );
}
