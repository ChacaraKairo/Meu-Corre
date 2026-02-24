import React, { useState } from 'react';
import {
  ArrowLeft,
  HelpCircle,
  Fuel,
  X,
  TrendingUp,
  Zap,
  CheckCircle2,
  Calculator,
  Info,
  Beaker,
  Gauge,
} from 'lucide-react';

/**
 * TELA DE CALCULADORA FLEX - PROTÓTIPO V4
 * Identidade Visual: Verde e Preto (#00C853 / #0A0A0A)
 * Foco: Explicação técnica detalhada sobre a transição para a regra dos 75%.
 */
export default function App() {
  const [precoEtanol, setPrecoEtanol] = useState('');
  const [precoGasolina, setPrecoGasolina] = useState('');
  const [modalAjuda, setModalAjuda] = useState(false);

  // Lógica de cálculo: Etanol / Gasolina <= 0.75
  const calcularVantagem = () => {
    const alc = parseFloat(precoEtanol);
    const gas = parseFloat(precoGasolina);

    if (!alc || !gas) return null;

    const paridade = (alc / gas) * 100;
    const compensaEtanol = paridade <= 75;

    return {
      compensaEtanol,
      paridade: paridade.toFixed(1),
      limiteEtanol: (gas * 0.75).toFixed(2),
    };
  };

  const resultado = calcularVantagem();

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-white font-sans overflow-hidden relative">
      {/* POPUP: EXPLICAÇÃO DETALHADA TÉCNICA */}
      {modalAjuda && (
        <div className="absolute inset-0 z-[100] bg-black/95 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto">
          <div className="p-6 pt-20 pb-12">
            <button
              onClick={() => setModalAjuda(false)}
              className="absolute top-12 right-6 p-3 bg-[#161616] rounded-2xl border border-[#222] text-[#666] active:scale-95"
            >
              <X size={24} />
            </button>

            <div className="space-y-6">
              <div className="flex flex-col items-center text-center mb-4">
                <div className="p-4 bg-[#00C853]/10 rounded-full mb-4">
                  <Calculator
                    size={40}
                    className="text-[#00C853]"
                  />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tighter">
                  Entenda a Matemática
                </h2>
                <p className="text-[#00C853] text-[10px] font-black uppercase tracking-[2px] mt-2 italic">
                  Por que os 70% ficaram para trás?
                </p>
              </div>

              {/* Tópico 1: Gasolina E30 */}
              <div className="bg-[#161616] p-6 rounded-[32px] border border-[#222]">
                <div className="flex items-center gap-3 mb-3">
                  <Beaker
                    size={20}
                    className="text-yellow-500"
                  />
                  <h3 className="text-yellow-500 font-black text-sm uppercase">
                    A Nova Gasolina (E30)
                  </h3>
                </div>
                <p className="text-[#888] text-xs leading-relaxed">
                  Desde agosto de 2025, a gasolina comum no
                  Brasil passou a ter{' '}
                  <span className="text-white font-bold">
                    30% de etanol anidro
                  </span>{' '}
                  (antes era 27%). Isso significa que a
                  gasolina ficou "menos pura" e rende menos
                  quilómetros por litro, o que aproxima o
                  custo-benefício dos dois combustíveis.
                </p>
              </div>

              {/* Tópico 2: Eficiência Flex */}
              <div className="bg-[#161616] p-6 rounded-[32px] border border-[#222]">
                <div className="flex items-center gap-3 mb-3">
                  <Zap
                    size={20}
                    className="text-[#00C853]"
                  />
                  <h3 className="text-[#00C853] font-black text-sm uppercase">
                    Motores Inteligentes
                  </h3>
                </div>
                <p className="text-[#888] text-xs leading-relaxed">
                  Os carros flex fabricados nos últimos anos
                  possuem sistemas de injeção e taxas de
                  compressão muito mais eficientes com o
                  combustível vegetal. O etanol agora rende
                  mais do que rendia antigamente em relação
                  à gasolina.
                </p>
              </div>

              {/* Tópico 3: Cálculo Pessoal */}
              <div className="bg-[#161616] p-6 rounded-[32px] border border-[#222]">
                <div className="flex items-center gap-3 mb-3">
                  <Gauge
                    size={20}
                    className="text-blue-500"
                  />
                  <h3 className="text-blue-500 font-black text-sm uppercase">
                    Seja Preciso
                  </h3>
                </div>
                <p className="text-[#888] text-xs mb-4 leading-relaxed">
                  A regra dos 75% é uma média nacional
                  segura. Mas queres ser exato? Faz o
                  seguinte:
                </p>
                <div className="bg-[#0A0A0A] p-4 rounded-2xl border border-[#222] space-y-2">
                  <p className="text-[10px] text-white font-bold italic">
                    1. Vê quanto o teu veículo faz por litro
                    no Etanol (ex: 9km/l)
                  </p>
                  <p className="text-[10px] text-white font-bold italic">
                    2. Vê quanto faz na Gasolina (ex:
                    12km/l)
                  </p>
                  <p className="text-[10px] text-white font-bold italic">
                    3. Divide um pelo outro:{' '}
                    <span className="text-[#00C853]">
                      9 ÷ 12 = 0,75
                    </span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setModalAjuda(false)}
                className="w-full py-5 bg-[#00C853] rounded-[24px] text-[#0A0A0A] text-xs font-black uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-green-900/20"
              >
                Tudo certo, vamos rodar!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="pt-14 px-6 pb-6 flex items-center justify-between border-b border-[#161616]">
        <button
          className="p-2 bg-[#161616] rounded-xl border border-[#222] text-[#666] active:scale-95"
          onClick={() => alert('Voltar')}
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-sm font-black uppercase tracking-[3px] text-[#00C853]">
          Calculadora Flex
        </h1>
        <button
          onClick={() => setModalAjuda(true)}
          className="p-2 bg-[#00C853]/10 rounded-xl border border-[#00C853]/20 text-[#00C853] active:scale-95 shadow-lg"
        >
          <HelpCircle size={20} />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-8 space-y-10 no-scrollbar">
        {/* INPUTS DE PREÇO */}
        <section className="space-y-8">
          <div className="flex flex-col">
            <label className="text-xs font-black text-[#00C853] uppercase tracking-[2px] ml-1 mb-3">
              Preço do Etanol (Litro)
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-lg font-black text-[#00C853]">
                R$
              </span>
              <input
                type="number"
                placeholder="0.00"
                className="w-full bg-[#161616] border border-[#222] rounded-[32px] p-8 pl-14 text-4xl font-[900] outline-none focus:border-[#00C853] transition-all text-[#00C853] placeholder:text-[#00C853]/20"
                value={precoEtanol}
                onChange={(e) =>
                  setPrecoEtanol(e.target.value)
                }
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-black text-yellow-500 uppercase tracking-[2px] ml-1 mb-3">
              Preço da Gasolina (Litro)
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-lg font-black text-yellow-500">
                R$
              </span>
              <input
                type="number"
                placeholder="0.00"
                className="w-full bg-[#161616] border border-[#222] rounded-[32px] p-8 pl-14 text-4xl font-[900] outline-none focus:border-yellow-500 transition-all text-yellow-500 placeholder:text-yellow-500/20"
                value={precoGasolina}
                onChange={(e) =>
                  setPrecoGasolina(e.target.value)
                }
              />
            </div>
          </div>
        </section>

        {/* RESULTADO DINÂMICO */}
        <section className="relative">
          {resultado ? (
            <div
              className={`p-8 rounded-[40px] border transition-all duration-500 text-center shadow-2xl ${
                resultado.compensaEtanol
                  ? 'bg-[#00C853]/5 border-[#00C853]/30'
                  : 'bg-yellow-500/5 border-yellow-500/30'
              }`}
            >
              <p className="text-[10px] font-black text-[#666] uppercase tracking-[3px] mb-2">
                Ponto de Equilíbrio:
              </p>
              <h2
                className={`text-5xl font-[900] uppercase tracking-tighter mb-6 ${
                  resultado.compensaEtanol
                    ? 'text-[#00C853]'
                    : 'text-yellow-500'
                }`}
              >
                {resultado.compensaEtanol
                  ? 'Etanol'
                  : 'Gasolina'}
              </h2>

              <div className="flex items-center justify-center gap-8 pt-6 border-t border-white/5">
                <div className="text-center">
                  <p className="text-[9px] font-black text-[#444] uppercase mb-1">
                    Rendimento
                  </p>
                  <p
                    className={`text-xl font-black ${resultado.compensaEtanol ? 'text-[#00C853]' : 'text-yellow-500'}`}
                  >
                    {resultado.paridade}%
                  </p>
                </div>
                <div className="w-px h-10 bg-white/5" />
                <div className="text-center">
                  <p className="text-[9px] font-black text-[#444] uppercase mb-1">
                    Limite Etanol
                  </p>
                  <p className="text-xl font-black text-white">
                    R$ {resultado.limiteEtanol}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-10 rounded-[40px] border border-dashed border-[#222] bg-[#0A0A0A] text-center">
              <Fuel
                size={40}
                className="text-[#161616] mx-auto mb-4"
              />
              <p className="text-sm font-bold text-[#333] uppercase tracking-widest leading-relaxed">
                Insira os preços
                <br />
                para o diagnóstico
              </p>
            </div>
          )}
        </section>

        {/* EXPLICAÇÃO RESUMIDA (FIXA) */}
        <section className="bg-[#111] p-8 rounded-[32px] border border-[#161616] mb-10">
          <div className="flex items-start gap-4 text-left">
            <div className="p-3 bg-[#00C853]/10 rounded-2xl">
              <Info size={22} className="text-[#00C853]" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest mb-2 text-white">
                Cálculo Atualizado
              </h3>
              <p className="text-xs text-[#666] leading-relaxed">
                O ponto de viragem agora é de{' '}
                <strong className="text-[#00C853] font-black">
                  75%
                </strong>
                . Se o álcool custar menos de 75% da
                gasolina, ele é financeiramente superior
                para motores modernos e para a nova mistura
                E30.
              </p>
            </div>
          </div>
        </section>
      </main>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        input[type="number"]::-webkit-inner-spin-button, 
        input[type="number"]::-webkit-outer-spin-button { 
          -webkit-appearance: none; 
          margin: 0; 
        }
      `,
        }}
      />
    </div>
  );
}
