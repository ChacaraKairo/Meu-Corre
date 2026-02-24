import React, { useState } from 'react';
import {
  Bell,
  Globe,
  Info,
  ChevronRight,
  ArrowLeft,
  Moon,
  Sun,
  ShieldCheck,
  HelpCircle,
  FileText,
} from 'lucide-react';

/**
 * TELA DE AJUSTES - PROTÓTIPO V2
 * Identidade Visual: Adaptável (Verde e Preto / Verde e Branco)
 * Alterações:
 * - Remoção de GPS, Unidade de Distância e Preço de Combustível.
 * - Reorganização para um layout mais direto e limpo.
 */
export default function App() {
  // Estados de Preferências
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notificacoes, setNotificacoes] = useState(true);
  const [idioma, setIdioma] = useState('Português (PT)');

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
    iconBg: isDarkMode ? 'bg-[#202020]' : 'bg-[#F0F0F0]',
    headerBorder: isDarkMode
      ? 'border-[#161616]'
      : 'border-[#EAEAEA]',
  };

  const SettingItem = ({
    icon: Icon,
    title,
    subtitle,
    action,
    value,
    onClick,
  }) => (
    <div
      className={`flex items-center justify-between p-4 ${theme.card} border-b ${theme.border} last:border-b-0 active:opacity-80 transition-all cursor-pointer`}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div className={`p-2.5 rounded-xl ${theme.iconBg}`}>
          <Icon size={20} className="text-[#00C853]" />
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
      {action === 'toggle' ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            value.setter(!value.current);
          }}
          className={`w-12 h-7 rounded-full p-1 transition-all duration-300 flex items-center ${value.current ? 'bg-[#00C853]' : 'bg-[#333]'}`}
        >
          <div
            className={`w-5 h-5 rounded-full shadow-md transition-all duration-300 transform ${value.current ? 'translate-x-5 bg-white' : 'translate-x-0 bg-white'}`}
          />
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] font-black uppercase ${theme.textSecondary}`}
          >
            {value?.label}
          </span>
          <ChevronRight
            size={16}
            className={theme.textSecondary}
          />
        </div>
      )}
    </div>
  );

  return (
    <div
      className={`flex flex-col min-h-screen ${theme.bg} ${theme.textPrimary} font-sans overflow-hidden transition-colors duration-300`}
    >
      {/* HEADER */}
      <header
        className={`pt-12 px-6 pb-4 flex items-center justify-between border-b ${theme.headerBorder}`}
      >
        <button
          className={`p-2 ${theme.card} rounded-xl border ${theme.border} ${theme.textSecondary} active:scale-95`}
          onClick={() => alert('Voltar ao Perfil')}
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-sm font-black uppercase tracking-[3px] text-[#00C853]">
          Ajustes do App
        </h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
        {/* SECÇÃO: PERSONALIZAÇÃO */}
        <section>
          <h2
            className={`${theme.textSecondary} text-[10px] font-black uppercase tracking-widest ml-2 mb-3 text-left`}
          >
            Aparência e Notificações
          </h2>
          <div
            className={`rounded-2xl border ${theme.border} overflow-hidden shadow-sm`}
          >
            <SettingItem
              icon={isDarkMode ? Moon : Sun}
              title="Modo de Visualização"
              subtitle={isDarkMode ? 'Escuro' : 'Claro'}
              action="toggle"
              value={{
                current: isDarkMode,
                setter: setIsDarkMode,
              }}
            />
            <SettingItem
              icon={Bell}
              title="Notificações Push"
              subtitle="Alertas de metas e manutenção"
              action="toggle"
              value={{
                current: notificacoes,
                setter: setNotificacoes,
              }}
            />
          </div>
        </section>

        {/* SECÇÃO: LINGUAGEM */}
        <section>
          <h2
            className={`${theme.textSecondary} text-[10px] font-black uppercase tracking-widest ml-2 mb-3 text-left`}
          >
            Regional
          </h2>
          <div
            className={`rounded-2xl border ${theme.border} overflow-hidden shadow-sm`}
          >
            <SettingItem
              icon={Globe}
              title="Idioma do Sistema"
              subtitle="Formatos de data e moeda"
              value={{ label: idioma }}
              onClick={() => alert('Selecionar Idioma')}
            />
          </div>
        </section>

        {/* SECÇÃO: SEGURANÇA */}
        <section>
          <h2
            className={`${theme.textSecondary} text-[10px] font-black uppercase tracking-widest ml-2 mb-3 text-left`}
          >
            Privacidade
          </h2>
          <div
            className={`rounded-2xl border ${theme.border} overflow-hidden shadow-sm`}
          >
            <SettingItem
              icon={ShieldCheck}
              title="Privacidade de Dados"
              subtitle="Gerir segurança local"
              value={{ label: 'Ver' }}
              onClick={() => alert('Ver Políticas')}
            />
          </div>
        </section>

        {/* SECÇÃO: SOBRE */}
        <section>
          <h2
            className={`${theme.textSecondary} text-[10px] font-black uppercase tracking-widest ml-2 mb-3 text-left`}
          >
            Suporte e Info
          </h2>
          <div
            className={`rounded-2xl border ${theme.border} overflow-hidden shadow-sm`}
          >
            <SettingItem
              icon={HelpCircle}
              title="Central de Ajuda"
              subtitle="Dúvidas e tutoriais"
              onClick={() => alert('Abrir Ajuda')}
            />
            <SettingItem
              icon={FileText}
              title="Termos e Condições"
              subtitle="Políticas de uso"
              onClick={() => alert('Ver Termos')}
            />
            <div
              className={`flex items-center justify-between p-4 ${theme.card}`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-2.5 rounded-xl ${theme.iconBg}`}
                >
                  <Info
                    size={20}
                    className="text-[#00C853]"
                  />
                </div>
                <div className="text-left">
                  <h3
                    className={`text-sm font-bold ${theme.textPrimary}`}
                  >
                    Versão do Aplicativo
                  </h3>
                  <p
                    className={`text-[9px] ${theme.textSecondary} font-black uppercase`}
                  >
                    v1.0.4 Build Final
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#00C853]">
                Atualizado
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
