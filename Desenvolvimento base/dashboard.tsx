import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Gauge,
  AlertTriangle,
  Plus,
  ChevronRight,
  Bike,
  Car,
  ArrowLeftRight,
  ClipboardList,
  PlusCircle,
  Target,
  ShieldCheck,
  AlertCircle,
  Clock,
  Settings,
  CloudSun,
  CalendarDays,
  Wallet,
  CloudRain,
  Zap,
  Loader2,
  Fuel,
} from 'lucide-react';

/**
 * TELA DE DASHBOARD - PROTÓTIPO V21
 * Identidade Visual: Verde e Preto (#00C853 / #0A0A0A)
 * Alterações:
 * 1. Remoção do botão de calculadora da grade do veículo.
 * 2. Adição de um Footer Fixo com o botão "Calculadora Flex" para redirecionamento.
 */
export default function App() {
  // Estados de Dados do Usuário
  const [nome] = useState('João Silva');
  const [veiculoAtivo] = useState({
    tipo: 'moto',
    marca: 'Honda',
    modelo: 'CG 160 Fan',
    placa: 'ABC-1D23',
  });

  const [ganhosHoje] = useState(157.5);
  const [gastosHoje] = useState(42.0);
  const [metaDiaria] = useState(250.0);
  const [ultimoKmMarcado] = useState(12840);
  const [kmRodadosHoje] = useState(62);

  // Estados de Clima (API)
  const [clima, setClima] = useState({
    atual: 24,
    minAmanha: '--',
    maxAmanha: '--',
    probChuvaAmanha: '--',
    horaChuvaAmanha: '--',
    loading: true,
  });

  // Lista de frases motivacionais
  const frases = [
    'Bora faturar!',
    'Foco no corre!',
    'Deus abençoe o asfalto.',
    'Mantenha o foco!',
    'Cada entrega conta.',
    'Simbora pro asfalto!',
  ];
  const [fraseMotivacional] = useState(
    frases[Math.floor(Math.random() * frases.length)],
  );

  // Busca de clima real (Open-Meteo API)
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const lat = -23.5505;
        const lon = -46.6333;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;
        const response = await fetch(url);
        const data = await response.json();

        setClima({
          atual: Math.round(
            data.current_weather.temperature,
          ),
          minAmanha: Math.round(
            data.daily.temperature_2m_min[1],
          ),
          maxAmanha: Math.round(
            data.daily.temperature_2m_max[1],
          ),
          probChuvaAmanha:
            data.daily.precipitation_probability_max[1] +
            '%',
          horaChuvaAmanha: '14h',
          loading: false,
        });
      } catch (error) {
        setClima((prev) => ({ ...prev, loading: false }));
      }
    };
    fetchWeather();
  }, []);

  const [ultimosRegistos] = useState([
    {
      id: 1,
      tipo: 'ganho',
      categoria: 'App Entrega',
      valor: 28.5,
      hora: '14:20',
    },
    {
      id: 2,
      tipo: 'despesa',
      categoria: 'Combustível',
      valor: 42.0,
      hora: '13:45',
    },
    {
      id: 3,
      tipo: 'ganho',
      categoria: 'App Entrega',
      valor: 15.0,
      hora: '12:10',
    },
  ]);

  const [kmParaManutencao] = useState(-150);
  const status =
    kmParaManutencao <= 100
      ? 'critical'
      : kmParaManutencao <= 500
        ? 'warning'
        : 'ok';

  const configCores = {
    critical: {
      bg: 'bg-red-600/10',
      border: 'border-red-600/30',
      text: 'text-red-500',
      icon: (
        <AlertTriangle size={20} className="text-white" />
      ),
      label: 'Crítico',
      desc: 'Óleo!',
    },
    warning: {
      bg: 'bg-yellow-600/10',
      border: 'border-yellow-600/30',
      text: 'text-yellow-500',
      icon: (
        <AlertCircle size={20} className="text-white" />
      ),
      label: 'Atenção',
      desc: '300km',
    },
    ok: {
      bg: 'bg-green-600/5',
      border: 'border-green-600/20',
      text: 'text-[#00C853]',
      icon: (
        <ShieldCheck size={20} className="text-white" />
      ),
      label: 'Em Dia',
      desc: 'OK',
    },
  };

  const UI = configCores[status];
  const metaRestante = metaDiaria - ganhosHoje;
  const metaBatida = metaRestante <= 0;
  const rendimentoPorKm =
    kmRodadosHoje > 0
      ? (ganhosHoje / kmRodadosHoje).toFixed(2)
      : '0.00';

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-white font-sans overflow-hidden">
      {/* 1. HEADER */}
      <header className="pt-14 px-6 pb-6 z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-[#00C853] overflow-hidden bg-[#161616]">
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&h=150&auto=format&fit=crop"
                alt="Perfil"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl font-[900] tracking-tight">
                {nome.split(' ')[0]}
              </h1>
              <div className="flex items-center gap-1 text-[#00C853]">
                <Zap size={10} fill="#00C853" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {fraseMotivacional}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end text-right text-[10px]">
              {clima.loading ? (
                <Loader2
                  size={14}
                  className="animate-spin text-[#333]"
                />
              ) : (
                <>
                  <div className="flex items-center gap-1 text-[#00C853] font-black uppercase tracking-widest mb-0.5">
                    <CalendarDays size={8} />{' '}
                    <span>Amanhã</span>
                  </div>
                  <p className="font-[900] text-white leading-none">
                    <span className="text-red-500">↑</span>{' '}
                    {clima.maxAmanha}°{' '}
                    <span className="text-blue-500">↓</span>{' '}
                    {clima.minAmanha}°
                  </p>
                  <p className="text-[#555] font-bold mt-1">
                    {clima.probChuvaAmanha} chuva às{' '}
                    {clima.horaChuvaAmanha}
                  </p>
                </>
              )}
            </div>
            <button className="p-2.5 bg-[#161616] rounded-xl text-[#444] border border-[#222] active:scale-95">
              <Settings size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* ÁREA DE CONTEÚDO (Padding bottom aumentado para o footer fixo) */}
      <main className="flex-1 overflow-y-auto px-5 pb-32 space-y-4 no-scrollbar">
        {/* 2. GESTÃO DO VEÍCULO */}
        <section className="p-5 bg-[#161616] rounded-[32px] border border-[#222] shadow-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#00C853] flex items-center justify-center shadow-lg shadow-green-900/20 text-[#0A0A0A]">
              {veiculoAtivo.tipo === 'moto' ? (
                <Bike size={32} />
              ) : (
                <Car size={32} />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-black uppercase tracking-tight leading-none">
                {veiculoAtivo.modelo}
              </h2>
              <span className="text-xs text-[#00C853] font-bold tracking-widest">
                {veiculoAtivo.placa}
              </span>
            </div>
            <div className="text-right">
              <p className="text-[#666] text-[8px] font-black uppercase">
                Eficiência
              </p>
              <p className="text-[#00C853] text-xs font-black">
                R$ {rendimentoPorKm}/km
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() =>
                alert('Abrir Tela: Troca de Veículo')
              }
              className="flex-1 h-14 bg-[#202020] rounded-2xl border border-[#333] flex items-center justify-center gap-2 hover:border-[#00C853] transition-all group active:scale-95"
            >
              <ArrowLeftRight
                size={18}
                className="text-[#00C853]"
              />
              <span className="text-[10px] font-black uppercase tracking-wider text-[#AAA]">
                Trocar
              </span>
            </button>
            <button
              onClick={() => alert('Abrir Tela: Oficina')}
              className="flex-1 h-14 bg-[#202020] rounded-2xl border border-[#333] flex items-center justify-center gap-2 hover:border-[#00C853] transition-all group active:scale-95"
            >
              <ClipboardList
                size={18}
                className="text-[#00C853]"
              />
              <span className="text-[10px] font-black uppercase tracking-wider text-[#AAA]">
                Oficina
              </span>
            </button>
          </div>
        </section>

        {/* 3. KM E MANUTENÇÃO */}
        <div className="grid grid-cols-2 gap-4">
          <section className="bg-[#161616] rounded-[28px] p-4 border border-[#222] flex flex-col justify-between min-h-[140px] relative overflow-hidden">
            <div className="flex items-center justify-between relative z-10">
              <div className="p-2 bg-[#202020] rounded-xl border border-[#333]">
                <Gauge
                  size={20}
                  className="text-[#00C853]"
                />
              </div>
              <button className="h-10 w-10 bg-[#00C853] rounded-xl flex items-center justify-center shadow-lg active:scale-95">
                <Plus
                  size={20}
                  className="text-[#0A0A0A]"
                />
              </button>
            </div>
            <div className="relative z-10 mt-4">
              <p className="text-[#666] text-[9px] font-black uppercase tracking-widest">
                KM Atual
              </p>
              <h3 className="text-xl font-black">
                {ultimoKmMarcado.toLocaleString()}
              </h3>
            </div>
          </section>

          <section
            className={`${UI.bg} rounded-[28px] p-4 border ${UI.border} flex flex-col justify-between min-h-[140px] relative overflow-hidden cursor-pointer active:opacity-80 transition-all`}
          >
            <div className="flex items-center justify-between relative z-10">
              <div className="p-2 bg-[#202020] rounded-xl border border-[#333] text-[#00C853]">
                {UI.icon}
              </div>
              <ChevronRight
                size={18}
                className="text-[#444]"
              />
            </div>
            <div className="relative z-10 mt-4">
              <p
                className={`${UI.text} text-[9px] font-black uppercase tracking-widest mb-1`}
              >
                {UI.label}
              </p>
              <h4 className="text-xs font-bold text-white leading-tight">
                {UI.desc}
              </h4>
            </div>
          </section>
        </div>

        {/* 4. GANHOS E GASTOS */}
        <div className="grid grid-cols-1 gap-4">
          <button className="bg-[#161616] rounded-[28px] p-6 border border-[#222] flex flex-col gap-4 relative overflow-hidden group hover:border-[#00C853] transition-all active:scale-[0.98] text-left">
            <div className="flex items-start justify-between w-full relative z-10">
              <div className="p-3 bg-green-900/20 rounded-2xl">
                <TrendingUp
                  size={28}
                  className="text-[#00C853]"
                />
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 justify-end">
                  <Target
                    size={12}
                    className={
                      metaBatida
                        ? 'text-[#00C853]'
                        : 'text-[#666]'
                    }
                  />
                  <p className="text-[#666] text-[10px] font-black uppercase tracking-widest">
                    {metaBatida
                      ? 'Meta Batida!'
                      : 'Faltam p/ Meta'}
                  </p>
                </div>
                <p className="text-[#00C853] text-lg font-black tracking-tighter">
                  {metaBatida
                    ? '🔥 SÓ LUCRO!'
                    : `R$ ${metaRestante.toFixed(2)}`}
                </p>
              </div>
            </div>
            <div className="relative z-10">
              <p className="text-[#666] text-[11px] font-black uppercase tracking-[3px] mb-1">
                Ganhos de Hoje
              </p>
              <p className="text-4xl font-[900] text-white tracking-tight">
                R$ {ganhosHoje.toFixed(2)}
              </p>
            </div>
            <div className="w-full h-1.5 bg-[#222] rounded-full overflow-hidden relative z-10">
              <div
                className="h-full bg-[#00C853] rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(0,200,83,0.5)]"
                style={{
                  width: `${Math.min((ganhosHoje / metaDiaria) * 100, 100)}%`,
                }}
              />
            </div>
          </button>

          <button className="bg-[#161616] rounded-[28px] p-6 border border-[#222] flex flex-col items-start gap-3 relative overflow-hidden group hover:border-red-600 transition-all active:scale-[0.98] text-left">
            <div className="flex items-center justify-between w-full relative z-10">
              <div className="p-3 bg-red-900/20 rounded-2xl text-red-500">
                <TrendingDown size={28} />
              </div>
              <PlusCircle
                size={20}
                className="text-red-500 opacity-20 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="relative z-10">
              <p className="text-[#666] text-[11px] font-black uppercase tracking-[3px] mb-1">
                Gastos de Hoje
              </p>
              <p className="text-3xl font-[900] text-white tracking-tight">
                R$ {gastosHoje.toFixed(2)}
              </p>
            </div>
          </button>
        </div>

        {/* 5. ÚLTIMOS REGISTOS */}
        <section className="pt-2">
          <div className="flex items-center justify-between px-2 mb-4">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-[#00C853]" />
              <h3 className="text-[#666] text-[10px] font-black uppercase tracking-[2px]">
                Últimos Registos
              </h3>
            </div>
            <button className="text-[#00C853] text-[10px] font-black uppercase tracking-widest hover:underline">
              Ver Tudo
            </button>
          </div>
          <div className="space-y-3 pb-4">
            {ultimosRegistos.map((registo) => (
              <div
                key={registo.id}
                className="bg-[#161616] rounded-2xl p-4 border border-[#222] flex items-center justify-between group active:bg-[#202020] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-xl ${registo.tipo === 'ganho' ? 'bg-green-900/10' : 'bg-red-900/10'}`}
                  >
                    {registo.tipo === 'ganho' ? (
                      <TrendingUp
                        size={18}
                        className="text-[#00C853]"
                      />
                    ) : (
                      <TrendingDown
                        size={18}
                        className="text-red-500"
                      />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {registo.categoria}
                    </h4>
                    <p className="text-[10px] text-[#444] font-medium">
                      {registo.hora}
                    </p>
                  </div>
                </div>
                <p
                  className={`text-base font-[900] ${registo.tipo === 'ganho' ? 'text-[#00C853]' : 'text-red-500'}`}
                >
                  {registo.tipo === 'ganho' ? '+' : '-'} R${' '}
                  {registo.valor.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 6. FOOTER FIXO: ACESSO À CALCULADORA */}
      <footer className="fixed bottom-0 left-0 right-0 p-5 bg-[#0A0A0A]/95 backdrop-blur-md border-t border-[#161616] z-50">
        <button
          onClick={() =>
            alert(
              'Redirecionando para a Tela de Calculadora Flex...',
            )
          }
          className="w-full flex items-center justify-center h-[60px] bg-[#00C853] rounded-2xl gap-3 shadow-lg shadow-green-900/20 active:scale-[0.98] transition-all"
        >
          <Fuel size={24} className="text-[#0A0A0A]" />
          <span className="text-[#0A0A0A] text-lg font-[900] tracking-tight uppercase">
            Calculadora Flex
          </span>
          <ChevronRight
            size={20}
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
