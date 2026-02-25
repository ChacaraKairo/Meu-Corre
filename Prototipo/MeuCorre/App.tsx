import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importações de Banco e Navegação
import { DatabaseInit } from './src/database/DatabaseInit';
import db from './src/database/DatabaseInit';

// Importação das Telas
import Cadastro from './src/screens/Cadastro';
import Dashboard from './src/screens/Dashboard';
import Login from './src/screens/Login';
import GerenciarVeiculos from './src/screens/Gareagem'; // Nova tela (Dev 5)
import CadastroVeiculo from './src/screens/CadastroVeiculo';

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [hasUser, setHasUser] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        // Inicializa as tabelas conforme a documentação (perfil, veiculos, etc) [cite: 120, 251, 28, 250]
        DatabaseInit();

        // Verifica se já existe perfil cadastrado para decidir a rota inicial [cite: 131]
        const result = await db.getAllAsync<{ id: number }>(
          'SELECT id FROM perfil_usuario LIMIT 1;',
        );

        if (result.length > 0) {
          setHasUser(true);
        }
      } catch (error) {
        console.error('Erro na inicialização:', error);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#121212', // Padrão de alto contraste do projeto [cite: 98, 365]
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        // Se houver usuário, vai para Login. Se não, Onboarding de Cadastro [cite: 132]
        initialRouteName={hasUser ? 'Login' : 'Cadastro'}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />

        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
        />

        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
        />

        {/* Rota para o Gerenciamento de Veículos acessada pelo Header [cite: 308] */}
        <Stack.Screen
          name="GerenciarVeiculos"
          component={GerenciarVeiculos}
        />
        <Stack.Screen
          name="CadastroVeiculo"
          component={CadastroVeiculo}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
