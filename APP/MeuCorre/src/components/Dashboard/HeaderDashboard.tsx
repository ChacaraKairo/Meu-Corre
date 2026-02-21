import React from 'react';
import { View, Text } from 'react-native';
import { Bike, Car } from 'lucide-react-native';
import { dashboardStyles as styles } from '../../styles/dashboardStyles';

interface Props {
  nome: string;
  veiculo: {
    tipo: 'moto' | 'carro';
    marca: string;
    modelo: string;
    motor: string;
    placa: string;
  } | null;
}

export const HeaderDashboard = ({
  nome,
  veiculo,
}: Props) => (
  <View style={styles.header}>
    <View style={styles.perfilContainer}>
      <View>
        <Text style={styles.saudacao}>Bora pro corre,</Text>
        <Text style={styles.nomeUsuario}>
          {nome.split(' ')[0]}
        </Text>
      </View>
    </View>

    {veiculo && (
      <View style={styles.veiculoCard}>
        {veiculo.tipo === 'moto' ? (
          <Bike color="#121212" size={28} />
        ) : (
          <Car color="#121212" size={28} />
        )}
        <View style={styles.veiculoInfo}>
          <Text style={styles.veiculoNome}>
            {veiculo.marca} {veiculo.modelo}
          </Text>
          <Text style={styles.veiculoDetalhes}>
            Motor {veiculo.motor} • {veiculo.placa}
          </Text>
        </View>
      </View>
    )}
  </View>
);
