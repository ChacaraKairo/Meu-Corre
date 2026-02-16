import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importações de Banco e Navegação
import { DatabaseInit } from './src/database/DatabaseInit';
import db from './src/database/DatabaseInit';

// Importação das Telas
import Cadastro from './src/screens/Cadastro';
// import Dashboard from './src/screens/Dashboard'; // Descomente quando criar o arquivo

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [hasUser, setHasUser] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        // Inicializa as tabelas conforme sua documentação técnica
        DatabaseInit();

        // Verifica se já existe perfil cadastrado
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
          backgroundColor: '#121212',
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
        initialRouteName={
          hasUser ? 'Dashboard' : 'Cadastro'
        }
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
        />
        {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
