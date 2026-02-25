// Arquivo: src/screens/Cadastro.tsx
// Tela de Cadastro - Integrada com componente modular de Metas

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  ShieldCheck,
  ChevronRight,
} from 'lucide-react-native';

import db from '../database/DatabaseInit';
import { styles } from '../styles/Cadastro/cadastroStyles';
import { HeaderCadastro } from '../components/telas/Cadastro/HeaderCadastro';
import { PerfilSecao } from '../components/telas/Cadastro/PerfilSecao';
import { VeiculoSecao } from '../components/telas/Cadastro/VeiculoSecao';
import { MetasSecao } from '../components/telas/Cadastro/MetasSecao';

export default function Cadastro({ navigation }: any) {
  // Estados do Perfil
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [foto, setFoto] = useState<string | null>(null);

  // Estados do Veículo
  const [tipoVeiculo, setTipoVeiculo] = useState<
    'moto' | 'carro'
  >('moto');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [motor, setMotor] = useState('');
  const [placa, setPlaca] = useState('');
  const [kmAtual, setKmAtual] = useState('');

  // Estados de Metas e Termos
  const [meta, setMeta] = useState('');
  const [tipoMeta, setTipoMeta] = useState<
    'diaria' | 'semanal'
  >('diaria');
  const [aceitouTermos, setAceitouTermos] = useState(false);
  const [erro, setErro] = useState(false);

  const salvarCadastro = async () => {
    setErro(true);

    // Validação estrita conforme requisitos do banco e UX
    if (
      !nome ||
      senha.length < 4 ||
      !marca ||
      !modelo ||
      !placa ||
      !kmAtual ||
      !meta ||
      !aceitouTermos
    ) {
      Alert.alert(
        'Atenção',
        'Por favor, preencha todos os campos obrigatórios, incluindo a sua meta diária ou semanal.',
      );
      return;
    }

    try {
      const valorMeta = parseFloat(meta) || 0;

      // 1. Inserir Perfil (Salvando tipo de meta e valores específicos)
      await db.runAsync(
        `INSERT INTO perfil_usuario 
        (nome, senha, foto_uri, tipo_meta, meta_diaria, meta_semanal) 
        VALUES (?, ?, ?, ?, ?, ?);`,
        [
          nome.trim(),
          senha,
          foto,
          tipoMeta,
          tipoMeta === 'diaria' ? valorMeta : 0,
          tipoMeta === 'semanal' ? valorMeta : 0,
        ],
      );

      // 2. Inserir Veículo
      await db.runAsync(
        `INSERT INTO veiculos 
        (tipo, marca, modelo, ano, motor, placa, km_atual, ativo) 
        VALUES (?, ?, ?, ?, ?, ?, ?, 1);`,
        [
          tipoVeiculo,
          marca,
          modelo,
          parseInt(ano) || 0,
          motor,
          placa.toUpperCase(),
          parseInt(kmAtual) || 0,
        ],
      );

      console.log('Cadastro realizado com sucesso!');
      navigation.replace('OrigemGanhos');
    } catch (error) {
      console.error('Erro ao salvar no SQLite:', error);
      Alert.alert(
        'Erro',
        'Ocorreu uma falha ao guardar os teus dados.',
      );
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
          <View style={{ flex: 1 }}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <HeaderCadastro tipoVeiculo={tipoVeiculo} />

              <PerfilSecao
                nome={nome}
                setNome={setNome}
                senha={senha}
                setSenha={setSenha}
                foto={foto}
                setFoto={setFoto}
                erro={erro}
              />

              <VeiculoSecao
                tipo={tipoVeiculo}
                setTipo={setTipoVeiculo}
                marca={marca}
                setMarca={setMarca}
                modelo={modelo}
                setModelo={setModelo}
                ano={ano}
                setAno={setAno}
                motor={motor}
                setMotor={setMotor}
                placa={placa}
                setPlaca={setPlaca}
                km={kmAtual}
                setKm={setKmAtual}
                erro={erro}
              />

              {/* SEÇÃO METAS - Agora como componente modular */}
              <MetasSecao
                meta={meta}
                setMeta={setMeta}
                tipoMeta={tipoMeta}
                setTipoMeta={setTipoMeta}
                erro={erro}
              />
            </ScrollView>

            {/* FOOTER FIXO */}
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.termosContainer}
                onPress={() =>
                  setAceitouTermos(!aceitouTermos)
                }
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.checkbox,
                    aceitouTermos && styles.checkboxAtivo,
                  ]}
                >
                  {aceitouTermos && (
                    <ShieldCheck
                      size={14}
                      color="#0A0A0A"
                    />
                  )}
                </View>
                <Text style={styles.termosText}>
                  Aceito os{' '}
                  <Text style={styles.termosDestaque}>
                    Termos de Uso
                  </Text>{' '}
                  e confirmo que os meus dados serão
                  guardados apenas neste dispositivo.
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.btnSalvar,
                  {
                    backgroundColor: aceitouTermos
                      ? '#00C853'
                      : '#222',
                  },
                ]}
                onPress={salvarCadastro}
                disabled={!aceitouTermos}
              >
                <Text style={styles.btnSalvarText}>
                  Começar o corre
                </Text>
                <ChevronRight size={24} color="#0A0A0A" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}
