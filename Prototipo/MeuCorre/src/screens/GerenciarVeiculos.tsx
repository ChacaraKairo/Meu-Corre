import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  Bike,
  Car,
  Plus,
  CheckCircle2,
  Pencil, // Adicionado para edição
} from 'lucide-react-native';
import db from '../database/DatabaseInit';
import { cadastroStyles as styles } from '../styles/cadastroStyles';
import { SuccessModal } from '../components/SuccessModal';

export default function GerenciarVeiculos({
  navigation,
}: any) {
  const [veiculos, setVeiculos] = useState<any[]>([]);
  const [modalVisivel, setModalVisivel] = useState(false);

  const carregarVeiculos = async () => {
    try {
      const res = await db.getAllAsync<any>(
        'SELECT * FROM veiculos ORDER BY ativo DESC;',
      );
      setVeiculos(res);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    carregarVeiculos();
  }, []);

  const selecionarVeiculo = async (id: number) => {
    try {
      await db.runAsync('UPDATE veiculos SET ativo = 0;');
      await db.runAsync(
        'UPDATE veiculos SET ativo = 1 WHERE id = ?;',
        [id],
      );

      setModalVisivel(true);

      setTimeout(() => {
        setModalVisivel(false);
        navigation.goBack();
      }, 1500);
    } catch (e) {
      console.error(e);
    }
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={[
        styles.card,
        {
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: item.ativo
            ? '#FFD700'
            : 'transparent',
          borderWidth: 1,
        },
      ]}
      onPress={() => selecionarVeiculo(item.id)}
    >
      {item.tipo === 'moto' ? (
        <Bike color="#FFF" size={24} />
      ) : (
        <Car color="#FFF" size={24} />
      )}

      <View style={{ flex: 1, marginLeft: 15 }}>
        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>
          {item.marca} {item.modelo}
        </Text>
        <Text style={{ color: '#888', fontSize: 12 }}>
          {item.placa}
        </Text>
      </View>

      {/* Botão de Lápis para Edição */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('CadastroVeiculo', {
            veiculoParaEditar: item,
          })
        }
        style={{ padding: 10, marginRight: 5 }}
      >
        <Pencil color="#888" size={20} />
      </TouchableOpacity>

      {item.ativo ? (
        <CheckCircle2 color="#FFD700" size={24} />
      ) : null}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={{ padding: 20, paddingTop: 60 }}>
        <Text style={styles.titulo}>MEUS VEÍCULOS</Text>
        <Text style={styles.subtitulo}>
          Selecione a máquina de hoje.
        </Text>
      </View>

      <FlatList
        data={veiculos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20 }}
        ListFooterComponent={
          <TouchableOpacity
            style={[
              styles.card,
              {
                borderStyle: 'dashed',
                borderWidth: 1,
                borderColor: '#666',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              },
            ]}
            onPress={() =>
              navigation.navigate('CadastroVeiculo')
            }
          >
            <Plus color="#888" size={24} />
            <Text style={{ color: '#888', marginTop: 5 }}>
              Cadastrar Nova Máquina
            </Text>
          </TouchableOpacity>
        }
      />

      <SuccessModal
        visible={modalVisivel}
        mensagem="MÁQUINA PRONTA PRO CORRE!"
      />
    </View>
  );
}
