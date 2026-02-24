import React, { useState } from 'react';
import {
  Bike,
  Car,
  ArrowLeft,
  Check,
  Gauge,
  Droplets,
  Settings,
  AlertCircle,
  Hash,
  Wrench,
} from 'lucide-react';

/**
 * TELA DE ADIÇÃO DE NOVO VEÍCULO - PROTÓTIPO V1
 * Identidade Visual: Verde e Preto (#00C853 / #0A0A0A)
 * Foco: Cadastro simplificado e integração com o sistema de manutenção.
 */
export default function App() {
  // Estados do formulário
  const [tipo, setTipo] = useState('moto');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [motor, setMotor] = useState('');
  const [placa, setPlaca] = useState('');
  const [kmAtual, setKmAtual] = useState('');
  const [combustivel, setCombustivel] = useState('flex');

  const [salvando, setSalvando] = useState(false);

  // Função para salvar e voltar
  const handleSalvar = () => {
    if (!marca || !modelo || !placa || !kmAtual) {
      alert(
        'Preenche os campos obrigatórios para registar a máquina!',
      );
      return;
    }

    setSalvando(true);
    // Simulação de persistência no SQLite
    setTimeout(() => {
      setSalvando(false);
      alert(
        `Máquina ${modelo} adicionada à garagem com sucesso!`,
      );
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-white font-sans overflow-hidden">
      {/* HEADER */}
      <header className="pt-12 px-6 pb-4 flex items-center justify-between border-b border-[#161616] bg-[#0A0A0A] z-10">
        <button
          className="p-2 bg-[#161616] rounded-xl border border-[#222] text-[#666] active:scale-95 transition-all"
          onClick={() => alert('Voltar para Minha Garagem')}
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-sm font-black uppercase tracking-[3px] text-[#00C853]">
          Nova Máquina
        </h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 overflow-y-auto px-5 py-6 pb-40 space-y-6 no-scrollbar">
        {/* SELETOR DE TIPO */}
        <section>
          <h2 className="text-[#666] text-[10px] font-black uppercase tracking-widest ml-2 mb-3">
            Tipo de Veículo
          </h2>
          <div className="flex gap-4">
            <button
              onClick={() => setTipo('moto')}
              className={`flex-1 flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all duration-300 ${
                tipo === 'moto'
                  ? 'border-[#00C853] bg-[#00C853]/10 shadow-[0_0_20px_rgba(0,200,83,0.1)]'
                  : 'border-[#222] bg-[#111]'
              }`}
            >
              <Bike
                size={32}
                className={
                  tipo === 'moto'
                    ? 'text-[#00C853]'
                    : 'text-[#444]'
                }
              />
              <span
                className={`text-[10px] font-black mt-2 tracking-widest ${tipo === 'moto' ? 'text-[#00C853]' : 'text-[#444]'}`}
              >
                MOTO
              </span>
            </button>
            <button
              onClick={() => setTipo('carro')}
              className={`flex-1 flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all duration-300 ${
                tipo === 'carro'
                  ? 'border-[#00C853] bg-[#00C853]/10 shadow-[0_0_20px_rgba(0,200,83,0.1)]'
                  : 'border-[#222] bg-[#111]'
              }`}
            >
              <Car
                size={32}
                className={
                  tipo === 'carro'
                    ? 'text-[#00C853]'
                    : 'text-[#444]'
                }
              />
              <span
                className={`text-[10px] font-black mt-2 tracking-widest ${tipo === 'carro' ? 'text-[#00C853]' : 'text-[#444]'}`}
              >
                CARRO
              </span>
            </button>
          </div>
        </section>

        {/* IDENTIFICAÇÃO */}
        <section className="bg-[#161616] rounded-[32px] p-6 border border-[#222] space-y-5 shadow-2xl">
          <div className="flex items-center gap-2 mb-2">
            <Settings
              size={18}
              className="text-[#00C853]"
            />
            <h3 className="text-[#666] text-[10px] font-black uppercase tracking-widest">
              Identificação
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#444] uppercase ml-1">
                Marca
              </label>
              <input
                type="text"
                placeholder="Ex: Honda"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#222] rounded-2xl p-4 text-sm font-bold outline-none focus:border-[#00C853] transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#444] uppercase ml-1">
                Modelo
              </label>
              <input
                type="text"
                placeholder="Ex: CG 160"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#222] rounded-2xl p-4 text-sm font-bold outline-none focus:border-[#00C853] transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#444] uppercase ml-1">
              Placa
            </label>
            <div className="relative">
              <Hash
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#444]"
              />
              <input
                type="text"
                placeholder="ABC-1D23"
                value={placa}
                onChange={(e) =>
                  setPlaca(e.target.value.toUpperCase())
                }
                className="w-full bg-[#0A0A0A] border border-[#222] rounded-2xl p-4 pl-12 text-lg font-black tracking-[3px] outline-none focus:border-[#00C853] transition-all uppercase"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#444] uppercase ml-1">
                Ano
              </label>
              <input
                type="number"
                placeholder="2024"
                value={ano}
                onChange={(e) => setAno(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#222] rounded-2xl p-4 text-sm font-bold outline-none focus:border-[#00C853] transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#444] uppercase ml-1">
                Motor/Potência
              </label>
              <input
                type="text"
                placeholder="160cc"
                value={motor}
                onChange={(e) => setMotor(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#222] rounded-2xl p-4 text-sm font-bold outline-none focus:border-[#00C853] transition-all"
              />
            </div>
          </div>
        </section>

        {/* TÉCNICO E CONSUMO */}
        <section className="bg-[#161616] rounded-[32px] p-6 border border-[#222] space-y-5 shadow-2xl">
          <div className="flex items-center gap-2 mb-2">
            <Wrench size={18} className="text-[#00C853]" />
            <h3 className="text-[#666] text-[10px] font-black uppercase tracking-widest">
              Estado Inicial
            </h3>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#444] uppercase ml-1 flex items-center gap-1">
              <Gauge size={12} /> Odómetro Atual (KM)
            </label>
            <input
              type="number"
              placeholder="0"
              value={kmAtual}
              onChange={(e) => setKmAtual(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#222] rounded-2xl p-4 text-xl font-black outline-none focus:border-[#00C853] transition-all"
            />
            <p className="text-[9px] text-[#444] font-medium ml-1">
              Necessário para monitorizar revisões de óleo e
              pneus.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-[10px] font-bold text-[#444] uppercase ml-1 flex items-center gap-1">
              <Droplets size={12} /> Combustível Padrão
            </label>
            <select
              value={combustivel}
              onChange={(e) =>
                setCombustivel(e.target.value)
              }
              className="w-full bg-[#0A0A0A] border border-[#222] rounded-2xl p-4 text-sm font-bold outline-none focus:border-[#00C853] transition-all appearance-none"
            >
              <option value="flex">
                FLEX (Álcool / Gasolina)
              </option>
              <option value="gasolina">
                Gasolina Pura
              </option>
              <option value="alcool">Álcool Puro</option>
              <option value="eletrico">Elétrico</option>
              <option value="diesel">Diesel</option>
            </select>
          </div>
        </section>

        {/* AVISO DE SEGURANÇA */}
        <div className="flex items-start gap-3 p-4 bg-yellow-900/5 rounded-2xl border border-yellow-900/10">
          <AlertCircle
            size={20}
            className="text-yellow-600 shrink-0"
          />
          <p className="text-[10px] text-[#555] leading-relaxed">
            Ao salvar, este veículo será adicionado à tua
            garagem. Podes torná-lo{' '}
            <strong className="text-white font-black">
              Ativo
            </strong>{' '}
            a qualquer momento na tela anterior.
          </p>
        </div>
      </main>

      {/* FOOTER FIXO - AÇÃO PRINCIPAL */}
      <footer className="fixed bottom-0 left-0 right-0 p-5 bg-[#0A0A0A]/95 backdrop-blur-md border-t border-[#161616] z-50">
        <button
          onClick={handleSalvar}
          disabled={salvando}
          className={`w-full flex items-center justify-center h-[65px] rounded-2xl gap-3 shadow-lg transition-all active:scale-[0.98] ${
            salvando
              ? 'bg-[#222] cursor-not-allowed'
              : 'bg-[#00C853] shadow-green-900/20'
          }`}
        >
          {salvando ? (
            <div className="w-6 h-6 border-2 border-[#444] border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Check
                size={24}
                className="text-[#0A0A0A]"
                strokeWidth={3}
              />
              <span className="text-[#0A0A0A] text-lg font-[900] tracking-tight uppercase">
                Adicionar à Garagem
              </span>
            </>
          )}
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
