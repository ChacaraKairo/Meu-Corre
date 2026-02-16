import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  Bike,
  Car,
  User,
  Settings,
} from 'lucide-react-native';

import db from '../database/DatabaseInit';
import { Input } from '../components/Input';
import { VeiculoSelector } from '../components/VeiculoSelector';
import { MainButton } from '../components/Button';
import { TipoVeiculo } from '../types';
import { cadastroStyles as styles } from '../styles/cadastroStyles';

export default function Cadastro({ navigation }: any) {
  // Estados para o nome
  const [pNome, setPNome] = useState<string>('');
  const [sobrenome, setSobrenome] = useState<string>('');

  // Estados do Veículo
  const [tipoVeiculo, setTipoVeiculo] =
    useState<TipoVeiculo>('moto');
  const [marca, setMarca] = useState<string>('');
  const [modelo, setModelo] = useState<string>('');
  const [ano, setAno] = useState<string>('');
  const [motor, setMotor] = useState<string>(''); // Alterado de potencia para motor
  const [placa, setPlaca] = useState<string>('');

  const [erro, setErro] = useState<boolean>(false);

  const salvarCadastro = async () => {
    // Validação
    if (
      pNome.length < 2 ||
      sobrenome.length < 2 ||
      !marca ||
      !modelo ||
      !placa
    ) {
      setErro(true);
      return;
    }

    try {
      // Unifica o nome antes de salvar no banco
      const nomeCompleto = `${pNome.trim()} ${sobrenome.trim()}`;

      // 1. Inserir Perfil
      await db.runAsync(
        'INSERT INTO perfil_usuario (nome) VALUES (?);',
        [nomeCompleto],
      );

      // 2. Inserir Veículo (Salvando o estado 'motor' na coluna 'potencia' ou 'motor' do seu banco)
      await db.runAsync(
        'INSERT INTO veiculos (tipo, marca, modelo, ano, motor, placa, ativo) VALUES (?, ?, ?, ?, ?, ?, 1);',
        [
          tipoVeiculo,
          marca,
          modelo,
          ano ? parseInt(ano) : null,
          motor,
          placa.toUpperCase(),
        ],
      );

      console.log('Cadastro realizado com sucesso!');
      // navigation.replace('Dashboard');
    } catch (error) {
      console.error('Erro ao realizar cadastro:', error);
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
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.header}>
              <View style={styles.iconContainer}>
                {tipoVeiculo === 'moto' ? (
                  <Bike
                    size={48}
                    color="#121212"
                    strokeWidth={2.5}
                  />
                ) : (
                  <Car
                    size={48}
                    color="#121212"
                    strokeWidth={2.5}
                  />
                )}
              </View>
              <Text style={styles.titulo}>
                BEM-VINDO AO MEUCORRE!
              </Text>
              <Text style={styles.subtitulo}>
                Configure o seu perfil para começar.
              </Text>
            </View>

            {/* SEÇÃO: USUÁRIO */}
            <View style={styles.card}>
              <View style={styles.sectionTitle}>
                <User size={16} color="#888" />
                <Text style={styles.labelSecao}>VOCÊ</Text>
              </View>

              <View
                style={{ flexDirection: 'row', gap: 12 }}
              >
                <View style={{ flex: 1 }}>
                  <Input
                    label="Nome"
                    placeholder="Ex: João"
                    value={pNome}
                    onChangeText={setPNome}
                    erro={erro && pNome.length < 2}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Input
                    label="Sobrenome"
                    placeholder="Ex: Silva"
                    value={sobrenome}
                    onChangeText={setSobrenome}
                    erro={erro && sobrenome.length < 2}
                  />
                </View>
              </View>
            </View>

            {/* SEÇÃO: VEÍCULO */}
            <View style={styles.card}>
              <View style={styles.sectionTitle}>
                <Settings size={16} color="#888" />
                <Text style={styles.labelSecao}>
                  A SUA MÁQUINA
                </Text>
              </View>

              <VeiculoSelector
                selecionado={tipoVeiculo}
                aoSelecionar={setTipoVeiculo}
              />

              <Input
                label="Marca"
                placeholder={
                  tipoVeiculo === 'moto'
                    ? 'Ex: Honda'
                    : 'Ex: Fiat'
                }
                value={marca}
                onChangeText={setMarca}
                erro={erro && !marca}
              />

              <Input
                label="Modelo"
                placeholder={
                  tipoVeiculo === 'moto'
                    ? 'Ex: CG 160'
                    : 'Ex: Uno'
                }
                value={modelo}
                onChangeText={setModelo}
                erro={erro && !modelo}
              />

              <View
                style={{ flexDirection: 'row', gap: 12 }}
              >
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
                    placeholder={
                      tipoVeiculo === 'moto'
                        ? 'Ex: 300'
                        : 'Ex: 1.6'
                    }
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
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <MainButton
          title="COMEÇAR O CORRE"
          onPress={salvarCadastro}
        />
      </View>
    </View>
  );
}
