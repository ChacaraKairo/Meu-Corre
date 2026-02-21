import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import {
  TrendingUp,
  TrendingDown,
  Plus,
  Gauge,
} from 'lucide-react-native';

import db from '../database/DatabaseInit';
import { dashboardStyles as styles } from '../styles/dashboardStyles';

// Componentes
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

  // Novos Estados
  const [kmInput, setKmInput] = useState('');
  const [movimentacoes, setMovimentacoes] = useState<any[]>(
    [],
  );
  const [manutencao, setManutencao] = useState<any>(null);

  const carregarDados = async () => {
    try {
      // 1. Dados Básicos
      const resUser = await db.getAllAsync<any>(
        'SELECT nome FROM perfil_usuario LIMIT 1;',
      );
      const resVeic = await db.getAllAsync<any>(
        'SELECT * FROM veiculos WHERE ativo = 1 LIMIT 1;',
      );

      // 2. Últimas 5 Movimentações (Ganhos e Gastos)
      const resMov = await db.getAllAsync<any>(
        'SELECT id, tipo, valor, categoria FROM registros_financeiros ORDER BY data_registro DESC LIMIT 5;',
      );

      // 3. Próxima Manutenção (Cálculo Simples: menor km_restante)
      const resManut = await db.getAllAsync<any>(
        `SELECT item_nome, (intervalo_km - (v.km_atual - km_ultimo_reset)) as km_faltante 
         FROM manutencao_status, veiculos v WHERE v.ativo = 1 ORDER BY km_faltante ASC LIMIT 1;`,
      );

      if (resUser.length > 0) setUsuario(resUser[0]);
      if (resVeic.length > 0) {
        setVeiculo(resVeic[0]);
        setKmInput(resVeic[0].km_atual.toString());
      }
      setMovimentacoes(resMov);
      if (resManut.length > 0) setManutencao(resManut[0]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const atualizarKM = async () => {
    const novoKm = parseInt(kmInput);
    if (isNaN(novoKm)) {
      Alert.alert(
        'Erro',
        'Digite um valor numérico válido.',
      );
      return;
    }

    try {
      await db.runAsync(
        'UPDATE veiculos SET km_atual = ? WHERE ativo = 1',
        [novoKm],
      );
      Alert.alert('Sucesso', 'Odômetro atualizado!');
      carregarDados(); // Recarrega para atualizar a manutenção
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: 'center' },
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
        {/* 1. Alerta de Manutenção (Campo Estreito) */}
        {manutencao && (
          <AlertaManutencao
            item={manutencao.item_nome}
            kmFaltante={manutencao.km_faltante}
          />
        )}

        {/* 2. Campo de KM Atual */}
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
              placeholder="Ex: 12500"
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
              <Text style={{ fontWeight: 'bold' }}>
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

        {/* 3. Últimas 5 Movimentações */}
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
