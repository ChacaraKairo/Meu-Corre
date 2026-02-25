import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Bike, Car, Save } from 'lucide-react-native';

import db from '../database/DatabaseInit';
import { Input } from '../components/inputs/Input';
import { VeiculoSelector } from '../components/telas/Cadastro/VeiculoSelector';
import { MainButton } from '../components/buttons/Button';
import { TipoVeiculo } from '../types';
import { cadastroStyles as styles } from '../styles/cadastroStyles';

export default function CadastroVeiculo({
  navigation,
}: any) {
  const [tipoVeiculo, setTipoVeiculo] =
    useState<TipoVeiculo>('moto');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [motor, setMotor] = useState('');
  const [placa, setPlaca] = useState('');
  const [erro, setErro] = useState(false);

  const salvarVeiculo = async () => {
    // Validações básicas [cite: 114]
    if (!marca || !modelo || !placa || placa.length < 7) {
      setErro(true);
      Alert.alert(
        'Erro',
        'Preencha os campos obrigatórios corretamente.',
      );
      return;
    }

    try {
      // 1. Desativa veículos anteriores para que o novo seja o atual
      await db.runAsync('UPDATE veiculos SET ativo = 0;');

      // 2. Insere o novo veículo [cite: 118]
      await db.runAsync(
        'INSERT INTO veiculos (tipo, marca, modelo, ano, motor, placa, ativo) VALUES (?, ?, ?, ?, ?, ?, 1);',
        [
          tipoVeiculo,
          marca,
          modelo,
          ano ? parseInt(ano) : null,
          motor,
          placa.toUpperCase(), // Converte automaticamente para maiúsculas
        ],
      );

      Alert.alert('Sucesso', 'Nova máquina cadastrada!');
      navigation.navigate('Dashboard');
    } catch (error) {
      console.error('Erro ao cadastrar veículo:', error);
      Alert.alert(
        'Erro',
        'Placa já cadastrada ou erro no banco.',
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={
        Platform.OS === 'ios' ? 'padding' : 'height'
      }
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.titulo}>NOVA MÁQUINA</Text>
          <Text style={styles.subtitulo}>
            Adicione um veículo à sua frota.
          </Text>
        </View>

        <View style={styles.card}>
          <VeiculoSelector
            selecionado={tipoVeiculo}
            aoSelecionar={setTipoVeiculo}
          />

          <Input
            label="Marca"
            placeholder="Ex: Honda ou Fiat"
            value={marca}
            onChangeText={setMarca}
            erro={erro && !marca}
          />

          <Input
            label="Modelo"
            placeholder="Ex: CG 160 ou Uno"
            value={modelo}
            onChangeText={setModelo}
            erro={erro && !modelo}
          />

          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={{ flex: 1 }}>
              <Input
                label="Ano"
                placeholder="2024"
                keyboardType="numeric"
                value={ano}
                onChangeText={setAno}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Input
                label="Motor"
                placeholder="Ex: 160 ou 1.0"
                value={motor}
                onChangeText={setMotor}
              />
            </View>
          </View>

          <Input
            label="Placa"
            placeholder="ABC1D23"
            autoCapitalize="characters"
            value={placa}
            onChangeText={setPlaca}
            erro={erro && !placa}
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <MainButton
            title="SALVAR VEÍCULO"
            onPress={salvarVeiculo}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
