import React, { useState, useMemo } from 'react';
import {
  Search,
  TrendingUp,
  TrendingDown,
  Trash2,
  ChevronLeft,
  Filter,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Bike,
  Fuel,
  Utensils,
  Settings,
  MoreHorizontal,
} from 'lucide-react';

const App = () => {
  // --- Estados ---
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('todos'); // 'todos', 'ganho', 'despesa'
  const [itemParaExcluir, setItemParaExcluir] =
    useState(null);
  const [notificacao, setNotificacao] = useState(null);

  // --- Dados Simulados (Mock de SQLite) ---
  const [registros, setRegistros] = useState([
    {
      id: 1,
      tipo: 'ganho',
      categoria: 'iFood',
      valor: 45.0,
      hora: '19:30',
      data: 'Hoje',
    },
    {
      id: 2,
      tipo: 'despesa',
      categoria: 'Combustível',
      valor: 35.0,
      hora: '18:15',
      data: 'Hoje',
    },
    {
      id: 3,
      tipo: 'ganho',
      categoria: 'Uber Moto',
      valor: 12.5,
      hora: '17:00',
      data: 'Hoje',
    },
    {
      id: 4,
      tipo: 'ganho',
      categoria: '99 Moto',
      valor: 28.0,
      hora: '11:20',
      data: 'Ontem',
    },
    {
      id: 5,
      tipo: 'despesa',
      categoria: 'Lanche',
      valor: 18.0,
      hora: '10:45',
      data: 'Ontem',
    },
    {
      id: 6,
      tipo: 'despesa',
      categoria: 'Troca de Óleo',
      valor: 45.0,
      hora: '09:00',
      data: 'Ontem',
    },
    {
      id: 7,
      tipo: 'ganho',
      categoria: 'iFood',
      valor: 150.0,
      hora: '20:00',
      data: '07 de Fevereiro',
    },
    {
      id: 8,
      tipo: 'ganho',
      categoria: 'Particular',
      valor: 50.0,
      hora: '15:30',
      data: '07 de Fevereiro',
    },
  ]);

  // --- Lógica de Filtro e Busca ---
  const registrosFiltrados = useMemo(() => {
    return registros.filter((item) => {
      const matchBusca = item.categoria
        .toLowerCase()
        .includes(busca.toLowerCase());
      const matchFiltro =
        filtro === 'todos' || item.tipo === filtro;
      return matchBusca && matchFiltro;
    });
  }, [registros, busca, filtro]);

  // --- Agrupamento por Data (Sticky Headers) ---
  const grupos = useMemo(() => {
    return registrosFiltrados.reduce((acc, item) => {
      if (!acc[item.data]) acc[item.data] = [];
      acc[item.data].push(item);
      return acc;
    }, {});
  }, [registrosFiltrados]);

  // --- Cálculo do Resumo de Período ---
  const saldoExibido = useMemo(() => {
    return registrosFiltrados.reduce((acc, item) => {
      return item.tipo === 'ganho'
        ? acc + item.valor
        : acc - item.valor;
    }, 0);
  }, [registrosFiltrados]);

  // --- Ações ---
  const confirmarExclusao = () => {
    setRegistros(
      registros.filter((r) => r.id !== itemParaExcluir.id),
    );
    setItemParaExcluir(null);
    setNotificacao('Registro removido com sucesso!');
    setTimeout(() => setNotificacao(null), 3000);
  };

  const getIcon = (cat) => {
    const c = cat.toLowerCase();
    if (
      c.includes('ifood') ||
      c.includes('uber') ||
      c.includes('99')
    )
      return <Bike size={18} />;
    if (c.includes('combustível'))
      return <Fuel size={18} />;
    if (c.includes('lanche')) return <Utensils size={18} />;
    if (c.includes('óleo') || c.includes('manutenção'))
      return <Settings size={18} />;
    return <MoreHorizontal size={18} />;
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(val);
  };

  return (
    <div className="flex flex-col h-screen bg-[#121212] text-white font-sans overflow-hidden max-w-md mx-auto relative">
      {/* Cabeçalho de Busca e Filtros */}
      <header className="p-4 bg-[#121212] border-b border-gray-800 z-30">
        <div className="flex items-center gap-3 mb-4">
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-black uppercase tracking-tight">
            Histórico
          </h1>
        </div>

        {/* Barra de Busca */}
        <div className="relative mb-4">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Buscar por categoria..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-2xl py-3 pl-12 pr-4 text-sm outline-none focus:border-[#FFD700] transition-all"
          />
        </div>

        {/* Filtros Rápidos (Chips) */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {['todos', 'ganho', 'despesa'].map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                filtro === f
                  ? 'bg-[#FFD700] text-black shadow-lg'
                  : 'bg-gray-900 text-gray-500 border border-gray-800'
              }`}
            >
              {f === 'todos'
                ? 'Todos'
                : f === 'ganho'
                  ? 'Ganhos'
                  : 'Despesas'}
            </button>
          ))}
        </div>
      </header>

      {/* Lista de Registros com Sticky Headers */}
      <main className="flex-1 overflow-y-auto pb-32">
        {Object.keys(grupos).length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-600">
            <Calendar
              size={48}
              strokeWidth={1}
              className="mb-2"
            />
            <p className="text-sm font-bold">
              Nenhum registro encontrado
            </p>
          </div>
        ) : (
          Object.entries(grupos).map(([data, items]) => (
            <section key={data}>
              {/* Sticky Header */}
              <div className="sticky top-0 bg-[#121212]/90 backdrop-blur-md px-4 py-2 border-y border-gray-800/50 z-20">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                  {data}
                </span>
              </div>

              {/* Itens da Data */}
              <div className="divide-y divide-gray-800/30 px-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      setItemParaExcluir(item);
                    }}
                    className="flex items-center justify-between p-4 hover:bg-gray-900/50 active:scale-[0.98] transition-all touch-manipulation group"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                          item.tipo === 'ganho'
                            ? 'bg-[#00C853]/10 text-[#00C853]'
                            : 'bg-[#D50000]/10 text-[#D50000]'
                        }`}
                      >
                        {getIcon(item.categoria)}
                      </div>
                      <div>
                        <p className="font-bold text-sm leading-tight text-gray-200">
                          {item.categoria}
                        </p>
                        <p className="text-[10px] text-gray-500 font-bold mt-0.5">
                          {item.hora} •{' '}
                          {item.tipo === 'ganho'
                            ? 'Entrada'
                            : 'Saída'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p
                        className={`font-black text-[15px] ${item.tipo === 'ganho' ? 'text-[#00C853]' : 'text-gray-100'}`}
                      >
                        {item.tipo === 'ganho' ? '+' : '-'}{' '}
                        {formatCurrency(item.valor)}
                      </p>
                      <button
                        onClick={() =>
                          setItemParaExcluir(item)
                        }
                        className="opacity-0 group-hover:opacity-100 text-gray-700 hover:text-red-500 transition-opacity p-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </main>

      {/* Resumo de Período (Flutuante) */}
      <div className="absolute bottom-6 left-4 right-4 z-40">
        <div className="bg-[#1e1e1e] border border-gray-800 p-4 rounded-3xl shadow-2xl flex items-center justify-between backdrop-blur-md bg-opacity-95">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-xl ${saldoExibido >= 0 ? 'bg-[#00C853]/20 text-[#00C853]' : 'bg-[#D50000]/20 text-[#D50000]'}`}
            >
              <TrendingUp
                size={18}
                className={
                  saldoExibido < 0 ? 'rotate-180' : ''
                }
              />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase text-gray-500 leading-none">
                Saldo Exibido
              </p>
              <p
                className={`text-lg font-black tracking-tighter ${saldoExibido >= 0 ? 'text-[#00C853]' : 'text-[#D50000]'}`}
              >
                {formatCurrency(Math.abs(saldoExibido))}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[8px] font-black uppercase text-gray-600">
              Total de Registros
            </p>
            <p className="text-xs font-bold">
              {registrosFiltrados.length} itens
            </p>
          </div>
        </div>
      </div>

      {/* Modal de Confirmação de Exclusão */}
      {itemParaExcluir && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="bg-[#1e1e1e] border border-gray-800 rounded-[2rem] p-8 w-full max-w-xs shadow-2xl">
            <div className="flex justify-center mb-4 text-red-500">
              <AlertCircle size={48} strokeWidth={2.5} />
            </div>
            <h2 className="text-xl font-black text-center mb-2">
              Apagar Registro?
            </h2>
            <p className="text-gray-400 text-center text-sm mb-6 leading-relaxed">
              Deseja remover o lançamento de{' '}
              <span className="text-white font-bold">
                {formatCurrency(itemParaExcluir.valor)}
              </span>{' '}
              do histórico?
            </p>
            <div className="space-y-3">
              <button
                onClick={confirmarExclusao}
                className="w-full bg-[#D50000] text-white font-black py-4 rounded-2xl active:scale-95 transition-all"
              >
                APAGAR AGORA
              </button>
              <button
                onClick={() => setItemParaExcluir(null)}
                className="w-full bg-gray-800 text-gray-400 font-bold py-4 rounded-2xl active:scale-95 transition-all"
              >
                CANCELAR
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast de Notificação */}
      {notificacao && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] animate-in slide-in-from-top duration-300">
          <div className="bg-[#00C853] text-black px-6 py-3 rounded-full font-black text-xs flex items-center gap-2 shadow-2xl">
            <CheckCircle2 size={16} />
            {notificacao}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
