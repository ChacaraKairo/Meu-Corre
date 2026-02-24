import React, { useCallback, useState } from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  TrendingUp,
  TrendingDown,
  Plus,
  Gauge,
} from 'lucide-react-native';

import db from '../database/DatabaseInit';
import { dashboardStyles as styles } from '../styles/dashboardStyles';

import { HeaderDashboard } from '../components/Dashboard/HeaderDashboard';
import { FinanceCard } from '../components/Dashboard/FinanceCard';
import { UltimasMovimentacoes } from '../components/Dashboard/UltimasMovimentacoes';
import { AlertaManutencao } from '../components/Dashboard/AlertaManutencao';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState<{
    nome: string;
  } | null>(null);
  const [veiculo, setVeiculo] = useState<any>(null);
  const [kmInput, setKmInput] = useState('');
  const [movimentacoes, setMovimentacoes] = useState<any[]>(
    [],
  );
  const [manutencao, setManutencao] = useState<any>(null);

  const carregarDados = async () => {
    try {
      const resUser = await db.getAllAsync<any>(
        'SELECT nome FROM perfil_usuario LIMIT 1;',
      );
      const resVeic = await db.getAllAsync<any>(
        'SELECT * FROM veiculos WHERE ativo = 1 LIMIT 1;',
      );
      const resMov = await db.getAllAsync<any>(
        'SELECT id, tipo, valor, categoria FROM registros_financeiros ORDER BY data_registro DESC LIMIT 5;',
      );

      if (resVeic.length > 0) {
        const vAtivo = resVeic[0];
        setVeiculo(vAtivo);
        setKmInput(vAtivo.km_atual.toString());

        const resManut = await db.getAllAsync<any>(
          `SELECT item_nome, (intervalo_km - (? - km_ultimo_reset)) as km_faltante 
           FROM manutencao_status WHERE veiculo_id = ? ORDER BY km_faltante ASC LIMIT 1;`,
          [vAtivo.km_atual, vAtivo.id],
        );
        setManutencao(
          resManut.length > 0 ? resManut[0] : null,
        );
      } else {
        setVeiculo(null);
        setManutencao(null);
      }

      if (resUser.length > 0) setUsuario(resUser[0]);
      setMovimentacoes(resMov);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, []),
  );

  const atualizarKM = async () => {
    const novoKm = parseInt(kmInput);
    if (isNaN(novoKm)) {
      Alert.alert('Erro', 'Digite um valor válido.');
      return;
    }
    try {
      await db.runAsync(
        'UPDATE veiculos SET km_atual = ? WHERE ativo = 1',
        [novoKm],
      );
      Alert.alert('Sucesso', 'KM atualizado!');
      carregarDados();
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          {
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderDashboard
        nome={usuario?.nome || 'Piloto'}
        veiculo={veiculo}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Renderização condicional segura: sem espaços entre chaves */}
        {manutencao && (
          <AlertaManutencao
            item={manutencao.item_nome}
            kmFaltante={manutencao.km_faltante}
          />
        )}

        <View
          style={{
            backgroundColor: '#1E1E1E',
            borderRadius: 12,
            padding: 16,
            marginBottom: 20,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <Gauge size={18} color="#FFD700" />
            <Text
              style={{
                color: '#FFF',
                marginLeft: 8,
                fontWeight: 'bold',
                fontSize: 12,
              }}
            >
              ODÔMETRO ATUAL (KM)
            </Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TextInput
              style={{
                flex: 1,
                backgroundColor: '#333',
                color: '#FFF',
                borderRadius: 8,
                padding: 12,
                fontSize: 16,
              }}
              value={kmInput}
              onChangeText={setKmInput}
              keyboardType="numeric"
              placeholderTextColor="#666"
            />
            <TouchableOpacity
              style={{
                backgroundColor: '#FFD700',
                justifyContent: 'center',
                paddingHorizontal: 20,
                borderRadius: 8,
              }}
              onPress={atualizarKM}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#121212',
                }}
              >
                SALVAR
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.cardLabel}>RESUMO DO DIA</Text>
        <View style={styles.row}>
          <FinanceCard
            titulo="GANHOS"
            valor="R$ 0,00"
            tipo="ganho"
            Icone={TrendingUp}
          />
          <FinanceCard
            titulo="GASTOS"
            valor="R$ 0,00"
            tipo="gasto"
            Icone={TrendingDown}
          />
        </View>

        <UltimasMovimentacoes dados={movimentacoes} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.cardFinanceiro,
            {
              alignItems: 'center',
              backgroundColor: '#FFD700',
            },
          ]}
        >
          <Plus color="#121212" size={24} />
          <Text
            style={[
              styles.cardLabel,
              { color: '#121212', marginBottom: 0 },
            ]}
          >
            NOVO GANHO
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
