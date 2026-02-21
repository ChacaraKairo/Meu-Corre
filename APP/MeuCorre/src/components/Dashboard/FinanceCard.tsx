import React from 'react';
import { View, Text } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { dashboardStyles as styles } from '../../styles/dashboardStyles';

interface Props {
  titulo: string;
  valor: string;
  tipo: 'ganho' | 'gasto';
  Icone: LucideIcon;
}

export const FinanceCard = ({
  titulo,
  valor,
  tipo,
  Icone,
}: Props) => (
  <View style={styles.cardFinanceiro}>
    <Icone
      color={tipo === 'ganho' ? '#4CAF50' : '#F44336'}
      size={20}
    />
    <Text style={styles.cardLabel}>{titulo}</Text>
    <Text
      style={[
        styles.cardValor,
        tipo === 'ganho'
          ? styles.valorGanho
          : styles.valorGasto,
      ]}
    >
      {valor}
    </Text>
  </View>
);
