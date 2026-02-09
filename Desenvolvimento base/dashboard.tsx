import React, { useState, useEffect } from 'react';
import {
  Plus,
  Minus,
  Bike,
  User,
  TrendingUp,
  TrendingDown,
  Navigation,
  ChevronRight,
  AlertTriangle,
  Clock,
  LayoutDashboard,
  Wallet,
} from 'lucide-react';

const App = () => {
  // Estados de Interface
  const [tabAtiva, setTabAtiva] = useState('dia'); // 'dia', 'semana', 'mes'
  const [kmAtualInput, setKmAtualInput] = useState('');

  // Dados simulados (No app real viriam do SQLite)
  const [perfil] = useState({
    nome: 'João do Corre',
    kmOntem: 12450,
  });

  const [registros] = useState([
    {
      id: 1,
      tipo: 'ganho',
      categoria: 'iFood',
      valor: 45.5,
      hora: '14:20',
    },
    {
      id: 2,
      tipo: 'despesa',
      categoria: 'Combustível',
      valor: 30.0,
      hora: '13:15',
    },
    {
      id: 3,
      tipo: 'ganho',
      categoria: 'Uber Moto',
      valor: 12.0,
      hora: '12:40',
    },
    {
      id: 4,
      tipo: 'ganho',
      categoria: '99',
      valor: 22.0,
      hora: '11:10',
    },
    {
      id: 5,
      tipo: 'despesa',
      categoria: 'Lanche',
      valor: 15.0,
      hora: '10:30',
    },
  ]);

  // Cálculos de Lucro Baseado na Tab
  const calcularFinanceiro = () => {
    // Simulação de lógica: No real, filtraria por data no SQL
    const ganhos =
      tabAtiva === 'dia'
        ? 195.5
        : tabAtiva === 'semana'
          ? 1240.0
          : 4850.0;
    const gastos =
      tabAtiva === 'dia'
        ? 45.0
        : tabAtiva === 'semana'
          ? 320.0
          : 1100.0;
    const lucro = ganhos - gastos;

    return { ganhos, gastos, lucro };
  };

  const { ganhos, gastos, lucro } = calcularFinanceiro();

  // Cálculo de KM
  const kmRodados = kmAtualInput
    ? parseInt(kmAtualInput) - perfil.kmOntem
    : 0;
  const kmInvalido =
    kmAtualInput && parseInt(kmAtualInput) < perfil.kmOntem;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(val);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-white font-sans overflow-x-hidden max-w-md mx-auto shadow-2xl border-x border-gray-900">
      {/* Header Fixo - Mobile Style */}
      <header className="p-4 flex justify-between items-center border-b border-gray-800 bg-[#121212]/95 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="bg-[#FFD700] p-1.5 rounded-lg text-black shadow-lg">
            <Bike size={20} strokeWidth={3} />
          </div>
          <div>
            <span className="font-black tracking-tighter text-lg uppercase block leading-none">
              Central
            </span>
            <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">
              Controlo Financeiro
            </span>
          </div>
        </div>
        <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700 active:scale-90 transition-transform shadow-inner overflow-hidden">
          <User size={20} className="text-gray-400" />
        </button>
      </header>

      {/* Tabs de Tempo - Mobile Navigation Style */}
      <nav className="flex p-4 gap-2 bg-[#121212]">
        {['dia', 'semana', 'mes'].map((tab) => (
          <button
            key={tab}
            onClick={() => setTabAtiva(tab)}
            className={`flex-1 py-3.5 rounded-2xl font-black text-[10px] uppercase transition-all active:scale-95 ${
              tabAtiva === tab
                ? 'bg-[#FFD700] text-black shadow-[0_8px_20px_rgba(255,215,0,0.15)]'
                : 'bg-gray-900/50 text-gray-500 border border-gray-800'
            }`}
          >
            {tab === 'dia'
              ? 'Hoje'
              : tab === 'semana'
                ? '7 Dias'
                : 'Mensal'}
          </button>
        ))}
      </nav>

      <main className="flex-1 p-4 space-y-6 pb-40">
        {/* Card de Lucro Central - Ergonomia Visual */}
        <section className="bg-[#1e1e1e] rounded-[2rem] p-7 border border-gray-800 shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2 text-gray-400">
              <Wallet size={12} />
              <p className="text-[10px] uppercase font-black tracking-widest">
                Lucro do Período
              </p>
            </div>
            <h2
              className={`text-5xl font-black mb-6 transition-colors duration-500 tracking-tighter ${lucro >= 0 ? 'text-[#00C853]' : 'text-[#D50000]'}`}
            >
              {formatCurrency(lucro)}
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#121212]/50 p-3 rounded-2xl border border-gray-800/50">
                <p className="text-[9px] text-gray-500 uppercase font-bold mb-1">
                  Ganhos
                </p>
                <p className="text-[#00C853] font-black text-sm">
                  {formatCurrency(ganhos)}
                </p>
              </div>
              <div className="bg-[#121212]/50 p-3 rounded-2xl border border-gray-800/50">
                <p className="text-[9px] text-gray-500 uppercase font-bold mb-1">
                  Gastos
                </p>
                <p className="text-[#D50000] font-black text-sm">
                  {formatCurrency(gastos)}
                </p>
              </div>
            </div>
          </div>
          {/* Decoração de fundo sutil */}
          <div className="absolute -right-8 -top-8 opacity-[0.03] rotate-12">
            <LayoutDashboard size={180} />
          </div>
        </section>

        {/* Painel de Quilometragem - Input Mobile-Ready */}
        <section className="bg-[#1e1e1e] rounded-[1.5rem] p-5 border border-gray-800 space-y-4 shadow-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-gray-400">
              <Navigation size={16} />
              <span className="text-[11px] font-black uppercase tracking-wide">
                Diário de Bordo
              </span>
            </div>
            <div className="bg-gray-800/50 px-2 py-1 rounded-md">
              <span className="text-[9px] text-gray-400 font-bold italic uppercase tracking-tighter">
                Ontem: {perfil.kmOntem} km
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <input
                type="number"
                inputMode="numeric"
                placeholder="KM de agora"
                value={kmAtualInput}
                onChange={(e) =>
                  setKmAtualInput(e.target.value)
                }
                className={`w-full bg-[#121212] border-2 rounded-[1.2rem] p-4 font-black text-2xl outline-none transition-all placeholder:text-gray-800 ${
                  kmInvalido
                    ? 'border-[#D50000] text-[#D50000]'
                    : 'border-gray-800 focus:border-[#FFD700]'
                }`}
              />
            </div>
            <div
              className={`h-16 w-20 flex flex-col items-center justify-center rounded-[1.2rem] border-2 transition-all ${
                kmRodados > 0 && !kmInvalido
                  ? 'bg-[#FFD700] border-[#FFD700] text-black shadow-lg'
                  : 'bg-gray-900 border-gray-800 text-gray-600'
              }`}
            >
              <span className="text-[8px] uppercase font-black leading-none">
                Rodagem
              </span>
              <span className="text-xl font-black leading-tight">
                {kmRodados > 0 && !kmInvalido
                  ? `+${kmRodados}`
                  : '0'}
              </span>
            </div>
          </div>

          {kmInvalido && (
            <div className="flex items-center gap-2 text-[#D50000] bg-[#D50000]/10 p-3 rounded-xl border border-[#D50000]/20 text-[10px] font-bold animate-pulse">
              <AlertTriangle size={14} />
              <span>
                O KM atual não pode ser menor que o de
                ontem.
              </span>
            </div>
          )}
        </section>

        {/* Lista de Recentes - Mobile List Style */}
        <section className="space-y-4">
          <div className="flex justify-between items-end px-1">
            <div className="space-y-1">
              <h3 className="text-[11px] font-black uppercase text-gray-500 tracking-[0.2em] flex items-center gap-2">
                <Clock size={12} /> Últimas Atividades
              </h3>
            </div>
            <button className="text-[#FFD700] text-[10px] font-black uppercase tracking-tighter flex items-center gap-1 active:opacity-50 transition-opacity">
              Histórico{' '}
              <ChevronRight size={14} strokeWidth={3} />
            </button>
          </div>

          <div className="space-y-3">
            {registros.map((item) => (
              <div
                key={item.id}
                className="bg-[#1e1e1e] p-4 rounded-[1.2rem] border border-gray-800/80 flex justify-between items-center active:bg-gray-800/50 active:scale-[0.98] transition-all touch-manipulation"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      item.tipo === 'ganho'
                        ? 'bg-[#00C853]/10 text-[#00C853]'
                        : 'bg-[#D50000]/10 text-[#D50000]'
                    }`}
                  >
                    {item.tipo === 'ganho' ? (
                      <TrendingUp size={22} />
                    ) : (
                      <TrendingDown size={22} />
                    )}
                  </div>
                  <div>
                    <p className="font-black text-sm leading-tight text-gray-200">
                      {item.categoria}
                    </p>
                    <p className="text-[10px] text-gray-500 font-bold mt-0.5">
                      {item.hora} •{' '}
                      {item.tipo === 'ganho'
                        ? 'Rendimento'
                        : 'Despesa'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-black text-[15px] ${item.tipo === 'ganho' ? 'text-[#00C853]' : 'text-gray-100'}`}
                  >
                    {item.tipo === 'ganho' ? '+' : '-'}{' '}
                    {formatCurrency(item.valor)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Action Buttons (FABs) - Thumb Ergonomics */}
      <div className="fixed bottom-0 left-0 right-0 p-6 flex justify-center items-end gap-5 bg-gradient-to-t from-[#121212] via-[#121212]/95 to-transparent pointer-events-none z-40">
        {/* Despesa - Left Side */}
        <button className="pointer-events-auto h-16 w-16 bg-[#D50000] text-white rounded-2xl flex items-center justify-center shadow-xl active:scale-90 transition-all border-4 border-[#121212] flex-col">
          <Minus size={28} strokeWidth={4} />
          <span className="text-[8px] font-black uppercase mt-0.5">
            Saída
          </span>
        </button>

        {/* Ganho - Center Main */}
        <button className="pointer-events-auto h-22 w-22 bg-[#00C853] text-white rounded-[2rem] flex flex-col items-center justify-center shadow-[0_15px_40px_rgba(0,200,83,0.3)] active:scale-90 transition-all border-4 border-[#121212]">
          <Plus size={36} strokeWidth={4} />
          <span className="text-[10px] font-black uppercase mt-1">
            Ganhos
          </span>
        </button>

        {/* Navigation - Right Side */}
        <button className="pointer-events-auto h-16 w-16 bg-gray-800 text-white rounded-2xl flex items-center justify-center shadow-xl active:scale-90 transition-all border-4 border-[#121212] flex-col">
          <Navigation size={24} strokeWidth={2.5} />
          <span className="text-[8px] font-black uppercase mt-1">
            Rota
          </span>
        </button>
      </div>
    </div>
  );
};

export default App;
