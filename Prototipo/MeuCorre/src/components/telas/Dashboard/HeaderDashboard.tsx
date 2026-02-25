import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  Bike,
  Car,
  ChevronRight,
} from 'lucide-react-native';
import { dashboardStyles as styles } from '../../../styles/dashboardStyles';
import { useNavigation } from '@react-navigation/native';

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
}: Props) => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.header}>
      <View style={styles.perfilContainer}>
        <View>
          <Text style={styles.saudacao}>
            Bora pro corre,
          </Text>
          <Text style={styles.nomeUsuario}>
            {nome.split(' ')[0]}
          </Text>
        </View>
      </View>

      {veiculo && (
        <TouchableOpacity
          style={styles.veiculoCard}
          onPress={() =>
            navigation.navigate('GerenciarVeiculos')
          }
          activeOpacity={0.7}
        >
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
              {veiculo.placa} • Tocar para trocar
            </Text>
          </View>
          <ChevronRight color="#121212" size={20} />
        </TouchableOpacity>
      )}
    </View>
  );
};
