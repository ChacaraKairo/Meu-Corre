import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  ChevronLeft,
  Filter,
  Search,
  Smartphone,
  Car,
  Navigation,
  Package,
  Truck,
  Briefcase,
  Fuel,
  Utensils,
  Wrench,
  Plus,
  CalendarDays,
  Target,
  BarChart3,
  Clock, // Adicionado o ícone que estava em falta
} from 'lucide-react';

/**
 * TELA DE HISTÓRICO DE MOVIMENTAÇÕES - PROTÓTIPO V3.1 (Correção de Erros)
 * Identidade Visual: Verde e Preto (#00C853 / #0A0A0A)
 * Correções efetuadas:
 * - Importação do componente Clock.
 * - Estabilização do mapeamento de ícones para evitar erros de renderização de objetos.
 */
export default function App() {
  const [periodo, setPeriodo] = useState('semana'); // 'dia', 'semana', 'mes'
  const [dataRef, setDataRef] = useState(new Date());

  // Mapeamento de ícones para renderização segura
  const iconMap = {
    Smartphone: <Smartphone size={18} />,
    Car: <Car size={18} />,
    Navigation: <Navigation size={18} />,
    Package: <Package size={18} />,
    Truck: <Truck size={18} />,
    Briefcase: <Briefcase size={18} />,
    Fuel: <Fuel size={18} />,
    Utensils: <Utensils size={18} />,
    Wrench: <Wrench size={18} />,
  };

  const getLabelData = () => {
    if (periodo === 'dia') {
      return dataRef.toLocaleDateString('pt-PT', {
        day: '2-digit',
        month: 'short',
      });
    } else if (periodo === 'semana') {
      return '16 Fev - 22 Fev';
    } else {
      return dataRef.toLocaleDateString('pt-PT', {
        month: 'long',
        year: 'numeric',
      });
    }
  };

  const navegar = (direcao) => {
    const novaData = new Date(dataRef);
    if (periodo === 'dia')
      novaData.setDate(dataRef.getDate() + direcao);
    if (periodo === 'semana')
      novaData.setDate(dataRef.getDate() + direcao * 7);
    if (periodo === 'mes')
      novaData.setMonth(dataRef.getMonth() + direcao);
    setDataRef(novaData);
  };

  // Dados simulados
  const dadosResumo = {
    ganhos: 1240.5,
    gastos: 450.2,
    saldo: 790.3,
  };

  const movimentacoes = [
    {
      id: 1,
      tipo: 'ganho',
      categoria: 'iFood',
      valor: 45.8,
      data: '14:20',
      iconId: 'Smartphone',
      cor: '#00C853',
    },
    {
      id: 2,
      tipo: 'despesa',
      categoria: 'Combustível',
      valor: 85.0,
      data: '11:30',
      iconId: 'Fuel',
      cor: '#FFEB3B',
    },
    {
      id: 3,
      tipo: 'ganho',
      categoria: 'Uber',
      valor: 32.4,
      data: '18:45',
      iconId: 'Car',
      cor: '#2196F3',
    },
    {
      id: 4,
      tipo: 'despesa',
      categoria: 'Manutenção',
      valor: 150.0,
      data: '21 Fev',
      iconId: 'Wrench',
      cor: '#FF5252',
    },
    {
      id: 5,
      tipo: 'ganho',
      categoria: 'Mercado Livre',
      valor: 120.0,
      data: '20 Fev',
      iconId: 'Package',
      cor: '#FF9800',
    },
  ];

  const maxVal = Math.max(
    dadosResumo.ganhos,
    dadosResumo.gastos,
  );
  const hGanhos = (dadosResumo.ganhos / maxVal) * 100;
  const hGastos = (dadosResumo.gastos / maxVal) * 100;

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-white font-sans overflow-hidden">
      {/* HEADER FIXO */}
      <header className="pt-14 px-6 pb-4 border-b border-[#161616] bg-[#0A0A0A] z-20">
        <div className="flex items-center justify-between mb-6">
          <button
            className="p-2 bg-[#161616] rounded-xl border border-[#222] text-[#666] active:scale-95"
            onClick={() => alert('Voltar')}
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-sm font-black uppercase tracking-[3px] text-[#00C853]">
            Histórico
          </h1>
          <button className="p-2 bg-[#161616] rounded-xl border border-[#222] text-[#666] active:scale-95">
            <Filter size={20} />
          </button>
        </div>

        {/* TABS DE PERÍODO */}
        <div className="bg-[#111] p-1 rounded-2xl border border-[#1a1a1a] flex mb-4">
          {['dia', 'semana', 'mes'].map((p) => (
            <button
              key={p}
              onClick={() => {
                setPeriodo(p);
                setDataRef(new Date());
              }}
              className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                periodo === p
                  ? 'bg-[#00C853] text-[#0A0A0A] shadow-lg shadow-green-900/20'
                  : 'text-[#444]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* NAVEGAÇÃO DE DATA */}
        <div className="flex items-center justify-between px-2 py-2 bg-[#161616] rounded-2xl border border-[#222]">
          <button
            onClick={() => navegar(-1)}
            className="p-2 text-[#444] active:scale-90 transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <CalendarDays
              size={14}
              className="text-[#00C853]"
            />
            <span className="text-[11px] font-[900] uppercase tracking-widest text-white">
              {getLabelData()}
            </span>
          </div>
          <button
            onClick={() => navegar(1)}
            className="p-2 text-[#444] active:scale-90 transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-6 pb-20 no-scrollbar space-y-6">
        {/* GRÁFICO DE COMPARAÇÃO OTIMIZADO */}
        <section className="bg-[#161616] rounded-[40px] p-8 border border-[#222] shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-2 mb-8 text-left">
            <BarChart3
              size={18}
              className="text-[#00C853]"
            />
            <h2 className="text-[10px] font-black text-[#444] uppercase tracking-[2px]">
              Análise Comparativa
            </h2>
          </div>

          <div className="flex items-end justify-center gap-12 h-36 mb-10">
            {/* Barra Ganhos */}
            <div className="flex flex-col items-center gap-3 w-full max-w-[80px]">
              <div className="relative w-full flex items-end justify-center">
                <div className="absolute -top-6 text-[10px] font-black text-[#00C853]">
                  R${dadosResumo.ganhos.toFixed(0)}
                </div>
                <div className="w-full bg-[#00C853]/10 rounded-2xl h-36 relative overflow-hidden flex items-end">
                  <div
                    className="w-full bg-gradient-to-t from-[#00C853] to-[#00E676] rounded-2xl transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(0,200,83,0.4)]"
                    style={{ height: `${hGanhos}%` }}
                  />
                </div>
              </div>
              <span className="text-[9px] font-black text-white uppercase tracking-widest">
                Ganhos
              </span>
            </div>

            {/* Barra Gastos */}
            <div className="flex flex-col items-center gap-3 w-full max-w-[80px]">
              <div className="relative w-full flex items-end justify-center">
                <div className="absolute -top-6 text-[10px] font-black text-red-500">
                  R${dadosResumo.gastos.toFixed(0)}
                </div>
                <div className="w-full bg-red-600/10 rounded-2xl h-36 relative overflow-hidden flex items-end">
                  <div
                    className="w-full bg-gradient-to-t from-red-600 to-red-400 rounded-2xl transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                    style={{ height: `${hGastos}%` }}
                  />
                </div>
              </div>
              <span className="text-[9px] font-black text-white uppercase tracking-widest">
                Gastos
              </span>
            </div>
          </div>

          {/* RESUMO DE VALORES COM SALDO MAIOR */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0A0A0A]/40 p-4 rounded-3xl border border-[#222] text-left">
                <p className="text-[8px] font-black text-[#444] uppercase mb-1">
                  Entradas
                </p>
                <p className="text-sm font-black text-[#00C853]">
                  R$ {dadosResumo.ganhos.toFixed(2)}
                </p>
              </div>
              <div className="bg-[#0A0A0A]/40 p-4 rounded-3xl border border-[#222] text-left">
                <p className="text-[8px] font-black text-[#444] uppercase mb-1">
                  Saídas
                </p>
                <p className="text-sm font-black text-red-500">
                  R$ {dadosResumo.gastos.toFixed(2)}
                </p>
              </div>
            </div>

            {/* SALDO EM DESTAQUE (MAIOR) */}
            <div className="bg-[#00C853] p-6 rounded-[32px] shadow-lg shadow-green-900/20 flex items-center justify-between text-left">
              <div>
                <p className="text-[9px] font-black text-[#0A0A0A]/60 uppercase tracking-widest mb-1">
                  Saldo Líquido
                </p>
                <h3 className="text-3xl font-[950] text-[#0A0A0A] tracking-tighter">
                  R$ {dadosResumo.saldo.toFixed(2)}
                </h3>
              </div>
              <div className="bg-[#0A0A0A]/10 p-3 rounded-2xl">
                <Target
                  size={28}
                  className="text-[#0A0A0A]"
                  strokeWidth={2.5}
                />
              </div>
            </div>
          </div>
        </section>

        {/* LISTAGEM DE MOVIMENTAÇÕES */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[#444] text-[10px] font-black uppercase tracking-[2px]">
              Histórico de Registos
            </h3>
            <button className="text-[10px] font-black text-[#00C853] uppercase hover:underline">
              Exportar
            </button>
          </div>

          <div className="space-y-3">
            {movimentacoes.map((item) => (
              <div
                key={item.id}
                className="bg-[#161616] rounded-[28px] p-5 border border-[#222] flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: `${item.cor}10`,
                    }}
                  >
                    <div style={{ color: item.cor }}>
                      {iconMap[item.iconId] || (
                        <Briefcase size={18} />
                      )}
                    </div>
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-white uppercase tracking-tight leading-none">
                      {item.categoria}
                    </h4>
                    <p className="text-[10px] text-[#444] font-medium mt-1.5 flex items-center gap-1">
                      <Clock size={10} /> {item.data}
                    </p>
                  </div>
                </div>
                <p
                  className={`text-base font-black ${item.tipo === 'ganho' ? 'text-[#00C853]' : 'text-red-500'}`}
                >
                  {item.tipo === 'ganho' ? '+' : '-'} R$
                  {item.valor.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

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
