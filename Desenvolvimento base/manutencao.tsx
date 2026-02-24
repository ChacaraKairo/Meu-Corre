import React, { useState, useEffect } from 'react';
import {
  Wrench,
  Droplets,
  Disc,
  CircleDot,
  ArrowLeft,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Gauge,
  ChevronRight,
  Settings2,
  Clock,
  Bike,
  Car,
  ChevronDown,
  X,
  ClipboardCheck,
  PlusCircle,
  Activity,
  Zap,
  Fuel,
  Cog,
} from 'lucide-react';

/**
 * TELA DE OFICINA (MANUTENÇÃO) - PROTÓTIPO V8
 * Identidade Visual: Verde e Preto (#00C853 / #0A0A0A)
 * Novidade:
 * - Indicador de itens pendentes ao lado da saúde geral.
 * - Lógica dinâmica para contabilizar problemas na frota consultada.
 */
export default function App() {
  // Lista de todos os veículos registrados
  const [frota] = useState([
    {
      id: 1,
      tipo: 'moto',
      marca: 'Honda',
      modelo: 'CG 160 Fan',
      kmAtual: 12840,
      placa: 'ABC-1D23',
    },
    {
      id: 2,
      tipo: 'carro',
      marca: 'Fiat',
      modelo: 'Uno Way',
      kmAtual: 45200,
      placa: 'XYZ-9K88',
    },
    {
      id: 3,
      tipo: 'moto',
      marca: 'Yamaha',
      modelo: 'Fazer 250',
      kmAtual: 5100,
      placa: 'KMT-5J12',
    },
  ]);

  // Ícones disponíveis para escolha
  const iconOptions = [
    {
      id: 'droplets',
      component: Droplets,
      label: 'Líquidos',
    },
    {
      id: 'circle-dot',
      component: CircleDot,
      label: 'Pneus',
    },
    { id: 'disc', component: Disc, label: 'Travões' },
    { id: 'cog', component: Cog, label: 'Mecânica' },
    { id: 'zap', component: Zap, label: 'Elétrica' },
    { id: 'wrench', component: Wrench, label: 'Geral' },
    {
      id: 'activity',
      component: Activity,
      label: 'Desempenho',
    },
    { id: 'fuel', component: Fuel, label: 'Injeção' },
  ];

  // Itens Padrão Definidos por Tipo
  const itensPadrao = {
    moto: [
      {
        id: 'm1',
        nome: 'Óleo do Motor',
        iconId: 'droplets',
        intervalo: 3000,
        ultimoResetKm: 11000,
      },
      {
        id: 'm2',
        nome: 'Pneu Traseiro',
        iconId: 'circle-dot',
        intervalo: 10000,
        ultimoResetKm: 5000,
      },
      {
        id: 'm3',
        nome: 'Pastilhas de Travão',
        iconId: 'disc',
        intervalo: 5000,
        ultimoResetKm: 12700,
      },
      {
        id: 'm4',
        nome: 'Kit Transmissão',
        iconId: 'cog',
        intervalo: 15000,
        ultimoResetKm: 2000,
      },
    ],
    carro: [
      {
        id: 'c1',
        nome: 'Óleo e Filtro',
        iconId: 'droplets',
        intervalo: 10000,
        ultimoResetKm: 40000,
      },
      {
        id: 'c2',
        nome: 'Alinhamento/Balan.',
        iconId: 'activity',
        intervalo: 10000,
        ultimoResetKm: 42000,
      },
      {
        id: 'c3',
        nome: 'Pastilhas Frontais',
        iconId: 'disc',
        intervalo: 25000,
        ultimoResetKm: 30000,
      },
      {
        id: 'c4',
        nome: 'Filtro de Ar',
        iconId: 'wrench',
        intervalo: 15000,
        ultimoResetKm: 35000,
      },
    ],
  };

  const [veiculoConsultado, setVeiculoConsultado] =
    useState(frota[0]);
  const [listaAberta, setListaAberta] = useState(false);
  const [modalNovoItem, setModalNovoItem] = useState(false);
  const [modalReset, setModalReset] = useState({
    visivel: false,
    item: null,
  });

  // Estados do formulário de novo item
  const [novoItemNome, setNovoItemNome] = useState('');
  const [novoItemIntervalo, setNovoItemIntervalo] =
    useState('');
  const [novoItemIcone, setNovoItemIcone] =
    useState('wrench');
  const [novoItemVeiculoId, setNovoItemVeiculoId] =
    useState(frota[0].id);

  const [itensVisiveis, setItensVisiveis] = useState(
    itensPadrao.moto,
  );

  useEffect(() => {
    setItensVisiveis(itensPadrao[veiculoConsultado.tipo]);
    setNovoItemVeiculoId(veiculoConsultado.id);
  }, [veiculoConsultado]);

  const getIcon = (id) => {
    const icon = iconOptions.find((opt) => opt.id === id);
    const Component = icon ? icon.component : Wrench;
    return <Component size={18} />;
  };

  // Função centralizada para calcular o estado de cada item
  const calcularProgresso = (item) => {
    const rodadoDesdeTroca =
      veiculoConsultado.kmAtual - item.ultimoResetKm;
    const percentagemDesgaste = Math.max(
      0,
      Math.min(
        100,
        (rodadoDesdeTroca / item.intervalo) * 100,
      ),
    );
    const kmRestante = item.intervalo - rodadoDesdeTroca;

    let cor = '#00C853';
    let status = 'OK';

    if (kmRestante <= 100) {
      cor = '#EF4444';
      status = 'Crítico';
    } else if (kmRestante <= 500) {
      cor = '#F59E0B';
      status = 'Atenção';
    }

    return {
      rodadoDesdeTroca,
      kmRestante,
      percentagemDesgaste,
      cor,
      status,
    };
  };

  // Lógica para o novo campo solicitado: Contador de pendências
  const getStatusResumo = () => {
    const pendentes = itensVisiveis.filter((item) => {
      const p = calcularProgresso(item);
      return p.status !== 'OK';
    }).length;

    if (pendentes === 0)
      return {
        texto: 'Tudo OK',
        cor: 'text-[#00C853]',
        bg: 'bg-[#00C853]/10',
      };
    return {
      texto: `${pendentes} ${pendentes === 1 ? 'item pendente' : 'itens pendentes'}`,
      cor: 'text-[#EF4444]',
      bg: 'bg-[#EF4444]/10',
    };
  };

  const statusResumo = getStatusResumo();

  const handleReset = (id) => {
    setItensVisiveis(
      itensVisiveis.map((item) =>
        item.id === id
          ? {
              ...item,
              ultimoResetKm: veiculoConsultado.kmAtual,
            }
          : item,
      ),
    );
    setModalReset({ visivel: false, item: null });
  };

  const handleAddNovoItem = () => {
    if (!novoItemNome || !novoItemIntervalo) return;
    const veiculoAlvo = frota.find(
      (v) => v.id === parseInt(novoItemVeiculoId),
    );
    const novo = {
      id: Date.now().toString(),
      nome: novoItemNome,
      iconId: novoItemIcone,
      intervalo: parseInt(novoItemIntervalo),
      ultimoResetKm: veiculoAlvo.kmAtual,
    };
    if (veiculoAlvo.id === veiculoConsultado.id) {
      setItensVisiveis([novo, ...itensVisiveis]);
    }
    setModalNovoItem(false);
    setNovoItemNome('');
    setNovoItemIntervalo('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-white font-sans overflow-hidden relative">
      {/* SELETOR DE VEÍCULOS (OVERLAY) */}
      {listaAberta && (
        <div className="absolute inset-0 z-[110] bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="p-6 pt-16">
            <div className="flex items-center justify-between mb-8 text-left">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tighter text-[#00C853]">
                  Oficina da Frota
                </h2>
                <p className="text-[#444] text-[10px] font-black uppercase tracking-widest">
                  Selecione para ver a manutenção
                </p>
              </div>
              <button
                onClick={() => setListaAberta(false)}
                className="p-3 bg-[#161616] rounded-2xl border border-[#222] text-[#666]"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              {frota.map((v) => (
                <button
                  key={v.id}
                  onClick={() => {
                    setVeiculoConsultado(v);
                    setListaAberta(false);
                  }}
                  className={`w-full p-5 rounded-[28px] border transition-all flex items-center justify-between ${
                    veiculoConsultado.id === v.id
                      ? 'border-[#00C853] bg-[#00C853]/5'
                      : 'border-[#222] bg-[#161616]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${veiculoConsultado.id === v.id ? 'bg-[#00C853] text-[#0A0A0A]' : 'bg-[#202020] text-[#444]'}`}
                    >
                      {v.tipo === 'moto' ? (
                        <Bike size={24} />
                      ) : (
                        <Car size={24} />
                      )}
                    </div>
                    <div className="text-left">
                      <h4 className="font-black uppercase text-sm leading-none">
                        {v.modelo}
                      </h4>
                      <p className="text-[10px] text-[#666] font-bold tracking-widest mt-1">
                        {v.placa}
                      </p>
                    </div>
                  </div>
                  {veiculoConsultado.id === v.id && (
                    <CheckCircle2
                      size={20}
                      className="text-[#00C853]"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL NOVO ITEM */}
      {modalNovoItem && (
        <div className="absolute inset-0 z-[120] bg-black/90 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-6">
            <div className="bg-[#161616] w-full max-w-sm rounded-[32px] border border-[#222] p-8 shadow-2xl">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#00C853]/10 rounded-full flex items-center justify-center mb-4">
                  {getIcon(novoItemIcone)}
                </div>
                <h3 className="text-xl font-black mb-1 uppercase tracking-tighter text-white">
                  Nova Manutenção
                </h3>
                <p className="text-[#666] text-[10px] uppercase font-bold tracking-widest mb-6">
                  Configuração de revisão
                </p>

                <div className="w-full space-y-4 mb-6 text-left">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-[#444] uppercase ml-1">
                      Aplicar ao Veículo
                    </label>
                    <select
                      value={novoItemVeiculoId}
                      onChange={(e) =>
                        setNovoItemVeiculoId(e.target.value)
                      }
                      className="w-full bg-[#0A0A0A] border border-[#222] rounded-2xl p-4 text-sm outline-none focus:border-[#00C853] text-white font-bold appearance-none cursor-pointer"
                    >
                      {frota.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.modelo} ({v.placa})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-[#444] uppercase ml-1">
                      Nome do Componente
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Óleo, Filtro, Pneu"
                      value={novoItemNome}
                      onChange={(e) =>
                        setNovoItemNome(e.target.value)
                      }
                      className="w-full bg-[#0A0A0A] border border-[#222] rounded-2xl p-4 text-sm outline-none focus:border-[#00C853] text-white font-bold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-[#444] uppercase ml-1">
                      Intervalo (KM)
                    </label>
                    <input
                      type="number"
                      placeholder="3000"
                      value={novoItemIntervalo}
                      onChange={(e) =>
                        setNovoItemIntervalo(e.target.value)
                      }
                      className="w-full bg-[#0A0A0A] border border-[#222] rounded-2xl p-4 text-sm outline-none focus:border-[#00C853] text-white font-bold"
                    />
                  </div>
                </div>

                <div className="w-full mb-8">
                  <p className="text-[#444] text-[10px] font-black uppercase tracking-widest text-left mb-3 ml-1">
                    Escolher Ícone
                  </p>
                  <div className="grid grid-cols-4 gap-3">
                    {iconOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() =>
                          setNovoItemIcone(opt.id)
                        }
                        className={`aspect-square rounded-xl border flex items-center justify-center transition-all ${
                          novoItemIcone === opt.id
                            ? 'bg-[#00C853] border-[#00C853] text-[#0A0A0A]'
                            : 'bg-[#0A0A0A] border-[#222] text-[#444]'
                        }`}
                      >
                        <opt.component size={20} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 w-full">
                  <button
                    onClick={handleAddNovoItem}
                    className="w-full py-4 bg-[#00C853] rounded-2xl text-[#0A0A0A] text-xs font-black uppercase tracking-widest active:scale-95 transition-all"
                  >
                    Registar Item
                  </button>
                  <button
                    onClick={() => setModalNovoItem(false)}
                    className="w-full py-4 bg-[#202020] rounded-2xl text-xs font-black uppercase tracking-widest text-[#666] active:scale-95 transition-all"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL RESET MANUTENÇÃO */}
      {modalReset.visivel && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#161616] w-full max-w-xs rounded-[32px] border border-[#222] p-6 shadow-2xl animate-in zoom-in-95 duration-200 text-center">
            <div className="bg-[#00C853]/10 p-4 rounded-full mb-4 mx-auto w-fit">
              <ClipboardCheck
                size={32}
                className="text-[#00C853]"
              />
            </div>
            <h2 className="text-xl font-black mb-2 uppercase tracking-tighter">
              Manutenção Realizada?
            </h2>
            <p className="text-[#666] text-sm mb-6 leading-relaxed">
              Confirmas que o serviço de{' '}
              <span className="text-white font-bold">
                {modalReset.item?.nome}
              </span>{' '}
              foi concluído?
            </p>
            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={() =>
                  handleReset(modalReset.item.id)
                }
                className="w-full py-4 bg-[#00C853] rounded-2xl text-[#0A0A0A] text-xs font-black uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-green-900/20"
              >
                Confirmar Registro
              </button>
              <button
                onClick={() =>
                  setModalReset({
                    visivel: false,
                    item: null,
                  })
                }
                className="w-full py-4 bg-[#202020] rounded-2xl text-xs font-black uppercase tracking-widest text-[#666] active:scale-95 transition-all"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER PRINCIPAL */}
      <header className="pt-12 px-6 pb-4 flex items-center justify-between border-b border-[#161616] bg-[#0A0A0A] z-10">
        <button
          className="p-2 bg-[#161616] rounded-xl border border-[#222] text-[#666] active:scale-95"
          onClick={() => alert('Voltar')}
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-sm font-black uppercase tracking-[3px] text-[#00C853]">
          Oficina
        </h1>
        <button
          className="p-2 bg-[#161616] rounded-xl border border-[#222] text-[#00C853] active:scale-95 shadow-lg"
          onClick={() => setModalNovoItem(true)}
        >
          <Plus size={20} strokeWidth={3} />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto px-5 py-6 pb-20 space-y-6 no-scrollbar">
        {/* CARD DO VEÍCULO COM INDICADOR DE PENDÊNCIAS */}
        <section className="bg-[#161616] rounded-[32px] p-6 border border-[#222] shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between relative z-10 text-left">
            <div>
              <p className="text-[#666] text-[10px] font-black uppercase tracking-widest mb-1">
                A visualizar:
              </p>
              <h2 className="text-xl font-black uppercase leading-none">
                {veiculoConsultado.modelo}
              </h2>
              <p className="text-[10px] text-[#00C853] font-bold tracking-[2px] mt-1">
                {veiculoConsultado.placa}
              </p>
            </div>

            <button
              onClick={() => setListaAberta(true)}
              className="p-3 bg-[#202020] rounded-2xl border border-[#333] text-[#00C853] flex items-center gap-2 active:scale-95 transition-all"
            >
              <ChevronDown size={20} />
              <div className="w-10 h-10 rounded-xl bg-[#00C853]/10 flex items-center justify-center">
                {veiculoConsultado.tipo === 'moto' ? (
                  <Bike size={20} />
                ) : (
                  <Car size={20} />
                )}
              </div>
            </button>
          </div>

          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-[#222] text-left">
            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-0.5 text-[#444]">
                <Gauge size={12} />
                <span className="text-[8px] font-black uppercase tracking-widest">
                  KM Atual
                </span>
              </div>
              <p className="text-sm font-black text-white">
                {veiculoConsultado.kmAtual.toLocaleString()}{' '}
                km
              </p>
            </div>

            {/* CAMPO DE SAÚDE + INDICADOR PENDENTE (SOLICITADO) */}
            <div className="flex items-center gap-2">
              <div
                className={`px-3 py-1.5 rounded-xl border border-white/5 flex items-center gap-2 ${statusResumo.bg}`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${statusResumo.cor.replace('text-', 'bg-')} animate-pulse`}
                />
                <span
                  className={`text-[10px] font-black uppercase tracking-tighter ${statusResumo.cor}`}
                >
                  {statusResumo.texto}
                </span>
              </div>

              <div className="bg-[#0A0A0A] px-4 py-1.5 rounded-xl border border-[#222] text-center">
                <p className="text-[8px] font-black text-[#444] uppercase mb-0.5">
                  Saúde
                </p>
                <p className="text-sm font-black text-[#00C853]">
                  85%
                </p>
              </div>
            </div>
          </div>

          <Wrench
            size={80}
            className="absolute -right-4 -bottom-4 text-[#222] opacity-10 -rotate-12 pointer-events-none"
          />
        </section>

        {/* LISTA DE COMPONENTES */}
        <section className="space-y-4">
          {itensVisiveis.map((item) => {
            const info = calcularProgresso(item);
            return (
              <div
                key={item.id}
                className="bg-[#161616] rounded-[28px] border border-[#222] p-5 transition-all animate-in slide-in-from-bottom-2 duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-[#0A0A0A] rounded-2xl border border-[#222] text-[#00C853]">
                      {getIcon(item.iconId)}
                    </div>
                    <div className="text-left">
                      <h4 className="text-sm font-black uppercase tracking-tight">
                        {item.nome}
                      </h4>
                      <p className="text-[10px] text-[#444] font-bold uppercase tracking-widest flex items-center gap-1">
                        <Clock size={10} /> Ciclo:{' '}
                        {item.intervalo} km
                      </p>
                    </div>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-tighter`}
                    style={{
                      backgroundColor: `${info.cor}15`,
                      color: info.cor,
                      border: `1px solid ${info.cor}30`,
                    }}
                  >
                    {info.status}
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <div className="flex justify-between items-end">
                    <p className="text-[10px] font-black text-[#666] uppercase tracking-widest">
                      Desgaste Atual
                    </p>
                    <p
                      className="text-xs font-black"
                      style={{ color: info.cor }}
                    >
                      {info.kmRestante > 0
                        ? `Faltam ${info.kmRestante} km`
                        : `Excedido em ${Math.abs(info.kmRestante)} km`}
                    </p>
                  </div>
                  <div className="h-2 w-full bg-[#0A0A0A] rounded-full overflow-hidden border border-[#222]">
                    <div
                      className="h-full transition-all duration-1000 shadow-[0_0_10px_rgba(0,200,83,0.2)]"
                      style={{
                        width: `${info.percentagemDesgaste}%`,
                        backgroundColor: info.cor,
                      }}
                    />
                  </div>
                </div>

                <div className="flex gap-2 mt-5">
                  <button
                    onClick={() =>
                      setModalReset({ visivel: true, item })
                    }
                    className="flex-1 h-12 bg-[#202020] hover:bg-[#252525] rounded-xl border border-[#333] flex items-center justify-center gap-2 active:scale-95 transition-all group"
                  >
                    <RotateCcw
                      size={16}
                      className="text-[#00C853] group-active:rotate-180 transition-transform"
                    />
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#888]">
                      Manutenção Realizada
                    </span>
                  </button>
                  <button className="h-12 w-12 bg-[#202020] rounded-xl border border-[#333] flex items-center justify-center text-[#444] active:scale-95 shadow-inner">
                    <Settings2 size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </section>
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
