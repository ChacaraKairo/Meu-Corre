// Arquivo: src/components/telas/Login/CardLogin.tsx
// Componente: CardLogin

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  ShieldCheck,
  AlertCircle,
  Fingerprint,
} from 'lucide-react-native';
import { Input } from '../../inputs/Input';
import { styles } from '../../../styles/Login/CardLoginStyles';

interface CardLoginProps {
  nome: string;
  setNome: (text: string) => void;
  senha: string;
  setSenha: (text: string) => void;
  erro: string;
  carregando: boolean;
  biometriaDisponivel: boolean;
  onLogin: () => void;
  onBiometria: () => void;
  onNavigateCadastro: () => void;
}

export const CardLogin: React.FC<CardLoginProps> = ({
  nome,
  setNome,
  senha,
  setSenha,
  erro,
  carregando,
  biometriaDisponivel,
  onLogin,
  onBiometria,
  onNavigateCadastro,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.authLabelContainer}>
        <ShieldCheck size={16} color="#00C853" />
        <Text style={styles.authLabelText}>
          AUTENTICAÇÃO LOCAL
        </Text>
      </View>

      {erro ? (
        <View style={styles.errorBox}>
          <AlertCircle size={16} color="#EF4444" />
          <Text style={styles.errorText}>{erro}</Text>
        </View>
      ) : null}

      <View style={styles.inputWrapper}>
        <Input
          label="Nome de Utilizador"
          placeholder="Ex: João Silva"
          value={nome}
          onChangeText={setNome}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputWrapper}>
        <Input
          label="Senha"
          placeholder="••••••••"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.btnEntrar}
          onPress={onLogin}
          disabled={carregando}
          activeOpacity={0.8}
        >
          {carregando ? (
            <ActivityIndicator color="#0A0A0A" />
          ) : (
            <Text style={styles.btnEntrarText}>Entrar</Text>
          )}
        </TouchableOpacity>

        {biometriaDisponivel && (
          <TouchableOpacity
            style={styles.btnBiometria}
            onPress={onBiometria}
            activeOpacity={0.7}
          >
            <Fingerprint size={28} color="#00C853" />
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        style={styles.linkCadastro}
        onPress={onNavigateCadastro}
      >
        <Text style={styles.linkCadastroText}>
          Ainda não tens conta?{' '}
          <Text style={styles.linkCadastroBold}>
            Regista-te aqui
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};
