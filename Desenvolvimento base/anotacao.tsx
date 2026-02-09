import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Check,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Car,
  Utensils,
  Fuel,
  Settings,
  MoreHorizontal,
  Bike,
} from 'lucide-react';

const App = () => {
  // Estados iniciais baseados na especificação
  const [tipo, setTipo] = useState('ganho'); // 'ganho' ou 'despesa'
  const [valor, setValor] = useState('0,00');
  const [valorNumerico, setValorNumerico] = useState(0);
  const [categoria, setCategoria] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Referência para o input invisível que controla o teclado
  const inputRef = useRef(null);

  // Categorias definidas na especificação
  const categoriasGanho = [
    { id: 'Uber', icon: <Bike size={20} /> },
    { id: 'iFood', icon: <Bike size={20} /> },
    { id: '99', icon: <Bike size={20} /> },
    { id: 'Rappi', icon: <Bike size={20} /> },
    { id: 'Particular', icon: <Car size={20} /> },
    { id: 'Outros', icon: <MoreHorizontal size={20} /> },
  ];

  const categoriasDespesa = [
    { id: 'Combustível', icon: <Fuel size={20} /> },
    { id: 'Óleo', icon: <Settings size={18} /> },
    { id: 'Lanche', icon: <Utensils size={18} /> },
    { id: 'Manutenção', icon: <Settings size={20} /> },
    { id: 'Outros', icon: <MoreHorizontal size={20} /> },
  ];

  // Sugestão Inteligente: Pre-seleciona Combustível se for despesa
  useEffect(() => {
    if (tipo === 'despesa') {
      setCategoria('Combustível');
    } else {
      setCategoria('Uber'); // Sugestão padrão para ganho
    }
  }, [tipo]);

  // Foco automático no teclado ao abrir
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Lógica de Máscara de Moeda (Dica 5.2 do Canvas)
  const handleInputChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    const numericValue = parseFloat(rawValue) / 100;

    setValorNumerico(numericValue);

    const formatted = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numericValue || 0);

    setValor(formatted);
  };

  const handleSave = () => {
    if (valorNumerico <= 0 || !categoria) return;

    // Feedback Háptico (Simulado com vibração se disponível)
    if (navigator.vibrate) navigator.vibrate(50);

    // Animação de Sucesso
    setShowSuccess(true);

    // Persistência simulada (SQLite)
    console.log('Inserindo no SQLite:', {
      tipo,
      valor: valorNumerico,
      categoria,
      data_registro: new Date().toISOString(),
    });

    // Retorno ao Dashboard após 1.5s
    setTimeout(() => {
      window.location.reload(); // Simula navegação de volta
    }, 1500);
  };

  const currentCategories =
    tipo === 'ganho' ? categoriasGanho : categoriasDespesa;
  const mainColor =
    tipo === 'ganho' ? '#00C853' : '#D50000';

  return (
    <div
      className={`flex flex-col h-screen bg-[#121212] text-white font-sans transition-colors duration-500 overflow-hidden max-w-md mx-auto`}
    >
      {/* Cabeçalho Dinâmico */}
      <header className="p-6 flex justify-between items-center bg-[#121212] z-10">
        <h1 className="text-xl font-black uppercase tracking-tighter">
          Anotar{' '}
          <span style={{ color: mainColor }}>
            {tipo === 'ganho' ? 'Ganho' : 'Despesa'}
          </span>
        </h1>
        <button className="p-2 bg-gray-900 rounded-full text-gray-400 active:scale-90 transition-transform">
          <X size={24} />
        </button>
      </header>

      {/* Seletor de Tipo (Troca Rápida) */}
      <div className="px-6 mb-4">
        <div className="bg-gray-900/50 p-1.5 rounded-2xl flex gap-1 border border-gray-800">
          <button
            onClick={() => setTipo('ganho')}
            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${tipo === 'ganho' ? 'bg-[#00C853] text-black shadow-lg' : 'text-gray-500'}`}
          >
            Entrada (+)
          </button>
          <button
            onClick={() => setTipo('despesa')}
            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${tipo === 'despesa' ? 'bg-[#D50000] text-white shadow-lg' : 'text-gray-500'}`}
          >
            Saída (-)
          </button>
        </div>
      </div>

      {/* Campo de Valor (Destaque) */}
      <main className="flex-1 px-6 flex flex-col justify-center items-center">
        <div className="text-center mb-8 w-full">
          <p className="text-[10px] uppercase font-black text-gray-500 tracking-widest mb-2">
            Valor da Anotação
          </p>
          <div className="relative inline-block w-full">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-600">
              R$
            </span>
            <span
              className="text-6xl font-black tracking-tighter block w-full outline-none"
              style={{ color: mainColor }}
            >
              {valor}
            </span>
            {/* Input invisível para capturar o teclado numérico nativo */}
            <input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              onChange={handleInputChange}
              className="absolute inset-0 opacity-0 cursor-default"
            />
          </div>
        </div>

        {/* Seleção de Categoria (Chips em Grade) */}
        <div className="w-full space-y-3">
          <p className="text-[10px] uppercase font-black text-gray-500 tracking-widest text-center">
            Selecionar Categoria
          </p>
          <div className="grid grid-cols-3 gap-3">
            {currentCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setCategoria(cat.id);
                  if (navigator.vibrate)
                    navigator.vibrate(20);
                }}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all active:scale-95 ${
                  categoria === cat.id
                    ? `bg-white/5 border-white text-white shadow-xl`
                    : 'bg-transparent border-gray-800 text-gray-600'
                }`}
                style={
                  categoria === cat.id
                    ? {
                        borderColor: mainColor,
                        color: mainColor,
                      }
                    : {}
                }
              >
                {cat.icon}
                <span className="text-[9px] font-black uppercase mt-2 tracking-tighter truncate w-full text-center">
                  {cat.id}
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Botão de Ação (Glove-Friendly) */}
      <footer className="p-6 bg-gradient-to-t from-[#121212] to-transparent">
        <button
          disabled={valorNumerico <= 0}
          onClick={handleSave}
          className={`w-full h-18 py-5 rounded-3xl font-black text-lg shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-2 ${
            valorNumerico > 0
              ? 'bg-white text-black opacity-100'
              : 'bg-gray-800 text-gray-600 opacity-50'
          }`}
          style={
            valorNumerico > 0
              ? {
                  backgroundColor: mainColor,
                  color:
                    tipo === 'ganho'
                      ? '#121212'
                      : '#ffffff',
                }
              : {}
          }
        >
          {showSuccess ? (
            <div className="flex items-center gap-2 animate-bounce">
              <Check size={24} strokeWidth={4} />
              <span>SALVO!</span>
            </div>
          ) : (
            <>
              <TrendingUp size={20} strokeWidth={3} />
              <span>SALVAR ANOTAÇÃO</span>
            </>
          )}
        </button>
      </footer>

      {/* Overlay de Sucesso (Mobile style) */}
      {showSuccess && (
        <div className="absolute inset-0 bg-[#121212]/90 backdrop-blur-sm flex flex-col items-center justify-center z-50 animate-in fade-in zoom-in duration-300">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: mainColor }}
          >
            <Check
              size={48}
              className="text-white"
              strokeWidth={4}
            />
          </div>
          <h2 className="text-2xl font-black tracking-tight">
            ANOTAÇÃO FEITA!
          </h2>
          <p className="text-gray-400 mt-2">
            Atualizando seu lucro...
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
