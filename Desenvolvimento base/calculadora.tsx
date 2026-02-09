import React, { useState, useEffect, useRef } from 'react';
import {
  Fuel,
  ChevronLeft,
  Droplet,
  Zap,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

const App = () => {
  // Estados para os preços (armazenados como strings para facilitar a máscara)
  const [alcool, setAlcool] = useState('');
  const [gasolina, setGasolina] = useState('');

  // Referência para o primeiro input (foco automático)
  const gasolinaRef = useRef(null);

  // Foco inicial no campo de Gasolina (Dica 5 do Canvas)
  useEffect(() => {
    if (gasolinaRef.current) {
      gasolinaRef.current.focus();
    }
  }, []);

  // Máscara de moeda simples (589 -> 5,89)
  const formatInput = (value) => {
    const cleanValue = value.replace(/\D/g, '');
    if (!cleanValue) return '';
    const numericValue = parseFloat(cleanValue) / 100;
    return numericValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const getNumeric = (value) => {
    if (!value) return 0;
    return parseFloat(
      value.replace(/\./g, '').replace(',', '.'),
    );
  };

  const pAlcool = getNumeric(alcool);
  const pGasolina = getNumeric(gasolina);

  // Lógica de Cálculo (Seção 2.1 do Canvas)
  const ratio = pGasolina > 0 ? pAlcool / pGasolina : null;
  const compensaAlcool = ratio !== null && ratio < 0.7;
  const vantagem =
    ratio !== null
      ? (Math.abs(1 - ratio / 0.7) * 100).toFixed(0)
      : 0;

  // Definição de Cores Dinâmicas (Feedback Visual 1.1)
  const colorScheme = compensaAlcool
    ? {
        bg: 'bg-[#00C853]',
        text: 'text-black',
        icon: <Droplet size={48} />,
        label: 'ABASTEÇA COM ÁLCOOL',
      }
    : {
        bg: 'bg-[#1e293b]',
        text: 'text-[#FFD700]',
        icon: <Zap size={48} />,
        label: 'GASOLINA É MELHOR',
      };

  // Caso não haja dados suficientes ainda
  const hasData = pAlcool > 0 && pGasolina > 0;

  return (
    <div
      className={`flex flex-col min-h-screen font-sans transition-colors duration-700 max-w-md mx-auto overflow-hidden ${hasData ? colorScheme.bg : 'bg-[#121212]'}`}
    >
      {/* Header */}
      <header className="p-6 flex items-center gap-4">
        <button
          className={`p-2 rounded-full active:scale-90 transition-all ${hasData ? 'bg-black/20 text-current' : 'bg-gray-800 text-gray-400'}`}
        >
          <ChevronLeft size={24} />
        </button>
        <h1
          className={`text-xl font-black uppercase tracking-tighter ${hasData ? colorScheme.text : 'text-white'}`}
        >
          Calculadora Flex
        </h1>
      </header>

      <main className="flex-1 px-6 flex flex-col">
        {/* Painel de Entrada */}
        <section
          className={`p-6 rounded-[2rem] space-y-6 transition-all duration-500 ${hasData ? 'bg-black/10' : 'bg-[#1e1e1e] border border-gray-800'}`}
        >
          <div className="space-y-2">
            <label
              className={`text-[10px] font-black uppercase tracking-widest ${hasData ? 'opacity-60' : 'text-gray-500'}`}
            >
              Preço da Gasolina (R$)
            </label>
            <div className="relative">
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 text-xl font-bold ${hasData ? 'opacity-40' : 'text-gray-700'}`}
              >
                R$
              </span>
              <input
                ref={gasolinaRef}
                type="text"
                inputMode="numeric"
                placeholder="0,00"
                value={gasolina}
                onChange={(e) =>
                  setGasolina(formatInput(e.target.value))
                }
                className={`w-full bg-transparent border-b-2 py-2 pl-8 text-4xl font-black outline-none transition-all ${hasData ? 'border-current' : 'border-gray-800 focus:border-[#FFD700]'}`}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              className={`text-[10px] font-black uppercase tracking-widest ${hasData ? 'opacity-60' : 'text-gray-500'}`}
            >
              Preço do Álcool (R$)
            </label>
            <div className="relative">
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 text-xl font-bold ${hasData ? 'opacity-40' : 'text-gray-700'}`}
              >
                R$
              </span>
              <input
                type="text"
                inputMode="numeric"
                placeholder="0,00"
                value={alcool}
                onChange={(e) =>
                  setAlcool(formatInput(e.target.value))
                }
                className={`w-full bg-transparent border-b-2 py-2 pl-8 text-4xl font-black outline-none transition-all ${hasData ? 'border-current' : 'border-gray-800 focus:border-[#FFD700]'}`}
              />
            </div>
          </div>
        </section>

        {/* Painel de Resultado (Destaque Central) */}
        <section className="flex-1 flex flex-col items-center justify-center py-8">
          {!hasData ? (
            <div className="text-center space-y-4 opacity-30">
              <Fuel
                size={80}
                className="mx-auto text-gray-600"
              />
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest px-8">
                Insira os preços para saber qual compensa
                mais
              </p>
            </div>
          ) : (
            <div
              className={`text-center animate-in zoom-in duration-300 ${colorScheme.text}`}
            >
              <div className="mb-4 flex justify-center drop-shadow-lg">
                {colorScheme.icon}
              </div>
              <h2 className="text-4xl font-black leading-none mb-2 tracking-tighter">
                {colorScheme.label}
              </h2>
              <div className="inline-flex items-center gap-2 bg-black/10 px-4 py-2 rounded-full border border-current/20">
                {compensaAlcool ? (
                  <CheckCircle2 size={16} />
                ) : (
                  <AlertCircle size={16} />
                )}
                <span className="text-xs font-black uppercase tracking-tighter">
                  Economia de aprox. {vantagem}%
                </span>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Botão de Ação e Rodapé */}
      <footer className="p-6 space-y-4">
        {hasData && (
          <button
            className={`w-full h-16 rounded-2xl flex items-center justify-between px-6 font-black text-sm uppercase tracking-widest transition-all active:scale-95 shadow-2xl ${compensaAlcool ? 'bg-black text-white' : 'bg-[#FFD700] text-black'}`}
          >
            <span>Anotar Abastecimento</span>
            <ArrowRight size={20} />
          </button>
        )}

        <div
          className={`flex items-start gap-3 p-4 rounded-xl border border-current/10 ${hasData ? 'bg-black/5 text-current opacity-80' : 'bg-gray-900/50 text-gray-500 border-gray-800'}`}
        >
          <Info size={18} className="shrink-0 mt-0.5" />
          <p className="text-[10px] font-bold leading-tight uppercase tracking-tight">
            O álcool compensa se custar até 70% do preço da
            gasolina. Baseado na média de eficiência dos
            motores flex.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
