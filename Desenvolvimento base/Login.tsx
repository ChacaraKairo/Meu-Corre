import React, { useState } from 'react';
import {
  Lock,
  User,
  Fingerprint,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

/**
 * TELA DE LOGIN - PROTÓTIPO
 * Identidade Visual: Verde e Preto (#00C853 / #0A0A0A)
 * Foco: Segurança, Biometria e Rapidez.
 */
export default function App() {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const realizarLoginManual = (e) => {
    e.preventDefault();
    setErro('');

    if (!nome || !senha) {
      setErro('Preenche todos os campos para entrar.');
      return;
    }

    setCarregando(true);
    // Simulação de delay de rede/banco
    setTimeout(() => {
      setCarregando(false);
      alert(
        'Login realizado com sucesso! A entrar no Dashboard...',
      );
    }, 1000);
  };

  const realizarLoginBiometrico = () => {
    alert(
      'A solicitar autenticação biométrica (Digital/FaceID)...',
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-white font-sans overflow-hidden">
      {/* HEADER / BRANDING */}
      <div className="flex flex-col items-center mt-20 mb-10">
        <div className="bg-[#00C853] p-5 rounded-[30px] mb-6 shadow-xl shadow-green-900/40 animate-bounce-slow">
          <Lock
            size={48}
            className="text-[#0A0A0A]"
            strokeWidth={2.5}
          />
        </div>
        <h1 className="text-3xl font-[900] tracking-tighter uppercase text-[#00C853]">
          MeuCorre
        </h1>
        <p className="text-[#666] text-sm mt-2">
          Acede à tua conta para continuares.
        </p>
      </div>

      {/* LOGIN CARD */}
      <main className="flex-1 px-6">
        <div className="bg-[#161616] rounded-3xl p-6 border border-[#222] shadow-2xl">
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck
              size={18}
              className="text-[#00C853]"
            />
            <h2 className="text-[#666] text-[10px] font-[900] tracking-[1.5px] uppercase">
              AUTENTICAÇÃO LOCAL
            </h2>
          </div>

          {erro && (
            <div className="flex items-center gap-2 bg-red-900/20 border border-red-900/50 p-3 rounded-xl mb-4 text-red-500 text-xs animate-in fade-in slide-in-from-top-1">
              <AlertCircle size={14} />
              <span>{erro}</span>
            </div>
          )}

          <form
            onSubmit={realizarLoginManual}
            className="space-y-5"
          >
            {/* Campo Nome */}
            <div className="flex flex-col">
              <label className="text-[#AAA] text-xs mb-2 ml-1 font-medium">
                Nome de Utilizador
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#444]">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  className="w-full bg-[#202020] rounded-xl p-4 pl-12 text-white border border-[#333] outline-none focus:border-[#00C853] transition-all"
                  placeholder="Ex: João Silva"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div className="flex flex-col">
              <label className="text-[#AAA] text-xs mb-2 ml-1 font-medium">
                Senha
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#444]">
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  className="w-full bg-[#202020] rounded-xl p-4 pl-12 text-white border border-[#333] outline-none focus:border-[#00C853] transition-all"
                  placeholder="••••••••"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>
            </div>

            {/* Ações de Login */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={carregando}
                className="flex-1 bg-[#00C853] hover:bg-[#00a946] active:scale-[0.98] flex items-center justify-center h-[58px] rounded-xl transition-all shadow-lg shadow-green-900/20"
              >
                {carregando ? (
                  <div className="w-6 h-6 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span className="text-[#0A0A0A] font-[900] uppercase tracking-tighter">
                    Entrar
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={realizarLoginBiometrico}
                className="w-[58px] h-[58px] bg-[#1a1a1a] hover:bg-[#252525] flex items-center justify-center rounded-xl border border-[#333] transition-all active:scale-95 group"
              >
                <Fingerprint
                  size={28}
                  className="text-[#00C853] group-hover:scale-110 transition-transform"
                />
              </button>
            </div>
          </form>

          {/* Link para Cadastro */}
          <button className="w-full mt-8 text-center text-[#666] text-sm hover:text-[#00C853] transition-colors">
            Ainda não tens conta?{' '}
            <span className="font-bold text-[#888] underline">
              Regista-te aqui
            </span>
          </button>
        </div>
      </main>

      {/* FOOTER / VERSÃO */}
      <footer className="p-8 text-center">
        <p className="text-[#333] text-[10px] font-bold tracking-widest uppercase">
          MeuCorre v1.0 • Dados Protegidos Localmente
        </p>
      </footer>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `,
        }}
      />
    </div>
  );
}
