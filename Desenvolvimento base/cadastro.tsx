import React, { useState } from 'react';
import {
  User,
  Bike,
  Car,
  Target,
  Camera,
  ChevronRight,
  X,
  Settings,
  Gauge,
  Droplets,
  ShieldCheck,
} from 'lucide-react';

/**
 * TELA DE CADASTRO (ONBOARDING) - PROTÓTIPO V8
 * Identidade Visual: Verde e Preto
 * Correção de Erros: Substituído TouchableOpacity por elementos HTML compatíveis com Web.
 */
export default function App() {
  // Estados para o Perfil
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [foto, setFoto] = useState(null);

  // Estados para o Veículo
  const [tipoVeiculo, setTipoVeiculo] = useState('moto');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [motor, setMotor] = useState('');
  const [placa, setPlaca] = useState('');
  const [kmAtual, setKmAtual] = useState('');
  const [combustivel, setCombustivel] = useState('flex');

  // Estado para Meta e Termos
  const [meta, setMeta] = useState('');
  const [aceitouTermos, setAceitouTermos] = useState(false);

  // Simulação de tirar foto
  const tirarFoto = () => {
    setFoto(
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&h=150&auto=format&fit=crop',
    );
  };

  const removerFoto = (e) => {
    e.stopPropagation();
    setFoto(null);
  };

  const handlePlacaChange = (e) => {
    setPlaca(e.target.value.toUpperCase());
  };

  const handleComecarCorre = () => {
    if (
      !nome ||
      !marca ||
      !modelo ||
      !placa ||
      !kmAtual ||
      !aceitouTermos
    ) {
      alert(
        'Por favor, preenche os campos obrigatórios e aceita os termos!',
      );
      return;
    }
    alert(
      `Sucesso! A tua ${marca} com ${kmAtual}km está pronta para faturar.`,
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-white font-sans overflow-hidden">
      <div className="flex-1 overflow-y-auto pb-40">
        {/* HEADER / LOGO */}
        <div className="flex flex-col items-center mt-12 mb-8">
          <div className="bg-[#00C853] p-4 rounded-[25px] mb-4 shadow-lg shadow-green-900/30">
            {tipoVeiculo === 'moto' ? (
              <Bike
                size={40}
                className="text-[#0A0A0A]"
                strokeWidth={2.5}
              />
            ) : (
              <Car
                size={40}
                className="text-[#0A0A0A]"
                strokeWidth={2.5}
              />
            )}
          </div>
          <h1 className="text-2xl font-[900] tracking-wider uppercase">
            MeuCorre
          </h1>
          <p className="text-[#666] text-sm mt-1 text-center">
            Configura a tua conta e começa a rodar.
          </p>
        </div>

        {/* SECÇÃO 1: VOCÊ */}
        <section className="bg-[#161616] mx-5 mb-5 rounded-2xl p-5 border border-[#222] shadow-2xl">
          <div className="flex items-center gap-2 mb-4">
            <User size={18} className="text-[#00C853]" />
            <h2 className="text-[#666] text-[10px] font-[900] tracking-[1.5px] uppercase">
              DADOS DO PILOTO
            </h2>
          </div>

          <div className="flex items-center justify-center gap-6 my-6">
            <button
              onClick={tirarFoto}
              className="w-20 h-20 rounded-full bg-[#202020] flex flex-col items-center justify-center border border-[#333] hover:border-[#00C853] transition-all group active:scale-95"
            >
              <Camera
                size={24}
                className="text-[#444] group-hover:text-[#00C853]"
              />
              <span className="text-[10px] text-[#444] font-bold mt-1 group-hover:text-[#00C853]">
                FOTO
              </span>
            </button>

            {foto ? (
              <div className="relative animate-in fade-in zoom-in duration-300">
                <div className="w-24 h-24 rounded-full border-2 border-[#00C853] overflow-hidden bg-[#202020]">
                  <img
                    src={foto}
                    alt="Perfil"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={removerFoto}
                  className="absolute -top-1 -right-1 bg-red-600 rounded-full p-1 border-2 border-[#161616] hover:bg-red-500 transition-colors"
                >
                  <X size={14} className="text-white" />
                </button>
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#333] flex items-center justify-center bg-[#1a1a1a]">
                <User
                  size={32}
                  className="text-[#252525]"
                />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="text-[#AAA] text-sm mb-2 font-medium">
                Nome Completo
              </label>
              <input
                type="text"
                className="bg-[#202020] rounded-xl p-4 text-white border border-[#333] outline-none focus:border-[#00C853] transition-all"
                placeholder="Ex: João Silva"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[#AAA] text-sm mb-2 font-medium">
                Senha de Acesso
              </label>
              <input
                type="password"
                className="bg-[#202020] rounded-xl p-4 text-white border border-[#333] outline-none focus:border-[#00C853] transition-all"
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* SECÇÃO 2: TUA MÁQUINA */}
        <section className="bg-[#161616] mx-5 mb-5 rounded-2xl p-5 border border-[#222] shadow-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Settings
              size={18}
              className="text-[#00C853]"
            />
            <h2 className="text-[#666] text-[10px] font-[900] tracking-[1.5px] uppercase">
              TUA MÁQUINA
            </h2>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setTipoVeiculo('moto')}
              className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${tipoVeiculo === 'moto' ? 'border-[#00C853] bg-[#00C853]/10' : 'border-[#333] bg-[#202020]'}`}
            >
              <Bike
                size={24}
                className={
                  tipoVeiculo === 'moto'
                    ? 'text-[#00C853]'
                    : 'text-[#444]'
                }
              />
              <span
                className={`text-xs font-bold mt-2 ${tipoVeiculo === 'moto' ? 'text-[#00C853]' : 'text-[#444]'}`}
              >
                MOTO
              </span>
            </button>
            <button
              onClick={() => setTipoVeiculo('carro')}
              className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${tipoVeiculo === 'carro' ? 'border-[#00C853] bg-[#00C853]/10' : 'border-[#333] bg-[#202020]'}`}
            >
              <Car
                size={24}
                className={
                  tipoVeiculo === 'carro'
                    ? 'text-[#00C853]'
                    : 'text-[#444]'
                }
              />
              <span
                className={`text-xs font-bold mt-2 ${tipoVeiculo === 'carro' ? 'text-[#00C853]' : 'text-[#444]'}`}
              >
                CARRO
              </span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex flex-col flex-1">
                <label className="text-[#AAA] text-sm mb-2 font-medium">
                  Marca
                </label>
                <input
                  type="text"
                  className="bg-[#202020] rounded-xl p-4 text-white border border-[#333] outline-none focus:border-[#00C853] w-full"
                  placeholder="Honda"
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
                />
              </div>
              <div className="flex flex-col flex-1">
                <label className="text-[#AAA] text-sm mb-2 font-medium">
                  Modelo
                </label>
                <input
                  type="text"
                  className="bg-[#202020] rounded-xl p-4 text-white border border-[#333] outline-none focus:border-[#00C853] w-full"
                  placeholder="CG 160"
                  value={modelo}
                  onChange={(e) =>
                    setModelo(e.target.value)
                  }
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col flex-1">
                <label className="text-[#AAA] text-sm mb-2 font-medium">
                  Ano
                </label>
                <input
                  type="number"
                  className="bg-[#202020] rounded-xl p-4 text-white border border-[#333] outline-none focus:border-[#00C853] w-full"
                  placeholder="2024"
                  value={ano}
                  onChange={(e) => setAno(e.target.value)}
                />
              </div>
              <div className="flex flex-col flex-1">
                <label className="text-[#AAA] text-sm mb-2 font-medium">
                  Motor
                </label>
                <input
                  type="text"
                  className="bg-[#202020] rounded-xl p-4 text-white border border-[#333] outline-none focus:border-[#00C853] w-full"
                  placeholder="160cc"
                  value={motor}
                  onChange={(e) => setMotor(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-[#AAA] text-sm mb-2 font-medium">
                Placa
              </label>
              <input
                type="text"
                className="bg-[#202020] rounded-xl p-4 text-white border border-[#333] outline-none focus:border-[#00C853] uppercase"
                placeholder="ABC1D23"
                value={placa}
                onChange={handlePlacaChange}
              />
            </div>

            <div className="pt-2 border-t border-[#222]">
              <div className="flex gap-4">
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Gauge
                      size={14}
                      className="text-[#00C853]"
                    />
                    <label className="text-[#AAA] text-sm font-medium">
                      KM Atual
                    </label>
                  </div>
                  <input
                    type="number"
                    className="bg-[#202020] rounded-xl p-4 text-white border border-[#333] outline-none focus:border-[#00C853]"
                    placeholder="Ex: 12500"
                    value={kmAtual}
                    onChange={(e) =>
                      setKmAtual(e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets
                      size={14}
                      className="text-[#00C853]"
                    />
                    <label className="text-[#AAA] text-sm font-medium">
                      Combustível
                    </label>
                  </div>
                  <select
                    className="bg-[#202020] rounded-xl p-4 text-white border border-[#333] outline-none focus:border-[#00C853] h-[58px]"
                    value={combustivel}
                    onChange={(e) =>
                      setCombustivel(e.target.value)
                    }
                  >
                    <option value="flex">Flex</option>
                    <option value="gasolina">
                      Gasolina
                    </option>
                    <option value="alcool">Álcool</option>
                    <option value="alcool">Elétrico</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECÇÃO 3: OBJETIVOS */}
        <section className="bg-[#161616] mx-5 mb-5 rounded-2xl p-5 border border-[#222] shadow-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Target size={18} className="text-[#00C853]" />
            <h2 className="text-[#666] text-[10px] font-[900] tracking-[1.5px] uppercase">
              METAS E SEGURANÇA
            </h2>
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-[#AAA] text-sm mb-2 font-medium">
              Meta de Ganhos Diários (R$)
            </label>
            <input
              type="number"
              className="bg-[#202020] rounded-xl p-4 text-white border border-[#333] outline-none focus:border-[#00C853]"
              placeholder="Ex: 150,00"
              value={meta}
              onChange={(e) => setMeta(e.target.value)}
            />
          </div>

          {/* BOTÃO DE CHECKBOX (SIMULADO COM BUTTON) */}
          <button
            type="button"
            onClick={() => setAceitouTermos(!aceitouTermos)}
            className="flex items-start gap-3 p-2 group text-left w-full outline-none"
          >
            <div
              className={`mt-1 min-w-[20px] h-5 rounded border-2 flex items-center justify-center transition-all ${aceitouTermos ? 'bg-[#00C853] border-[#00C853]' : 'border-[#333]'}`}
            >
              {aceitouTermos && (
                <ShieldCheck
                  size={14}
                  className="text-[#0A0A0A]"
                />
              )}
            </div>
            <p className="text-xs text-[#666] leading-tight flex-1">
              Aceito os{' '}
              <span className="text-[#00C853] underline">
                Termos de Uso
              </span>{' '}
              e confirmo que os meus dados serão guardados
              apenas neste dispositivo.
            </p>
          </button>
        </section>
      </div>

      {/* FOOTER FIXO */}
      <footer className="fixed bottom-0 left-0 right-0 p-5 bg-[#0A0A0A]/95 backdrop-blur-md border-t border-[#222] z-50">
        <button
          onClick={handleComecarCorre}
          disabled={!aceitouTermos}
          className={`w-full flex items-center justify-center h-[60px] rounded-2xl gap-2 transition-all shadow-lg ${aceitouTermos ? 'bg-[#00C853] shadow-green-900/20 active:scale-[0.98]' : 'bg-[#222] opacity-50 cursor-not-allowed'}`}
        >
          <span className="text-[#0A0A0A] text-lg font-[900] tracking-tight uppercase">
            Começar o corre
          </span>
          <ChevronRight
            size={24}
            className="text-[#0A0A0A]"
          />
        </button>
      </footer>
    </div>
  );
}
