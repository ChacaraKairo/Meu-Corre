import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  Bike,
  Car,
  TrendingUp,
  TrendingDown,
  Plus,
} from 'lucide-react-native';
import db from '../database/DatabaseInit';
import { dashboardStyles as styles } from '../styles/dashboardStyles';

interface UserData {
  nome: string;
}
interface VeiculoData {
  tipo: 'moto' | 'carro';
  marca: string;
  modelo: string;
  motor: string;
  placa: string;
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState<UserData | null>(
    null,
  );
  const [veiculo, setVeiculo] =
    useState<VeiculoData | null>(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        const resUser = await db.getAllAsync<UserData>(
          'SELECT nome FROM perfil_usuario LIMIT 1;',
        );
        const resVeic = await db.getAllAsync<VeiculoData>(
          'SELECT tipo, marca, modelo, motor, placa FROM veiculos WHERE ativo = 1 LIMIT 1;',
        );

        if (resUser.length > 0) setUsuario(resUser[0]);
        if (resVeic.length > 0) setVeiculo(resVeic[0]);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    carregarDados();
  }, []);

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
      {/* Header com Dados do Usuário e Veículo */}
      <View style={styles.header}>
        <View style={styles.perfilContainer}>
          <View>
            <Text style={styles.saudacao}>
              Bora pro corre,
            </Text>
            <Text style={styles.nomeUsuario}>
              {usuario?.nome.split(' ')[0]}
            </Text>
          </View>
        </View>

        <View style={styles.veiculoCard}>
          {veiculo?.tipo === 'moto' ? (
            <Bike color="#121212" size={28} />
          ) : (
            <Car color="#121212" size={28} />
          )}
          <View style={styles.veiculoInfo}>
            <Text style={styles.veiculoNome}>
              {veiculo?.marca} {veiculo?.modelo}
            </Text>
            <Text style={styles.veiculoDetalhes}>
              Motor {veiculo?.motor} • {veiculo?.placa}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.cardLabel}>RESUMO DO DIA</Text>

        <View style={styles.row}>
          <View style={styles.cardFinanceiro}>
            <TrendingUp color="#4CAF50" size={20} />
            <Text style={styles.cardLabel}>GANHOS</Text>
            <Text
              style={[styles.cardValor, styles.valorGanho]}
            >
              R$ 0,00
            </Text>
          </View>

          <View style={styles.cardFinanceiro}>
            <TrendingDown color="#F44336" size={20} />
            <Text style={styles.cardLabel}>GASTOS</Text>
            <Text
              style={[styles.cardValor, styles.valorGasto]}
            >
              R$ 0,00
            </Text>
          </View>
        </View>

        {/* Aqui entrarão os Cards de Manutenção no futuro */}
      </ScrollView>

      <View style={styles.footer}>
        {/* Botões de Ação Rápida */}
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
