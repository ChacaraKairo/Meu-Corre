import React, { useState, useEffect } from 'react';
import {
  Bike,
  Camera,
  User,
  Settings,
  Target,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';

const App = () => {
  // Estados para os campos do formulário
  const [nome, setNome] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [placa, setPlaca] = useState('');
  const [meta, setMeta] = useState('');

  // Estado para controle de erros (feedback visual)
  const [erros, setErros] = useState({});

  // Lógica para formatar e validar a placa (Mercosul ou Antiga)
  const handlePlacaChange = (text) => {
    let formatted = text
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '');

    // Adiciona o hífen se parecer o modelo antigo AAA-0000
    if (formatted.length > 3 && !isNaN(formatted[3])) {
      formatted =
        formatted.slice(0, 3) + '-' + formatted.slice(3, 7);
    } else {
      formatted = formatted.slice(0, 7);
    }

    setPlaca(formatted);
  };

  // Função para validar campos e "Salvar"
  const handleStart = () => {
    const novosErros = {};

    if (nome.length < 3) novosErros.nome = true;
    if (!modelo) novosErros.modelo = true;

    // Regex para validar placa antiga (ABC-1234) ou Mercosul (ABC1D23)
    const placaRegex = /^[A-Z]{3}-?[0-9][A-Z0-9][0-9]{2}$/;
    if (!placaRegex.test(placa.replace('-', '')))
      novosErros.placa = true;

    setErros(novosErros);

    if (Object.keys(novosErros).length === 0) {
      // Aqui entraria a persistência no SQLite conforme a especificação
      console.log('Dados salvos no SQLite:', {
        nome,
        modelo,
        ano,
        placa,
        meta,
      });
      // Simulação de redirecionamento
      document.body.innerHTML =
        '<div style="background:#121212; color:white; height:100vh; display:flex; align-items:center; justify-content:center; font-family:sans-serif;"><h1>Indo para o Dashboard...</h1></div>';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-white font-sans selection:bg-[#FFD700] selection:text-black">
      {/* Cabeçalho */}
      <header className="p-8 pt-12 flex flex-col items-center text-center space-y-4">
        <div className="bg-[#FFD700] p-4 rounded-3xl shadow-[0_0_30px_rgba(255,215,0,0.2)]">
          <Bike size={48} className="text-[#121212]" />
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tight">
            BEM-VINDO AO CORRE!
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Configure seu perfil para começar.
          </p>
        </div>
      </header>

      {/* Formulário */}
      <main className="flex-1 p-6 space-y-6 max-w-md mx-auto w-full pb-32">
        {/* Seção 1: Você */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-gray-400">
            <User size={16} />
            <h2 className="text-xs font-bold uppercase tracking-widest">
              Você
            </h2>
          </div>
          <div className="flex items-center gap-4 bg-[#1e1e1e] p-4 rounded-2xl border border-gray-800">
            <div className="relative">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center border-2 border-dashed border-gray-600">
                <Camera
                  size={24}
                  className="text-gray-500"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#FFD700] p-1 rounded-full text-black">
                <Plus size={12} strokeWidth={4} />
              </div>
            </div>
            <div className="flex-1">
              <label className="text-[10px] text-gray-500 uppercase font-bold">
                Como quer ser chamado?
              </label>
              <input
                autoFocus
                type="text"
                placeholder="Ex: João da Entrega"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className={`w-full bg-transparent border-b-2 py-1 outline-none transition-colors ${erros.nome ? 'border-red-600' : 'border-gray-700 focus:border-[#FFD700]'}`}
              />
            </div>
          </div>
        </section>

        {/* Seção 2: Sua Máquina */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-gray-400">
            <Settings size={16} />
            <h2 className="text-xs font-bold uppercase tracking-widest">
              Sua Máquina
            </h2>
          </div>
          <div className="bg-[#1e1e1e] p-5 rounded-2xl border border-gray-800 space-y-5">
            <div>
              <label className="text-[10px] text-gray-500 uppercase font-bold">
                Modelo da Moto
              </label>
              <input
                type="text"
                placeholder="Ex: Honda CG 160 Titan"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
                className={`w-full bg-transparent border-b-2 py-2 outline-none transition-colors ${erros.modelo ? 'border-red-600' : 'border-gray-700 focus:border-[#FFD700]'}`}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-gray-500 uppercase font-bold">
                  Ano
                </label>
                <input
                  type="number"
                  placeholder="2023"
                  value={ano}
                  onChange={(e) => setAno(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-gray-700 py-2 outline-none focus:border-[#FFD700] transition-colors"
                />
              </div>
              <div>
                <label className="text-[10px] text-gray-500 uppercase font-bold">
                  Placa
                </label>
                <input
                  type="text"
                  placeholder="ABC1D23"
                  value={placa}
                  onChange={(e) =>
                    handlePlacaChange(e.target.value)
                  }
                  className={`w-full bg-transparent border-b-2 py-2 outline-none transition-colors ${erros.placa ? 'border-red-600' : 'border-gray-700 focus:border-[#FFD700]'}`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Seção 3: Objetivos */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-gray-400">
            <Target size={16} />
            <h2 className="text-xs font-bold uppercase tracking-widest">
              Seus Objetivos
            </h2>
          </div>
          <div className="bg-[#1e1e1e] p-5 rounded-2xl border border-gray-800">
            <label className="text-[10px] text-gray-500 uppercase font-bold">
              Meta de Lucro Diário (Opcional)
            </label>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 font-bold">
                R$
              </span>
              <input
                type="number"
                placeholder="0,00"
                value={meta}
                onChange={(e) => setMeta(e.target.value)}
                className="w-full bg-transparent border-b-2 border-gray-700 py-2 outline-none focus:border-[#FFD700] transition-colors text-xl font-bold"
              />
            </div>
          </div>
        </section>

        {/* Feedback de Erro Geral */}
        {Object.keys(erros).length > 0 && (
          <div className="flex items-center gap-2 text-red-500 text-sm justify-center bg-red-500/10 p-3 rounded-xl border border-red-500/20">
            <AlertCircle size={16} />
            <span>
              Preencha os campos obrigatórios corretamente.
            </span>
          </div>
        )}
      </main>

      {/* Rodapé com Botão Fixo */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#121212] via-[#121212] to-transparent">
        <button
          onClick={handleStart}
          className="w-full h-16 bg-[#FFD700] text-black font-black text-lg rounded-2xl flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(255,215,0,0.3)] active:scale-95 transition-all"
        >
          COMEÇAR O CORRE
          <ChevronRight size={24} />
        </button>
      </footer>
    </div>
  );
};

// Ícone de Plus personalizado para o avatar
const Plus = ({ size, strokeWidth }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export default App;
