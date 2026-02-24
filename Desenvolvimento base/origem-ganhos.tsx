import React, { useState } from 'react';
import {
  Check,
  Smartphone,
  Navigation,
  Truck,
  User,
  ChevronRight,
  ArrowLeft,
  Search,
  Plus,
  Info,
  Car,
  Package,
  X,
  PlusCircle,
  Briefcase,
  Zap,
  ShoppingBag,
  Circle,
} from 'lucide-react';

/**
 * TELA DE SELEÇÃO DE ORIGENS (ONBOARDING PASSO 2) - V4.1 (Fixed)
 * Identidade Visual: Verde e Preto (#00C853 / #0A0A0A)
 * Correções:
 * - Corrigido erro de referência 'setNovoCor is not defined'.
 */
export default function App() {
  const [busca, setBusca] = useState('');
  const [selecionados, setSelecionados] = useState([1]); // iFood selecionado por padrão

  // Estado para o Modal de Nova Origem
  const [modalNovoAberto, setModalNovoAberto] =
    useState(false);
  const [novoNome, setNovoNome] = useState('');
  const [novoIcone, setNovoIcone] = useState('Briefcase');
  const [novaCor, setNovaCor] = useState('#00C853');

  // Bibliotecas de ícones e cores para escolha
  const iconList = [
    { id: 'Briefcase', component: Briefcase },
    { id: 'Smartphone', component: Smartphone },
    { id: 'Car', component: Car },
    { id: 'Truck', component: Truck },
    { id: 'Package', component: Package },
    { id: 'Navigation', component: Navigation },
    { id: 'Zap', component: Zap },
    { id: 'ShoppingBag', component: ShoppingBag },
  ];

  const colorPalette = [
    '#00C853', // Verde Sucesso
    '#2196F3', // Azul Profissional
    '#F44336', // Vermelho Alerta
    '#FF9800', // Laranja Atenção
    '#9C27B0', // Roxo Moderno
    '#FFEB3B', // Amarelo Energia
    '#E91E63', // Rosa
    '#00BCD4', // Ciano
  ];

  // Lista Inicial de Apps (Com cores padrão)
  const [origensPrincipais, setOrigensPrincipais] =
    useState([
      {
        id: 1,
        nome: 'iFood',
        iconId: 'Smartphone',
        cor: '#00C853',
        categoria: 'Delivery',
      },
      {
        id: 2,
        nome: 'Uber',
        iconId: 'Car',
        cor: '#2196F3',
        categoria: 'Passageiro / Flash',
      },
      {
        id: 3,
        nome: '99',
        iconId: 'Navigation',
        cor: '#FFEB3B',
        categoria: 'Passageiro / Entrega',
      },
      {
        id: 4,
        nome: 'Mercado Livre',
        iconId: 'Package',
        cor: '#FF9800',
        categoria: 'Logística / Carga',
      },
      {
        id: 5,
        nome: 'Lalamove',
        iconId: 'Truck',
        cor: '#FF5252',
        categoria: 'Carga / Frete',
      },
    ]);

  const toggleSelecao = (id) => {
    if (selecionados.includes(id)) {
      setSelecionados(
        selecionados.filter((item) => item !== id),
      );
    } else {
      setSelecionados([...selecionados, id]);
    }
  };

  const getIconComponent = (iconId, color) => {
    const icon = iconList.find((i) => i.id === iconId);
    const IconComp = icon ? icon.component : Briefcase;
    return <IconComp size={20} style={{ color: color }} />;
  };

  const origensFiltradas = origensPrincipais.filter((o) =>
    o.nome.toLowerCase().includes(busca.toLowerCase()),
  );

  const salvarNovaOrigem = () => {
    if (!novoNome.trim()) return;

    const novoId = Date.now();
    const novaOrigem = {
      id: novoId,
      nome: novoNome,
      iconId: novoIcone,
      cor: novaCor,
      categoria: 'Personalizado',
    };

    setOrigensPrincipais([
      ...origensPrincipais,
      novaOrigem,
    ]);
    setSelecionados([...selecionados, novoId]);
    setModalNovoAberto(false);
    setNovoNome('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-white font-sans overflow-hidden">
      {/* MODAL PARA ADICIONAR NOVO MÉTODO (COM ÍCONE E COR) */}
      {modalNovoAberto && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-[#161616] w-full max-w-sm rounded-[32px] border border-[#222] p-8 shadow-2xl animate-in zoom-in-95 duration-200 overflow-y-auto max-h-[90vh] no-scrollbar">
            <div className="flex flex-col items-center text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors"
                style={{
                  backgroundColor: `${novaCor}15`,
                  border: `2px solid ${novaCor}`,
                }}
              >
                {getIconComponent(novoIcone, novaCor)}
              </div>
              <h2 className="text-xl font-black mb-1 uppercase tracking-tighter">
                Nova Origem
              </h2>
              <p className="text-[#666] text-[10px] uppercase font-bold tracking-widest mb-6">
                Personalize o seu corre
              </p>

              <div className="w-full space-y-5 text-left">
                {/* Nome */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-[#444] uppercase ml-1">
                    Nome do Aplicativo/Empresa
                  </label>
                  <input
                    type="text"
                    autoFocus
                    placeholder="Ex: Entrega Local, Cooperativa..."
                    className="w-full bg-[#0A0A0A] border border-[#222] rounded-2xl p-4 text-sm font-bold text-white outline-none focus:border-[#00C853] transition-all"
                    value={novoNome}
                    onChange={(e) =>
                      setNovoNome(e.target.value)
                    }
                  />
                </div>

                {/* Seletor de Ícone */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-[#444] uppercase ml-1">
                    Escolher Ícone
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {iconList.map((icon) => (
                      <button
                        key={icon.id}
                        onClick={() =>
                          setNovoIcone(icon.id)
                        }
                        className={`p-3 rounded-xl border flex items-center justify-center transition-all ${
                          novoIcone === icon.id
                            ? 'bg-white/5 border-white/20'
                            : 'bg-[#0A0A0A] border-[#222]'
                        }`}
                      >
                        <icon.component
                          size={18}
                          className={
                            novoIcone === icon.id
                              ? 'text-white'
                              : 'text-[#333]'
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Seletor de Cor */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-[#444] uppercase ml-1">
                    Escolher Cor
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {colorPalette.map((color) => (
                      <button
                        key={color}
                        onClick={() => setNovaCor(color)}
                        className={`h-10 rounded-xl border-2 flex items-center justify-center transition-all ${
                          novaCor === color
                            ? 'scale-110'
                            : 'opacity-40 border-transparent'
                        }`}
                        style={{
                          backgroundColor: color,
                          borderColor:
                            novaCor === color
                              ? 'white'
                              : 'transparent',
                        }}
                      >
                        {novaCor === color && (
                          <Check
                            size={16}
                            className="text-black"
                            strokeWidth={4}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full mt-8">
                <button
                  onClick={salvarNovaOrigem}
                  disabled={!novoNome.trim()}
                  className={`w-full py-4 rounded-2xl text-[#0A0A0A] text-xs font-black uppercase tracking-widest transition-all ${
                    novoNome.trim()
                      ? 'bg-[#00C853] active:scale-95 shadow-lg shadow-green-900/20'
                      : 'bg-[#222] text-[#444] opacity-50'
                  }`}
                >
                  Registar Origem
                </button>
                <button
                  onClick={() => {
                    setModalNovoAberto(false);
                    setNovoNome('');
                  }}
                  className="w-full py-4 bg-[#202020] rounded-2xl text-xs font-black uppercase tracking-widest text-[#666] active:scale-95 transition-all"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="pt-14 px-6 pb-6 border-b border-[#161616]">
        <div className="flex items-center gap-4 mb-4 text-left">
          <button className="p-2 bg-[#161616] rounded-xl border border-[#222] text-[#666] active:scale-95 transition-all">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-[900] tracking-tight uppercase leading-tight">
              Configura o teu corre
            </h1>
            <p className="text-[#666] text-xs">
              Onde ganhas o teu dinheiro?
            </p>
          </div>
        </div>

        <div className="relative mt-6">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#444]"
            size={18}
          />
          <input
            type="text"
            placeholder="Procurar empresa ou app..."
            className="w-full bg-[#161616] border border-[#222] rounded-2xl p-4 pl-12 text-sm text-white font-bold outline-none focus:border-[#00C853] transition-all"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-6 pb-32 no-scrollbar">
        <div className="space-y-3">
          {origensFiltradas.map((origem) => (
            <button
              key={origem.id}
              onClick={() => toggleSelecao(origem.id)}
              className={`w-full p-5 rounded-[28px] border transition-all flex items-center justify-between group active:scale-[0.98] ${
                selecionados.includes(origem.id)
                  ? 'bg-[#111]'
                  : 'border-[#222] bg-[#111]'
              }`}
              style={{
                borderColor: selecionados.includes(
                  origem.id,
                )
                  ? origem.cor
                  : '#222',
              }}
            >
              <div className="flex items-center gap-4 text-left">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: `${origem.cor}10`,
                  }}
                >
                  {getIconComponent(
                    origem.iconId,
                    origem.cor,
                  )}
                </div>
                <div>
                  <span
                    className={`block font-black uppercase text-sm ${selecionados.includes(origem.id) ? 'text-white' : 'text-[#444]'}`}
                  >
                    {origem.nome}
                  </span>
                  <span className="text-[9px] font-bold text-[#444] uppercase tracking-widest">
                    {origem.categoria}
                  </span>
                </div>
              </div>

              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all`}
                style={{
                  backgroundColor: selecionados.includes(
                    origem.id,
                  )
                    ? origem.cor
                    : 'transparent',
                  borderColor: selecionados.includes(
                    origem.id,
                  )
                    ? origem.cor
                    : '#222',
                }}
              >
                {selecionados.includes(origem.id) && (
                  <Check
                    size={14}
                    className="text-[#0A0A0A]"
                    strokeWidth={4}
                  />
                )}
              </div>
            </button>
          ))}

          <button
            onClick={() => setModalNovoAberto(true)}
            className="w-full p-6 rounded-[28px] border-2 border-dashed border-[#222] bg-[#0A0A0A] hover:bg-[#111] hover:border-[#333] transition-all flex items-center justify-center gap-3 active:scale-[0.98] group mt-4"
          >
            <div className="w-10 h-10 rounded-full bg-[#161616] flex items-center justify-center group-hover:bg-[#00C853] transition-colors">
              <Plus
                size={20}
                className="text-[#444] group-hover:text-[#0A0A0A]"
                strokeWidth={3}
              />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-[#666] group-hover:text-white">
              Adicionar Outra Origem
            </span>
          </button>
        </div>

        <div className="mt-8 p-6 bg-[#161616] rounded-[32px] border border-[#222] flex gap-4 text-left">
          <Info
            size={24}
            className="text-[#00C853] shrink-0"
          />
          <p className="text-[11px] text-[#666] leading-relaxed">
            Cada cor e ícone escolhido aqui será usado no
            seu{' '}
            <strong className="text-white">
              Dashboard
            </strong>{' '}
            e{' '}
            <strong className="text-white">
              Relatórios
            </strong>{' '}
            para que saiba onde está a lucrar mais.
          </p>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-[#0A0A0A]/95 backdrop-blur-md border-t border-[#161616] z-50">
        <button
          onClick={() =>
            alert('Salvando configurações no banco...')
          }
          disabled={selecionados.length === 0}
          className={`w-full flex items-center justify-center h-[65px] rounded-[24px] gap-2 transition-all shadow-lg ${
            selecionados.length > 0
              ? 'bg-[#00C853] shadow-green-900/20 active:scale-[0.98]'
              : 'bg-[#222] opacity-50 cursor-not-allowed'
          }`}
        >
          <span className="text-[#0A0A0A] text-lg font-[900] tracking-tight uppercase">
            Concluir Configuração
          </span>
          <ChevronRight
            size={24}
            className="text-[#0A0A0A]"
          />
        </button>
      </footer>

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
