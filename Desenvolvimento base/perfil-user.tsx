import React, { useState, useRef } from 'react';
import {
  User,
  Lock,
  Bike,
  BarChart3,
  Settings,
  LogOut,
  Camera,
  ChevronRight,
  Trophy,
  ShieldCheck,
  Share2,
  Download,
  ArrowLeft,
  Zap,
  Clock,
  CalendarDays,
  Gauge,
  Wallet,
  Pencil,
  Check,
  AlertCircle,
  Moon,
  Sun,
  Target,
} from 'lucide-react';

/**
 * TELA DE PERFIL / UTILIZADOR - PROTÓTIPO V8
 * Identidade Visual: Adaptável (Verde e Preto / Verde e Branco)
 * Alterações:
 * - Título alterado para "Central de Comando" para ser neutro e inclusivo.
 * - Mensagens e rótulos revistos para garantir neutralidade de género.
 * - Manutenção de todas as lógicas de edição e temas.
 */
export default function App() {
  const [nome, setNome] = useState('João Silva');
  const [senha, setSenha] = useState('123456');
  const [meta, setMeta] = useState('150.00');
  const [foto] = useState(
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&h=150&auto=format&fit=crop',
  );

  // Estado de Tema
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Estados de controlo de edição
  const [editandoNome, setEditandoNome] = useState(false);
  const [editandoSenha, setEditandoSenha] = useState(false);
  const [editandoMeta, setEditandoMeta] = useState(false);

  // Estado do Modal de Confirmação
  const [modal, setModal] = useState({
    visivel: false,
    campo: '',
    titulo: '',
  });

  const inputNomeRef = useRef(null);
  const inputSenhaRef = useRef(null);
  const inputMetaRef = useRef(null);

  // Paleta de cores dinâmica baseada no tema
  const theme = {
    bg: isDarkMode ? 'bg-[#0A0A0A]' : 'bg-[#F5F5F5]',
    card: isDarkMode ? 'bg-[#161616]' : 'bg-[#FFFFFF]',
    border: isDarkMode
      ? 'border-[#222]'
      : 'border-[#E0E0E0]',
    textPrimary: isDarkMode
      ? 'text-white'
      : 'text-[#1A1A1A]',
    textSecondary: isDarkMode
      ? 'text-[#666]'
      : 'text-[#888]',
    inputBg: isDarkMode ? 'bg-[#161616]' : 'bg-[#FAFAFA]',
    iconBg: isDarkMode ? 'bg-[#202020]' : 'bg-[#F0F0F0]',
    headerBorder: isDarkMode
      ? 'border-[#161616]'
      : 'border-[#EAEAEA]',
  };

  const abrirConfirmacao = (campo) => {
    setModal({
      visivel: true,
      campo: campo,
      titulo:
        campo === 'nome'
          ? 'Alterar Nome'
          : campo === 'senha'
            ? 'Alterar Senha'
            : 'Alterar Meta Diária',
    });
  };

  const confirmarEdicao = () => {
    if (modal.campo === 'nome') {
      setEditandoNome(true);
      setTimeout(() => inputNomeRef.current?.focus(), 100);
    } else if (modal.campo === 'senha') {
      setEditandoSenha(true);
      setTimeout(() => inputSenhaRef.current?.focus(), 100);
    } else if (modal.campo === 'meta') {
      setEditandoMeta(true);
      setTimeout(() => inputMetaRef.current?.focus(), 100);
    }
    setModal({ visivel: false, campo: '', titulo: '' });
  };

  const salvarEdicao = (campo) => {
    if (campo === 'nome') setEditandoNome(false);
    else if (campo === 'senha') setEditandoSenha(false);
    else if (campo === 'meta') setEditandoMeta(false);
  };

  const MenuButton = ({
    icon: Icon,
    title,
    subtitle,
    onClick,
  }) => (
    <button
      onClick={onClick}
      className={`w-full ${theme.card} p-4 rounded-2xl border ${theme.border} flex items-center justify-between group active:scale-[0.98] transition-all mb-3 shadow-sm`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`p-3 rounded-xl ${theme.iconBg} group-hover:bg-[#00C853]/10 transition-colors`}
        >
          <Icon size={22} className="text-[#00C853]" />
        </div>
        <div className="text-left">
          <h3
            className={`text-sm font-bold ${theme.textPrimary}`}
          >
            {title}
          </h3>
          {subtitle && (
            <p
              className={`text-[10px] ${theme.textSecondary} font-black uppercase tracking-widest`}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <ChevronRight
        size={18}
        className={theme.textSecondary}
      />
    </button>
  );

  return (
    <div
      className={`flex flex-col min-h-screen ${theme.bg} ${theme.textPrimary} font-sans overflow-hidden relative transition-colors duration-300`}
    >
      {/* MODAL DE CONFIRMAÇÃO */}
      {modal.visivel && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className={`${theme.card} w-full max-w-xs rounded-[32px] border ${theme.border} p-6 shadow-2xl animate-in zoom-in-95 duration-200`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#00C853]/10 p-4 rounded-full mb-4">
                <AlertCircle
                  size={32}
                  className="text-[#00C853]"
                />
              </div>
              <h2
                className={`text-xl font-black mb-2 ${theme.textPrimary}`}
              >
                {modal.titulo}
              </h2>
              <p
                className={`${theme.textSecondary} text-sm mb-6 leading-relaxed`}
              >
                Tens a certeza de que pretendes editar o teu{' '}
                {modal.campo}? Esta alteração será guardada
                localmente.
              </p>

              <div className="flex gap-3 w-full">
                <button
                  onClick={() =>
                    setModal({
                      visivel: false,
                      campo: '',
                      titulo: '',
                    })
                  }
                  className={`flex-1 py-4 ${theme.iconBg} rounded-2xl text-xs font-black uppercase tracking-widest ${theme.textSecondary} active:scale-95 transition-all`}
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmarEdicao}
                  className="flex-1 py-4 bg-[#00C853] rounded-2xl text-[#0A0A0A] text-xs font-black uppercase tracking-widest active:scale-95 transition-all"
                >
                  Sim, Alterar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HEADER / VOLTAR */}
      <header
        className={`pt-12 px-6 pb-4 flex items-center justify-between border-b ${theme.headerBorder}`}
      >
        <button
          className={`p-2 ${theme.card} rounded-xl border ${theme.border} ${theme.textSecondary} active:scale-95`}
          onClick={() => alert('Voltar ao Dashboard')}
        >
          <ArrowLeft size={20} />
        </button>
        {/* Título Inclusivo e Profissional */}
        <h1 className="text-sm font-black uppercase tracking-[3px] text-[#00C853]">
          Central de Comando
        </h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 overflow-y-auto px-5 py-6 pb-20 space-y-8">
        {/* HEADER DE PERFIL */}
        <section className="flex flex-col items-center">
          <div className="relative mb-4">
            <div
              className={`w-28 h-28 rounded-full border-4 border-[#00C853] overflow-hidden ${theme.card} shadow-2xl shadow-green-900/10`}
            >
              <img
                src={foto}
                alt="Perfil"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-[#00C853] p-2 rounded-full border-4 border-[#0A0A0A] text-[#0A0A0A] active:scale-90 shadow-xl">
              <Camera size={18} strokeWidth={3} />
            </button>
          </div>
          <h2
            className={`text-2xl font-[900] tracking-tight ${theme.textPrimary}`}
          >
            {nome}
          </h2>
          <p
            className={`text-[10px] ${theme.textSecondary} font-black uppercase tracking-widest mt-1`}
          >
            Conta Ativa desde Jan 2024
          </p>
        </section>

        {/* MODO DE VISUALIZAÇÃO */}
        <section>
          <h2
            className={`${theme.textSecondary} text-[10px] font-black uppercase tracking-widest ml-2 mb-4 text-left`}
          >
            Aparência
          </h2>
          <div
            className={`${theme.card} border ${theme.border} p-5 rounded-[28px] flex items-center justify-between shadow-sm`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-xl ${theme.iconBg}`}
              >
                {isDarkMode ? (
                  <Moon
                    size={22}
                    className="text-[#00C853]"
                  />
                ) : (
                  <Sun
                    size={22}
                    className="text-[#FFB300]"
                  />
                )}
              </div>
              <div className="text-left">
                <h3
                  className={`text-sm font-bold ${theme.textPrimary}`}
                >
                  {isDarkMode ? 'Modo Noite' : 'Modo Dia'}
                </h3>
                <p
                  className={`text-[10px] ${theme.textSecondary} font-black uppercase tracking-widest`}
                >
                  Alterar visual do app
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`w-14 h-8 rounded-full p-1 transition-all duration-300 flex items-center ${isDarkMode ? 'bg-[#00C853]' : 'bg-[#E0E0E0]'}`}
            >
              <div
                className={`w-6 h-6 rounded-full shadow-md transition-all duration-300 transform ${isDarkMode ? 'translate-x-6 bg-white' : 'translate-x-0 bg-white'}`}
              />
            </button>
          </div>
        </section>

        {/* FORMULÁRIO COM EDIÇÃO BLOQUEADA */}
        <section className="space-y-4">
          <h2
            className={`${theme.textSecondary} text-[10px] font-black uppercase tracking-widest ml-2 mb-1 text-left`}
          >
            Dados da Conta
          </h2>

          {/* Campo Nome */}
          <div className="flex flex-col">
            <div
              className={`relative group transition-all`}
            >
              <User
                size={16}
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${editandoNome ? 'text-[#00C853]' : theme.textSecondary}`}
              />
              <input
                ref={inputNomeRef}
                type="text"
                readOnly={!editandoNome}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome de Utilizador"
                className={`w-full ${theme.card} border rounded-2xl p-4 pl-12 pr-12 outline-none transition-all font-bold 
                  ${editandoNome ? 'border-[#00C853]' : theme.border} ${theme.textPrimary}`}
              />
              <button
                onClick={() =>
                  editandoNome
                    ? salvarEdicao('nome')
                    : abrirConfirmacao('nome')
                }
                className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all
                  ${editandoNome ? 'bg-[#00C853] text-[#0A0A0A]' : theme.iconBg + ' ' + theme.textSecondary}`}
              >
                {editandoNome ? (
                  <Check size={16} strokeWidth={3} />
                ) : (
                  <Pencil size={16} />
                )}
              </button>
            </div>
          </div>

          {/* Campo Senha */}
          <div className="flex flex-col">
            <div
              className={`relative group transition-all`}
            >
              <Lock
                size={16}
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${editandoSenha ? 'text-[#00C853]' : theme.textSecondary}`}
              />
              <input
                ref={inputSenhaRef}
                type={editandoSenha ? 'text' : 'password'}
                readOnly={!editandoSenha}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Senha de Acesso"
                className={`w-full ${theme.card} border rounded-2xl p-4 pl-12 pr-12 outline-none transition-all font-bold 
                  ${editandoSenha ? 'border-[#00C853]' : theme.border} ${theme.textPrimary}`}
              />
              <button
                onClick={() =>
                  editandoSenha
                    ? salvarEdicao('senha')
                    : abrirConfirmacao('senha')
                }
                className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all
                  ${editandoSenha ? 'bg-[#00C853] text-[#0A0A0A]' : theme.iconBg + ' ' + theme.textSecondary}`}
              >
                {editandoSenha ? (
                  <Check size={16} strokeWidth={3} />
                ) : (
                  <Pencil size={16} />
                )}
              </button>
            </div>
          </div>

          {/* Campo Meta Diária */}
          <div className="flex flex-col">
            <div
              className={`relative group transition-all`}
            >
              <Target
                size={16}
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${editandoMeta ? 'text-[#00C853]' : theme.textSecondary}`}
              />

              <div className="absolute left-11 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
                <span
                  className={`text-[9px] font-[900] uppercase tracking-wider ${editandoMeta ? 'text-[#00C853]' : theme.textSecondary}`}
                >
                  Meta Diária
                </span>
                <span
                  className={`text-xs font-bold ${theme.textPrimary}`}
                >
                  R$
                </span>
              </div>

              <input
                ref={inputMetaRef}
                type="number"
                readOnly={!editandoMeta}
                value={meta}
                onChange={(e) => setMeta(e.target.value)}
                placeholder="0.00"
                className={`w-full ${theme.card} border rounded-2xl p-4 pl-36 pr-12 outline-none transition-all font-bold 
                  ${editandoMeta ? 'border-[#00C853]' : theme.border} ${theme.textPrimary}`}
              />
              <button
                onClick={() =>
                  editandoMeta
                    ? salvarEdicao('meta')
                    : abrirConfirmacao('meta')
                }
                className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all
                  ${editandoMeta ? 'bg-[#00C853] text-[#0A0A0A]' : theme.iconBg + ' ' + theme.textSecondary}`}
              >
                {editandoMeta ? (
                  <Check size={16} strokeWidth={3} />
                ) : (
                  <Pencil size={16} />
                )}
              </button>
            </div>
          </div>
        </section>

        {/* NAVEGAÇÃO E GESTÃO */}
        <section>
          <h2
            className={`${theme.textSecondary} text-[10px] font-black uppercase tracking-widest ml-2 mb-4 text-left`}
          >
            Navegação e Gestão
          </h2>
          <MenuButton
            icon={Bike}
            title="Meus Veículos"
            subtitle="Gerir frota e manutenções"
            onClick={() => alert('Meus Veículos')}
          />
          <MenuButton
            icon={BarChart3}
            title="Relatórios e Gráficos"
            subtitle="Análise de lucros e despesas"
            onClick={() => alert('Relatórios')}
          />
          <MenuButton
            icon={Settings}
            title="Ajustes do App"
            subtitle="Notificações e Idioma"
            onClick={() => alert('Ajustes')}
          />
        </section>

        {/* DADOS E SEGURANÇA */}
        <section>
          <h2
            className={`${theme.textSecondary} text-[10px] font-black uppercase tracking-widest ml-2 mb-4 text-left`}
          >
            Base de Dados
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              className={`${theme.card} border ${theme.border} p-4 rounded-2xl flex flex-col items-center gap-2 active:opacity-70 transition-all group`}
              onClick={() => alert('Exportar CSV')}
            >
              <Download
                size={20}
                className="text-[#00C853] group-hover:scale-110 transition-transform"
              />
              <span
                className={`text-[10px] font-black uppercase tracking-wider ${theme.textPrimary}`}
              >
                Exportar CSV
              </span>
            </button>
            <button
              className={`${theme.card} border ${theme.border} p-4 rounded-2xl flex flex-col items-center gap-2 active:opacity-70 transition-all group`}
              onClick={() => alert('Backup')}
            >
              <Share2
                size={20}
                className="text-[#00C853] group-hover:scale-110 transition-transform"
              />
              <span
                className={`text-[10px] font-black uppercase tracking-wider ${theme.textPrimary}`}
              >
                Fazer Backup
              </span>
            </button>
          </div>
        </section>

        {/* LOGOUT */}
        <button className="w-full flex items-center justify-center gap-2 py-6 text-red-500 font-black uppercase tracking-widest text-xs hover:bg-red-500/5 rounded-3xl transition-colors active:scale-95 mb-10">
          <LogOut size={18} />
          Sair da Conta
        </button>
      </main>
    </div>
  );
}

// Funções de ícones para evitar recursão
function CalendarDaysIcon({ size }) {
  return <CalendarDays size={size} />;
}
function GaugeIcon({ size }) {
  return <Gauge size={size} />;
}
function WalletIcon({ size }) {
  return <Wallet size={size} />;
}
