import React, { useState, useEffect } from 'react';
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
import {
  Lock,
  User,
  Fingerprint,
} from 'lucide-react-native';
import * as LocalAuthentication from 'expo-local-authentication';

import db from '../database/DatabaseInit';
import { Input } from '../components/Input';
import { MainButton } from '../components/Button';
import { cadastroStyles as styles } from '../styles/cadastroStyles';

export default function Login({ navigation }: any) {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [biometriaDisponivel, setBiometriaDisponivel] =
    useState(false);

  useEffect(() => {
    checkDeviceForHardware();
  }, []);

  const checkDeviceForHardware = async () => {
    const compatible =
      await LocalAuthentication.hasHardwareAsync();
    const enrolled =
      await LocalAuthentication.isEnrolledAsync();
    setBiometriaDisponivel(compatible && enrolled);
  };

  const realizarLoginBiometrico = async () => {
    const result =
      await LocalAuthentication.authenticateAsync({
        promptMessage: 'Acesse o MeuCorre com sua digital',
        fallbackLabel: 'Usar senha',
      });

    if (result.success) {
      // Como o banco é local e o usuário já se cadastrou antes,
      // a digital libera o acesso direto ao Dashboard.
      navigation.replace('Dashboard');
    }
  };

  const realizarLoginManual = async () => {
    if (!nome || !senha) {
      Alert.alert(
        'Erro',
        'Preencha todos os campos para entrar.',
      );
      return;
    }

    setCarregando(true);
    try {
      const usuario: any = await db.getFirstAsync(
        'SELECT * FROM perfil_usuario WHERE nome LIKE ? AND senha = ?',
        [`%${nome.trim()}%`, senha],
      );

      if (usuario) {
        navigation.replace('Dashboard');
      } else {
        Alert.alert('Ops!', 'Usuário ou senha incorretos.');
      }
    } catch (error) {
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

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                  gap: 10,
                }}
              >
                <View style={{ flex: 1 }}>
                  <MainButton
                    title={carregando ? '...' : 'ENTRAR'}
                    onPress={realizarLoginManual}
                  />
                </View>

                {biometriaDisponivel && (
                  <TouchableOpacity
                    onPress={realizarLoginBiometrico}
                    style={{
                      backgroundColor: '#FFD700', // Amarelo Segurança do projeto
                      padding: 15,
                      borderRadius: 12,
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 56, // Mesma altura do seu botão padrão
                    }}
                  >
                    <Fingerprint
                      size={28}
                      color="#121212"
                    />
                  </TouchableOpacity>
                )}
              </View>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Cadastro')
                }
                style={{
                  marginTop: 20,
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
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}
