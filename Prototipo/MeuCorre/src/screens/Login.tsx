// Arquivo: src/screens/Login.tsx
// Tela Principal de Login com lógica de verificação estrita

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Animated,
} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

import db from '../database/DatabaseInit';
import { loginStyles as styles } from '../styles/Login/LoginStyles';

// Importação dos componentes modulares
import { HeaderLogin } from '../components/telas/Login/HeaderLogin';
import { CardLogin } from '../components/telas/Login/CardLogin';
import { FooterLogin } from '../components/telas/Login/FooterLogin';

const Login: React.FC<any> = ({ navigation }) => {
  const [nome, setNome] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [carregando, setCarregando] =
    useState<boolean>(false);
  const [erro, setErro] = useState<string>('');
  const [biometriaDisponivel, setBiometriaDisponivel] =
    useState<boolean>(false);

  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    checkDeviceForHardware();
    startBounce();
  }, []);

  const startBounce = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const checkDeviceForHardware = async () => {
    const compatible =
      await LocalAuthentication.hasHardwareAsync();
    const enrolled =
      await LocalAuthentication.isEnrolledAsync();
    setBiometriaDisponivel(compatible && enrolled);
  };

  const realizarLoginBiometrico = async () => {
    try {
      const result =
        await LocalAuthentication.authenticateAsync({
          promptMessage:
            'Aceda ao MeuCorre com a sua biometria',
          fallbackLabel: 'Utilizar senha',
          disableDeviceFallback: false,
        });

      if (result.success) {
        // Na biometria local, assumimos que o utilizador é o dono do dispositivo
        // e que já existe um perfil registado na base de dados.
        navigation.replace('Dashboard');
      }
    } catch (e) {
      console.error('Erro na biometria:', e);
    }
  };

  const realizarLoginManual = async () => {
    setErro('');

    // 1. Tratamento e validação inicial
    const nomeLimpo = nome.trim();
    const senhaLimpa = senha; // Normalmente não fazemos trim em senhas, pois espaços podem fazer parte delas

    if (!nomeLimpo || !senhaLimpa) {
      setErro('Introduza o nome e a senha para entrar.');
      return;
    }

    setCarregando(true);

    try {
      // 2. Consulta estrita (Utilizando = em vez de LIKE)
      // Isso garante que o nome tem de ser exatamente igual ao registado
      const usuario: any = await db.getFirstAsync(
        'SELECT * FROM perfil_usuario WHERE nome = ? AND senha = ?',
        [nomeLimpo, senhaLimpa],
      );

      // 3. Verificação do resultado
      if (usuario) {
        console.log(
          '[LOGIN] Sucesso para o utilizador:',
          usuario.nome,
        );
        navigation.replace('Dashboard');
      } else {
        setErro('Utilizador ou senha incorretos.');
      }
    } catch (error) {
      console.error('[ERRO LOGIN]', error);
      setErro('Erro ao aceder à base de dados local.');
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
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <HeaderLogin bounceAnim={bounceAnim} />

            <CardLogin
              nome={nome}
              setNome={setNome}
              senha={senha}
              setSenha={setSenha}
              erro={erro}
              carregando={carregando}
              biometriaDisponivel={biometriaDisponivel}
              onLogin={realizarLoginManual}
              onBiometria={realizarLoginBiometrico}
              onNavigateCadastro={() =>
                navigation.navigate('Cadastro')
              }
            />

            <FooterLogin />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;
