import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  Camera,
  User,
  Bike,
  Settings,
  Target,
  Trash2,
  Moon,
  Save,
  AlertTriangle,
  CheckCircle2,
  X,
} from 'lucide-react';

const App = () => {
  // Dados iniciais (Simulando o que viria do SQLite)
  const dadosIniciais = {
    nome: 'João do Corre',
    modelo: 'Honda CG 160 Titan',
    placa: 'ABC1D23',
    metaDiaria: '150',
  };

  // Estados dos campos
  const [nome, setNome] = useState(dadosIniciais.nome);
  const [modelo, setModelo] = useState(
    dadosIniciais.modelo,
  );
  const [placa, setPlaca] = useState(dadosIniciais.placa);
  const [darkMode, setDarkMode] = useState(true);

  // Estados de controle de UI
  const [hasChanges, setHasChanges] = useState(false);
  const [showMotoModal, setShowMotoModal] = useState(false);
  const [showDangerModal, setShowDangerModal] =
    useState(false);
  const [dangerConfirm, setDangerConfirm] = useState('');
  const [toast, setToast] = useState(null);

  // Monitorar alterações para habilitar botão salvar (Dica 5.1 do Canvas)
  useEffect(() => {
    const alterado =
      nome !== dadosIniciais.nome ||
      modelo !== dadosIniciais.modelo ||
      placa !== dadosIniciais.placa;
    setHasChanges(alterado);
  }, [nome, modelo, placa]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = () => {
    // Regra 2.1: Verificar se alterou dados da moto
    const motoAlterada =
      modelo !== dadosIniciais.modelo ||
      placa !== dadosIniciais.placa;

    if (motoAlterada) {
      setShowMotoModal(true);
    } else {
      processSave(false);
    }
  };

  const processSave = (resetMaintenance) => {
    // Simulação de UPDATE no SQLite (Seção 3 do Canvas)
    console.log('Salvando no SQLite...', {
      nome,
      modelo,
      placa,
      resetMaintenance,
    });
    setShowMotoModal(false);
    setHasChanges(false);
    showToast('Dados atualizados com sucesso!');
  };

  const handleTotalReset = () => {
    if (dangerConfirm === 'APAGAR') {
      console.log(
        'Executando DELETE FROM em todas as tabelas...',
      );
      window.location.reload(); // Simula retorno ao onboarding
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-white font-sans max-w-md mx-auto border-x border-gray-900 overflow-x-hidden relative">
      {/* Cabeçalho */}
      <header className="p-4 flex items-center bg-[#121212] sticky top-0 z-30 border-b border-gray-800">
        <button className="p-2 bg-gray-900 rounded-full text-gray-400 active:scale-90 transition-transform">
          <ChevronLeft size={24} />
        </button>
        <h1 className="flex-1 text-center text-lg font-black uppercase tracking-tighter mr-10">
          Meu Perfil
        </h1>
      </header>

      <main className="flex-1 p-6 space-y-8 pb-32">
        {/* Seção 1: Meus Dados */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-gray-500 px-1">
            <User size={14} />
            <h2 className="text-[10px] font-black uppercase tracking-widest">
              Meus Dados
            </h2>
          </div>

          <div className="bg-[#1e1e1e] rounded-[2rem] p-6 border border-gray-800 shadow-xl">
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gray-800 rounded-full border-4 border-gray-700 flex items-center justify-center overflow-hidden">
                  <User
                    size={48}
                    className="text-gray-600"
                  />
                </div>
                <button className="absolute bottom-0 right-0 bg-[#FFD700] p-2 rounded-full text-black shadow-lg active:scale-90 transition-transform">
                  <Camera size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full bg-[#121212] border border-gray-800 rounded-xl p-3 font-bold text-sm outline-none focus:border-[#FFD700] transition-colors"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Seção 2: Minha Moto */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-gray-500 px-1">
            <Bike size={14} />
            <h2 className="text-[10px] font-black uppercase tracking-widest">
              Minha Moto
            </h2>
          </div>

          <div className="bg-[#1e1e1e] rounded-[2rem] p-6 border border-gray-800 shadow-xl space-y-5">
            <div>
              <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">
                Modelo / Marca
              </label>
              <input
                type="text"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
                className="w-full bg-[#121212] border border-gray-800 rounded-xl p-3 font-bold text-sm outline-none focus:border-[#FFD700] transition-colors"
              />
            </div>
            <div>
              <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">
                Placa
              </label>
              <input
                type="text"
                value={placa}
                onChange={(e) =>
                  setPlaca(e.target.value.toUpperCase())
                }
                className="w-full bg-[#121212] border border-gray-800 rounded-xl p-3 font-bold text-sm outline-none focus:border-[#FFD700] transition-colors tracking-widest"
              />
            </div>
          </div>
        </section>

        {/* Seção 3: Preferências */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-gray-500 px-1">
            <Settings size={14} />
            <h2 className="text-[10px] font-black uppercase tracking-widest">
              Preferências
            </h2>
          </div>

          <div className="bg-[#1e1e1e] rounded-3xl border border-gray-800 divide-y divide-gray-800">
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-3">
                <Moon
                  size={20}
                  className="text-[#FFD700]"
                />
                <span className="font-bold text-sm">
                  Modo Escuro
                </span>
              </div>
              <div
                onClick={() => setDarkMode(!darkMode)}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 flex items-center ${darkMode ? 'bg-[#FFD700]' : 'bg-gray-700'}`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${darkMode ? 'translate-x-6' : 'translate-x-0'}`}
                />
              </div>
            </div>

            <button className="w-full flex items-center justify-between p-5 active:bg-gray-800/50 transition-colors">
              <div className="flex items-center gap-3">
                <Target
                  size={20}
                  className="text-gray-400"
                />
                <span className="font-bold text-sm">
                  Editar Metas Financeiras
                </span>
              </div>
              <ChevronLeft
                size={20}
                className="rotate-180 text-gray-600"
              />
            </button>
          </div>
        </section>

        {/* Seção 4: Zona de Perigo */}
        <section className="pt-4">
          <button
            onClick={() => setShowDangerModal(true)}
            className="w-full bg-red-500/10 border border-red-500/20 rounded-2xl p-5 flex items-center gap-4 active:scale-[0.98] transition-all group"
          >
            <div className="p-3 bg-red-500 rounded-xl text-white">
              <Trash2 size={20} />
            </div>
            <div className="text-left">
              <h4 className="text-red-500 font-black text-xs uppercase tracking-widest">
                Apagar todos os registros
              </h4>
              <p className="text-[10px] text-red-500/60 font-bold uppercase mt-0.5 tracking-tight">
                Esta ação não pode ser desfeita
              </p>
            </div>
          </button>
        </section>
      </main>

      {/* Botão Salvar Flutuante (Dica 5.1) */}
      {hasChanges && (
        <div className="fixed bottom-6 left-0 right-0 p-6 z-40 animate-in slide-in-from-bottom duration-300">
          <button
            onClick={handleSave}
            className="w-full h-16 bg-[#FFD700] text-black font-black text-lg rounded-2xl flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(255,215,0,0.3)] active:scale-95 transition-all"
          >
            <Save size={24} />
            SALVAR ALTERAÇÕES
          </button>
        </div>
      )}

      {/* Modal de Alteração de Moto (Regra 2.1) */}
      {showMotoModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="bg-[#1e1e1e] border border-gray-800 rounded-[2rem] p-8 w-full max-w-xs shadow-2xl">
            <div className="flex justify-center mb-4 text-[#FFD700]">
              <Bike size={48} strokeWidth={2.5} />
            </div>
            <h2 className="text-xl font-black text-center mb-2">
              Trocou de Moto?
            </h2>
            <p className="text-gray-400 text-center text-sm mb-6 leading-relaxed">
              Deseja resetar os contadores de manutenção
              (óleo, pneus, etc.) para esta nova máquina?
            </p>
            <div className="space-y-3">
              <button
                onClick={() => processSave(true)}
                className="w-full bg-[#FFD700] text-black font-black py-4 rounded-2xl active:scale-95 transition-all"
              >
                SIM, COMEÇAR DO ZERO
              </button>
              <button
                onClick={() => processSave(false)}
                className="w-full bg-gray-800 text-gray-400 font-bold py-4 rounded-2xl active:scale-95 transition-all"
              >
                NÃO, MANTER CONTADORES
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Zona de Perigo (Regra 2.2) */}
      {showDangerModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="bg-[#1e1e1e] border border-red-500/30 rounded-[2.5rem] p-8 w-full max-w-sm shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-red-500 p-3 rounded-2xl text-white">
                <AlertTriangle size={32} />
              </div>
              <button
                onClick={() => setShowDangerModal(false)}
                className="text-gray-600 p-2"
              >
                <X size={24} />
              </button>
            </div>
            <h2 className="text-2xl font-black mb-2 uppercase tracking-tight">
              Cuidado Extremo
            </h2>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Você está prestes a apagar permanentemente
              todos os seus ganhos, gastos e históricos de
              manutenção.
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] text-red-500 font-black uppercase tracking-widest">
                  Digite APAGAR para confirmar
                </label>
                <input
                  type="text"
                  placeholder="APAGAR"
                  value={dangerConfirm}
                  onChange={(e) =>
                    setDangerConfirm(
                      e.target.value.toUpperCase(),
                    )
                  }
                  className="w-full bg-black border-2 border-red-500/20 rounded-xl p-4 font-black text-center text-red-500 outline-none focus:border-red-500 transition-all"
                />
              </div>
              <button
                disabled={dangerConfirm !== 'APAGAR'}
                onClick={handleTotalReset}
                className={`w-full h-16 rounded-2xl font-black transition-all ${dangerConfirm === 'APAGAR' ? 'bg-red-500 text-white shadow-[0_10px_30px_rgba(239,68,68,0.3)] active:scale-95' : 'bg-gray-900 text-gray-700'}`}
              >
                CONFIRMAR RESET TOTAL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast de Feedback (Seção 4) */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] animate-in slide-in-from-top duration-300">
          <div className="bg-[#00C853] text-black px-6 py-4 rounded-full font-black text-xs flex items-center gap-2 shadow-2xl">
            <CheckCircle2 size={16} strokeWidth={3} />
            <span className="uppercase tracking-widest">
              {toast}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
