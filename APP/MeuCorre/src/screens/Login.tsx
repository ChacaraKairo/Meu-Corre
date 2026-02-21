import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Lock, User } from 'lucide-react-native';

import db from '../database/DatabaseInit';
import { Input } from '../components/Input';
import { MainButton } from '../components/Button';
import { cadastroStyles as styles } from '../styles/cadastroStyles'; // Reaproveitando seus estilos

export default function Login({ navigation }: any) {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  const realizarLogin = async () => {
    if (!nome || !senha) {
      Alert.alert(
        'Erro',
        'Preencha todos os campos para entrar.',
      );
      return;
    }

    setCarregando(true);
    try {
      // Busca o usuário pelo nome e verifica a senha
      // Nota: Em produção, use hashes para senhas!
      const usuario: any = await db.getFirstAsync(
        'SELECT * FROM perfil_usuario WHERE nome LIKE ? AND senha = ?',
        [`%${nome.trim()}%`, senha],
      );

      if (usuario) {
        console.log('Login bem-sucedido:', usuario.nome);
        navigation.replace('Dashboard');
      } else {
        Alert.alert('Ops!', 'Usuário ou senha incorretos.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert(
        'Erro',
        'Falha ao conectar com o banco de dados.',
      );
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={
          Platform.OS === 'ios' ? 'padding' : 'height'
        }
        style={{ flex: 1, justifyContent: 'center' }}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
        >
          <View style={styles.scrollContent}>
            <View style={styles.header}>
              <View style={styles.iconContainer}>
                <Lock
                  size={48}
                  color="#121212"
                  strokeWidth={2.5}
                />
              </View>
              <Text style={styles.titulo}>MEUCORRE</Text>
              <Text style={styles.subtitulo}>
                Acesse sua conta para continuar.
              </Text>
            </View>

            <View style={styles.card}>
              <View style={styles.sectionTitle}>
                <User size={16} color="#888" />
                <Text style={styles.labelSecao}>LOGIN</Text>
              </View>

              <Input
                label="Nome de Usuário"
                placeholder="Ex: João Silva"
                value={nome}
                onChangeText={setNome}
                autoCapitalize="words"
              />

              <Input
                label="Senha"
                placeholder="Digite sua senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
              />

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Cadastro')
                }
                style={{
                  marginTop: 10,
                  alignSelf: 'center',
                }}
              >
                <Text
                  style={{ color: '#888', fontSize: 14 }}
                >
                  Ainda não tem conta?{' '}
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#121212',
                    }}
                  >
                    Cadastre-se
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 20 }}>
              <MainButton
                title={
                  carregando
                    ? 'AUTENTICANDO...'
                    : 'ENTRAR NO CORRE'
                }
                onPress={realizarLogin}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}
