import React, { useState } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  CalendarDays,
  TrendingUp,
  TrendingDown,
  Calculator,
  Download,
  Info,
  ExternalLink,
  FileText,
  AlertCircle,
  CheckCircle2,
  Receipt,
} from 'lucide-react';

/**
 * TELA DE CARNÊ-LEÃO - PROTÓTIPO V1
 * Identidade Visual: Azul e Preto (#2196F3 / #0A0A0A) - Diferenciada para área fiscal.
 * Foco: Cálculo de imposto mensal e dedução via Livro Caixa.
 */
export default function App() {
  const [mesRef, setMesRef] = useState(new Date());
  const [pago, setPago] = useState(false);

  // Dados Simulados para o cálculo do Carnê-Leão
  const dadosFiscais = {
    faturamentoBruto: 5200.0,
    despesasDedutiveis: 1850.4, // Combustível, manutenção, etc.
    baseCalculo: 3349.6,
    aliquota: 15,
    impostoDevido: 187.44,
  };

  const mudarMes = (direcao) => {
    const novoMes = new Date(mesRef);
    novoMes.setMonth(mesRef.getMonth() + direcao);
    setMesRef(novoMes);
    setPago(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-white font-sans overflow-hidden text-left">
      {/* HEADER */}
      <header className="pt-14 px-6 pb-4 border-b border-[#161616] bg-[#0A0A0A] z-20">
        <div className="flex items-center justify-between mb-6">
          <button
            className="p-2 bg-[#161616] rounded-xl border border-[#222] text-[#666] active:scale-95"
            onClick={() => alert('Voltar')}
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col items-center">
            <h1 className="text-sm font-black uppercase tracking-[3px] text-[#2196F3]">
              Carnê-Leão
            </h1>
            <p className="text-[8px] text-[#444] font-black uppercase tracking-widest">
              Segurança Fiscal
            </p>
          </div>
          <button className="p-2 bg-[#161616] rounded-xl border border-[#222] text-[#666] active:scale-95">
            <Info size={20} />
          </button>
        </div>

        {/* SELETOR DE MÊS */}
        <div className="flex items-center justify-between px-2 py-3 bg-[#111] rounded-2xl border border-[#222]">
          <button
            onClick={() => mudarMes(-1)}
            className="p-2 text-[#444] hover:text-[#2196F3] transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            <CalendarDays
              size={18}
              className="text-[#2196F3]"
            />
            <span className="text-sm font-[900] uppercase tracking-widest text-white">
              {mesRef.toLocaleDateString('pt-PT', {
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
          <button
            onClick={() => mudarMes(1)}
            className="p-2 text-[#444] hover:text-[#2196F3] transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-6 pb-32 no-scrollbar space-y-6">
        {/* RESUMO DO IMPOSTO */}
        <section
          className={`rounded-[40px] p-8 border transition-all duration-500 shadow-2xl relative overflow-hidden ${
            pago
              ? 'bg-[#00C853]/5 border-[#00C853]/20'
              : 'bg-[#2196F3]/5 border-[#2196F3]/20'
          }`}
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Receipt
                size={14}
                className={
                  pago ? 'text-[#00C853]' : 'text-[#2196F3]'
                }
              />
              <p className="text-[10px] font-black text-[#666] uppercase tracking-[3px]">
                Imposto a Pagar (DARF)
              </p>
            </div>
            <h2 className="text-5xl font-[950] tracking-tighter mb-6">
              R${' '}
              {dadosFiscais.impostoDevido.toLocaleString(
                'pt-BR',
                { minimumFractionDigits: 2 },
              )}
            </h2>

            <div className="flex items-center gap-3">
              {pago ? (
                <div className="flex items-center gap-2 bg-[#00C853] px-4 py-2 rounded-xl text-[#0A0A0A] font-black text-[10px] uppercase">
                  <CheckCircle2 size={14} /> Quitado
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-[#F59E0B]/10 px-4 py-2 rounded-xl text-[#F59E0B] border border-[#F59E0B]/20 font-black text-[10px] uppercase animate-pulse">
                  <AlertCircle size={14} /> Aguardando
                  Pagamento
                </div>
              )}
              <span className="text-[10px] font-bold text-[#444] uppercase">
                Vencimento: 10/03/2026
              </span>
            </div>
          </div>
          <ShieldCheck
            size={120}
            className={`absolute -right-6 -top-6 opacity-[0.03] -rotate-12 ${pago ? 'text-[#00C853]' : 'text-[#2196F3]'}`}
          />
        </section>

        {/* DETALHAMENTO DO LIVRO CAIXA */}
        <section className="bg-[#161616] rounded-[32px] p-6 border border-[#222]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[10px] font-black text-[#666] uppercase tracking-[2px]">
              Cálculo Livro Caixa
            </h3>
            <Calculator size={18} className="text-[#444]" />
          </div>

          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] font-black text-[#444] uppercase mb-1">
                  Rendimentos Brutos
                </p>
                <p className="text-lg font-black text-white">
                  R${' '}
                  {dadosFiscais.faturamentoBruto.toFixed(2)}
                </p>
              </div>
              <TrendingUp
                size={24}
                className="text-[#00C853] opacity-20"
              />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] font-black text-[#444] uppercase mb-1">
                  Despesas Abatidas (-)
                </p>
                <p className="text-lg font-black text-red-500">
                  R${' '}
                  {dadosFiscais.despesasDedutiveis.toFixed(
                    2,
                  )}
                </p>
              </div>
              <TrendingDown
                size={24}
                className="text-red-500 opacity-20"
              />
            </div>

            <div className="h-px bg-[#222] w-full" />

            <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] font-black text-[#2196F3] uppercase mb-1">
                  Base de Cálculo Final
                </p>
                <p className="text-xl font-black text-white">
                  R$ {dadosFiscais.baseCalculo.toFixed(2)}
                </p>
              </div>
              <div className="px-3 py-1 bg-[#2196F3]/10 rounded-lg border border-[#2196F3]/20">
                <span className="text-[10px] font-black text-[#2196F3]">
                  {dadosFiscais.aliquota}% IRPF
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* DICA FISCAL */}
        <div className="p-6 bg-[#2196F3]/5 rounded-[24px] border border-[#2196F3]/10 flex gap-4">
          <Info
            size={24}
            className="text-[#2196F3] shrink-0"
          />
          <p className="text-[11px] text-[#555] leading-relaxed">
            Dica: Guarde todos os recibos de{' '}
            <strong className="text-white">
              combustível e mecânico
            </strong>
            . Eles foram usados para reduzir a sua base de
            cálculo em{' '}
            <strong className="text-white">
              R${' '}
              {dadosFiscais.despesasDedutiveis.toFixed(0)}
            </strong>{' '}
            este mês.
          </p>
        </div>

        {/* BOTÕES DE AÇÃO */}
        <div className="grid grid-cols-1 gap-3">
          <button
            onClick={() =>
              alert(
                'Gerando Relatório CSV para o Portal e-CAC...',
              )
            }
            className="w-full flex items-center justify-between p-5 bg-[#161616] border border-[#222] rounded-2xl active:scale-[0.98] transition-all group"
          >
            <div className="flex items-center gap-3">
              <FileText
                size={20}
                className="text-[#2196F3]"
              />
              <span className="text-xs font-black uppercase tracking-widest text-[#888]">
                Exportar para o e-CAC
              </span>
            </div>
            <Download
              size={18}
              className="text-[#333] group-hover:text-[#2196F3]"
            />
          </button>

          <button
            onClick={() =>
              window.open(
                'https://www.gov.br/receitafederal',
                '_blank',
              )
            }
            className="w-full flex items-center justify-between p-5 bg-[#161616] border border-[#222] rounded-2xl active:scale-[0.98] transition-all group"
          >
            <div className="flex items-center gap-3">
              <ExternalLink
                size={20}
                className="text-[#2196F3]"
              />
              <span className="text-xs font-black uppercase tracking-widest text-[#888]">
                Aceder Portal Gov.br
              </span>
            </div>
            <ChevronRight
              size={18}
              className="text-[#333]"
            />
          </button>
        </div>
      </main>

      {/* FOOTER FIXO: MARCAR COMO PAGO */}
      {!pago && (
        <footer className="fixed bottom-0 left-0 right-0 p-5 bg-[#0A0A0A]/95 backdrop-blur-md border-t border-[#161616] z-50">
          <button
            onClick={() => {
              setPago(true);
              alert('Pagamento registado no MeuCorre!');
            }}
            className="w-full flex items-center justify-center h-[65px] bg-[#2196F3] rounded-2xl gap-3 shadow-lg shadow-blue-900/20 active:scale-[0.98] transition-all group"
          >
            <ShieldCheck size={24} className="text-white" />
            <span className="text-white text-lg font-[900] tracking-tight uppercase">
              Marcar como Pago
            </span>
          </button>
        </footer>
      )}

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
