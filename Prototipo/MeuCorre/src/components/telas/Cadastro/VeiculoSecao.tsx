// Arquivo: src/components/telas/Cadastro/VeiculoSecao.tsx
// Componente: VeiculoSecao - Dados da Máquina com Placeholders Dinâmicos

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  Settings,
  Bike,
  Car,
  Gauge,
} from 'lucide-react-native';
import { Input } from '../../inputs/Input';
import { styles } from '../../../styles/Cadastro/cadastroStyles';

interface VeiculoProps {
  tipo: 'moto' | 'carro';
  setTipo: (t: 'moto' | 'carro') => void;
  marca: string;
  setMarca: (t: string) => void;
  modelo: string;
  setModelo: (t: string) => void;
  ano: string;
  setAno: (t: string) => void;
  motor: string;
  setMotor: (t: string) => void;
  placa: string;
  setPlaca: (t: string) => void;
  km: string;
  setKm: (t: string) => void;
  erro: boolean;
}

export const VeiculoSecao: React.FC<VeiculoProps> = ({
  tipo,
  setTipo,
  marca,
  setMarca,
  modelo,
  setModelo,
  ano,
  setAno,
  motor,
  setMotor,
  placa,
  setPlaca,
  km,
  setKm,
  erro,
}) => {
  return (
    <View style={styles.card}>
      <View style={localStyles.sectionTitleRow}>
        <Settings size={18} color="#00C853" />
        <Text style={styles.labelSecao}>TUA MÁQUINA</Text>
      </View>

      {/* SELETOR DE TIPO (MOTO/CARRO) */}
      <View style={localStyles.selectorRow}>
        <TouchableOpacity
          style={[
            localStyles.selectBtn,
            tipo === 'moto' && localStyles.selectBtnAtivo,
          ]}
          onPress={() => setTipo('moto')}
        >
          <Bike
            size={24}
            color={tipo === 'moto' ? '#00C853' : '#444'}
          />
          <Text
            style={[
              localStyles.selectLabel,
              tipo === 'moto' &&
                localStyles.selectLabelAtivo,
            ]}
          >
            MOTO
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            localStyles.selectBtn,
            tipo === 'carro' && localStyles.selectBtnAtivo,
          ]}
          onPress={() => setTipo('carro')}
        >
          <Car
            size={24}
            color={tipo === 'carro' ? '#00C853' : '#444'}
          />
          <Text
            style={[
              localStyles.selectLabel,
              tipo === 'carro' &&
                localStyles.selectLabelAtivo,
            ]}
          >
            CARRO
          </Text>
        </TouchableOpacity>
      </View>

      {/* GRID DE MARCA E MODELO */}
      <View style={localStyles.row}>
        <View style={localStyles.flex1}>
          <Input
            label="Marca"
            placeholder={
              tipo === 'moto' ? 'Ex: Honda' : 'Ex: Fiat'
            }
            value={marca}
            onChangeText={setMarca}
            erro={erro && !marca}
          />
        </View>
        <View style={localStyles.flex1}>
          <Input
            label="Modelo"
            placeholder={
              tipo === 'moto' ? 'Ex: CG Titan' : 'Ex: Toro'
            }
            value={modelo}
            onChangeText={setModelo}
            erro={erro && !modelo}
          />
        </View>
      </View>

      {/* GRID DE ANO E MOTOR */}
      <View style={localStyles.row}>
        <View style={localStyles.flex1}>
          <Input
            label="Ano"
            placeholder="2024"
            value={ano}
            onChangeText={setAno}
            keyboardType="numeric"
          />
        </View>
        <View style={localStyles.flex1}>
          <Input
            label="Motor"
            placeholder={
              tipo === 'moto' ? 'Ex: 160cc' : 'Ex: 2.0'
            }
            value={motor}
            onChangeText={setMotor}
          />
        </View>
      </View>

      {/* PLACA */}
      <Input
        label="Placa"
        placeholder="ABC1D23"
        value={placa}
        onChangeText={(t) => setPlaca(t.toUpperCase())}
        autoCapitalize="characters"
        erro={erro && !placa}
      />

      {/* KM ATUAL */}
      <Input
        label="Quilometragem Atual"
        placeholder="Ex: 12500"
        value={km}
        onChangeText={setKm}
        keyboardType="numeric"
        Icone={Gauge}
        erro={erro && !km}
      />
    </View>
  );
};

const localStyles = StyleSheet.create({
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  selectorRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  flex1: {
    flex: 1,
  },
  selectBtn: {
    flex: 1,
    height: 80,
    backgroundColor: '#202020',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectBtnAtivo: {
    borderColor: '#00C853',
    backgroundColor: 'rgba(0, 200, 83, 0.05)',
  },
  selectLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#444',
    marginTop: 8,
  },
  selectLabelAtivo: {
    color: '#00C853',
  },
});
