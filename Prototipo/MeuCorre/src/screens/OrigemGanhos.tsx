// Arquivo: src/screens/OrigemGanhos.tsx
// Tela Principal componentizada

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Plus,
  Info,
  ChevronRight,
} from 'lucide-react-native';

import db from '../database/DatabaseInit';
import { styles } from '../styles/OrigemGAnhos/OrigemGanhosStyles';
import { HeaderOrigem } from '../components/telas/OrigemGanhos/HeaderOrigem';
import { ItemOrigem } from '../components/telas/OrigemGanhos/ItemOrigem';
import { ModalNovaOrigem } from '../components/telas/OrigemGanhos/ModalNovaOrigem';

export default function OrigemGanhos({ navigation }: any) {
  const [busca, setBusca] = useState('');
  const [selecionados, setSelecionados] = useState<
    number[]
  >([1]);

  // Estados para nova origem
  const [modalAberto, setModalAberto] = useState(false);
  const [novoNome, setNovoNome] = useState('');
  const [novoIcone, setNovoIcone] = useState('Briefcase');
  const [novaCor, setNovaCor] = useState('#00C853');

  const [origens, setOrigens] = useState([
    {
      id: 1,
      nome: 'iFood',
      iconId: 'Smartphone',
      cor: '#00C853',
      categoria: 'Delivery',
    },
    {
      id: 2,
      nome: 'Uber',
      iconId: 'Car',
      cor: '#2196F3',
      categoria: 'Passageiro',
    },
    {
      id: 3,
      nome: '99',
      iconId: 'Navigation',
      cor: '#FFEB3B',
      categoria: 'Passageiro',
    },
    {
      id: 4,
      nome: 'Mercado Livre',
      iconId: 'Package',
      cor: '#FF9800',
      categoria: 'Logística',
    },
    {
      id: 5,
      nome: 'Lalamove',
      iconId: 'Truck',
      cor: '#FF5252',
      categoria: 'Frete',
    },
  ]);

  const toggleSelecao = (id: number) => {
    setSelecionados((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id],
    );
  };

  const salvarNovaOrigem = () => {
    if (!novoNome.trim()) return;
    const nova = {
      id: Date.now(),
      nome: novoNome,
      iconId: novoIcone,
      cor: novaCor,
      categoria: 'Personalizado',
    };
    setOrigens((prev) => [...prev, nova]);
    setSelecionados((prev) => [...prev, nova.id]);
    setModalAberto(false);
    setNovoNome('');
  };

  const concluirConfiguracao = async () => {
    if (selecionados.length === 0) {
      Alert.alert(
        'Atenção',
        'Selecione pelo menos uma origem de ganhos.',
      );
      return;
    }

    try {
      const paraSalvar = origens.filter((o) =>
        selecionados.includes(o.id),
      );
      for (const item of paraSalvar) {
        await db.runAsync(
          'INSERT OR IGNORE INTO categorias_financeiras (nome, tipo, icone_id, cor) VALUES (?, ?, ?, ?);',
          [item.nome, 'ganho', item.iconId, item.cor],
        );
      }
      navigation.replace('Dashboard');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao salvar as categorias.');
    }
  };

  const filtradas = origens.filter((o) =>
    o.nome.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <HeaderOrigem
        busca={busca}
        setBusca={setBusca}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.listContainer}>
          {filtradas.map((item) => (
            <ItemOrigem
              key={item.id}
              item={item}
              isSelecionado={selecionados.includes(item.id)}
              onToggle={toggleSelecao}
            />
          ))}

          <TouchableOpacity
            style={styles.btnAddManual}
            onPress={() => setModalAberto(true)}
          >
            <View style={styles.btnAddIcon}>
              <Plus
                size={20}
                color="#444"
                strokeWidth={3}
              />
            </View>
            <Text style={styles.btnAddText}>
              ADICIONAR OUTRA ORIGEM
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoBox}>
          <Info size={20} color="#00C853" />
          <Text style={styles.infoText}>
            Cada cor e ícone escolhido será usado no seu
            Dashboard para organizar os seus lucros.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.btnFinish,
            selecionados.length === 0 && { opacity: 0.5 },
          ]}
          onPress={concluirConfiguracao}
          disabled={selecionados.length === 0}
        >
          <Text style={styles.btnFinishText}>
            Concluir Configuração
          </Text>
          <ChevronRight size={24} color="#0A0A0A" />
        </TouchableOpacity>
      </View>

      <ModalNovaOrigem
        visible={modalAberto}
        nome={novoNome}
        setNome={setNovoNome}
        icone={novoIcone}
        setIcone={setNovoIcone}
        cor={novaCor}
        setCor={setNovaCor}
        onSave={salvarNovaOrigem}
        onClose={() => setModalAberto(false)}
      />
    </View>
  );
}
