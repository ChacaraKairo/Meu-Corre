import React, { useState, useEffect, useMemo } from 'react';
import {
  ChevronLeft,
  Settings,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  RefreshCcw,
  Droplets,
  CircleDot,
  Disc,
  LifeBuoy,
  Zap,
} from 'lucide-react';

const App = () => {
  // Simulando KM Atual vindo do Dashboard
  const [kmAtual] = useState(15700);
  const [showSuccessModal, setShowSuccessModal] =
    useState(false);
  const [itemResetado, setItemResetado] = useState('');

  // Estado inicial dos itens de manutenção (Simulando SQLite)
  const [itensManutencao, setItensManutencao] = useState([
    {
      id: 1,
      nome: 'Troca de Óleo',
      icon: <Droplets />,
      intervalo: 3000,
      kmUltimoReset: 13000,
    },
    {
      id: 2,
      nome: 'Kit Relação',
      icon: <CircleDot />,
      intervalo: 15000,
      kmUltimoReset: 2000,
    },
    {
      id: 3,
      nome: 'Pneus',
      icon: <LifeBuoy />,
      intervalo: 20000,
      kmUltimoReset: 0,
    },
    {
      id: 4,
      nome: 'Pastilhas de Freio',
      icon: <Disc />,
      intervalo: 10000,
      kmUltimoReset: 8000,
    },
    {
      id: 5,
      nome: 'Vela de Ignição',
      icon: <Zap />,
      intervalo: 12000,
      kmUltimoReset: 10000,
    },
  ]);

  // Regra de Negócio: Lógica de Cálculo (Seção 2.1 do Canvas)
  const calcItemStats = (item) => {
    const rodagemDesdeReset = kmAtual - item.kmUltimoReset;
    const faltamKm = Math.max(
      0,
      item.intervalo - rodagemDesdeReset,
    );
    const porcentagem = Math.min(
      100,
      (rodagemDesdeReset / item.intervalo) * 100,
    );

    // Regra de cores do Canvas
    let cor = '#00C853'; // Verde
    if (porcentagem >= 90)
      cor = '#D50000'; // Vermelho
    else if (porcentagem >= 70) cor = '#FFD700'; // Amarelo

    return { faltamKm, porcentagem, cor };
  };

  // Status Geral (Seção 1.1 do Canvas)
  const statusGeral = useMemo(() => {
    const pendentes = itensManutencao.filter(
      (item) => calcItemStats(item).porcentagem >= 90,
    ).length;
    return pendentes > 0
      ? {
          msg: `Atenção: ${pendentes} itens pendentes`,
          cor: '#D50000',
          alerta: true,
        }
      : {
          msg: 'Sua moto está em dia',
          cor: '#00C853',
          alerta: false,
        };
  }, [itensManutencao, kmAtual]);

  // Ação de Reset (Seção 2.2 do Canvas)
  const handleReset = (id, nome) => {
    setItensManutencao((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, kmUltimoReset: kmAtual }
          : item,
      ),
    );
    setItemResetado(nome);
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-white font-sans overflow-x-hidden max-w-md mx-auto border-x border-gray-900">
      {/* Cabeçalho */}
      <header className="p-4 flex items-center gap-4 bg-[#121212] sticky top-0 z-30 border-b border-gray-800">
        <button className="p-2 bg-gray-900 rounded-full text-gray-400 active:scale-90 transition-transform">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-black uppercase tracking-tighter">
          Manutenção
        </h1>
      </header>

      <main className="flex-1 p-4 space-y-6 pb-12">
        {/* Status Geral */}
        <section
          className={`p-5 rounded-[1.5rem] border-2 flex items-center gap-4 transition-colors duration-500`}
          style={{
            borderColor: statusGeral.cor + '44',
            backgroundColor: statusGeral.cor + '11',
          }}
        >
          <div
            className="p-3 rounded-2xl"
            style={{ backgroundColor: statusGeral.cor }}
          >
            {statusGeral.alerta ? (
              <AlertTriangle
                size={24}
                className="text-white"
              />
            ) : (
              <CheckCircle2
                size={24}
                className="text-white"
              />
            )}
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              Status Geral
            </p>
            <h2
              className="text-lg font-black"
              style={{ color: statusGeral.cor }}
            >
              {statusGeral.msg}
            </h2>
          </div>
        </section>

        {/* Lista de Cards de Progresso */}
        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase text-gray-500 tracking-[0.2em] px-1">
            Componentes da Moto
          </h3>

          {itensManutencao.map((item) => {
            const { faltamKm, porcentagem, cor } =
              calcItemStats(item);

            return (
              <div
                key={item.id}
                className="bg-[#1e1e1e] rounded-[1.5rem] p-5 border border-gray-800 shadow-lg space-y-4 transition-all"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-800 rounded-xl text-gray-400">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-black text-sm uppercase tracking-tight">
                        {item.nome}
                      </h4>
                      <p className="text-[10px] text-gray-500 font-bold">
                        Troca a cada{' '}
                        {item.intervalo.toLocaleString()} km
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className="text-xl font-black tabular-nums"
                      style={{ color: cor }}
                    >
                      {faltamKm.toLocaleString()}
                    </p>
                    <p className="text-[8px] font-black uppercase text-gray-500">
                      KM Restantes
                    </p>
                  </div>
                </div>

                {/* Barra de Progresso (Regras do Canvas) */}
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-900 rounded-full overflow-hidden p-1 border border-gray-800">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${porcentagem}%`,
                        backgroundColor: cor,
                      }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[9px] font-black text-gray-600 uppercase">
                    <span>Início</span>
                    <span>
                      {porcentagem.toFixed(0)}% de desgaste
                    </span>
                    <span>Troca</span>
                  </div>
                </div>

                {/* Botão de Reset (Glove-Friendly) */}
                <button
                  onClick={() =>
                    handleReset(item.id, item.nome)
                  }
                  className="w-full h-14 bg-gray-800 rounded-2xl flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest text-gray-300 active:scale-95 transition-all border border-gray-700"
                >
                  <RefreshCcw size={16} />
                  Realizei esta manutenção
                </button>
              </div>
            );
          })}
        </div>

        {/* Dica de Performance */}
        <div className="bg-gray-900/50 p-6 rounded-3xl border border-gray-800 text-center space-y-2">
          <Wrench
            size={32}
            className="mx-auto text-gray-600 mb-2"
          />
          <p className="text-xs text-gray-400 font-medium">
            Os alertas são calculados automaticamente
            conforme você anota a quilometragem no seu
            Dashboard.
          </p>
        </div>
      </main>

      {/* Modal de Sucesso (Feedback Visual 2.2) */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-[#121212]/90 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
          <div className="bg-[#1e1e1e] border border-gray-800 rounded-[2rem] p-8 w-full max-w-xs text-center shadow-[0_0_50px_rgba(0,200,83,0.2)]">
            <div className="bg-[#00C853] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2
                size={32}
                className="text-white"
                strokeWidth={3}
              />
            </div>
            <h2 className="text-xl font-black mb-2 uppercase">
              Reiniciado!
            </h2>
            <p className="text-gray-400 text-sm">
              O contador do item{' '}
              <span className="text-white font-bold">
                {itemResetado}
              </span>{' '}
              foi zerado para o KM atual.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
