import React from 'react';
import { View, Text } from 'react-native';
import { dashboardStyles as styles } from '../../styles/dashboardStyles';

interface Movimentacao {
  id: number;
  tipo: 'ganho' | 'despesa';
  valor: number;
  categoria: string;
}

export const UltimasMovimentacoes = ({
  dados,
}: {
  dados: Movimentacao[];
}) => (
  <View style={{ marginTop: 20 }}>
    <Text style={styles.cardLabel}>
      ÚLTIMOS LANÇAMENTOS
    </Text>
    <View
      style={{
        backgroundColor: '#1E1E1E',
        borderRadius: 12,
        padding: 16,
      }}
    >
      {dados.length === 0 ? (
        <Text
          style={{ color: '#888', textAlign: 'center' }}
        >
          Nenhum registro hoje.
        </Text>
      ) : (
        dados.map((item) => (
          <View
            key={item.id}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 8,
              borderBottomWidth: 0.5,
              borderBottomColor: '#333',
            }}
          >
            <Text style={{ color: '#FFF' }}>
              {item.categoria}
            </Text>
            <Text
              style={{
                color:
                  item.tipo === 'ganho'
                    ? '#4CAF50'
                    : '#F44336',
                fontWeight: 'bold',
              }}
            >
              {item.tipo === 'ganho' ? '+' : '-'} R${' '}
              {item.valor.toFixed(2)}
            </Text>
          </View>
        ))
      )}
    </View>
  </View>
);
