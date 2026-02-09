import React, { useState } from 'react';
import {
  ShieldCheck,
  FileSpreadsheet,
  FileText,
  Share2,
  ChevronLeft,
  Database,
  Clock,
  HardDrive,
  Lock,
  Download,
  Loader2,
  CheckCircle2,
} from 'lucide-react';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [exportType, setExportType] = useState(null);
  const [success, setSuccess] = useState(false);

  // Dados simulados do Status do Banco (Seção 1.1 do Canvas)
  const stats = {
    totalRegistros: '1.240',
    espacoOcupado: '1.5 MB',
    ultimaExportacao: 'Há 3 dias',
  };

  const handleExport = (type) => {
    setExportType(type);
    setLoading(true);

    // Simulação do Processamento Assíncrono (Seção 5 do Canvas)
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      // Simulação da API de Compartilhamento Nativa (Seção 2.3 do Canvas)
      console.log(
        `Acionando Share Sheet para arquivo ${type === 'csv' ? '.csv' : '.pdf'}`,
      );

      setTimeout(() => setSuccess(false), 3000);
    }, 2500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-white font-sans max-w-md mx-auto border-x border-gray-900 overflow-hidden relative">
      {/* Cabeçalho */}
      <header className="p-4 flex items-center gap-4 bg-[#121212] sticky top-0 z-30 border-b border-gray-800">
        <button className="p-2 bg-gray-900 rounded-full text-gray-400 active:scale-90 transition-transform">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-black uppercase tracking-tighter">
          Backup e Dados
        </h1>
      </header>

      <main className="flex-1 p-6 space-y-6 overflow-y-auto pb-24">
        {/* Painel de Status do Banco (Seção 1.1) */}
        <section className="bg-gradient-to-br from-[#1e1e1e] to-[#121212] rounded-[2rem] p-6 border border-gray-800 shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-[#FFD700] rounded-2xl text-black shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                <ShieldCheck size={28} strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-lg font-black leading-tight">
                  Seus Dados Estão Seguros
                </h2>
                <p className="text-[10px] text-[#FFD700] font-black uppercase tracking-widest">
                  Proteção Local Ativada
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white/5 p-3 rounded-2xl border border-white/5 text-center">
                <Database
                  size={16}
                  className="mx-auto text-gray-500 mb-1"
                />
                <p className="text-xs font-black">
                  {stats.totalRegistros}
                </p>
                <p className="text-[8px] text-gray-500 uppercase font-bold">
                  Registros
                </p>
              </div>
              <div className="bg-white/5 p-3 rounded-2xl border border-white/5 text-center">
                <HardDrive
                  size={16}
                  className="mx-auto text-gray-500 mb-1"
                />
                <p className="text-xs font-black">
                  {stats.espacoOcupado}
                </p>
                <p className="text-[8px] text-gray-500 uppercase font-bold">
                  Ocupado
                </p>
              </div>
              <div className="bg-white/5 p-3 rounded-2xl border border-white/5 text-center">
                <Clock
                  size={16}
                  className="mx-auto text-gray-500 mb-1"
                />
                <p className="text-xs font-black">
                  {stats.ultimaExportacao}
                </p>
                <p className="text-[8px] text-gray-500 uppercase font-bold">
                  Exportado
                </p>
              </div>
            </div>
          </div>
          {/* Decoração sutil de fundo */}
          <Lock
            size={120}
            className="absolute -right-8 -bottom-8 text-white opacity-[0.02] -rotate-12"
          />
        </section>

        {/* Seção de Ações (Seção 1.1) */}
        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase text-gray-500 tracking-[0.2em] px-1">
            Exportar Informações
          </h3>

          {/* Card CSV */}
          <button
            onClick={() => handleExport('csv')}
            disabled={loading}
            className="w-full bg-[#1e1e1e] rounded-[1.5rem] p-5 border border-gray-800 flex items-center gap-5 active:scale-[0.98] transition-all hover:border-[#FFD700]/50 group text-left"
          >
            <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
              <FileSpreadsheet size={28} />
            </div>
            <div className="flex-1">
              <h4 className="font-black text-sm uppercase tracking-tight">
                Planilha Excel (CSV)
              </h4>
              <p className="text-xs text-gray-500 leading-tight mt-1">
                Ideal para abrir no computador e fazer
                cálculos avançados.
              </p>
            </div>
            <Share2 size={20} className="text-gray-700" />
          </button>

          {/* Card PDF */}
          <button
            onClick={() => handleExport('pdf')}
            disabled={loading}
            className="w-full bg-[#1e1e1e] rounded-[1.5rem] p-5 border border-gray-800 flex items-center gap-5 active:scale-[0.98] transition-all hover:border-[#FFD700]/50 group text-left"
          >
            <div className="p-4 bg-red-500/10 rounded-2xl text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors">
              <FileText size={28} />
            </div>
            <div className="flex-1">
              <h4 className="font-black text-sm uppercase tracking-tight">
                Relatório em PDF
              </h4>
              <p className="text-xs text-gray-500 leading-tight mt-1">
                Documento formatado para comprovação de
                renda em bancos.
              </p>
            </div>
            <Share2 size={20} className="text-gray-700" />
          </button>
        </div>

        {/* Info Técnica Extra */}
        <div className="bg-blue-500/5 rounded-2xl p-4 border border-blue-500/10 flex gap-3 items-start">
          <Download
            size={18}
            className="text-blue-500 shrink-0 mt-0.5"
          />
          <p className="text-[10px] text-gray-400 font-medium leading-relaxed uppercase tracking-tight">
            Ao exportar, o app irá compilar todos os seus
            ganhos, despesas e quilometragens em um único
            arquivo seguro.
          </p>
        </div>
      </main>

      {/* Aviso de Privacidade e Rodapé (Seção 1.1) */}
      <footer className="p-6 text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <Lock size={12} />
          <p className="text-[10px] font-bold uppercase tracking-widest">
            Privacidade Total
          </p>
        </div>
        <p className="text-[9px] text-gray-500 leading-relaxed uppercase tracking-tighter">
          Seus dados são salvos apenas neste aparelho e não
          são enviados para nossos servidores sem sua ação
          manual.
        </p>
      </footer>

      {/* Overlay de Processamento (Seção 4) */}
      {loading && (
        <div className="absolute inset-0 bg-[#121212]/90 backdrop-blur-md z-50 flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
          <div className="relative">
            <Loader2
              size={64}
              className="text-[#FFD700] animate-spin"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Database
                size={24}
                className="text-white opacity-20"
              />
            </div>
          </div>
          <h2 className="text-xl font-black mt-8 mb-2 uppercase tracking-tighter text-center leading-none">
            Gerando seu{' '}
            {exportType === 'csv' ? 'Excel' : 'Relatório'}
            ...
          </h2>
          <p className="text-gray-500 text-sm text-center">
            Organizando registros e formatando arquivo.
          </p>

          {/* Barra de progresso simulada (Seção 5) */}
          <div className="w-full max-w-[200px] h-1.5 bg-gray-900 rounded-full mt-8 overflow-hidden border border-gray-800">
            <div
              className="h-full bg-[#FFD700] animate-[shimmer_2s_infinite]"
              style={{ width: '100%' }}
            ></div>
          </div>
        </div>
      )}

      {/* Toast de Sucesso (Seção 4.5) */}
      {success && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] animate-in slide-in-from-top duration-300">
          <div className="bg-[#00C853] text-black px-6 py-4 rounded-full font-black text-xs flex items-center gap-3 shadow-[0_10px_30px_rgba(0,200,83,0.4)]">
            <CheckCircle2 size={20} strokeWidth={3} />
            <span className="uppercase tracking-widest">
              Backup concluído com sucesso!
            </span>
          </div>
        </div>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `,
        }}
      />
    </div>
  );
};

export default App;
