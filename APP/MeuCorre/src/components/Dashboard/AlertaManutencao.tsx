import React from 'react';
import { View, Text } from 'react-native';
import { AlertTriangle } from 'lucide-react-native';

export const AlertaManutencao = ({
  item,
  kmFaltante,
}: {
  item: string;
  kmFaltante: number;
}) => (
  <View
    style={{
      flexDirection: 'row',
      backgroundColor: '#1E1E1E',
      padding: 10,
      borderRadius: 8,
      alignItems: 'center',
      borderLeftWidth: 4,
      borderLeftColor: '#FFD700',
      marginBottom: 15,
    }}
  >
    <AlertTriangle size={18} color="#FFD700" />
    <Text
      style={{
        color: '#FFF',
        marginLeft: 10,
        fontSize: 13,
      }}
    >
      Próxima:{' '}
      <Text style={{ fontWeight: 'bold' }}>{item}</Text> em{' '}
      <Text style={{ color: '#FFD700' }}>
        {kmFaltante} km
      </Text>
    </Text>
  </View>
);
