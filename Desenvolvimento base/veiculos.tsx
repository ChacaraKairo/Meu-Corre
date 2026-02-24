import React, { useState } from 'react';
import {
  Bike,
  Car,
  Plus,
  ChevronRight,
  ArrowLeft,
  ShieldCheck,
  Gauge,
  Settings2,
  Trash2,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  AlertTriangle,
  X,
} from 'lucide-react';

/**
 * TELA DE MEUS VEÍCULOS (GARAGEM) - PROTÓTIPO V5
 * Identidade Visual: Verde e Preto (#00C853 / #0A0A0A)
 * Alterações:
 * - Sistema de exclusão protegida: exige confirmação via placa do veículo.
 * - Modal de exclusão crítico com feedback visual de perigo.
 */
export default function App() {
  // Lista simulada de veículos no estado local
  const [veiculos, setVeiculos] = useState([
    {
      id: 1,
      tipo: 'moto',
      marca: 'Honda',
      modelo: 'CG 160 Fan',
      placa: 'ABC-1D23',
      km: 12840,
      ativo: true,
      alerta: true,
    },
    {
      id: 2,
      tipo: 'carro',
      marca: 'Fiat',
      modelo: 'Uno Way',
      placa: 'XYZ-9K88',
      km: 45200,
      ativo: false,
      alerta: false,
    },
    {
      id: 3,
      tipo: 'moto',
      marca: 'Yamaha',
      modelo: 'Fazer 250',
      placa: 'KMT-5J12',
      km: 5100,
      ativo: false,
      alerta: false,
    },
  ]);

  // Estados para os Modais
  const [modalTroca, setModalTroca] = useState({
    visivel: false,
    veiculo: null,
  });
  const [modalDelete, setModalDelete] = useState({
    visivel: false,
    veiculo: null,
  });
  const [confirmacaoPlaca, setConfirmacaoPlaca] =
    useState('');

  // --- LÓGICA DE TROCA ---
  const solicitarTroca = (veiculo) =>
    setModalTroca({ visivel: true, veiculo });
  const cancelarTroca = () =>
    setModalTroca({ visivel: false, veiculo: null });
  const confirmarTroca = () => {
    const id = modalTroca.veiculo.id;
    setVeiculos(
      veiculos.map((v) => ({ ...v, ativo: v.id === id })),
    );
    setModalTroca({ visivel: false, veiculo: null });
  };

  // --- LÓGICA DE EXCLUSÃO ---
  const solicitarExclusao = (veiculo) => {
    setConfirmacaoPlaca('');
    setModalDelete({ visivel: true, veiculo });
  };
  const cancelarExclusao = () =>
    setModalDelete({ visivel: false, veiculo: null });
  const confirmarExclusao = () => {
    if (
      confirmacaoPlaca.toUpperCase() ===
      modalDelete.veiculo.placa
    ) {
      setVeiculos(
        veiculos.filter(
          (v) => v.id !== modalDelete.veiculo.id,
        ),
      );
      setModalDelete({ visivel: false, veiculo: null });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-white font-sans overflow-hidden relative">
      {/* 1. MODAL DE CONFIRMAÇÃO DE TROCA */}
      {modalTroca.visivel && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#161616] w-full max-w-xs rounded-[32px] border border-[#222] p-6 shadow-2xl animate-in zoom-in-95 duration-200 text-center">
            <div className="bg-[#00C853]/10 p-4 rounded-full mb-4 mx-auto w-fit">
              <RefreshCw
                size={32}
                className="text-[#00C853] animate-spin-slow"
              />
            </div>
            <h2 className="text-xl font-black mb-2 uppercase tracking-tighter">
              Ativar Veículo?
            </h2>
            <p className="text-[#666] text-sm mb-6 leading-relaxed">
              Desejas ativar a{' '}
              <span className="text-white font-bold">
                {modalTroca.veiculo?.modelo}
              </span>{' '}
              para o teu corre diário?
            </p>
            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={confirmarTroca}
                className="w-full py-4 bg-[#00C853] rounded-2xl text-[#0A0A0A] text-xs font-black uppercase tracking-widest active:scale-95 transition-all"
              >
                Sim, Ativar
              </button>
              <button
                onClick={cancelarTroca}
                className="w-full py-4 bg-[#202020] rounded-2xl text-xs font-black uppercase tracking-widest text-[#666] active:scale-95 transition-all"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. MODAL DE EXCLUSÃO CRÍTICA (PLACA) */}
      {modalDelete.visivel && (
        <div className="absolute inset-0 z-[110] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-[#161616] w-full max-w-sm rounded-[32px] border border-red-900/30 p-8 shadow-2xl animate-in zoom-in-95 duration-200 text-center">
            <div className="bg-red-600/10 p-4 rounded-full mb-4 mx-auto w-fit">
              <AlertTriangle
                size={36}
                className="text-red-600 animate-pulse"
              />
            </div>
            <h2 className="text-xl font-black mb-2 uppercase tracking-tighter text-red-500">
              Excluir Veículo?
            </h2>
            <p className="text-[#666] text-xs mb-6 leading-relaxed">
              Esta ação irá apagar todo o histórico de
              manutenção da{' '}
              <span className="text-white font-bold">
                {modalDelete.veiculo?.modelo}
              </span>
              . Esta ação é irreversível.
            </p>

            <div className="bg-[#0A0A0A] p-4 rounded-2xl border border-[#222] mb-6">
              <label className="text-[10px] font-black text-[#444] uppercase tracking-widest block mb-3">
                Digita a placa{' '}
                <span className="text-white">
                  {modalDelete.veiculo?.placa}
                </span>{' '}
                para confirmar:
              </label>
              <input
                type="text"
                autoFocus
                className="w-full bg-transparent text-center text-2xl font-black tracking-[4px] text-white outline-none uppercase placeholder:text-[#222]"
                placeholder="-------"
                value={confirmacaoPlaca}
                onChange={(e) =>
                  setConfirmacaoPlaca(
                    e.target.value.toUpperCase(),
                  )
                }
              />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={confirmarExclusao}
                disabled={
                  confirmacaoPlaca !==
                  modalDelete.veiculo?.placa
                }
                className={`w-full py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                  confirmacaoPlaca ===
                  modalDelete.veiculo?.placa
                    ? 'bg-red-600 text-white shadow-lg shadow-red-900/30 active:scale-95'
                    : 'bg-[#222] text-[#444] cursor-not-allowed opacity-50'
                }`}
              >
                Apagar Definitivamente
              </button>
              <button
                onClick={cancelarExclusao}
                className="w-full py-3 text-[10px] font-black uppercase tracking-widest text-[#666] active:scale-95 transition-all"
              >
                Voltar e Manter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="pt-12 px-6 pb-4 flex items-center justify-between border-b border-[#161616] z-10 bg-[#0A0A0A]">
        <button
          className="p-2 bg-[#161616] rounded-xl border border-[#222] text-[#666] active:scale-95 transition-all"
          onClick={() => alert('Voltar ao Dashboard')}
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-sm font-black uppercase tracking-[3px] text-[#00C853]">
          Minha Garagem
        </h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 overflow-y-auto px-5 py-6 pb-10 space-y-6 no-scrollbar">
        {/* RESUMO DA FROTA */}
        <section className="flex items-center justify-between px-2">
          <div className="flex flex-col">
            <p className="text-[#666] text-[10px] font-[900] tracking-widest uppercase">
              Frota Registada
            </p>
            <h2 className="text-3xl font-black text-white">
              {veiculos.length} Máquinas
            </h2>
          </div>
          <button
            onClick={() =>
              alert('Abrir Tela de Cadastro de Veículo')
            }
            className="h-12 w-12 bg-[#00C853] rounded-2xl flex items-center justify-center shadow-lg shadow-green-900/20 active:scale-90 transition-all"
          >
            <Plus
              size={24}
              className="text-[#0A0A0A]"
              strokeWidth={3}
            />
          </button>
        </section>

        {/* LISTA DE VEÍCULOS */}
        <section className="space-y-4">
          {veiculos.map((v) => (
            <div
              key={v.id}
              className={`relative overflow-hidden rounded-[32px] border transition-all duration-500 ${
                v.ativo
                  ? 'border-[#00C853] bg-[#161616] shadow-[0_0_20px_rgba(0,200,83,0.1)]'
                  : 'border-[#222] bg-[#111] opacity-80'
              }`}
            >
              <div className="p-6 relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-500 ${
                        v.ativo
                          ? 'bg-[#00C853] text-[#0A0A0A]'
                          : 'bg-[#202020] text-[#444]'
                      }`}
                    >
                      {v.tipo === 'moto' ? (
                        <Bike size={32} />
                      ) : (
                        <Car size={32} />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-black uppercase tracking-tight leading-none">
                        {v.modelo}
                      </h3>
                      <p
                        className={`text-xs font-bold tracking-widest mt-1 ${v.ativo ? 'text-[#00C853]' : 'text-[#666]'}`}
                      >
                        {v.placa}
                      </p>
                    </div>
                  </div>

                  {v.ativo && (
                    <div className="bg-[#00C853] px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg shadow-green-900/20">
                      <CheckCircle2
                        size={10}
                        className="text-[#0A0A0A]"
                        strokeWidth={3}
                      />
                      <span className="text-[8px] font-black uppercase text-[#0A0A0A] tracking-tighter">
                        Ativo
                      </span>
                    </div>
                  )}
                </div>

                {/* Info Técnica */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-[#0A0A0A]/40 rounded-2xl p-3 border border-[#222]/30 text-left">
                    <div className="flex items-center gap-1.5 mb-1 text-[#444]">
                      <Gauge size={12} />
                      <span className="text-[8px] font-black uppercase">
                        KM
                      </span>
                    </div>
                    <p className="text-sm font-black">
                      {v.km.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-[#0A0A0A]/40 rounded-2xl p-3 border border-[#222]/30 text-left">
                    <div className="flex items-center gap-1.5 mb-1 text-[#444]">
                      <AlertCircle
                        size={12}
                        className={
                          v.alerta ? 'text-red-500' : ''
                        }
                      />
                      <span className="text-[8px] font-black uppercase">
                        Saúde
                      </span>
                    </div>
                    <p
                      className={`text-sm font-black ${v.alerta ? 'text-red-500' : 'text-[#00C853]'}`}
                    >
                      {v.alerta ? 'Atenção' : 'Excelente'}
                    </p>
                  </div>
                </div>

                {/* Ações do Card */}
                <div className="flex gap-2">
                  {!v.ativo ? (
                    <button
                      onClick={() => solicitarTroca(v)}
                      className="flex-[2] h-12 bg-[#00C853]/10 hover:bg-[#00C853]/20 text-[#00C853] rounded-xl border border-[#00C853]/30 flex items-center justify-center gap-2 active:scale-95 transition-all group"
                    >
                      <RefreshCw
                        size={16}
                        className="group-active:rotate-180 transition-transform duration-500"
                      />
                      <span className="text-[10px] font-[900] uppercase tracking-wider">
                        Ativar Máquina
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        alert(`Oficina: ${v.modelo}`)
                      }
                      className="flex-[2] h-12 bg-[#00C853] text-[#0A0A0A] rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-green-900/20"
                    >
                      <Settings2 size={18} />
                      <span className="text-[10px] font-[900] uppercase tracking-wider">
                        Gerir Oficina
                      </span>
                    </button>
                  )}

                  <button
                    onClick={() => solicitarExclusao(v)}
                    className="h-12 w-12 bg-[#1a1a1a] border border-[#222] rounded-xl flex items-center justify-center text-[#444] hover:text-red-500 active:scale-90 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Marca d'água de fundo */}
              <div
                className={`absolute -right-4 -bottom-4 opacity-[0.03] rotate-12 pointer-events-none transition-transform duration-700 ${v.ativo ? 'scale-110' : 'scale-100'}`}
              >
                {v.tipo === 'moto' ? (
                  <Bike size={140} />
                ) : (
                  <Car size={140} />
                )}
              </div>
            </div>
          ))}
        </section>

        {/* NOTA INFORMATIVA */}
        <div className="p-6 bg-[#161616] rounded-[24px] border border-[#222] flex items-start gap-4 mb-10">
          <RefreshCw
            size={24}
            className="text-[#00C853] shrink-0"
          />
          <p className="text-[11px] text-[#555] leading-relaxed text-left">
            Ao alternar entre veículos, o seu{' '}
            <strong className="text-[#00C853]">
              Dashboard
            </strong>{' '}
            passará a monitorizar automaticamente o odómetro
            e os prazos de manutenção da máquina
            selecionada.
          </p>
        </div>
      </main>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `,
        }}
      />
    </div>
  );
}
