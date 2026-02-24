import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
} from 'react-native';
import { CheckCircle2 } from 'lucide-react-native';

interface SuccessModalProps {
  visible: boolean;
  mensagem: string;
}

export const SuccessModal = ({
  visible,
  mensagem,
}: SuccessModalProps) => (
  <Modal transparent visible={visible} animationType="fade">
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <CheckCircle2
          size={50}
          color="#FFD700"
          strokeWidth={2.5}
        />
        <Text style={styles.texto}>{mensagem}</Text>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#1E1E1E',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    width: '80%',
  },
  texto: {
    color: '#FFF',
    fontWeight: 'bold',
    marginTop: 15,
    fontSize: 18,
    textAlign: 'center',
  },
});
